export function calculateCPM(correct = 0, wrong = 0, seconds = 0) {
  if (!seconds || seconds <= 0) return 0;

  const net = correct - wrong;
  const speed = (net * 60) / seconds;

  return Math.max(0, Math.round(speed));
}
