import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
  {
    avatarsUrls: {
      type: [String],
      default: [],
    },
    galleryUrls: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const albumModel = mongoose.model('Albums', albumSchema);
export default albumModel;