import { NextRequest, NextResponse } from 'next/server';
import formidable, { File } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import connectDB from '@/lib/db';
import Upload from '@/models/Upload';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Helper to parse form data in App Router
function parseFormData(req: Request): Promise<{ fields: any; files: any }> {
  return new Promise(async (resolve, reject) => {
    const form = formidable({ keepExtensions: true });

    const chunks: Buffer[] = [];
    const reader = req.body?.getReader();

    if (!reader) {
      return reject(new Error('No readable body'));
    }

    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
        controller.close();
      },
    });

    const nodeReadable = require('stream').Readable.from(stream as any);

    form.parse(nodeReadable, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { files } = await parseFormData(req);

    const file = files.file?.[0] as File;

    if (!file || !file.filepath) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const result = await cloudinary.uploader.upload(file.filepath, {
      resource_type: 'auto',
    });

    const saved = await Upload.create({
      name: result.original_filename,
      url: result.secure_url,
      type: result.resource_type,
    });

    return NextResponse.json({ message: 'Uploaded', data: saved }, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const uploads = await Upload.find({}).sort({ createdAt: -1 });
    return NextResponse.json(uploads, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
