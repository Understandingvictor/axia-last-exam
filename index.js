import express from 'express'
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import fileUploadRoute from './routes/fileUpload.routes.js'
dotenv.config();
const port = process.env.PORT || 8000;


//mongoose connection
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("database active"))
.catch((error)=>console.log(error.message));

//data middlewares
app.use(express.json())
app.use(fileUploadRoute);

//universal error handling middleware.
app.use((error, req, res, next) => {
  return res
    .status(error.status || 501)
    .json({ message: error.message || "something went wrong" });
});


app.listen(port,()=>{
    console.log(`server active on port ${port}`);
})