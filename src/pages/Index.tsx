
import { useState } from 'react';
import { CalendarDays, TrendingUp, Dumbbell, ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import WorkoutCard from '@/components/WorkoutCard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const recentWorkouts = [
    {
      title: "Morning Run",
      description: "Got an early start with a 5K run. Great weather today!",
      type: "Cardio",
      duration: "30 min",
      location: "Central Park",
      user: {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        initials: "JS"
      },
      likes: 12,
      comments: 3,
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Strength Training",
      description: "Focused on upper body today. Feeling stronger already!",
      type: "Strength",
      duration: "45 min",
      location: "Home Gym",
      user: {
        name: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        initials: "MJ"
      },
      likes: 8,
      comments: 2
    },
    {
      title: "Yoga Session",
      description: "Perfect way to end the day. Feeling relaxed and centered.",
      type: "Yoga",
      duration: "60 min",
      user: {
        name: "Lisa Wong",
        avatar: "https://randomuser.me/api/portraits/women/20.jpg",
        initials: "LW"
      },
      likes: 15,
      comments: 5,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="fitness-container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-fitness-primary to-fitness-accent rounded-xl p-6 text-white">
              <h1 className="text-2xl font-bold">Welcome to FitBuddy</h1>
              <p className="mt-2">Find workout partners, track your progress, and achieve your fitness goals together.</p>
              <div className="mt-4 flex space-x-3">
                <Button className="bg-white text-fitness-primary hover:bg-gray-100">
                  Find Buddies
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10">
                  Log Workout
                </Button>
              </div>
            </div>
            
            {/* Search and Tabs */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="relative mb-4">
                <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search workouts, buddies, or activities..." 
                  className="pl-10"
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full">
                  <TabsTrigger value="feed" className="flex-1">Activity Feed</TabsTrigger>
                  <TabsTrigger value="nearby" className="flex-1">Nearby Workouts</TabsTrigger>
                  <TabsTrigger value="buddies" className="flex-1">My Buddies</TabsTrigger>
                </TabsList>
                
                <TabsContent value="feed" className="mt-4 space-y-4">
                  {recentWorkouts.map((workout, index) => (
                    <WorkoutCard key={index} {...workout} />
                  ))}
                </TabsContent>
                
                <TabsContent value="nearby" className="mt-4">
                  <div className="text-center py-8">
                    <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">No Nearby Workouts</h3>
                    <p className="mt-1 text-gray-500">Enable location to find workouts near you</p>
                    <Button className="mt-4 bg-fitness-primary hover:bg-blue-700">
                      Enable Location
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="buddies" className="mt-4">
                  <div className="text-center py-8">
                    <Dumbbell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium">Connect with Buddies</h3>
                    <p className="mt-1 text-gray-500">Find workout partners with similar goals</p>
                    <Button className="mt-4 bg-fitness-primary hover:bg-blue-700">
                      Find Buddies
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <h2 className="text-lg font-semibold mb-3">Your Activity</h2>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Workouts</p>
                  <p className="text-xl font-bold text-fitness-primary">12</p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Hours</p>
                  <p className="text-xl font-bold text-fitness-success">8.5</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Buddies</p>
                  <p className="text-xl font-bold text-purple-600">5</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Weekly Goal Progress</span>
                  <span className="font-medium">3/5 workouts</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
            
            {/* Upcoming Workouts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Upcoming Workouts</h2>
                <Button variant="ghost" size="sm" className="text-fitness-primary flex items-center">
                  <span>All</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <CalendarDays className="h-10 w-10 text-fitness-primary mr-3" />
                  <div>
                    <h3 className="font-medium">HIIT Class</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tomorrow, 6:30 PM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">with Sarah Johnson</p>
                  </div>
                </div>
                
                <div className="flex p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                  <Dumbbell className="h-10 w-10 text-fitness-secondary mr-3" />
                  <div>
                    <h3 className="font-medium">Strength Training</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wed, 7:00 AM</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">with Tom Wilson</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-3 bg-fitness-primary hover:bg-blue-700">
                Schedule Workout
              </Button>
            </div>
            
            {/* Suggested Buddies */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Suggested Buddies</h2>
                <Button variant="ghost" size="sm" className="text-fitness-primary flex items-center">
                  <span>View All</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src="https://randomuser.me/api/portraits/men/42.jpg" 
                        alt="David Lee"
                        className="w-10 h-10 rounded-full avatar-circle"
                      />
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">David Lee</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Running, HIIT</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-fitness-primary border-fitness-primary">
                    Connect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <img 
                        src="https://randomuser.me/api/portraits/women/22.jpg" 
                        alt="Amy Chen"
                        className="w-10 h-10 rounded-full avatar-circle"
                      />
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-300 border-2 border-white"></span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Amy Chen</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Yoga, Pilates</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-fitness-primary border-fitness-primary">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
