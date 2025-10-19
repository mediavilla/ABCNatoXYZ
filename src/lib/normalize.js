export function normalizeInput(str) {
    if (!str) return "";
    let s = String(str);
  
    // lowercase → remove diacritics → collapse spaces → trim
    s = s.toLowerCase();
    s = s.normalize("NFD").replace(/\p{Diacritic}/gu, ""); // café → cafe
    s = s.replace(/\s+/g, " ").trim();
  
    return s;
  }