
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";

interface ConfettiProps {
  show: boolean;
  count?: number;
  duration?: number;
  colors?: string[];
  grandFinale?: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({
  show,
  count = 100,
  duration = 3000,
  colors = ['#8B5CF6', '#D946EF', '#0EA5E9', '#F97316', '#22C55E'],
  grandFinale = false,
}) => {
  const [pieces, setPieces] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (!show) {
      setPieces([]);
      return;
    }

    const actualCount = grandFinale ? count * 3 : count;
    const newPieces = [];

    for (let i = 0; i < actualCount; i++) {
      // Calculate random starting position for explosion effect
      // Start from center of screen
      const angle = Math.random() * Math.PI * 2; // Random angle in radians
      const distance = Math.random() * 50; // Random starting distance
      
      // Calculate position using trigonometry for radial explosion
      const startLeft = 50 + Math.cos(angle) * distance; // 50% is center of screen
      const startTop = 50 + Math.sin(angle) * distance;
      
      // Calculate end position - farther from center
      const endDistance = 50 + Math.random() * 40; // Explode outward
      const endLeft = 50 + Math.cos(angle) * endDistance;
      const endTop = 50 + Math.sin(angle) * endDistance;
      
      const style = {
        left: `${startLeft}%`,
        top: `${startTop}%`,
        '--end-left': `${endLeft}%`,
        '--end-top': `${endTop}%`,
        transform: `scale(${Math.random() * 0.6 + 0.4})`,
        '--confetti-color': colors[Math.floor(Math.random() * colors.length)],
      } as React.CSSProperties;

      const sizeMultiplier = grandFinale ? (Math.random() * 0.8 + 0.8) : (Math.random() * 0.5 + 0.5);
      const width = 10 * sizeMultiplier;
      const height = 10 * sizeMultiplier;
      
      // Different confetti shapes
      const shapeType = Math.floor(Math.random() * 3);
      let className = "confetti-explosion animate-confetti-explosion";
      
      if (shapeType === 0) {
        // Square (default)
        style.width = `${width}px`;
        style.height = `${height}px`;
      } else if (shapeType === 1) {
        // Circle
        style.width = `${width}px`;
        style.height = `${height}px`;
        style.borderRadius = '50%';
      } else {
        // Rectangle
        style.width = `${width * 0.5}px`;
        style.height = `${height * 2}px`;
      }

      // Randomize animation duration slightly for more natural effect
      const animationDuration = (Math.random() * 0.5 + 0.7) * (grandFinale ? 1.5 : 1);
      style.animationDuration = `${animationDuration}s`;
      
      // Add delay for staggered effect
      style.animationDelay = `${Math.random() * 0.2}s`;

      newPieces.push(
        <div
          key={i}
          className={cn(className)}
          style={style}
        />
      );
    }

    setPieces(newPieces);

    // Clean up confetti after animation completes
    const timer = setTimeout(() => {
      setPieces([]);
    }, duration + 1000); // adding 1s buffer

    return () => clearTimeout(timer);
  }, [show, count, colors, duration, grandFinale]);

  if (!show && pieces.length === 0) return null;

  return <div className="confetti-container">{pieces}</div>;
};

export default Confetti;
