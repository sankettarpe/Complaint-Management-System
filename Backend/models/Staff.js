import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    employeeId: {
      type: String,
      unique: true,
      required: true,
    },

    department: {
      type: String,
      required: true,
      enum: [
        "Cleanliness",
        "Electrical",
        "Plumbing",
        "Carpentry",
        "Gardening",
        "Security",
        "Others",
      ],
    },

    designation: {
      type: String,
      default: "Maintenance Staff",
    },

    status: {
      type: String,
      enum: ["Available", "Busy", "On Leave"],
      default: "Available",
    },

    assignedComplaints: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
      },
    ],

    completedComplaints: {
      type: Number,
      default: 0,
    },

    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Staff", staffSchema);
