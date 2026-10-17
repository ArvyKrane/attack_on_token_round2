import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface EmojiRainProps {
  active: boolean;
}

export default function EmojiRain({ active }: EmojiRainProps) {
  useEffect(() => {
    if (!active) return;

    const duration = 3500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60 + Math.random() * 60,
        spread: 60,
        origin: { x: Math.random(), y: 0 },
        colors: ['#39ff14', '#ff1493', '#ffffff'],
        scalar: 1.8,
        drift: 1,
        gravity: 0.8,
        ticks: 220,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [active]);

  return null;
}
