import mongoose from "mongoose";

const adminActivitySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    action: {
      type: String,
      enum: [
        "ADD_STAFF",
        "UPDATE_STAFF",
        "DELETE_STAFF",
        "ASSIGN_STAFF",
        "UPDATE_COMPLAINT",
        "DELETE_COMPLAINT",
        "UPDATE_STATUS",
      ],
      required: true,
    },

    complaint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Complaint",
      default: null,
    },

    details: {
      type: String,
      default: "",
    },

    performedOn: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "performedOnModel",
      default: null,
    },

    performedOnModel: {
      type: String,
      enum: ["Complaint", "Staff", "User"],
      default: "Complaint",
    },
  },
  {
    timestamps: true,
  },
);

// await AdminActivity.create({
//     admin:req.user.id,
//     complaint:complaint._id,
//     action:"ASSIGN_STAFF",
//     details:`Assigned ${staff.name} to complaint ${complaint.title}`
// });

export default mongoose.model("AdminActivity", adminActivitySchema);
