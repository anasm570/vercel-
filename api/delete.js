import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { public_id } = req.query;
  if (!public_id) {
    return res.status(400).json({ error: 'public_id مطلوب' });
  }

  try {
    await cloudinary.uploader.destroy(public_id);
    res.json({ message: 'تم الحذف بنجاح' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'فشل الحذف' });
  }
}
