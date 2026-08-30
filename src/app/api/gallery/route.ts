import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { mockGallery } from "@/data/mockHome";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const cloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

export async function GET() {
  if (!cloudinaryConfigured) {
    return NextResponse.json({ success: true, images: mockGallery });
  }

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
    console.error("GALLERY FETCH ERROR, serving mock gallery:", error);

    // Graceful fallback rather than a 500 so the home page still renders.
    return NextResponse.json({ success: true, images: mockGallery });
  }
}