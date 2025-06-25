// // src/pages/api/upload.ts

// import type { NextApiRequest, NextApiResponse } from 'next';
// import formidable, { File } from 'formidable';
// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// import connectDB from '@/lib/db';
// import Upload from '@/models/Upload';

// // Disable Next.js default body parsing
// export const config = {
//   api: { bodyParser: false },
// };

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const form = formidable({ keepExtensions: true, multiples: false });

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Formidable Error:', err);
//         return res.status(500).json({ error: 'Formidable parsing error' });
//       }

//       const file = files.file as File;

//       if (!file || !file.filepath) {
//         return res.status(400).json({ error: 'Missing file' });
//       }

//       try {
//         await connectDB();

//         const result = await cloudinary.uploader.upload(file.filepath, {
//           resource_type: 'auto',
//         });

//         const saved = await Upload.create({
//           name: result.original_filename,
//           url: result.secure_url,
//           type: result.resource_type,
//         });

//         return res.status(201).json({ message: 'Uploaded', data: saved });
//       } catch (error: any) {
//         return res.status(500).json({ error: error.message });
//       }
//     });
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
