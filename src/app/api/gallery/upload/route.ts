import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Check environment variables
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    console.log("Cloudinary config:", {
      cloudName,
      apiKey,
      hasSecret: !!apiSecret,
    });

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary environment variables are missing",
        },
        { status: 500 }
      );
    }

    // Get form data
    const formData = await request.formData();

    const file = formData.get("image");

    console.log("FILE RECEIVED:", {
      exists: !!file,
      type: file instanceof File ? file.type : null,
      name: file instanceof File ? file.name : null,
      size: file instanceof File ? file.size : null,
    });

    // Check file
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "No image file received",
        },
        { status: 400 }
      );
    }

    // Check image type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          error: "Only image files are allowed",
        },
        { status: 400 }
      );
    }

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: "Image must be smaller than 10 MB",
        },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Uploading to Cloudinary...");

    // Upload
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "iitr-sports/gallery",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error(
              "CLOUDINARY ERROR:",
              JSON.stringify(error, null, 2)
            );

            reject(error);
            return;
          }

          resolve(result);
        }
      );

      Readable.from(buffer).pipe(uploadStream);
    });

    console.log("UPLOAD SUCCESS:", result);

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (error) {
    console.error(
      "GALLERY UPLOAD ERROR:",
      JSON.stringify(error, null, 2)
    );

    return NextResponse.json(
      {
        success: false,
        error:
          typeof error === "object" && error !== null
            ? error
            : String(error),
      },
      { status: 500 }
    );
  }
}