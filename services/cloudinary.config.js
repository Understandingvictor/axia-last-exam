    import { v2 as cloudinary } from 'cloudinary';
    import dotenv from 'dotenv';
    dotenv.config();
    import fs from 'fs/promises';


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const cloudinaryUploader = async(pathToFile, images)=>{
        try {
            const result =  await cloudinary.uploader.upload(pathToFile,{folder:images});
            await fs.unlink(pathToFile);
            return result;
        } catch (error) {
            await fs.unlink(pathToFile);
            console.log("something happened in cloudinary endpoint");
            console.log(error.message);
        }
    }



    
 
    export {cloudinary, cloudinaryUploader};