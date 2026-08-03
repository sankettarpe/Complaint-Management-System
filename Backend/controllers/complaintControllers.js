import Complaint from "../models/Complaint.js";


export const submitComplaint = async (req, res) => {
  try {
    console.log("===== SUBMIT COMPLAINT =====");
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    const complaint = await Complaint.create({
      ...req.body,
      user: req.user.id,
      image: req.file ? req.file.path : ""
    });

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully.",
      complaint,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "An error occurred while submitting the complaint.",
    });

  }
};


export const getMyComplaints = async (req, res) => {

  try {

    const complaints = await Complaint.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

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

export const getUserDashboard = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    const stats = {
      total: complaints.length,
      pending: complaints.filter(c => c.status === "Pending").length,
      inProgress: complaints.filter(c => c.status === "In Progress").length,
      completed: complaints.filter(c => c.status === "Completed").length,
    };

    res.status(200).json({
      success: true,
      stats,
      recentComplaints: complaints.slice(0, 5),
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};