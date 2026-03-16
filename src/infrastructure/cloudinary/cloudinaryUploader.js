const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image file from disk to Cloudinary, then deletes the temp file.
 * @param {string} filePath - Absolute path to the temp file on disk
 * @param {string} folder - Cloudinary folder to organise uploads
 * @returns {Promise<string>} The secure URL of the uploaded image
 */
async function uploadFile(filePath, folder = 'cafe_logos') {
  const result = await cloudinary.uploader.upload(filePath, { folder, resource_type: 'image' });
  return result.secure_url;
}

module.exports = { uploadFile };
