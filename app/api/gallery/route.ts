import { NextResponse } from 'next/server';
import Gallery from '@/models/Gallery';
import mongoose from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get('file') as File;
    const locationId = formData.get('locationId') as string;
    const category = formData.get('category') as string;

    // ✅ Validation
    if (!file) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      );
    }

    if (locationId && !mongoose.Types.ObjectId.isValid(locationId)) {
      return NextResponse.json(
        { error: 'Invalid locationId' },
        { status: 400 }
      );
    }

    // ✅ Convert file → buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ✅ Create upload directory if not exists
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ✅ Generate unique file name
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(uploadDir, fileName);

    // ✅ Save file
    fs.writeFileSync(filePath, buffer);

    // ✅ Public URL
    const imageUrl = `/uploads/${fileName}`;

    // ✅ Save in DB
    const gallery = await Gallery.create({
      imageUrl,
      locationId,
      category,
    });

    return NextResponse.json({
      message: 'Image uploaded successfully',
      data: gallery,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const locationId = searchParams.get('locationId');

    let query = {};

    if (locationId && mongoose.Types.ObjectId.isValid(locationId)) {
      query = { locationId };
    }

    const gallery = await Gallery.find(query)
      .populate('locationId')
      .sort({ createdAt: -1 });

    return NextResponse.json(gallery);

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}