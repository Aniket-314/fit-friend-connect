
import { useState, useEffect } from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  animationDuration?: number;
  primaryColor?: string;
  secondaryColor?: string;
  label?: string;
  showPercentage?: boolean;
}

const CircularProgress = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  animationDuration = 1000,
  primaryColor = '#00D4FF',
  secondaryColor = '#FF007A',
  label,
  showPercentage = true,
}: CircularProgressProps) => {
  const [progress, setProgress] = useState(0);
  
  // Animation effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [percentage]);
  
  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg]"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="#2A2A2A"
          fill="none"
        />
        
        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={secondaryColor} />
          </linearGradient>
        </defs>
        
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="url(#progressGradient)"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: `stroke-dashoffset ${animationDuration}ms ease-in-out`,
          }}
          className="drop-shadow-[0_0_4px_rgba(0,212,255,0.7)]"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        {showPercentage && (
          <span className="text-xl font-bold">{Math.round(progress)}%</span>
        )}
        {label && <span className="text-xs mt-1 text-gray-300">{label}</span>}
      </div>
    </div>
  );
};

export default CircularProgress;
