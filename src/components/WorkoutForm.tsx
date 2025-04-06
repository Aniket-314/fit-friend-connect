
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dumbbell, Timer, Mic, MicOff, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface WorkoutFormProps {
  onSubmit: (workout: {
    type: string;
    duration: number;
    intensity: 'low' | 'medium' | 'high';
    notes?: string;
  }) => void;
}

const WorkoutForm = ({ onSubmit }: WorkoutFormProps) => {
  const [workoutType, setWorkoutType] = useState('');
  const [customType, setCustomType] = useState('');
  const [duration, setDuration] = useState(30);
  const [intensity, setIntensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [notes, setNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Exercise type options
  const exerciseTypes = [
    'Running', 'Cycling', 'Walking', 'Swimming', 'Weight Training', 
    'Yoga', 'HIIT', 'Pilates', 'CrossFit', 'Other'
  ];
  
  // Toggle microphone recording
  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // In a real app, this would use the Web Speech API
      toast.info("Listening... Speak your workout details");
      
      // Simulate recording ending after 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        setNotes("Recorded voice note: Had a great workout session today!");
        toast.success("Voice note recorded");
      }, 3000);
    } else {
      setIsRecording(false);
      toast.info("Recording stopped");
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const finalWorkoutType = workoutType === 'Other' ? customType : workoutType;
    if (!finalWorkoutType) {
      toast.error("Please select a workout type");
      return;
    }
    
    // Create workout object
    const workout = {
      type: finalWorkoutType,
      duration,
      intensity,
      notes,
    };
    
    // Show confetti animation
    setShowConfetti(true);
    
    // Pass data to parent component
    onSubmit(workout);
    
    // Reset form
    setWorkoutType('');
    setCustomType('');
    setDuration(30);
    setIntensity('medium');
    setNotes('');
    
    // Hide confetti after animation completes
    setTimeout(() => setShowConfetti(false), 4000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <>
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#00D4FF', '#FF007A', '#9D4EDD', '#FFD700'][
                  Math.floor(Math.random() * 4)
                ],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 3}s`,
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-sm rounded-lg">
            <div className="text-center p-6 animate-zoom-transition">
              <CheckCircle className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Workout Logged!</h3>
              <p className="text-gray-300">Great job! Keep up the good work.</p>
              <p className="text-sm text-gray-400 mt-4">+10 FitPoints earned</p>
            </div>
          </div>
        </>
      )}

      {/* Workout Type Selection */}
      <div className="space-y-2">
        <Label>Workout Type</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
          {exerciseTypes.map((type) => (
            <Button
              key={type}
              type="button"
              variant={workoutType === type ? "default" : "outline"}
              className={workoutType === type ? "bg-fitness-primary" : ""}
              onClick={() => setWorkoutType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
        
        {/* Custom Workout Type */}
        {workoutType === 'Other' && (
          <div className="mt-2">
            <Input
              placeholder="Enter workout type..."
              value={customType}
              onChange={(e) => setCustomType(e.target.value)}
              className="fitness-input"
            />
          </div>
        )}
      </div>
      
      {/* Duration Slider */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Duration (minutes)</Label>
          <span className="text-xl font-bold gradient-text">{duration}</span>
        </div>
        <div className="px-1">
          <Slider
            value={[duration]}
            min={5}
            max={120}
            step={5}
            onValueChange={(values) => setDuration(values[0])}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>5 min</span>
          <span>120 min</span>
        </div>
      </div>
      
      {/* Intensity Selection */}
      <div className="space-y-2">
        <Label>Intensity</Label>
        <div className="flex space-x-4 justify-center mt-2">
          <button
            type="button"
            className={`intensity-button intensity-low ${intensity === 'low' ? 'scale-125' : ''}`}
            onClick={() => setIntensity('low')}
          >
            <span className="sr-only">Low Intensity</span>
            1
          </button>
          <button
            type="button"
            className={`intensity-button intensity-medium ${intensity === 'medium' ? 'scale-125' : ''}`}
            onClick={() => setIntensity('medium')}
          >
            <span className="sr-only">Medium Intensity</span>
            2
          </button>
          <button
            type="button"
            className={`intensity-button intensity-high ${intensity === 'high' ? 'scale-125' : ''}`}
            onClick={() => setIntensity('high')}
          >
            <span className="sr-only">High Intensity</span>
            3
          </button>
        </div>
        <div className="flex justify-between text-xs text-gray-400 px-2 mt-1">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>
      
      {/* Notes Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="notes">Notes</Label>
          <button
            type="button"
            className={`p-2 rounded-full ${isRecording ? 'bg-red-500/20 text-red-500' : 'bg-gray-800 text-gray-400'}`}
            onClick={toggleRecording}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        </div>
        <textarea
          id="notes"
          placeholder="How did your workout feel? Add notes here..."
          className="w-full h-20 rounded-md border-gray-600 bg-gray-800 shadow-sm focus:border-fitness-primary focus:ring-fitness-primary text-white text-sm p-3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {isRecording && (
          <div className="text-sm text-red-400 animate-pulse flex items-center">
            <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
            Recording...
          </div>
        )}
      </div>
      
      {/* Submit Button */}
      <Button 
        type="submit"
        className="w-full fitness-button py-6 text-lg"
      >
        <Dumbbell className="mr-2 h-5 w-5" />
        Log Workout
      </Button>
    </form>
  );
};

export default WorkoutForm;
