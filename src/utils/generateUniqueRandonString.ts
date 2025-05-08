export function generateUniqueRandomString(length = 10) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  if (length > chars.length) {
    throw new Error("요청한 길이가 가능한 고유 문자 수를 초과합니다.");
  }

  // 문자를 배열로 변환하고 섞기 (Fisher–Yates shuffle)
  const charArray = chars.split("");
  for (let i = charArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [charArray[i], charArray[j]] = [charArray[j], charArray[i]];
  }

  return charArray.slice(0, length).join("");
}
