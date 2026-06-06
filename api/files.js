import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'vercel_uploads/',
      max_results: 100,
      sort_by: 'created_at',
      direction: 'desc',
    });
    res.json(result.resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'فشل جلب الملفات' });
  }
}
