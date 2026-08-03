import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    console.log("User created successfully");

    const token = generateToken(user._id, user.role);

    console.log("Token generated successfully");
    res.status(201).json({
      success: true,

      message: "Registration Successful",

      token: generateToken(user._id, user.role),

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        success: false,

        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,

      token,

      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({
        success: true,
        message:
          "If an account exists with this email, a password reset link has been sent.",
      });
    }

   
    const resetToken = user.generateResetPasswordToken();
    await user.save({ validateBeforeSave: false });


    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; border:1px solid #ddd; border-radius:10px; overflow:hidden;">
        
        <div style="background:#16a34a; color:white; padding:20px; text-align:center;">
          <h2>CampusCare</h2>
        </div>

        <div style="padding:30px;">

          <h3>Hello ${user.name},</h3>

          <p>
            We received a request to reset your password.
          </p>

          <p>
            Click the button below to create a new password.
          </p>

          <div style="text-align:center; margin:30px 0;">
            <a
              href="${resetUrl}"
              style="
                background:#16a34a;
                color:white;
                text-decoration:none;
                padding:14px 30px;
                border-radius:8px;
                display:inline-block;
              "
            >
              Reset Password
            </a>
          </div>

          <p>
            This link is valid for
            <strong>15 minutes</strong>.
          </p>

          <p>
            If you didn't request a password reset,
            simply ignore this email.
          </p>

          <hr>

          <small>
            CampusCare Support Team
          </small>

        </div>

      </div>
    `;

    await sendEmail({
      email: user.email,
      subject: "CampusCare Password Reset",
      html,
    });

    res.status(200).json({
      success: true,
      message:
        "If an account exists with this email, a password reset link has been sent.",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    const resetToken = req.params.token;

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset link is invalid or has expired.",
      });
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.passwordChangedAt = Date.now();

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password has been reset successfully. Please login with your new password.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
