
import { useState } from 'react';
import { UserPlus, Users, Search, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import FriendsCarousel, { Friend } from '@/components/FriendsCarousel';
import AddFriendModal from '@/components/AddFriendModal';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

const Buddies = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [addFriendModalOpen, setAddFriendModalOpen] = useState(false);
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState<string>('');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  
  // Sample friends data
  const [friends, setFriends] = useState<Friend[]>([
    {
      id: '1',
      name: 'Marcus Lee',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      initials: 'ML',
      location: 'New York, NY',
      fitnessLevel: 'Intermediate',
      availability: 'Weekday Evenings',
      interests: ['Running', 'HIIT', 'Yoga'],
      matchPercentage: 92,
      online: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      initials: 'SJ',
      location: 'Chicago, IL',
      fitnessLevel: 'Advanced',
      availability: 'Weekends',
      interests: ['Weight Training', 'Rock Climbing', 'Martial Arts'],
      matchPercentage: 85,
      online: false
    },
    {
      id: '3',
      name: 'Devon Williams',
      avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
      initials: 'DW',
      location: 'Austin, TX',
      fitnessLevel: 'Beginner',
      availability: 'Morning',
      interests: ['Running', 'Cycling'],
      matchPercentage: 78,
      online: true
    }
  ]);
  
  // Available challenge types
  const challengeTypes = [
    'Complete 5 workouts this week',
    'Run a total of 10km',
    'Burn 1000 calories',
    'Do 100 push-ups',
    'Meditate for 20 minutes daily',
    'Walk 50,000 steps'
  ];
  
  // Handle adding a friend
  const handleAddFriend = (friendId: string) => {
    toast.success('Friend request sent!');
    setAddFriendModalOpen(false);
  };
  
  // Handle challenging a friend
  const handleChallengeFriend = (friendId: string) => {
    setSelectedFriendId(friendId);
    setChallengeModalOpen(true);
  };
  
  // Submit challenge
  const submitChallenge = () => {
    if (!selectedChallenge) {
      toast.error('Please select a challenge');
      return;
    }
    
    const friend = friends.find(f => f.id === selectedFriendId);
    
    toast.success(`Challenge sent to ${friend?.name}!`);
    setChallengeModalOpen(false);
    setSelectedChallenge('');
  };
  
  // Filter friends based on search
  const filteredFriends = searchQuery.trim() === '' 
    ? friends 
    : friends.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.interests.some(interest => 
          interest.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
  
  return (
    <div className="min-h-screen bg-fitness-dark">
      <Header />
      
      <main className="fitness-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white">
              Fitness <span className="gradient-text">Buddies</span>
            </h1>
            <p className="text-gray-300">
              Connect, challenge, and grow with your fitness community
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button 
              className="bg-fitness-primary hover:bg-[#00afd6]"
              onClick={() => setAddFriendModalOpen(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Buddy
            </Button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search buddies by name or interest..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="friends" className="flex-1">
              <Users className="h-4 w-4 mr-2" />
              My Buddies
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex-1">
              <Trophy className="h-4 w-4 mr-2" />
              Challenges
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="friends" className="mt-6">
            {filteredFriends.length > 0 ? (
              <FriendsCarousel 
                friends={filteredFriends}
                onAddFriend={() => setAddFriendModalOpen(true)}
                onChallengeFriend={handleChallengeFriend}
              />
            ) : (
              <div className="text-center py-12">
                <Users className="mx-auto h-16 w-16 text-gray-600" />
                <h3 className="mt-4 text-xl font-medium">
                  {searchQuery ? 'No buddies found' : 'No buddies yet'}
                </h3>
                <p className="mt-2 text-gray-400 max-w-md mx-auto">
                  {searchQuery 
                    ? `Try a different search term or clear your search.`
                    : `Connect with other fitness enthusiasts to stay motivated and share your journey.`
                  }
                </p>
                <Button 
                  className="mt-6 bg-fitness-primary hover:bg-[#00afd6]"
                  onClick={() => {
                    setSearchQuery('');
                    setAddFriendModalOpen(true);
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Find Buddies
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="challenges" className="mt-6">
            <div className="text-center py-12">
              <Trophy className="mx-auto h-16 w-16 text-yellow-500 opacity-60" />
              <h3 className="mt-4 text-xl font-medium">Coming Soon!</h3>
              <p className="mt-2 text-gray-400 max-w-md mx-auto">
                Challenge your buddies to fitness goals and track your progress together.
                This feature is currently under development.
              </p>
              <Button 
                className="mt-6 bg-fitness-primary hover:bg-[#00afd6]"
                onClick={() => setActiveTab('friends')}
              >
                Return to Buddies
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Add Friend Modal */}
      <AddFriendModal 
        isOpen={addFriendModalOpen}
        onClose={() => setAddFriendModalOpen(false)}
        onAddFriend={handleAddFriend}
      />
      
      {/* Challenge Friend Modal */}
      <Dialog open={challengeModalOpen} onOpenChange={setChallengeModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Send Challenge</DialogTitle>
            <DialogDescription className="text-gray-400">
              Challenge your buddy to complete a fitness goal.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 my-2">
            <p className="text-sm text-gray-300">Select a challenge to send:</p>
            
            <div className="space-y-2">
              {challengeTypes.map((challenge, index) => (
                <div 
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedChallenge === challenge 
                      ? 'border-fitness-primary bg-fitness-primary/10' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                  onClick={() => setSelectedChallenge(challenge)}
                >
                  <p className="font-medium">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 justify-end">
            <Button variant="ghost" onClick={() => setChallengeModalOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-fitness-primary hover:bg-[#00afd6]"
              onClick={submitChallenge}
            >
              <Trophy className="mr-2 h-4 w-4" />
              Send Challenge
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Buddies;
