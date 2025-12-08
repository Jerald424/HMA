import { getAllEmployees } from "../database/queries";

// Euclidean Distance
const distance = (v1, v2) => {
  let sum = 0;
  for (let i = 0; i < v1.length; i++) {
    let d = v1[i] - v2[i];
    sum += d * d;
  }
  return Math.sqrt(sum);
};

export const findBestFaceMatch = async (targetEmbedding) => {
  const employees = await getAllEmployees();

  let best = null;
  let bestDist = 999;

  employees.forEach(emp => {
    const emb = JSON.parse(emp.embedding);
    const d = distance(targetEmbedding, emb);

    if (d < bestDist) {
      bestDist = d;
      best = emp;
    }
  });

  return { best, distance: bestDist };
};
