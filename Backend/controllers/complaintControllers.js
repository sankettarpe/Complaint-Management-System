import Complaint from "../models/Complaint.js";
import { analyzeComplaint } from "../services/aiService.js";
import ComplaintEmbedding from "../models/ComplaintEmbedding.js";
import { generateEmbedding } from "../services/embeddingService.js";
import { buildComplaintText } from "../utils/complaintText.js";
import {
  findSimilarComplaints,
  evaluateDuplicate,
} from "../services/duplicateService.js";

const generateEmbeddingAndStore = async (complaint) => {
  const text = buildComplaintText({
    title: complaint.title,
    description: complaint.description,
    location: complaint.location,
    category: complaint.category,
  });

  const embedding = await generateEmbedding(text);

  await ComplaintEmbedding.create({
    complaint: complaint._id,
    text,
    embedding,
  });

  console.log(`Embedding stored for complaint ${complaint._id}`);

  const similarComplaints = await findSimilarComplaints(
    embedding,
    complaint._id,
  );

  if (similarComplaints.length === 0) {
    await Complaint.findByIdAndUpdate(complaint._id, {
      $set: {
        duplicateAnalysis: {
          isPossibleDuplicate: false,
          similarity: 0,
          matchedComplaint: null,
          status: "No Similar Complaint",
          analyzedAt: new Date(),
        },
      },
    });

    console.log("No similar complaints found.");
    return;
  }

  const bestMatch = similarComplaints[0];

  const evaluation = evaluateDuplicate(
    complaint,
    bestMatch.complaint,
    bestMatch.similarity,
  );

  console.log("Best similar complaint:", {
    id: bestMatch.complaint._id,
    title: bestMatch.complaint.title,
    similarity: bestMatch.similarity,
    ...evaluation,
  });

  const isPossibleDuplicate =
    evaluation.status === "Possible Duplicate" ||
    evaluation.status === "Strong Duplicate";

  await Complaint.findByIdAndUpdate(complaint._id, {
    $set: {
      duplicateAnalysis: {
        isPossibleDuplicate,
        similarity: bestMatch.similarity,
        matchedComplaint: bestMatch.complaint._id,
        status: evaluation.status,
        analyzedAt: new Date(),
      },
    },
  });
};

export const submitComplaint = async (req, res) => {
  try {
    console.log("===== SUBMIT COMPLAINT =====");
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { title, description, location } = req.body;

    let aiAnalysis = {
      category: "",
      priority: "",
      department: "",
      summary: "",
      analyzedAt: null,
    };

    try {
      const result = await analyzeComplaint({
        title,
        description,
        location,
      });

      aiAnalysis = {
        ...result,
        analyzedAt: new Date(),
      };
    } catch (aiError) {
      console.error("AI analysis failed:", aiError.message);
    }

    const complaint = await Complaint.create({
      ...req.body,

      user: req.user.id,

      image: req.file ? req.file.path : "",

      aiAnalysis,
    });

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully.",
      complaint,
    });
    generateEmbeddingAndStore(complaint).catch((error) => {
      console.error(
        `Embedding generation failed for complaint ${complaint._id}:`,
        error.message,
      );
    });
  } catch (error) {
    console.error("Complaint submission error:", error);

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
      pending: complaints.filter((c) => c.status === "Pending").length,
      inProgress: complaints.filter((c) => c.status === "In Progress").length,
      completed: complaints.filter((c) => c.status === "Completed").length,
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
