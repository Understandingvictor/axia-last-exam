import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
    pictureUrl :{
        type:String,
    }
},
{timestamps:true});

const avatarModel = mongoose.model('Avatar', avatarSchema);
export default avatarModel;



