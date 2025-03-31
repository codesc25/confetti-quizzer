
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
    correct.volume = 0.7; // Increased volume
    incorrect.volume = 0.7; // Increased volume
    success.volume = 0.7; // Increased volume

    // Store references
    setCorrectSound(correct);
    setIncorrectSound(incorrect);
    setSuccessSound(success);

    // Preload the sounds
    const preloadSounds = async () => {
      try {
        await correct.load();
        await incorrect.load();
        await success.load();
        
        // Test that sounds loaded properly
        console.log("Sound files loaded successfully");
      } catch (error) {
        console.error("Error loading sound files:", error);
      }
    };
    
    preloadSounds();
    
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
      console.log("Playing correct sound");
      correctSound.play().catch(error => console.error("Error playing correct sound:", error));
    }
  };

  const playIncorrect = () => {
    if (incorrectSound && !isMuted) {
      incorrectSound.currentTime = 0;
      console.log("Playing incorrect sound");
      incorrectSound.play().catch(error => console.error("Error playing incorrect sound:", error));
    }
  };

  const playSuccess = () => {
    if (successSound && !isMuted) {
      successSound.currentTime = 0;
      console.log("Playing success sound");
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
