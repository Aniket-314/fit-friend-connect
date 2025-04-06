
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Quote {
  text: string;
  author: string;
}

const MotivationalQuote = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Function to fetch a motivational quote
    const fetchQuote = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, you would use an actual API
        // For this example, we'll simulate an API call with sample quotes
        const sampleQuotes = [
          { text: "The body achieves what the mind believes.", author: "Napoleon Hill" },
          { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
          { text: "Strength does not come from the body. It comes from the will.", author: "Gandhi" },
          { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
          { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
          { text: "The difference between try and triumph is a little umph.", author: "Marvin Phillips" },
          { text: "The hardest lift of all is lifting your butt off the couch.", author: "Unknown" },
          { text: "The only way to define your limits is by going beyond them.", author: "Arthur C. Clarke" },
          { text: "Your body can stand almost anything. It's your mind that you have to convince.", author: "Unknown" },
          { text: "No matter how slow you go, you are still lapping everybody on the couch.", author: "Unknown" }
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Pick a random quote
        const randomQuote = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
        setQuote(randomQuote);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        setQuote({ text: "Believe in yourself and all that you are.", author: "Unknown" });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuote();
    
    // Fetch a new quote daily
    // In a real app, you might want to use a more sophisticated approach
    // This basic approach will fetch a new quote when the component mounts or the page refreshes
  }, []);
  
  return (
    <Card className="neon-border overflow-hidden">
      <CardContent className="p-6">
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-700 rounded w-1/4 mt-2"></div>
          </div>
        ) : (
          <>
            <blockquote className="text-lg italic font-medium text-gray-200">
              "{quote?.text}"
            </blockquote>
            <footer className="mt-2 text-right text-sm text-gray-400">
              — {quote?.author}
            </footer>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MotivationalQuote;
