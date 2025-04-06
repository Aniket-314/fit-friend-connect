
import { useState } from 'react';
import { Search, Filter, MapPin, Activity, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import BuddyCard from '@/components/BuddyCard';

const Buddies = () => {
  const [distance, setDistance] = useState([25]);
  const [showFilters, setShowFilters] = useState(false);
  
  const buddies = [
    {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      initials: "AJ",
      location: "New York City",
      fitnessLevel: "Intermediate",
      availability: "Weekday Evenings",
      interests: ["Running", "HIIT", "Strength"],
      matchPercentage: 92
    },
    {
      name: "Sarah Martinez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      initials: "SM",
      location: "Brooklyn, NY",
      fitnessLevel: "Advanced",
      availability: "Mornings & Weekends",
      interests: ["CrossFit", "Running", "Yoga"],
      matchPercentage: 85
    },
    {
      name: "Jason Lee",
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      initials: "JL",
      location: "Jersey City",
      fitnessLevel: "Beginner",
      availability: "Flexible",
      interests: ["Weight Training", "Cycling"],
      matchPercentage: 78
    },
    {
      name: "Emily Wilson",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      initials: "EW",
      location: "Manhattan",
      fitnessLevel: "Intermediate",
      availability: "Weekend Mornings",
      interests: ["Yoga", "Pilates", "Swimming"],
      matchPercentage: 75
    },
    {
      name: "Michael Davis",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      initials: "MD",
      location: "Queens, NY",
      fitnessLevel: "Advanced",
      availability: "Early Mornings",
      interests: ["Marathon Training", "Triathlons"],
      matchPercentage: 70
    },
    {
      name: "Jessica Kim",
      avatar: "https://randomuser.me/api/portraits/women/54.jpg",
      initials: "JK",
      location: "Hoboken, NJ",
      fitnessLevel: "Intermediate",
      availability: "Weeknights",
      interests: ["Boxing", "HIIT", "Dance"],
      matchPercentage: 68
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="fitness-container py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-4">Find Fitness Buddies</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect with people who share similar fitness goals and schedules.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by name, interests, or location..." 
                className="pl-10"
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button className="bg-fitness-primary hover:bg-blue-700">
              Search
            </Button>
          </div>
          
          {showFilters && (
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              <div>
                <Label className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  Distance
                </Label>
                <div className="mt-2">
                  <Slider 
                    value={distance} 
                    onValueChange={setDistance} 
                    max={100} 
                    step={1}
                  />
                  <div className="flex justify-between mt-1 text-sm text-gray-500">
                    <span>1 mile</span>
                    <span>{distance[0]} miles</span>
                    <span>100 miles</span>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-gray-500" />
                  Fitness Level
                </Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="beginner" />
                    <label htmlFor="beginner" className="text-sm">Beginner</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="intermediate" defaultChecked />
                    <label htmlFor="intermediate" className="text-sm">Intermediate</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="advanced" />
                    <label htmlFor="advanced" className="text-sm">Advanced</label>
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  Availability
                </Label>
                <div className="mt-2">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="any">Any time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mt-3">
                  <Label className="mb-2">Interests</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="strength">Strength Training</SelectItem>
                      <SelectItem value="yoga">Yoga</SelectItem>
                      <SelectItem value="cycling">Cycling</SelectItem>
                      <SelectItem value="hiit">HIIT</SelectItem>
                      <SelectItem value="swimming">Swimming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buddies.map((buddy, index) => (
            <BuddyCard key={index} {...buddy} />
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="text-fitness-primary border-fitness-primary">
            Load More
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Buddies;
