
import { useState } from 'react';
import { Plus, Filter, Calendar, ArrowRight, Dumbbell, Clock, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';

const Workouts = () => {
  const [activeTab, setActiveTab] = useState('my-workouts');
  
  const myWorkouts = [
    {
      id: 1,
      title: "Morning Run",
      type: "Cardio",
      duration: "30 min",
      date: "2 days ago",
      calories: 320,
      completed: true,
      description: "A light morning run to start the day."
    },
    {
      id: 2,
      title: "Upper Body Strength",
      type: "Strength",
      duration: "45 min",
      date: "Yesterday",
      calories: 280,
      completed: true,
      description: "Focus on chest, shoulders, and triceps."
    },
    {
      id: 3,
      title: "Yoga Flow",
      type: "Flexibility",
      duration: "60 min",
      date: "Today",
      calories: 200,
      completed: false,
      description: "Vinyasa flow to improve flexibility and mindfulness."
    },
    {
      id: 4,
      title: "HIIT Cardio",
      type: "Cardio",
      duration: "25 min",
      date: "Tomorrow",
      calories: 350,
      completed: false,
      description: "High-intensity interval training for maximum calorie burn."
    }
  ];
  
  const recommendedWorkouts = [
    {
      id: 1,
      title: "5K Run",
      type: "Cardio",
      level: "Intermediate",
      duration: "30 min",
      calories: 350,
      image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      title: "Full Body HIIT",
      type: "HIIT",
      level: "Advanced",
      duration: "45 min",
      calories: 450,
      image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 3,
      title: "Yoga for Beginners",
      type: "Yoga",
      level: "Beginner",
      duration: "30 min",
      calories: 150,
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 4,
      title: "Strength Training",
      type: "Strength",
      level: "Intermediate",
      duration: "50 min",
      calories: 380,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 5,
      title: "Core Workout",
      type: "Strength",
      level: "Beginner",
      duration: "20 min",
      calories: 220,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 6,
      title: "Cycling Endurance",
      type: "Cardio",
      level: "Advanced",
      duration: "60 min",
      calories: 520,
      image: "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="fitness-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Workouts</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your workouts and discover new exercises
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button className="flex items-center bg-fitness-primary hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Log Workout
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="my-workouts" className="flex-1">
              My Workouts
            </TabsTrigger>
            <TabsTrigger value="recommended" className="flex-1">
              Recommended Workouts
            </TabsTrigger>
            <TabsTrigger value="explore" className="flex-1">
              Explore
            </TabsTrigger>
          </TabsList>
          
          {/* My Workouts Tab */}
          <TabsContent value="my-workouts" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold text-white">This Week</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">4</div>
                  <div className="text-sm opacity-90">Workouts Completed</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold text-white">Total Time</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">5.2h</div>
                  <div className="text-sm opacity-90">This Week</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold text-white">Calories</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,450</div>
                  <div className="text-sm opacity-90">Calories Burned</div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold text-white">Streak</h3>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">6</div>
                  <div className="text-sm opacity-90">Days in a Row</div>
                </CardContent>
              </Card>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Recent & Upcoming Workouts</h2>
            
            <div className="space-y-4">
              {myWorkouts.map((workout) => (
                <div 
                  key={workout.id} 
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 ${
                    !workout.completed ? 'border-l-4 border-fitness-primary' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="mr-4">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
                          <Dumbbell className="h-5 w-5 text-fitness-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{workout.title}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                            {workout.type}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            {workout.duration}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {workout.calories} cal
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                          {workout.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        {workout.date}
                      </div>
                      {workout.completed ? (
                        <Badge variant="outline" className="border-green-500 text-green-600 dark:text-green-400">
                          Completed
                        </Badge>
                      ) : (
                        <Button size="sm" className="bg-fitness-primary hover:bg-blue-700">
                          {workout.date === "Today" ? "Start" : "View"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-center">
              <Button variant="ghost" className="text-fitness-primary flex items-center justify-center mx-auto">
                View All Workouts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          {/* Recommended Workouts Tab */}
          <TabsContent value="recommended" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedWorkouts.map((workout) => (
                <Card key={workout.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={workout.image} 
                      alt={workout.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                        {workout.type}
                      </Badge>
                      <Badge variant="outline">
                        {workout.level}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold">{workout.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {workout.duration}
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        {workout.calories} cal
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full bg-fitness-primary hover:bg-blue-700">
                      Start Workout
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Explore Tab */}
          <TabsContent value="explore" className="mt-6">
            <div className="text-center py-12">
              <Calendar className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-xl font-semibold">Coming Soon!</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                We're building a library of workouts from certified trainers. 
                Check back soon to explore new workout ideas!
              </p>
              <Button className="mt-6 bg-fitness-primary hover:bg-blue-700">
                Notify Me
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Workouts;
