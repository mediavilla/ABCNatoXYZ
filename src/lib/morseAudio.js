/**
 * Morse Audio Player using Web Audio API
 * Handles tone generation and scheduling for Morse code playback 
 */
export class MorseAudioPlayer {
  constructor() {
    this.audioContext = null;
    this.oscillators = [];
    this.gainNode = null;
    this.isInitialized = false;
    this.lastStartTime = null;
    this.lastTotalDuration = 0;
    
    // Audio settings
    this.frequency = 600; // Hz - standard CW tone
    this.gain = 0.3; // Volume level
    this.attackTime = 0.005; // 5ms attack
    this.releaseTime = 0.005; // 5ms release
  }
  
  /**
   * Initialize the audio context (must be called after user interaction)
   */
  async initialize() {
    if (this.isInitialized) return;
    
    try {
      console.log('Initializing audio context...');
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log('Audio context state:', this.audioContext.state);
      
      // Create gain node for volume control
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.setValueAtTime(this.gain, this.audioContext.currentTime);
      
      this.isInitialized = true;
      console.log('Audio context initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      throw error;
    }
  }
  
  /**
   * Resume audio context if suspended (required for some browsers)
   */
  async resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Get current time from the AudioContext clock (in seconds)
   */
  now() {
    return this.audioContext ? this.audioContext.currentTime : 0;
  }

  /**
   * Whether a scheduled run is still playing (based on stored start/duration)
   */
  isPlaying() {
    if (!this.audioContext || this.lastStartTime == null) return false;
    // small buffer to tolerate envelope release/end-of-scheduling jitter
    return this.now() < (this.lastStartTime + this.lastTotalDuration + 0.05);
  }
  
  /**
   * Schedule a timeline of Morse events
   * @param {Array} timeline - Array of timeline events
   * @param {Function} onComplete - Callback when playback completes
   */
  async scheduleTimeline(timeline, onComplete) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    await this.resume();
    
    // Clear any existing oscillators
    this.stop();
    
    if (!timeline.length) {
      onComplete?.();
      return;
    }
    
    console.log('Scheduling morse timeline:', timeline.length, 'events');
    
    const startTime = this.audioContext.currentTime;
    this.lastStartTime = startTime;
    
    // Schedule each tone event
    timeline.forEach(event => {
      if (event.type === 'dot' || event.type === 'dash') {
        this.scheduleTone(
          startTime + event.startTime,
          event.duration
        );
      }
    });
    
    // Schedule completion callback
    const totalDuration = timeline[timeline.length - 1].startTime + 
                         timeline[timeline.length - 1].duration;
    this.lastTotalDuration = totalDuration;
    
    setTimeout(() => {
      console.log('Morse playback completed');
      onComplete?.();
    }, (totalDuration + 0.1) * 1000); // Add small buffer
  }
  
  /**
   * Schedule a single tone
   * @param {number} startTime - When to start the tone
   * @param {number} duration - How long the tone should play
   */
  scheduleTone(startTime, duration) {
    if (!this.audioContext || !this.gainNode) {
      console.warn('Audio context not ready for tone scheduling');
      return;
    }
    
    // Create oscillator
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(this.frequency, startTime);
    
    // Create gain envelope for smooth attack/release
    const envelope = this.audioContext.createGain();
    
    // Connect: oscillator -> envelope -> main gain -> destination
    oscillator.connect(envelope);
    envelope.connect(this.gainNode);
    
    // Set up envelope
    envelope.gain.setValueAtTime(0, startTime);
    envelope.gain.linearRampToValueAtTime(this.gain, startTime + this.attackTime);
    envelope.gain.setValueAtTime(this.gain, startTime + duration - this.releaseTime);
    envelope.gain.linearRampToValueAtTime(0, startTime + duration);
    
    // Schedule start and stop
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
    
    // Store reference for cleanup
    this.oscillators.push(oscillator);
    
    // Clean up oscillator when it ends
    oscillator.onended = () => {
      const index = this.oscillators.indexOf(oscillator);
      if (index > -1) {
        this.oscillators.splice(index, 1);
      }
    };
    
    console.log(`Scheduled tone: ${this.frequency}Hz for ${duration}s at ${startTime}s`);
  }
  
  /**
   * Stop all scheduled sounds
   */
  stop() {
    // Stop all oscillators
    this.oscillators.forEach(oscillator => {
      try {
        oscillator.stop();
        oscillator.disconnect();
      } catch (error) {
        // Oscillator might already be stopped
      }
    });
    
    this.oscillators = [];
    this.lastStartTime = null;
    this.lastTotalDuration = 0;
  }
  
  /**
   * Clean up audio context
   */
  cleanup() {
    this.stop();
    
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.isInitialized = false;
    this.lastStartTime = null;
    this.lastTotalDuration = 0;
  }
  
  /**
   * Check if audio context is ready
   */
  isReady() {
    return this.isInitialized && this.audioContext && 
           this.audioContext.state === 'running';
  }
}
