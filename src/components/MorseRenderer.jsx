import { memo } from 'react';
import { getMorseCode } from '../data/natoAlphabet';

const MorseRenderer = ({ char, showMorse, isActive = false, activeSymbolIndex = -1 }) => {
  if (!showMorse) return null;
  
  const morseCode = getMorseCode(char);
  if (!morseCode) return null;
  
  // Create accessible description
  const morseDescription = morseCode 
    .replace(/\./g, 'dot ')
    .replace(/-/g, 'dash ')
    .trim();
  
  return (
    <div
      className="flex items-center"
      style={{ gap: '4px' }}
      aria-label={`Morse for ${char}: ${morseDescription}`}
      role="img"
    >
      {morseCode.split('').map((symbol, index) => (
        <span
          key={index}
          aria-hidden="true"
          data-symbol-idx={index}
          data-active={(isActive && index === activeSymbolIndex) ? 'true' : 'false'}
          className={`inline-block ${
            index === activeSymbolIndex && isActive 
              ? 'bg-primary' 
              : 'bg-muted-foreground'
          }`}
          style={{
            width: symbol === '.' ? '6px' : '18px',
            height: '6px',
            borderRadius: symbol === '.' ? '50%' : '3px',
            transition: 'background-color 120ms ease'
          }}
        />
      ))}
    </div>
  );
};

export default memo(MorseRenderer);
