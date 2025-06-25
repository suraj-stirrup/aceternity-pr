import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import Upload from '@/models/Upload';
import connectDB from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    await connectDB(); 
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload buffer to Cloudinary
    const upload = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(buffer);
    });

    // Save to MongoDB
    const saved = await Upload.create({
      name: upload.original_filename,
      url: upload.secure_url,
      type: upload.resource_type,
    });

    return NextResponse.json({ message: 'Upload successful', data: saved }, { status: 201 });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const uploads = await Upload.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ files: uploads }, { status: 200 });
  } catch (error: any) {
    console.error('Fetch error:', error);
    return NextResponse.json({ error: error.message || 'Fetch failed' }, { status: 500 });
  }
}
