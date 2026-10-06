import mongoose from "mongoose";

const complaintEmbeddingSchema = new mongoose.Schema(
  {
    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
      unique: true,
    },

    text: {
      type: String,
      required: true,
    },

    embedding: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ComplaintEmbedding",
  complaintEmbeddingSchema
);