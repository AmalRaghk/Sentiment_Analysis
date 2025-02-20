import React, { useState } from 'react';
import { HfInference } from "@huggingface/inference";
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Get API key from environment variables (using Vite's import.meta.env)
  const apiKey = import.meta.env.VITE_APP_HF_TOKEN;

  const analyzeText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    if (!apiKey) {
      setError('API key not configured. Please check your environment variables.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const client = new HfInference(apiKey);
      const result = await client.textClassification({
        model: "nlptown/bert-base-multilingual-uncased-sentiment",
        inputs: text,
        provider: "hf-inference",
      });
      setSentiment(result);
    } catch (err) {
      setError(`Please Refresh: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Get the output from the API.
  // If sentiment is an array, use the first element.
  const sentimentOutput = sentiment
    ? Array.isArray(sentiment)
      ? sentiment[0].label
      : sentiment.label
    : null;
    
  // Function to get emoji based on sentiment star rating
  const getSentimentEmoji = (rating) => {
    if (!rating) return null;
    
    // Extract the first character from rating (assuming format like "1 star", "5 stars")
    const stars = parseInt(rating.charAt(0));
    
    switch(stars) {
      case 1: return "😢"; // Very negative/sad
      case 2: return "😕"; // Somewhat negative
      case 3: return "😐"; // Neutral
      case 4: return "🙂"; // Positive
      case 5: return "😄"; // Very positive
      default: return "❓"; // Unknown
    }
  };

  // Get emoji based on sentiment
  const sentimentEmoji = getSentimentEmoji(sentimentOutput);

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center p-4">
      <div className="relative">
        {sentimentOutput && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            {/* Bubble container */}
            <div className="bg-white border border-white rounded-xl shadow-lg px-4 py-2 flex items-center">
              <span className="text-2xl mr-2">{sentimentEmoji}</span>
            </div>
            {/* Triangle pointer for the bubble */}
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
          </div>
        )}
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Sentiment Analyzer👋</h1>
            </div>
            
            <div className="mb-4">
              <textarea
                className="w-full px-4 py-4 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none h-36"
                placeholder="Enter text to analyze sentiment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
            </div>
            
            <button
              className=" bg-red-600 text-white px-2 py-2 rounded-lg hover:bg-red-300 transition duration-300 flex items-center justify-center m-auto"
              onClick={analyzeText}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze'
              )}
            </button>
            
            {error && (
              <div className="mt-4 text-red-500 text-center">
                {error}
              </div>
            )}
            
            {/* Sentiment emoji reference section */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Sentiment Rating Scale:</p>
              <div className="flex justify-between">
                <div className="flex flex-col items-center">
                  <span className="text-xl">😢</span>
                  <span className="text-xs mt-1">Worst</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl">😕</span>
                  <span className="text-xs mt-1">Bad</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl">😐</span>
                  <span className="text-xs mt-1">Normal</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl">🙂</span>
                  <span className="text-xs mt-1">Good</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl">😄</span>
                  <span className="text-xs mt-1">Best</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;