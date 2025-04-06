
import { MapPin, Calendar, Activity, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface BuddyCardProps {
  name: string;
  avatar?: string;
  initials: string;
  location: string;
  fitnessLevel: string;
  availability: string;
  interests: string[];
  matchPercentage: number;
}

const BuddyCard = ({
  name,
  avatar,
  initials,
  location,
  fitnessLevel,
  availability,
  interests,
  matchPercentage,
}: BuddyCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-fitness-primary to-fitness-accent"></div>
      <CardContent className="pt-0 pb-3">
        <div className="flex justify-between -mt-12">
          <Avatar className="h-20 w-20 ring-4 ring-white dark:ring-gray-800">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>
          <div className="mt-12">
            <Badge variant="outline" className="bg-white/90 dark:bg-gray-800/90 font-bold">
              {matchPercentage}% Match
            </Badge>
          </div>
        </div>
        
        <div className="mt-3">
          <h3 className="text-xl font-semibold">{name}</h3>
          
          <div className="mt-2 space-y-2">
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
              {location}
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Activity className="h-4 w-4 mr-1 text-gray-400" />
              {fitnessLevel} Level
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="h-4 w-4 mr-1 text-gray-400" />
              Available: {availability}
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Interests:</p>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-3">
        <Button className="w-full bg-fitness-primary hover:bg-blue-700 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BuddyCard;
