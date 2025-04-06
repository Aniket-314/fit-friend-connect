
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Search, User, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SuggestedUser {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  initials: string;
  fitnessInterests: string[];
  matchPercentage: number;
}

interface AddFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFriend: (userId: string) => void;
}

const AddFriendModal = ({ isOpen, onClose, onAddFriend }: AddFriendModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SuggestedUser[]>([]);
  
  // Suggested users (in a real app, these would come from an API)
  const suggestedUsers: SuggestedUser[] = [
    {
      id: '1',
      name: 'Alex Thompson',
      username: 'alex_fit',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      initials: 'AT',
      fitnessInterests: ['Running', 'Yoga'],
      matchPercentage: 87
    },
    {
      id: '2',
      name: 'Jamie Chen',
      username: 'j_chen_fitness',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      initials: 'JC',
      fitnessInterests: ['HIIT', 'Weight Training'],
      matchPercentage: 75
    },
    {
      id: '3',
      name: 'Sam Wilson',
      username: 'wilson_workout',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      initials: 'SW',
      fitnessInterests: ['CrossFit', 'Swimming'],
      matchPercentage: 63
    }
  ];
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API search
    setTimeout(() => {
      const filtered = suggestedUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(filtered);
      setIsSearching(false);
      
      if (filtered.length === 0) {
        toast.info("No users found matching your search");
      }
    }, 1000);
  };
  
  // Handle adding a friend
  const handleAddFriend = (userId: string) => {
    // In a real app, this would make an API call
    onAddFriend(userId);
    
    // Show success toast
    const user = [...suggestedUsers, ...searchResults].find(u => u.id === userId);
    if (user) {
      toast.success(`Friend request sent to ${user.name}`);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading gradient-text">Find Fitness Buddies</DialogTitle>
          <DialogDescription className="text-gray-400">
            Connect with friends to motivate each other and share your fitness journey.
          </DialogDescription>
        </DialogHeader>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="mt-4">
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by name or username" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
        </form>
        
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-4">
            <Label className="text-sm text-gray-400">Search Results</Label>
            <div className="space-y-3 mt-2">
              {searchResults.map(user => (
                <div 
                  key={user.id} 
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-800 hover:border-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-400">@{user.username}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddFriend(user.id)}
                    className="border-fitness-primary text-fitness-primary hover:bg-fitness-primary/10"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Suggested Friends */}
        <div className="mt-2">
          <Label className="text-sm text-gray-400">Suggested Buddies</Label>
          <div className="space-y-3 mt-2">
            {suggestedUsers.map(user => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-3 rounded-lg border border-gray-800 hover:border-gray-700"
              >
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{user.name}</p>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-fitness-primary/20 text-fitness-primary">
                        {user.matchPercentage}% Match
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {user.fitnessInterests.join(', ')}
                    </p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddFriend(user.id)}
                  className="border-fitness-primary text-fitness-primary hover:bg-fitness-primary/10"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
