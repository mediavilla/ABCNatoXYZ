import { getMorseCode } from '../data/natoAlphabet';

const MorseRenderer = ({ char, showMorse }) => {
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
          className="bg-foreground inline-block"
          style={{
            width: symbol === '.' ? '6px' : '18px',
            height: '6px',
            borderRadius: symbol === '.' ? '50%' : '3px'
          }}
        />
      ))}
    </div>
  );
};

export default MorseRenderer;
