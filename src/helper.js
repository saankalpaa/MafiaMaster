export function generateUniqueId() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  const charactersLength = characters.length;

  let counter = 0;

  while (counter < 6) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}