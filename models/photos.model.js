import mongoose from "mongoose";

const photosSchema = new mongoose.Schema({
    pictureUrl :{
        type:[String],
        default:[]
    }
},
{timestamps:true});

const photosModel = mongoose.model('Photos', photosSchema);
export default photosModel;