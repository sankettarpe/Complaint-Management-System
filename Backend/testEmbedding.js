import { generateEmbedding } from "./services/embeddingService.js";

const cosineSimilarity = (vectorA, vectorB) => {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];

    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }

  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
};

const complaintA = `
Title: Water leakage near CS department

Description:
There is continuous water leakage from a pipe near
the CS department. The floor is becoming wet and
students could slip.

Location:
CS Department Ground Floor
`;

const complaintB = `
Title: Pipe leakage near Computer Science building

Description:
A broken water pipe is leaking near the Computer
Science department and making the floor wet.

Location:
Computer Science Department
`;

const complaintC = `
Title: Classroom projector not working

Description:
The projector in the classroom is not working.
Students cannot properly see the lecture material.

Location:
CSE Department Room 204
`;

try {
  console.log("Generating embeddings...\n");

  const embeddingA = await generateEmbedding(complaintA);
  const embeddingB = await generateEmbedding(complaintB);
  const embeddingC = await generateEmbedding(complaintC);

  const similarityAB = cosineSimilarity(
    embeddingA,
    embeddingB
  );

  const similarityAC = cosineSimilarity(
    embeddingA,
    embeddingC
  );

  console.log("Similarity A ↔ B:", similarityAB);
  console.log("Similarity A ↔ C:", similarityAC);

} catch (error) {
  console.error("Embedding test failed:");
  console.error(error);
}