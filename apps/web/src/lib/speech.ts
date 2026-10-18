import { SupportedLanguage } from '../types';

export class VoiceEngine {
  private static activeAudio: HTMLAudioElement | null = null;
  private static synth: SpeechSynthesis | null = null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;

  private static getSynth(): SpeechSynthesis | null {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis;
    }
    return null;
  }

  /**
   * Stops any currently playing audio or speech
   */
  public static stop(): void {
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }

    const synth = this.getSynth();
    if (synth && synth.speaking) {
      synth.cancel();
    }
  }

  /**
   * Plays audio from base64 audio URI
   */
  public static playAudioData(
    audioBase64: string,
    onEnded?: () => void,
    playbackRate: number = 1.0
  ): HTMLAudioElement {
    this.stop();

    const audio = new Audio(audioBase64);
    audio.playbackRate = playbackRate;
    this.activeAudio = audio;

    audio.onended = () => {
      this.activeAudio = null;
      if (onEnded) onEnded();
    };

    audio.play().catch((err) => {
      console.warn('Audio auto-play prevented by browser policy:', err);
    });

    return audio;
  }

  /**
   * Speaks text using browser SpeechSynthesis with regional voice matching
   */
  public static speakBrowser(
    text: string,
    lang: SupportedLanguage,
    onStart?: () => void,
    onEnd?: () => void,
    rate: number = 0.95
  ): void {
    const synth = this.getSynth();
    if (!synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate; // comfortable pacing for rural listening
    utterance.pitch = 1.0;

    const langCodeMap: Record<SupportedLanguage, string> = {
      hi: 'hi-IN',
      pa: 'pa-IN',
      en: 'en-IN',
    };
    utterance.lang = langCodeMap[lang] || 'hi-IN';

    // Select suitable Indian voice if available
    const voices = synth.getVoices();
    const matchedVoice = voices.find(
      (v) =>
        v.lang === utterance.lang ||
        v.lang.toLowerCase().startsWith(utterance.lang.substring(0, 2))
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    synth.speak(utterance);
  }

  /**
   * High-level speech method: tries server audio base64, otherwise falls back to browser synthesis
   */
  public static speakRemedy(
    scriptText: string,
    lang: SupportedLanguage,
    audioBase64?: string,
    onStart?: () => void,
    onEnd?: () => void,
    rate: number = 0.95
  ): void {
    if (audioBase64 && audioBase64.startsWith('data:audio')) {
      if (onStart) onStart();
      this.playAudioData(audioBase64, onEnd, rate);
    } else {
      this.speakBrowser(scriptText, lang, onStart, onEnd, rate);
    }
  }
}
