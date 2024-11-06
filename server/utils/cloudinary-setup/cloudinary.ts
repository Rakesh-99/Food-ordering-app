import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_NAME
});

// Cloudinary uploader : 

export const uploadOnCloudinary = async (imageURL: any) => {

    try {
        const file = await cloudinary.uploader.upload(imageURL, { resource_type: "auto" });
        if (file) {
            return file.url;
        }
    } catch (error) {
        console.log(`Could not upload image , ${error}`);
    }
};
export default cloudinary;