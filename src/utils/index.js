export function shuffle(str) {
  return str
    .split("")
    .sort(() => Math.random() > .5 ? 1 : -1)
    .join("");
}

export const uid = () => shuffle("`1234567890-=~!@#$%^&*()_+qwertyuiop[]QWERTYUIOP{}asdfghjkl;'ASDFGHJKL:\"\\zxcvbnm,./ZXCVBNM<>?")
