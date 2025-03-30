
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AudioContextType {
  playCorrect: () => void;
  playIncorrect: () => void;
  playSuccess: () => void;
  isMuted: boolean;
  toggleMute: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [correctSound, setCorrectSound] = useState<HTMLAudioElement | null>(null);
  const [incorrectSound, setIncorrectSound] = useState<HTMLAudioElement | null>(null);
  const [successSound, setSuccessSound] = useState<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    // Create audio elements
    const correct = new Audio('/correct.mp3');
    const incorrect = new Audio('/incorrect.mp3');
    const success = new Audio('/success.mp3');

    // Set volume
    correct.volume = 0.5;
    incorrect.volume = 0.5;
    success.volume = 0.5;

    // Store references
    setCorrectSound(correct);
    setIncorrectSound(incorrect);
    setSuccessSound(success);

    // Preload the sounds
    correct.load();
    incorrect.load();
    success.load();
    
    // Cleanup function to release audio resources
    return () => {
      if (correct) correct.pause();
      if (incorrect) incorrect.pause();
      if (success) success.pause();
    };
  }, []);

  const playCorrect = () => {
    if (correctSound && !isMuted) {
      correctSound.currentTime = 0;
      correctSound.play().catch(error => console.error("Error playing correct sound:", error));
    }
  };

  const playIncorrect = () => {
    if (incorrectSound && !isMuted) {
      incorrectSound.currentTime = 0;
      incorrectSound.play().catch(error => console.error("Error playing incorrect sound:", error));
    }
  };

  const playSuccess = () => {
    if (successSound && !isMuted) {
      successSound.currentTime = 0;
      successSound.play().catch(error => console.error("Error playing success sound:", error));
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <AudioContext.Provider value={{ playCorrect, playIncorrect, playSuccess, isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
