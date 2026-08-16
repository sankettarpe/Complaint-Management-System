import cron from "node-cron";
import Complaint from "../models/Complaint.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js";

const checkOverdueComplaints = async () => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const overdueComplaints = await Complaint.find({
      createdAt: {
        $lte: twentyFourHoursAgo,
      },

      status: {
        $ne: "Completed",
      },

      $or: [
        {
          overdueNotified: false,
        },
        {
          overdueNotified: {
            $exists: false,
          },
        },
      ],
    });

    console.log("Overdue complaints found:", overdueComplaints.length);

    console.log(
      overdueComplaints.map((complaint) => ({
        id: complaint._id,
        title: complaint.title,
        status: complaint.status,
        createdAt: complaint.createdAt,
        overdueNotified: complaint.overdueNotified,
      })),
    );

    if (overdueComplaints.length === 0) {
      return;
    }

    const admins = await User.find({
      role: "admin",
    }).select("_id");

    for (const complaint of overdueComplaints) {
      for (const admin of admins) {
        await Notification.create({
          recipient: admin._id,
          type: "COMPLAINT_OVERDUE",
          title: "Complaint unresolved for 24 hours",
          message: `${complaint.title} at ${complaint.location} has not been resolved within 24 hours.`,
          complaint: complaint._id,
        });
      }

      complaint.overdueNotified = true;
      await complaint.save();
    }

    console.log(`${overdueComplaints.length} overdue complaint(s) processed.`);
  } catch (error) {
    console.error("Overdue complaint job error:", error);
  }
};

cron.schedule("*/10 * * * *", checkOverdueComplaints);

export default checkOverdueComplaints;
