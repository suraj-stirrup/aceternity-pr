import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
    type: String,
  },
  { timestamps: true }
);

export default mongoose.models.Upload || mongoose.model('Upload', uploadSchema);
