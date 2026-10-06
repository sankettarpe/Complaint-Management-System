import ComplaintEmbedding from "../models/ComplaintEmbedding.js";
import { cosineSimilarity } from "../utils/cosineSimilarity.js";
import { normalizeText } from "../utils/normalizeText.js";

export const findSimilarComplaints = async (
  newEmbedding,
  currentComplaintId
) => {
  const existingEmbeddings = await ComplaintEmbedding.find({
    complaint: { $ne: currentComplaintId },
  }).populate("complaint");

  const results = existingEmbeddings.map((item) => {
    const similarity = cosineSimilarity(
      newEmbedding,
      item.embedding
    );

    return {
      complaint: item.complaint,
      similarity,
    };
  });

  results.sort((a, b) => b.similarity - a.similarity);

  return results.slice(0, 5);
};

export const evaluateDuplicate = (
  newComplaint,
  existingComplaint,
  similarity
) => {
  const sameCategory =
    normalizeText(newComplaint.category) ===
    normalizeText(existingComplaint.category);

  const sameLocation =
    normalizeText(newComplaint.location) ===
    normalizeText(existingComplaint.location);

  const sameTitle =
    normalizeText(newComplaint.title) ===
    normalizeText(existingComplaint.title);

  let status = "Unrelated";
  if (sameTitle && sameLocation) {
    status = "Strong Duplicate";
  }
  else if (
    similarity >= 0.85 &&
    sameCategory &&
    sameLocation
  ) {
    status = "Strong Duplicate";
  }
  else if (
    sameCategory &&
    sameLocation &&
    similarity >= 0.70
  ) {
    status = "Possible Duplicate";
  }
  else if (
    similarity >= 0.90 &&
    sameCategory
  ) {
    status = "Possible Duplicate";
  }
  else if (similarity >= 0.80) {
    status = "Related Complaint";
  }

  const isPossibleDuplicate =
    status === "Possible Duplicate" ||
    status === "Strong Duplicate";

  return {
    status,
    isPossibleDuplicate,
    sameTitle,
    sameCategory,
    sameLocation,
  };
};