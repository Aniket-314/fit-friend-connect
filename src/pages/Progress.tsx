
import { useState } from 'react';
import { BarChart3, LineChart, Camera, Calendar, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import ProgressChart from '@/components/ProgressChart';

const Progress = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Sample data for charts
  const weightData = [
    { date: 'Jan 1', value: 185 },
    { date: 'Jan 8', value: 184 },
    { date: 'Jan 15', value: 182 },
    { date: 'Jan 22', value: 183 },
    { date: 'Jan 29', value: 181 },
    { date: 'Feb 5', value: 180 },
    { date: 'Feb 12', value: 179 },
    { date: 'Feb 19', value: 178 },
    { date: 'Feb 26', value: 176 },
    { date: 'Mar 5', value: 175 },
    { date: 'Mar 12', value: 174 },
  ];
  
  const workoutData = [
    { date: 'Jan 1', value: 2 },
    { date: 'Jan 8', value: 3 },
    { date: 'Jan 15', value: 2 },
    { date: 'Jan 22', value: 4 },
    { date: 'Jan 29', value: 3 },
    { date: 'Feb 5', value: 5 },
    { date: 'Feb 12', value: 4 },
    { date: 'Feb 19', value: 6 },
    { date: 'Feb 26', value: 5 },
    { date: 'Mar 5', value: 7 },
    { date: 'Mar 12', value: 6 },
  ];
  
  const caloriesData = [
    { date: 'Jan 1', value: 320 },
    { date: 'Jan 8', value: 400 },
    { date: 'Jan 15', value: 350 },
    { date: 'Jan 22', value: 450 },
    { date: 'Jan 29', value: 420 },
    { date: 'Feb 5', value: 480 },
    { date: 'Feb 12', value: 520 },
    { date: 'Feb 19', value: 550 },
    { date: 'Feb 26', value: 600 },
    { date: 'Mar 5', value: 650 },
    { date: 'Mar 12', value: 670 },
  ];
  
  const strengthData = [
    { date: 'Jan 1', value: 120 },
    { date: 'Jan 15', value: 125 },
    { date: 'Feb 1', value: 130 },
    { date: 'Feb 15', value: 140 },
    { date: 'Mar 1', value: 145 },
    { date: 'Mar 15', value: 155 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="fitness-container py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Progress Tracking</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor your fitness journey and achievements
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button variant="outline" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button className="flex items-center bg-fitness-primary hover:bg-blue-700">
              <Camera className="mr-2 h-4 w-4" />
              Add Progress Photo
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Weight
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <BarChart3 className="h-4 w-4 text-fitness-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">175 lbs</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="text-green-500 dark:text-green-400 font-medium flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  -10 lbs
                </span>
                <span> since Jan 1</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Weekly Workouts
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="text-green-500 dark:text-green-400 font-medium flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +2
                </span>
                <span> vs. last week</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Calories Burned
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <LineChart className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">670 cal</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="text-green-500 dark:text-green-400 font-medium flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +350
                </span>
                <span> since starting</span>
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Goal Progress
              </CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Target className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67%</div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                <div className="h-2 bg-purple-600 rounded-full" style={{ width: '67%' }}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Weight loss goal: 15 lbs
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">
              Overview
            </TabsTrigger>
            <TabsTrigger value="measurements" className="flex-1">
              Measurements
            </TabsTrigger>
            <TabsTrigger value="photos" className="flex-1">
              Progress Photos
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex-1">
              Achievements
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProgressChart 
                title="Weight Tracking" 
                data={weightData} 
                unit="lbs" 
                color="#3182CE"
              />
              
              <ProgressChart 
                title="Workouts Per Week" 
                data={workoutData} 
                unit="" 
                color="#38B2AC"
              />
              
              <ProgressChart 
                title="Calories Burned" 
                data={caloriesData} 
                unit="cal" 
                color="#ED8936"
              />
              
              <ProgressChart 
                title="Strength (Bench Press)" 
                data={strengthData} 
                unit="lbs" 
                color="#9F7AEA"
              />
            </div>
          </TabsContent>
          
          {/* Measurements Tab */}
          <TabsContent value="measurements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Body Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium text-gray-500 dark:text-gray-400 pb-3">Measurement</th>
                        <th className="text-left font-medium text-gray-500 dark:text-gray-400 pb-3">Starting</th>
                        <th className="text-left font-medium text-gray-500 dark:text-gray-400 pb-3">Current</th>
                        <th className="text-left font-medium text-gray-500 dark:text-gray-400 pb-3">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Weight</td>
                        <td>185 lbs</td>
                        <td>175 lbs</td>
                        <td className="text-green-600 dark:text-green-400">-10 lbs</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Body Fat %</td>
                        <td>24%</td>
                        <td>19%</td>
                        <td className="text-green-600 dark:text-green-400">-5%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Chest</td>
                        <td>42 in</td>
                        <td>41 in</td>
                        <td className="text-green-600 dark:text-green-400">-1 in</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Waist</td>
                        <td>36 in</td>
                        <td>33 in</td>
                        <td className="text-green-600 dark:text-green-400">-3 in</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Hips</td>
                        <td>40 in</td>
                        <td>38 in</td>
                        <td className="text-green-600 dark:text-green-400">-2 in</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Biceps</td>
                        <td>14 in</td>
                        <td>15 in</td>
                        <td className="text-green-600 dark:text-green-400">+1 in</td>
                      </tr>
                      <tr>
                        <td className="py-3">Thighs</td>
                        <td>24 in</td>
                        <td>23 in</td>
                        <td className="text-green-600 dark:text-green-400">-1 in</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <Button className="mt-6 mx-auto bg-fitness-primary hover:bg-blue-700">
                  Update Measurements
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Photos Tab */}
          <TabsContent value="photos" className="mt-6">
            <div className="text-center py-8">
              <Camera className="mx-auto h-16 w-16 text-gray-400" />
              <h3 className="mt-4 text-xl font-semibold">No Photos Yet</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                Take progress photos to visually track your fitness journey over time.
              </p>
              <Button className="mt-6 bg-fitness-primary hover:bg-blue-700">
                Add First Photo
              </Button>
            </div>
          </TabsContent>
          
          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <div className="h-2 bg-green-500"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-center">Week Warrior</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
                    Completed 5+ workouts in a single week
                  </p>
                  <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Earned on March 1, 2025
                  </div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="h-2 bg-blue-500"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-center">Weight Loss Milestone</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
                    Lost 10 pounds from starting weight
                  </p>
                  <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Earned on March 12, 2025
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-100 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-4">
                    <Target className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-400">Locked Achievement</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
                    Complete 20 workouts to unlock
                  </p>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-4">
                    <div className="h-2 bg-gray-400 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                    16/20 workouts completed
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Progress;
