import { MORSE_CODE } from '../data/natoAlphabet'; 

/**
 * Builds a timeline of Morse code events from text
 * @param {string} text - Input text to convert to Morse
 * @param {number} wpm - Words per minute (default 20)
 * @returns {Array} Array of timeline events
 */
export function buildMorseTimeline(text, wpm = 20) {
  if (!text || !text.trim()) return [];
  
  console.log('Building morse timeline for:', text);
  
  // Calculate timing based on PARIS standard
  const unitSec = 1.2 / wpm; // PARIS = 50 units
  
  const timings = {
    DOT: unitSec,           // 1 unit
    DASH: unitSec * 3,      // 3 units
    SYMBOL_GAP: unitSec,    // 1 unit (between dots/dashes)
    LETTER_GAP: unitSec * 3, // 3 units total (add 2 more after last symbol)
    WORD_GAP: unitSec * 7    // 7 units total (add 4 more after last symbol)
  };
  
  const events = [];
  let currentTime = 0;
  let letterIndex = 0;
  
  // Split text into words
  const words = text.trim().split(/\s+/);
  
  words.forEach((word, wordIndex) => {
    // Process each character in the word
    for (let i = 0; i < word.length; i++) {
      const char = word[i].toUpperCase();
      const morseCode = MORSE_CODE[char];
      
      if (morseCode) {
        // Add dots and dashes for this character
        for (let j = 0; j < morseCode.length; j++) {
          const symbol = morseCode[j];
          const duration = symbol === '.' ? timings.DOT : timings.DASH;
          
          events.push({
            type: symbol === '.' ? 'dot' : 'dash',
            startTime: currentTime,
            duration: duration,
            letterIndex: letterIndex,
            symbolIndex: j,
            char: char
          });
          
          currentTime += duration;
          
          // Add gap between symbols (except after last symbol)
          if (j < morseCode.length - 1) {
            currentTime += timings.SYMBOL_GAP;
          }
        }
        
        letterIndex++;
        
        // Add gap between letters (except after last letter of last word)
        if (i < word.length - 1 || wordIndex < words.length - 1) {
          currentTime += timings.LETTER_GAP;
        }
      }
    }
    
    // Add gap between words (except after last word)
    if (wordIndex < words.length - 1) {
      currentTime += timings.WORD_GAP;
    }
  });
  
  console.log('Generated timeline:', events.length, 'events');
  console.log('Sample events:', events.slice(0, 3));
  
  return events;
}

/**
 * Gets the total duration of a Morse timeline
 * @param {Array} timeline - Timeline events
 * @returns {number} Total duration in seconds
 */
export function getTimelineDuration(timeline) {
  if (!timeline.length) return 0;
  
  const lastEvent = timeline[timeline.length - 1];
  return lastEvent.startTime + lastEvent.duration;
}

/**
 * Finds the event at a specific time in the timeline
 * @param {Array} timeline - Timeline events
 * @param {number} time - Time in seconds
 * @returns {Object|null} Event at that time, or null
 */
export function getEventAtTime(timeline, time) {
  return timeline.find(event => 
    time >= event.startTime && time < event.startTime + event.duration
  ) || null;
}
