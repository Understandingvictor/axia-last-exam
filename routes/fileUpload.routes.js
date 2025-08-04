import express from "express"
import multer from "multer";
const upload = multer({dest:'./uploads'});
import { singleFileEndpoint, manyFileManyFieldEndpoint, manyFileSingleFieldEndpoint } from "../controllers/fileUpload.controller.js"
const route = express.Router()

const albums = [
  { name: "avatars", maxCount: 8 },
  { name: "gallery", maxCount: 8 },
];


route.post("/singlePics",  upload.single('avatar'), singleFileEndpoint);
route.post("/singleField", upload.array("photos", 12), manyFileSingleFieldEndpoint);
route.post("/manyField", upload.fields(albums), manyFileManyFieldEndpoint);

export default route;