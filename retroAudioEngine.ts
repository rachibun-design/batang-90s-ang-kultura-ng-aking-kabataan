/**
 * Procedural Web Audio API sound synthesizer for Batang '90s Virtual Museum
 * Provides zero-dependency, zero-404 audio synthesis for nostalgic 90s soundscapes
 */

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private currentSourceNodes: { stop: () => void }[] = [];
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private activeTrackId: string | null = null;
  private timerId: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
    }
  }

  public stop() {
    this.currentSourceNodes.forEach((node) => {
      try {
        node.stop();
      } catch {
        // ignore already stopped nodes
      }
    });
    this.currentSourceNodes = [];
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
    this.activeTrackId = null;
  }

  public playTrack(trackId: string, onEnded?: () => void) {
    this.initContext();
    this.stop();
    this.isPlaying = true;
    this.activeTrackId = trackId;

    // Play tape latch click sound first
    this.playTapeClick();

    switch (trackId) {
      case 'track-opm-rock':
        this.playOPMRock(onEnded);
        break;
      case 'track-dialup-modem':
        this.playDialUpSound(onEnded);
        break;
      case 'track-anime-theme':
        this.playAnimeTheme(onEnded);
        break;
      case 'track-nu107-radio':
        this.playNU107Radio(onEnded);
        break;
      case 'track-kanto-street':
        this.playKantoAmbience(onEnded);
        break;
      default:
        this.playOPMRock(onEnded);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getActiveTrackId(): string | null {
    return this.activeTrackId;
  }

  // Mechanical Cassette Deck Sound Effects
  public playTapeClick() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.05);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  public playFloppySnap() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime;

    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.008));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, t);
    filter.Q.setValueAtTime(3, t);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, t);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(t);
  }

  // 1. OPM Rock Guitar Synthesis (G - Em - C - D nostalgic progression)
  private playOPMRock(onEnded?: () => void) {
    if (!this.ctx || !this.masterGain) return;

    const chords = [
      // G Major arpeggio notes
      [196.00, 246.94, 293.66, 392.00],
      // Em chord
      [164.81, 246.94, 329.63, 392.00],
      // C Major chord
      [130.81, 261.63, 329.63, 392.00],
      // D Major chord
      [146.83, 220.00, 293.66, 369.99],
    ];

    const startTime = this.ctx.currentTime + 0.1;
    let noteTime = startTime;
    const stepDuration = 0.28;
    const loops = 4;

    for (let l = 0; l < loops; l++) {
      chords.forEach((chord) => {
        chord.forEach((freq, idx) => {
          if (!this.ctx || !this.masterGain) return;

          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          // Warm chorused analog guitar tone
          osc.type = idx === 0 ? 'triangle' : 'sawtooth';
          osc.frequency.setValueAtTime(freq, noteTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1400, noteTime);
          filter.frequency.exponentialRampToValueAtTime(450, noteTime + 0.8);

          // Plucked envelope
          gain.gain.setValueAtTime(0.001, noteTime);
          gain.gain.linearRampToValueAtTime(0.18, noteTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.1);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.masterGain);

          osc.start(noteTime);
          osc.stop(noteTime + 1.2);

          this.currentSourceNodes.push(osc);
          noteTime += stepDuration;
        });
      });
    }

    const totalDuration = (noteTime - startTime) * 1000;
    this.timerId = window.setTimeout(() => {
      this.isPlaying = false;
      if (onEnded) onEnded();
    }, totalDuration);
  }

  // 2. Procedural 56k Dial-Up Modem Handshake
  private playDialUpSound(onEnded?: () => void) {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime + 0.05;

    // A. Dial tone (350Hz + 440Hz US dialtone)
    const dial1 = this.ctx.createOscillator();
    const dial2 = this.ctx.createOscillator();
    const dialGain = this.ctx.createGain();

    dial1.frequency.setValueAtTime(350, t);
    dial2.frequency.setValueAtTime(440, t);
    dialGain.gain.setValueAtTime(0.15, t);
    dialGain.gain.setValueAtTime(0.15, t + 1.2);
    dialGain.gain.linearRampToValueAtTime(0.001, t + 1.3);

    dial1.connect(dialGain);
    dial2.connect(dialGain);
    dialGain.connect(this.masterGain);

    dial1.start(t);
    dial2.start(t);
    dial1.stop(t + 1.35);
    dial2.stop(t + 1.35);
    this.currentSourceNodes.push(dial1, dial2);

    // B. DTMF Touch Tones (Dialing number 8-9-0-4-1-9-5)
    const dtmfPairs = [
      [852, 1336], [852, 1477], [941, 1336], [770, 1209], [697, 1209], [852, 1477], [770, 1336]
    ];
    let toneTime = t + 1.5;
    dtmfPairs.forEach(([f1, f2]) => {
      if (!this.ctx || !this.masterGain) return;
      const o1 = this.ctx.createOscillator();
      const o2 = this.ctx.createOscillator();
      const g = this.ctx.createGain();

      o1.frequency.setValueAtTime(f1, toneTime);
      o2.frequency.setValueAtTime(f2, toneTime);

      g.gain.setValueAtTime(0.14, toneTime);
      g.gain.setValueAtTime(0.001, toneTime + 0.1);

      o1.connect(g);
      o2.connect(g);
      g.connect(this.masterGain);

      o1.start(toneTime);
      o2.start(toneTime);
      o1.stop(toneTime + 0.11);
      o2.stop(toneTime + 0.11);
      this.currentSourceNodes.push(o1, o2);

      toneTime += 0.18;
    });

    // C. Ring back tone
    const ringTime = toneTime + 0.3;
    const ring1 = this.ctx.createOscillator();
    const ring2 = this.ctx.createOscillator();
    const ringGain = this.ctx.createGain();

    ring1.frequency.setValueAtTime(440, ringTime);
    ring2.frequency.setValueAtTime(480, ringTime);
    ringGain.gain.setValueAtTime(0.12, ringTime);
    ringGain.gain.setValueAtTime(0.001, ringTime + 1.4);

    ring1.connect(ringGain);
    ring2.connect(ringGain);
    ringGain.connect(this.masterGain);

    ring1.start(ringTime);
    ring2.start(ringTime);
    ring1.stop(ringTime + 1.45);
    ring2.stop(ringTime + 1.45);
    this.currentSourceNodes.push(ring1, ring2);

    // D. The Iconic Handshake Screech (V.34 / V.90 FSK negotiation)
    const screechTime = ringTime + 1.6;
    const noiseBuffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 4, this.ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(2100, screechTime);
    noiseFilter.frequency.exponentialRampToValueAtTime(1400, screechTime + 2.0);
    noiseFilter.Q.setValueAtTime(5, screechTime);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.18, screechTime);
    noiseGain.gain.linearRampToValueAtTime(0.08, screechTime + 3.0);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, screechTime + 3.8);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noiseNode.start(screechTime);
    noiseNode.stop(screechTime + 4.0);
    this.currentSourceNodes.push(noiseNode);

    // Chirping Carrier Tones
    const chirp = this.ctx.createOscillator();
    const chirpGain = this.ctx.createGain();
    chirp.type = 'sawtooth';
    chirp.frequency.setValueAtTime(1200, screechTime);
    chirp.frequency.setValueAtTime(2400, screechTime + 0.8);
    chirp.frequency.setValueAtTime(1800, screechTime + 1.8);
    chirp.frequency.setValueAtTime(980, screechTime + 2.5);

    chirpGain.gain.setValueAtTime(0.12, screechTime);
    chirpGain.gain.linearRampToValueAtTime(0.001, screechTime + 3.6);

    chirp.connect(chirpGain);
    chirpGain.connect(this.masterGain);

    chirp.start(screechTime);
    chirp.stop(screechTime + 3.7);
    this.currentSourceNodes.push(chirp);

    const totalDuration = (screechTime + 4.2 - t) * 1000;
    this.timerId = window.setTimeout(() => {
      this.isPlaying = false;
      if (onEnded) onEnded();
    }, totalDuration);
  }

  // 3. Anime Afternoon Theme Synthesizer
  private playAnimeTheme(onEnded?: () => void) {
    if (!this.ctx || !this.masterGain) return;
    const melody = [
      { f: 523.25, d: 0.3 }, // C5
      { f: 587.33, d: 0.3 }, // D5
      { f: 659.25, d: 0.4 }, // E5
      { f: 783.99, d: 0.5 }, // G5
      { f: 659.25, d: 0.3 }, // E5
      { f: 587.33, d: 0.4 }, // D5
      { f: 523.25, d: 0.6 }, // C5
      { f: 659.25, d: 0.3 }, // E5
      { f: 783.99, d: 0.4 }, // G5
      { f: 880.00, d: 0.5 }, // A5
      { f: 1046.50, d: 0.8 }, // C6
    ];

    let t = this.ctx.currentTime + 0.1;
    const loops = 3;

    for (let l = 0; l < loops; l++) {
      melody.forEach((note) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // 90s FM synth brass characteristic
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(note.f, t);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.18, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + note.d * 0.95);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + note.d);
        this.currentSourceNodes.push(osc);

        t += note.d;
      });
    }

    const totalDuration = (t - this.ctx.currentTime) * 1000;
    this.timerId = window.setTimeout(() => {
      this.isPlaying = false;
      if (onEnded) onEnded();
    }, totalDuration);
  }

  // 4. NU 107 Radio Tuning & Grunge Distortion
  private playNU107Radio(onEnded?: () => void) {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime + 0.1;

    // Static Whistle
    const whistle = this.ctx.createOscillator();
    const whistleGain = this.ctx.createGain();
    whistle.type = 'sine';
    whistle.frequency.setValueAtTime(2800, t);
    whistle.frequency.linearRampToValueAtTime(1100, t + 0.8);
    whistleGain.gain.setValueAtTime(0.08, t);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);

    whistle.connect(whistleGain);
    whistleGain.connect(this.masterGain);
    whistle.start(t);
    whistle.stop(t + 1.1);
    this.currentSourceNodes.push(whistle);

    // Grunge Riff on tuning lock
    const riff = [
      { f: 82.41, d: 0.3 }, // E2
      { f: 82.41, d: 0.3 },
      { f: 98.00, d: 0.3 }, // G2
      { f: 110.00, d: 0.4 }, // A2
      { f: 116.54, d: 0.2 }, // Bb2
      { f: 110.00, d: 0.5 }, // A2
      { f: 98.00, d: 0.4 },  // G2
      { f: 82.41, d: 0.8 },  // E2
    ];

    let riffTime = t + 1.2;
    for (let r = 0; r < 3; r++) {
      riff.forEach((n) => {
        if (!this.ctx || !this.masterGain) return;
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        const dist = this.ctx.createWaveShaper();

        // Distortion curve
        const curve = new Float32Array(256);
        for (let i = 0; i < 256; i++) {
          const x = (i * 2) / 256 - 1;
          curve[i] = ((Math.PI + 3) * x) / (Math.PI + 3 * Math.abs(x));
        }
        dist.curve = curve;

        o.type = 'sawtooth';
        o.frequency.setValueAtTime(n.f, riffTime);

        g.gain.setValueAtTime(0.2, riffTime);
        g.gain.exponentialRampToValueAtTime(0.001, riffTime + n.d * 0.95);

        o.connect(dist);
        dist.connect(g);
        g.connect(this.masterGain);

        o.start(riffTime);
        o.stop(riffTime + n.d);
        this.currentSourceNodes.push(o);

        riffTime += n.d;
      });
    }

    const totalDuration = (riffTime - t) * 1000;
    this.timerId = window.setTimeout(() => {
      this.isPlaying = false;
      if (onEnded) onEnded();
    }, totalDuration);
  }

  // 5. Kanto Tambayan Ambience
  private playKantoAmbience(onEnded?: () => void) {
    if (!this.ctx || !this.masterGain) return;
    const t = this.ctx.currentTime + 0.1;

    // Distant 2-stroke tricycle engine rhythm
    const engine = this.ctx.createOscillator();
    const engineGain = this.ctx.createGain();
    engine.type = 'sawtooth';
    engine.frequency.setValueAtTime(65, t);
    engine.frequency.linearRampToValueAtTime(80, t + 4.0);
    engine.frequency.linearRampToValueAtTime(60, t + 8.0);

    engineGain.gain.setValueAtTime(0.04, t);
    engineGain.gain.linearRampToValueAtTime(0.001, t + 10.0);

    engine.connect(engineGain);
    engineGain.connect(this.masterGain);
    engine.start(t);
    engine.stop(t + 10.2);
    this.currentSourceNodes.push(engine);

    // Warm street acoustics
    this.timerId = window.setTimeout(() => {
      this.isPlaying = false;
      if (onEnded) onEnded();
    }, 10000);
  }
}

export const retroAudio = new RetroAudioEngine();
