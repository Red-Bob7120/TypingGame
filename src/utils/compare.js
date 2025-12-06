// snippet = 원본 예문
// input = 사용자가 입력한 값
// 기본 비교: 글자 하나씩 비교하여 맞는 글자 수, 틀린 글자 수 계산

export function compareText(snippet, input) {
  let correct = 0;
  let wrong = 0;

  for (let i = 0; i < input.length; i++) {
    if (snippet[i] === input[i]) {
      correct++;
    } else {
      wrong++;
    }
  }

  return { correct, wrong };
}
