import { NATO_ALPHABET } from "../data/natoAlphabet";
import { normalizeInput } from "./normalize";

/**
 * Returns an array of lines (words). Each line is an array of "X – Xray" segments.
 * Example: "hello world" =>
 * [
 *   ["H – Hotel","E – Echo","L – Lima","L – Lima","O – Oscar"],
 *   ["W – Whiskey","O – Oscar","R – Romeo","L – Lima","D – Delta"]
 * ]
 */
export function translateToNato(raw) {
  const input = normalizeInput(raw);
  if (!input) return [];

  // split on single spaces (normalize already collapsed)
  const words = input.split(" ");
  const result = words.map((word) => {
    const parts = [];
    for (const ch of word) {
      if (/[a-z]/.test(ch)) {
        const letter = ch.toUpperCase();
        const code = NATO_ALPHABET[letter];
        if (code) {
          parts.push(`${letter} – ${code}`);
        }
      }
      // ignore digits/punct for now (can add later)
    }
    return parts;
  });
  
  return result;
}