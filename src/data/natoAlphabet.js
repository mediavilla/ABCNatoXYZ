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

// Morse Code mapping for letters and numbers
export const MORSE_CODE = {
  A: ".-",    B: "-...",  C: "-.-.",  D: "-..",   E: ".",
  F: "..-.",  G: "--.",   H: "....",  I: "..",    J: ".---",
  K: "-.-",   L: ".-..",  M: "--",    N: "-.",    O: "---",
  P: ".--.",  Q: "--.-",  R: ".-.",   S: "...",   T: "-",
  U: "..-",   V: "...-",  W: ".--",   X: "-..-",  Y: "-.--",
  Z: "--..",
  0: "-----", 1: ".----", 2: "..---", 3: "...--", 4: "....-",
  5: ".....", 6: "-....", 7: "--...", 8: "---..", 9: "----."
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

// Helper function to get morse code for a character
export const getMorseCode = (char) => {
  const upperChar = char.toUpperCase();
  return MORSE_CODE[upperChar] || null;
};
