export function compareResult(snippet, input) {
  const maxLength = Math.max(snippet.length, input.length);

  const result = [];

  for (let i = 0; i < maxLength; i++) {
    const sChar = snippet[i] || "";
    const iChar = input[i] || "";

    if (!iChar) {
      result.push({ char: sChar, status: "pending" });
    } else if (sChar === iChar) {
      result.push({ char: sChar, status: "correct" });
    } else {
      result.push({ char: sChar, status: "wrong" });
    }
  }

  return result;
}
