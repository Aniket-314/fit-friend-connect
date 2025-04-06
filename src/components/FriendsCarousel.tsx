
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import BuddyCard from './BuddyCard';

export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  location: string;
  fitnessLevel: string;
  availability: string;
  interests: string[];
  matchPercentage: number;
  online?: boolean;
}

interface FriendsCarouselProps {
  friends: Friend[];
  onAddFriend: () => void;
  onChallengeFriend: (friendId: string) => void;
}

const FriendsCarousel = ({ friends, onAddFriend, onChallengeFriend }: FriendsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Handle previous/next navigation
  const goToPrevious = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? friends.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === friends.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  // Handle touch/mouse events for swiping
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setCurrentX(clientX);
  };
  
  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setCurrentX(clientX);
    
    // Optional: Add visual feedback during drag
  };
  
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const threshold = 50; // Minimum drag distance to trigger a slide
    const deltaX = currentX - startX;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }
    
    setIsDragging(false);
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Get position class based on index
  const getItemClass = (index: number) => {
    if (index === activeIndex) return 'carousel-3d-item-active';
    if (index === (activeIndex - 1 + friends.length) % friends.length) return 'carousel-3d-item-prev';
    if (index === (activeIndex + 1) % friends.length) return 'carousel-3d-item-next';
    return 'opacity-0';
  };
  
  return (
    <div className="w-full py-4">
      {friends.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">No Buddies Yet</h3>
          <p className="text-gray-400 mb-4">
            Connect with fitness enthusiasts to stay motivated
          </p>
          <Button onClick={onAddFriend} className="fitness-button">
            <UserPlus className="mr-2 h-4 w-4" />
            Find Buddies
          </Button>
        </div>
      ) : (
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/70 hover:bg-gray-700 p-2 rounded-full"
            aria-label="Previous friend"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-800/70 hover:bg-gray-700 p-2 rounded-full"
            aria-label="Next friend"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Carousel Container */}
          <div 
            ref={containerRef}
            className="carousel-3d-perspective w-full flex justify-center items-center h-[520px] overflow-hidden"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            {friends.map((friend, index) => (
              <div
                key={friend.id}
                className={`carousel-3d-item absolute w-full max-w-md ${getItemClass(index)}`}
                style={{
                  zIndex: index === activeIndex ? 10 : 0,
                }}
              >
                <BuddyCard
                  name={friend.name}
                  avatar={friend.avatar}
                  initials={friend.initials}
                  location={friend.location}
                  fitnessLevel={friend.fitnessLevel}
                  availability={friend.availability}
                  interests={friend.interests}
                  matchPercentage={friend.matchPercentage}
                />
                
                {/* Challenge Button */}
                <div className="mt-4 flex justify-center">
                  <Button 
                    onClick={() => onChallengeFriend(friend.id)}
                    className="bg-gradient-to-r from-fitness-secondary to-fitness-accent hover:opacity-90 text-white"
                  >
                    Challenge Friend
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {friends.map((_, index) => (
              <button
                key={index}
                className={`h-2.5 w-2.5 rounded-full ${
                  index === activeIndex ? 'bg-fitness-primary' : 'bg-gray-600'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsCarousel;
