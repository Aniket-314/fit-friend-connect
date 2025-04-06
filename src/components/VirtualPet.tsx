
import { useState, useEffect } from 'react';

interface VirtualPetProps {
  workoutCount: number;
  isAnimating?: boolean;
}

const VirtualPet = ({ workoutCount, isAnimating = false }: VirtualPetProps) => {
  const [mood, setMood] = useState<'sad' | 'neutral' | 'happy'>('neutral');
  const [energy, setEnergy] = useState(50);
  
  // Calculate pet state based on workout count
  useEffect(() => {
    if (workoutCount <= 2) {
      setMood('sad');
      setEnergy(Math.max(20, workoutCount * 10));
    } else if (workoutCount <= 5) {
      setMood('neutral');
      setEnergy(Math.min(50 + (workoutCount * 5), 80));
    } else {
      setMood('happy');
      setEnergy(Math.min(70 + (workoutCount * 3), 100));
    }
  }, [workoutCount]);
  
  // Determine which fox image to show based on mood
  const getFoxImage = () => {
    switch(mood) {
      case 'sad':
        return "/sad-fox.png"; // You'll need to add these images
      case 'happy':
        return "/happy-fox.png";
      default:
        return "/neutral-fox.png";
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${isAnimating ? 'animate-float' : ''}`}>
        {/* For now we'll use a placeholder since we don't have the actual images */}
        <div className="w-20 h-20 rounded-full bg-orange-400 flex items-center justify-center overflow-hidden">
          <span className="text-2xl">🦊</span>
        </div>
        
        {/* Energy indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-700 rounded-full">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
            style={{ width: `${energy}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm font-medium gradient-text">
          {mood === 'happy' 
            ? 'Your fox is thriving!' 
            : mood === 'neutral' 
              ? 'Your fox is doing okay' 
              : 'Your fox needs exercise!'}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          {`Energy: ${energy}%`}
        </p>
      </div>
    </div>
  );
};

export default VirtualPet;
