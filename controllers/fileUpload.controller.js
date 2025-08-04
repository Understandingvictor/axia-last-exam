import { cloudinaryUploader } from "../services/cloudinary.config.js";
import avatarModel from "../models/avatar.model.js";
import albumModel from "../models/album.model.js";
import photosModel from "../models/photos.model.js";
import fs from 'fs/promises'


const singleFileEndpoint=async(req, res, next)=>{
    try {
      const body = req.body;
      const picture = req.file;
      //console.log(picture);
       if (!picture){
        throw new Error('no pictures uploaded');
       }
       const response = await cloudinaryUploader(picture.path, "profile pictures"); //uploader
       if(!response){
          await fs.unlink(picture.path);
          throw new Error('upload not successful');
       }

       const newAvatar = await (new avatarModel({pictureUrl:response.secure_url})).save(); 
      return res.json({response:response.secure_url, database: newAvatar, message:"file uploaded successfully"});
    } catch (error) {
        next(error);
    }
}

const manyFileSingleFieldEndpoint = async (req, res, next) => {
  let pictures;
  try {
    const body = req.body;
    pictures = req.files;
    let secure_urls = [];
    if (!pictures) {
      throw new Error("no pictures uploaded");
    }

    for (let i of pictures) {
      const response = await cloudinaryUploader(i.path, "photos"); //uploader
      if (!response) {
        await fs.unlink(pictures.path);
        throw new Error("upload not successful");
      }
      secure_urls.push(response.secure_url);
    }
    const newPhotos = await (new photosModel({pictureUrl:secure_urls})).save(); 
    
    return res.json({database: newPhotos, message:"file uploaded successfully"});
  } catch (error) {
    if(pictures){ //checking if picture exists
      for(let i of pictures && pictures.length !== 0){ 
        await fs.unlink(i.path);
      }
    }
    next(error);
  }
};

const manyFileManyFieldEndpoint = async (req, res, next) => {
  let pictures;
  try {
    const body = req.body;
    pictures = req.files;
    const avatarSecure_urls = [];
    const gallerySecure_urls = []
    if (!pictures) {
      throw new Error("no pictures uploaded");
    }
    
    for (let i of pictures.avatars) {
      const response = await cloudinaryUploader(i.path, "avatars"); //uploader
      if (!response) {
        await fs.unlink(pictures.path);
        throw new Error("upload not successful");
      }
      avatarSecure_urls.push(response.secure_url);
    }

      for (let i of pictures.gallery) {
        const response = await cloudinaryUploader(i.path, "gallery"); //uploader
        if (!response) {
          await fs.unlink(pictures.path);
          throw new Error("upload not successful");
        }
        gallerySecure_urls.push(response.secure_url);
      }
    const newAlbum = await new albumModel({ avatarsUrls: avatarSecure_urls, galleryUrls:gallerySecure_urls }).save();

    return res.json({database: newAlbum, message: "file uploaded successfully"});
  } catch (error) {
      if (pictures && pictures.gallery) {
        for (let i of pictures.gallery) {
          await fs.unlink(i.path);
        }
      } else if (pictures && pictures.avatars) {
        for (let i of pictures.avatars) {
          await fs.unlink(i.path);
        }
      }
    next(error);
  }
};

export {
  singleFileEndpoint,
  manyFileManyFieldEndpoint,
  manyFileSingleFieldEndpoint,
};