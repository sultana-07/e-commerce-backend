const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name  : process.env.CLOUDINAR_CLOUD_NAME,
    api_key : process.env.CLOUDINAR_API_KEY,
    api_secret : process.env.CLOUDINAR_API_SECRET
});

const uploadToCloudinary = (buffer,filename) => {
    return new Promise((resolve,reject) => {
        cloudinary.uploader.upload_stream({resource_type : 'image', public_id : `products/${filename}`},
            (error,result) => {
                if(error) reject(error);
                else resolve(result.secure_url);
            }
        ).end(buffer);
    })
}

module.exports = uploadToCloudinary;