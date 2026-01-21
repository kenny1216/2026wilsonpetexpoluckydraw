
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Prize } from '../types';
import { PRIZES } from '../constants';

interface WheelProps {
  onResult: (prize: Prize) => void;
  isSpinning: boolean;
  setIsSpinning: (state: boolean) => void;
}

const Wheel: React.FC<WheelProps> = ({ onResult, isSpinning, setIsSpinning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;
    const totalPrizes = PRIZES.length;
    const sliceAngle = (2 * Math.PI) / totalPrizes;

    ctx.clearRect(0, 0, size, size);

    PRIZES.forEach((prize, i) => {
      const angle = i * sliceAngle + rotation;
      
      // Draw slice
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, angle, angle + sliceAngle);
      ctx.fillStyle = prize.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#fff';
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 16px Noto Sans TC';
      ctx.fillText(prize.label, radius - 40, 5);
      ctx.restore();
    });

    // Outer border
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#1e3a8a';
    ctx.stroke();

    // Center button
    ctx.beginPath();
    ctx.arc(center, center, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#1e3a8a';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Noto Sans TC';
    ctx.textAlign = 'center';
    ctx.fillText('Wilson', center, center + 7);
  }, [rotation]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Weighted random selection
    const rand = Math.random() * 100;
    let cumulativeProbability = 0;
    let selectedPrizeIndex = 0;

    for (let i = 0; i < PRIZES.length; i++) {
      cumulativeProbability += PRIZES[i].probability;
      if (rand <= cumulativeProbability) {
        selectedPrizeIndex = i;
        break;
      }
    }

    const selectedPrize = PRIZES[selectedPrizeIndex];
    const totalPrizes = PRIZES.length;
    const sliceAngle = 360 / totalPrizes;
    
    // We want the pointer (at top, -90 deg) to point to the winner
    // The canvas is drawn with 0 deg at 3 o'clock. 
    // To get the prize at 12 o'clock, we need to calculate target rotation.
    const extraRotations = 5 + Math.floor(Math.random() * 5); // 5-10 full spins
    const prizeCenterAngle = (selectedPrizeIndex * sliceAngle) + (sliceAngle / 2);
    // Final rotation calculation:
    // 270 degrees is the top position in canvas rotation system
    const targetRotationDegrees = (extraRotations * 360) + (270 - prizeCenterAngle);
    
    const startTime = performance.now();
    const duration = 4000; // 4 seconds

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: cubic-bezier(.13,.99,.3,.98) approx
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      
      const currentRotation = (targetRotationDegrees * easeOut(progress)) * (Math.PI / 180);
      setRotation(currentRotation);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsSpinning(false);
          onResult(selectedPrize);
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="canvas-container relative cursor-pointer" onClick={spin}>
        <div className="wheel-pointer shadow-lg"></div>
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={500} 
          className="max-w-full h-auto"
        />
      </div>
      
      <button
        onClick={spin}
        disabled={isSpinning}
        className={`mt-8 px-10 py-4 rounded-full text-white text-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-xl ${
          isSpinning ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-900 to-blue-700'
        }`}
      >
        {isSpinning ? '轉動中...' : '點擊抽獎'}
      </button>
    </div>
  );
};

export default Wheel;
