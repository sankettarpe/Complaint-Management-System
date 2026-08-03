import Complaint from "../models/Complaint.js";
import Staff from "../models/Staff.js";
import AdminActivity from "../models/AdminActivity.js";

export const adminDashboard = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();

    const pending = await Complaint.countDocuments({
      status: "Pending",
    });

    const inProgress = await Complaint.countDocuments({
      status: "In Progress",
    });

    const completed = await Complaint.countDocuments({
      status: "Completed",
    });

    const recentComplaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    const monthlyComplaints = await Complaint.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);
    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyData = monthlyComplaints.map((item) => ({
      month: months[item._id.month],
      complaints: item.total,
    }));

    const categoryWiseComplaints = await Complaint.aggregate([
      {
        $group: {
          _id: "$category",
          value: {
            $sum: 1,
          },
        },
      },
    ]);

    const categoryData = categoryWiseComplaints.map((item) => ({
      category: item._id,
      value: item.value,
    }));

    const recentActivities = await AdminActivity.find()
      .populate("admin", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    const activities = recentActivities.map((activity) => ({
      id: activity._id,
      title: activity.action,
      description: activity.details,
      admin: activity.admin?.name,
      time: activity.createdAt,
    }));

    res.status(200).json({
      success: true,

      stats: {
        total,
        pending,
        inProgress,
        completed,
      },

      recentComplaints,
      monthlyData,
      categoryData,
      activities,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      },
    );

    res.json({
      success: true,
      message: "Status updated successfully.",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComplaint = async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Complaint deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addStaff = async (req, res) => {
  try {
    const { name, email, phone, department, designation, profileImage } =
      req.body;

    if (!name || !email || !phone || !department) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const emailExists = await Staff.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const phoneExists = await Staff.findOne({ phone });

    if (phoneExists) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    const totalStaff = await Staff.countDocuments();

    const employeeId = `STF${1001 + totalStaff}`;

    const staff = await Staff.create({
      name,
      email,
      phone,
      employeeId,
      department,
      designation,
      profileImage,
    });

    await AdminActivity.create({
      admin: req.user.id,
      action: "ADD_STAFF",
      details: `${staff.name} added as a new staff member.`,
    });

    res.status(201).json({
      success: true,
      message: "Staff added successfully.",
      staff,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();

    res.json({
      success: true,
      staff,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, phone, department, designation, status } = req.body;

    const staff = await Staff.findById(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found.",
      });
    }

    const existingEmail = await Staff.findOne({
      email,
      _id: { $ne: id },
    });

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const existingPhone = await Staff.findOne({
      phone,
      _id: { $ne: id },
    });

    if (existingPhone) {
      return res.status(400).json({
        success: false,
        message: "Phone number already exists.",
      });
    }

    staff.name = name;
    staff.email = email;
    staff.phone = phone;
    staff.department = department;
    staff.designation = designation;
    staff.status = status;

    await staff.save();

    await AdminActivity.create({
      admin: req.user.id,
      action: "UPDATE_STAFF",
      details: `Updated staff ${staff.name}`,
    });

    res.status(200).json({
      success: true,
      message: "Staff updated successfully.",
      staff,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await Staff.findById(id);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff member not found.",
      });
    }

    if (staff.assignedComplaints && staff.assignedComplaints.length > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete staff with assigned complaints. Reassign them first.",
      });
    }

    await Staff.findByIdAndDelete(id);

    await AdminActivity.create({
      admin: req.user.id,
      action: "DELETE_STAFF",
      details: `Deleted staff ${staff.name}`,
    });

    res.status(200).json({
      success: true,
      message: "Staff deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const assignStaff = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { staffId } = req.body;

    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({
        success: false,
        message: "Staff not found",
      });
    }

    if (staff.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Selected staff is not available",
      });
    }

    if (complaint.assignedStaff) {
      const previousStaff = await Staff.findById(complaint.assignedStaff);

      if (previousStaff) {
        previousStaff.assignedComplaints =
          previousStaff.assignedComplaints.filter(
            (id) => id.toString() !== complaint._id.toString(),
          );

        if (previousStaff.assignedComplaints.length === 0) {
          previousStaff.status = "Available";
        }

        await previousStaff.save();
      }
    }

    complaint.assignedStaff = staff._id;
    complaint.assignedBy = req.user.id;
    complaint.assignedAt = new Date();
    complaint.status = "In Progress";

    await complaint.save();

    if (!staff.assignedComplaints.includes(complaint._id)) {
      staff.assignedComplaints.push(complaint._id);
    }

    staff.status = "Busy";

    await staff.save();

    
    await AdminActivity.create({
      admin: req.user.id,
      complaint: complaint._id,
      action: "ASSIGN_STAFF",
      details: `${staff.name} assigned to complaint "${complaint.title}"`,
    });

    res.status(200).json({
      success: true,
      message: "Staff assigned successfully",
      complaint,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
