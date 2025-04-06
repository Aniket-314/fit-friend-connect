
import { useState, useEffect } from 'react';
import { CalendarDays, TrendingUp, Dumbbell, ArrowRight, Bell, Plus, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import WorkoutCard from '@/components/WorkoutCard';
import CircularProgress from '@/components/CircularProgress';
import MotivationalQuote from '@/components/MotivationalQuote';
import FitPointsWidget from '@/components/FitPointsWidget';
import VirtualPet from '@/components/VirtualPet';
import WorkoutForm from '@/components/WorkoutForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [userStats, setUserStats] = useState({
    workoutCount: 12,
    totalHours: 8.5,
    buddyCount: 5,
    weeklyGoalProgress: 3,
    weeklyGoalTarget: 5,
    fitPoints: 230,
    level: 2,
    badges: ['First Mile', 'Early Bird', 'Consistent']
  });

  // Simulated user data
  const userName = 'Jessica';
  
  // Recent workouts data from existing component
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
  
  // Initialize workout state with the recentWorkouts data
  useEffect(() => {
    setWorkouts(recentWorkouts);
  }, []);
  
  // Handle submitting a new workout
  const handleLogWorkout = (workoutData: any) => {
    // Create a new workout with the form data
    const newWorkout = {
      title: workoutData.type,
      description: workoutData.notes || `Completed a ${workoutData.intensity} intensity workout.`,
      type: workoutData.type,
      duration: `${workoutData.duration} min`,
      user: {
        name: userName,
        initials: userName.charAt(0),
      },
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString(),
    };
    
    // Add the new workout to the beginning of the list
    setWorkouts(prev => [newWorkout, ...prev]);
    
    // Update user stats
    setUserStats(prev => ({
      ...prev,
      workoutCount: prev.workoutCount + 1,
      totalHours: prev.totalHours + (workoutData.duration / 60),
      weeklyGoalProgress: Math.min(prev.weeklyGoalProgress + 1, prev.weeklyGoalTarget),
      fitPoints: prev.fitPoints + 10
    }));
    
    // Close the modal
    setWorkoutModalOpen(false);
    
    // Show a success message
    toast.success('Workout logged successfully! +10 FitPoints');
  };
  
  return (
    <div className="min-h-screen bg-fitness-dark">
      <Header />
      
      <main className="fitness-container py-6">
        {/* Hero Section with Dashboard Stats */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-white">
                  Hey, <span className="gradient-text">{userName}!</span>
                </h1>
                <p className="mt-1 text-gray-300">Let's crush your fitness goals today</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button 
                  className="bg-fitness-primary hover:bg-[#00afd6] text-white"
                  onClick={() => setWorkoutModalOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Log Workout
                </Button>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Goal Progress */}
              <div className="col-span-2 md:col-span-1 flex flex-col items-center">
                <CircularProgress 
                  percentage={(userStats.weeklyGoalProgress / userStats.weeklyGoalTarget) * 100}
                  label="Weekly Goal"
                />
                <p className="mt-2 text-sm text-center text-gray-300">
                  {userStats.weeklyGoalProgress}/{userStats.weeklyGoalTarget} workouts
                </p>
              </div>
              
              {/* Stats Grid */}
              <div className="col-span-2 md:col-span-3 grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-gray-800/50 text-center">
                  <p className="text-xs text-gray-400">Workouts</p>
                  <p className="text-xl font-bold text-fitness-primary">{userStats.workoutCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-800/50 text-center">
                  <p className="text-xs text-gray-400">Hours</p>
                  <p className="text-xl font-bold text-fitness-secondary">{userStats.totalHours.toFixed(1)}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-800/50 text-center">
                  <p className="text-xs text-gray-400">Buddies</p>
                  <p className="text-xl font-bold text-fitness-accent">{userStats.buddyCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Quote */}
            <MotivationalQuote />
            
            {/* Activity Feed */}
            <div className="bg-gray-900 rounded-xl shadow-lg overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full bg-gray-800/50">
                  <TabsTrigger value="feed" className="flex-1">Activity Feed</TabsTrigger>
                  <TabsTrigger value="my-workouts" className="flex-1">My Workouts</TabsTrigger>
                  <TabsTrigger value="buddies" className="flex-1">My Buddies</TabsTrigger>
                </TabsList>
                
                <div className="p-4">
                  <TabsContent value="feed" className="mt-0 space-y-4">
                    {workouts.map((workout, index) => (
                      <WorkoutCard key={index} {...workout} />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="my-workouts" className="mt-0">
                    {workouts.filter(w => w.user.name === userName).length > 0 ? (
                      <div className="space-y-4">
                        {workouts.filter(w => w.user.name === userName).map((workout, index) => (
                          <WorkoutCard key={index} {...workout} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Dumbbell className="mx-auto h-12 w-12 text-gray-600" />
                        <h3 className="mt-2 text-lg font-medium">No Workouts Yet</h3>
                        <p className="mt-1 text-gray-500">Log your first workout to see it here</p>
                        <Button 
                          className="mt-4 bg-fitness-primary hover:bg-[#00afd6]"
                          onClick={() => setWorkoutModalOpen(true)}
                        >
                          Log Workout
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="buddies" className="mt-0">
                    <div className="text-center py-8">
                      <User className="mx-auto h-12 w-12 text-gray-600" />
                      <h3 className="mt-2 text-lg font-medium">Connect with Buddies</h3>
                      <p className="mt-1 text-gray-500">Find workout partners with similar goals</p>
                      <Button 
                        className="mt-4 bg-fitness-primary hover:bg-[#00afd6]"
                        onClick={() => window.location.href = '/buddies'}
                      >
                        Find Buddies
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* FitPoints Widget */}
            <FitPointsWidget 
              points={userStats.fitPoints} 
              level={userStats.level} 
              badges={userStats.badges} 
            />
            
            {/* Virtual Pet */}
            <div className="bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-800">
              <h2 className="text-lg font-semibold mb-3">Your Fitness Buddy</h2>
              <VirtualPet workoutCount={userStats.workoutCount} isAnimating={true} />
            </div>
            
            {/* Upcoming Workouts */}
            <div className="bg-gray-900 rounded-xl shadow-lg p-4 border border-gray-800">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold">Upcoming Workouts</h2>
                <Button variant="ghost" size="sm" className="text-fitness-primary flex items-center">
                  <span>All</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex p-3 rounded-lg border border-gray-800 hover:border-gray-700">
                  <CalendarDays className="h-10 w-10 text-fitness-primary mr-3" />
                  <div>
                    <h3 className="font-medium">HIIT Class</h3>
                    <p className="text-sm text-gray-400">Tomorrow, 6:30 PM</p>
                    <p className="text-sm text-gray-400">with Sarah Johnson</p>
                  </div>
                </div>
                
                <div className="flex p-3 rounded-lg border border-gray-800 hover:border-gray-700">
                  <Dumbbell className="h-10 w-10 text-fitness-secondary mr-3" />
                  <div>
                    <h3 className="font-medium">Strength Training</h3>
                    <p className="text-sm text-gray-400">Wed, 7:00 AM</p>
                    <p className="text-sm text-gray-400">with Tom Wilson</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-3 bg-fitness-primary hover:bg-[#00afd6]">
                Schedule Workout
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Log Workout Modal */}
      <Dialog open={workoutModalOpen} onOpenChange={setWorkoutModalOpen}>
        <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Log Your Workout</DialogTitle>
          </DialogHeader>
          <WorkoutForm onSubmit={handleLogWorkout} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
