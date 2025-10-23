import { useCallback, useEffect, useRef, useState } from 'react';
import { buildMorseTimeline, getTimelineDuration, getEventAtTime } from '../lib/morseTimeline';
import { MorseAudioPlayer } from '../lib/morseAudio';

export function useMorsePlayer({ wpm = 20, mode = 'replace' } = {}) {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);
  const [currentSymbolIndex, setCurrentSymbolIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef(null);
  const timelineRef = useRef([]);
  const rafIdRef = useRef(null);
  const startTimeRef = useRef(null);

  // init player once
  useEffect(() => {
    playerRef.current = new MorseAudioPlayer();
    return () => {
      stopVisualTicker();
      playerRef.current?.cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopVisualTicker = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const startVisualTicker = useCallback(() => {
    stopVisualTicker();

    const tick = () => {
      const player = playerRef.current;
      const tl = timelineRef.current;
      const startAt = startTimeRef.current;

      if (!player || !tl.length || startAt == null) {
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = player.now() - startAt; // seconds since this run started
      const ev = getEventAtTime(tl, elapsed);

      if (ev) {
        setCurrentLetterIndex(prev => (prev !== ev.letterIndex ? ev.letterIndex : prev));
        setCurrentSymbolIndex(prev => (prev !== ev.symbolIndex ? ev.symbolIndex : prev));
      } else {
        // no active tone at this moment → keep letter, clear symbol
        setCurrentSymbolIndex(prev => (prev !== -1 ? -1 : prev));
      }

      // keep going while audio is (likely) playing
      if (player.isPlaying()) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        // playback ended: final cleanup
        setIsPlaying(false);
        setCurrentSymbolIndex(-1);
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [stopVisualTicker]);

  const stop = useCallback(() => {
    stopVisualTicker();
    playerRef.current?.stop();
    setIsPlaying(false);
    setCurrentLetterIndex(-1);
    setCurrentSymbolIndex(-1);
    timelineRef.current = [];
    startTimeRef.current = null;
  }, [stopVisualTicker]);

  /**
   * Play text as Morse, using either replace or append behavior.
   * In append mode we offset new events by the current total timeline duration.
   */
  const play = useCallback(
    async (text) => {
      if (!text || !text.trim()) {
        stop();
        return;
      }

      const player = playerRef.current;
      if (!player) return;

      const newTimeline = buildMorseTimeline(text, wpm);

      if (mode === 'append' && timelineRef.current.length > 0 && player.isPlaying()) {
        // append: offset new events by existing end time
        const offset = getTimelineDuration(timelineRef.current);
        const appended = newTimeline.map(ev => ({
          ...ev,
          startTime: ev.startTime + offset,
        }));
        timelineRef.current = [...timelineRef.current, ...appended];

        // schedule just the appended tones without resetting start time
        await player.resume();
        appended.forEach(ev => {
          if (ev.type === 'dot' || ev.type === 'dash') {
            const audioCtxTime = startTimeRef.current + ev.startTime;
            player.scheduleTone(audioCtxTime, ev.duration);
          }
        });

        setIsPlaying(true);
        // ticker already running
        return;
      }

      // replace: stop everything and start fresh
      stopVisualTicker();
      player.stop();

      timelineRef.current = newTimeline;

      // Set start time BEFORE scheduling (use player's current time after resume)
      await player.resume();
      startTimeRef.current = player.now();

      await player.scheduleTimeline(newTimeline, () => {
        setIsPlaying(false);
        setCurrentSymbolIndex(-1);
      });

      setIsPlaying(true);
      startVisualTicker();
    },
    [mode, startVisualTicker, stopVisualTicker, stop, wpm]
  );

  return {
    play,
    stop,
    isPlaying,
    currentLetterIndex,
    currentSymbolIndex,
  };
}

export default useMorsePlayer;