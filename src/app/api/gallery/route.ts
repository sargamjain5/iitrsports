import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "iitr-sports/gallery/",
      resource_type: "image",
      max_results: 100,
    });

    const images = result.resources.map((image: any) => ({
      publicId: image.public_id,
      url: image.secure_url,
      width: image.width,
      height: image.height,
      format: image.format,
      createdAt: image.created_at,
    }));

    return NextResponse.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("GALLERY FETCH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch gallery",
      },
      { status: 500 }
    );
  }
}