export function calculateAccuracy(correct, wrong) {
  const total = correct + wrong;
  if (total === 0) return 100; 

  return Math.round((correct / total) * 100);
}
