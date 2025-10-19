// NATO Phonetic Alphabet mapping
export const NATO_ALPHABET = {
  A: "Alpha",   B: "Bravo",   C: "Charlie",
  D: "Delta",   E: "Echo",    F: "Foxtrot",
  G: "Golf",    H: "Hotel",   I: "India",
  J: "Juliett", K: "Kilo",    L: "Lima",
  M: "Mike",    N: "November",O: "Oscar",
  P: "Papa",    Q: "Quebec",  R: "Romeo",
  S: "Sierra",  T: "Tango",   U: "Uniform",
  V: "Victor",  W: "Whiskey", X: "X-ray",
  Y: "Yankee",  Z: "Zulu",
};

// Helper function to get NATO word for a letter
export const getNatoWord = (letter) => {
  const upperLetter = letter.toUpperCase();
  return NATO_ALPHABET[upperLetter] || null;
};

// Helper function to check if character is alphabetic
export const isAlphabetic = (char) => {
  return /[A-Za-z]/.test(char);
};
