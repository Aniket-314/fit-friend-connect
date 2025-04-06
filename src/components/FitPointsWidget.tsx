
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Award, ChevronRight } from 'lucide-react';

interface FitPointsWidgetProps {
  points: number;
  level: number;
  badges: string[];
}

const FitPointsWidget = ({ points, level, badges }: FitPointsWidgetProps) => {
  const [animatePoints, setAnimatePoints] = useState(false);
  
  // Trigger animation when points change
  useEffect(() => {
    setAnimatePoints(true);
    const timer = setTimeout(() => setAnimatePoints(false), 1000);
    return () => clearTimeout(timer);
  }, [points]);
  
  // Calculate progress to next level (assumes 100 points per level)
  const nextLevelPoints = (level + 1) * 100;
  const progress = Math.min(100, (points % 100));
  
  return (
    <Card className="neon-border overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#1A1A1A] to-[#262626] pb-1">
        <CardTitle className="flex items-center text-lg">
          <Star className="h-5 w-5 mr-2 text-yellow-400" />
          FitPoints
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Current Points</p>
            <p className={`text-2xl font-bold gradient-text ${animatePoints ? 'scale-110 transition-transform' : ''}`}>
              {points}
            </p>
          </div>
          
          <div className="h-16 w-16 rounded-full flex items-center justify-center bg-gray-800 border-2 border-fitness-primary">
            <div className="text-center">
              <p className="text-lg font-bold text-fitness-primary">Lvl</p>
              <p className="text-xl font-bold">{level}</p>
            </div>
          </div>
        </div>
        
        {/* Progress to next level */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Level Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 text-right">
            {points % 100} / 100 to Level {level + 1}
          </p>
        </div>
        
        {/* Badges */}
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Recent Badges</p>
          <div className="flex justify-between">
            {badges.length > 0 ? (
              <div className="flex space-x-1">
                {badges.slice(0, 3).map((badge, index) => (
                  <div 
                    key={index}
                    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center"
                    title={badge}
                  >
                    <Award className="h-6 w-6 text-yellow-400" />
                  </div>
                ))}
                {badges.length > 3 && (
                  <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                    +{badges.length - 3}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No badges yet</p>
            )}
            
            <Button variant="ghost" size="sm" className="text-fitness-primary">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FitPointsWidget;
