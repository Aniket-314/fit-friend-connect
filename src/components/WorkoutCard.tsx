
import { Clock, MapPin, User, Heart, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface WorkoutCardProps {
  title: string;
  description: string;
  type: string;
  duration: string;
  location?: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  likes: number;
  comments: number;
  image?: string;
}

const WorkoutCard = ({
  title,
  description,
  type,
  duration,
  location,
  user,
  likes,
  comments,
  image,
}: WorkoutCardProps) => {
  return (
    <div className="workout-card bg-white dark:bg-gray-800 mb-4 animate-fade-in">
      <div className="flex items-start">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{user.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
      
      <div className="mt-3">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
        
        {image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img src={image} alt={title} className="w-full h-auto object-cover" />
          </div>
        )}
        
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            {type}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {duration}
          </Badge>
          {location && (
            <Badge variant="outline" className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {location}
            </Badge>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center text-gray-500 hover:text-fitness-primary">
              <Heart className="h-4 w-4 mr-1" />
              <span>{likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center text-gray-500 hover:text-fitness-primary">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span>{comments}</span>
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="text-fitness-primary border-fitness-primary hover:bg-fitness-primary hover:text-white">
            <User className="h-4 w-4 mr-1" />
            Join
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
