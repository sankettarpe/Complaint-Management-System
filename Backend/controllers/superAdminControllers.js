import User from "../models/User.js";

export const superAdminDashboard = async (req, res) => {

  try {

    const admins = await User.find({
      role: "admin",
    });

    res.json({
      success: true,
      admins,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const createAdmin = async (req, res) => {

  try {

    const admin = await User.create({
      ...req.body,
      role: "admin",
    });

    res.status(201).json({
      success: true,
      admin,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


export const deleteAdmin = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Admin deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

export const getAdminActivity = async (req, res) => {

  try {

    res.json({
      success: true,
      message: "Admin Activity API",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};