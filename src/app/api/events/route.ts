import { NextResponse } from "next/server";
import { connectDB, isDbConfigured } from "@/lib/mongodb";
import Event from "@/models/Events";
import cloudinary from "@/lib/cloundinary";
import { mockEvents } from "@/data/mockHome";

export const runtime = "nodejs";

/* ============================================================
   GET /api/events
   Returns upcoming events, nearest date first.
   Falls back to mock data when the database is not configured
   (or unreachable) so the app stays usable without a backend.
   ============================================================ */

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json(mockEvents, { status: 200 });
  }

  try {
    await connectDB();

    const events = await Event.find({
      date: {
        $gte: new Date(),
      },
    })
      .sort({ date: 1 })
      .limit(6)
      .lean();

    return NextResponse.json(events, {
      status: 200,
    });
  } catch (error) {
    console.error("GET /api/events error, serving mock events:", error);

    // Graceful fallback rather than a 500 so the home page still renders.
    return NextResponse.json(mockEvents, { status: 200 });
  }
}


/* ============================================================
   POST /api/events
   Creates event + uploads photo to Cloudinary
   ============================================================ */

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const eventName = formData.get("eventName") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const photo = formData.get("photo") as File;

    /* --------------------------------------------------------
       Validate fields
       -------------------------------------------------------- */

    if (!eventName || !date || !description || !photo) {
      return NextResponse.json(
        {
          message:
            "Event Name, Photo, Date and Description are required",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       Validate image
       -------------------------------------------------------- */

    if (!photo.type.startsWith("image/")) {
      return NextResponse.json(
        {
          message: "Photo must be an image",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       Limit image size
       5 MB
       -------------------------------------------------------- */

    if (photo.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          message: "Photo must be smaller than 5 MB",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       Validate date
       -------------------------------------------------------- */

    const eventDate = new Date(date);

    if (Number.isNaN(eventDate.getTime())) {
      return NextResponse.json(
        {
          message: "Invalid event date",
        },
        {
          status: 400,
        }
      );
    }

    /* --------------------------------------------------------
       Convert File → Buffer
       -------------------------------------------------------- */

    const bytes = await photo.arrayBuffer();
    const buffer = Buffer.from(bytes);

    /* --------------------------------------------------------
       Upload to Cloudinary
       -------------------------------------------------------- */

    const uploadResult = await new Promise<any>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "iitr-sports/events",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        uploadStream.end(buffer);
      }
    );

    /* --------------------------------------------------------
       Save event in MongoDB
       -------------------------------------------------------- */

    const event = await Event.create({
      eventName: eventName.trim(),
      photo: uploadResult.secure_url,
      date: eventDate,
      description: description.trim(),
    });

    return NextResponse.json(
      {
        message: "Event created successfully",
        event,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/events error:", error);

    return NextResponse.json(
      {
        message: "Failed to create event",
      },
      {
        status: 500,
      }
    );
  }
}