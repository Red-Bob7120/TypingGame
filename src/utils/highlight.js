// snippet: 원본 예문 문자열
// input: 사용자가 입력한 문자열

export function getHighlightedSnippet(snippet, input) {
  const chars = snippet.split("");
  const highlighted = chars.map((char, index) => {
    if (index < input.length) {
      if (char === input[index]) {
        return { char, status: "correct" };
      } else {
        return { char, status: "wrong" };
      }
    }
    return { char, status: "pending" };
  });

  return highlighted;
}
