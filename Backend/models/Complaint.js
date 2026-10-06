import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Rejected"],
      default: "Pending",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    remarks: {
      type: String,
      default: "",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedAt: {
      type: Date,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      default: null,
    },
    overdueNotified: {
      type: Boolean,
      default: false,
    },
    aiAnalysis: {
      category: {
        type: String,
        default: "",
      },

      priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical", ""],
        default: "",
      },

      department: {
        type: String,
        default: "",
      },

      summary: {
        type: String,
        default: "",
      },

      analyzedAt: {
        type: Date,
        default: null,
      },
    },
    duplicateAnalysis: {
      isPossibleDuplicate: {
        type: Boolean,
        default: false,
      },

      similarity: {
        type: Number,
        default: 0,
      },

      matchedComplaint: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Complaint",
        default: null,
      },

      status: {
        type: String,
        enum: [
          "Not Checked",
          "No Similar Complaint",
          "Possible Duplicate",
          "Strong Duplicate",
        ],
        default: "Not Checked",
      },

      analyzedAt: {
        type: Date,
        default: null,
      },
      adminDecision: {
        type: String,
        enum: ["Pending", "Duplicate", "Not Duplicate"],
        default: "Pending",
      },

      reviewedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

      reviewedAt: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Complaint", complaintSchema);
