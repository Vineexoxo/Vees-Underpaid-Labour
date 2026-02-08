import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeedback, clearFeedback } from '../utils/feedbackStorage';

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    setIsLoading(true);
    const feedback = await getFeedback();
    // Sort by timestamp, newest first
    const sorted = feedback.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setFeedbackList(sorted);
    setIsLoading(false);
  };

  const handleClear = async () => {
    if (window.confirm('Are you sure you want to clear all feedback?')) {
      await clearFeedback();
      setFeedbackList([]);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-romantic-pink-light via-romantic-cream-light to-romantic-pink">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-dancing text-4xl sm:text-5xl md:text-6xl text-romantic-red-dark mb-4">
            Feedback 💕
          </h1>
          <Link
            to="/"
            className="inline-block font-inter text-romantic-red hover:text-romantic-red-dark transition-colors mb-4"
          >
            ← Back to Scrapbook
          </Link>
        </motion.div>

        {/* Feedback List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-romantic-red"></div>
            <p className="mt-4 font-inter text-romantic-red/70">Loading feedback...</p>
          </div>
        ) : feedbackList.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">💌</div>
            <p className="font-dancing text-2xl sm:text-3xl text-romantic-red-dark mb-2">
              No feedback yet
            </p>
            <p className="font-inter text-romantic-red/70">
              Check back after someone submits feedback!
            </p>
          </motion.div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="font-inter text-romantic-red/70">
                {feedbackList.length} {feedbackList.length === 1 ? 'message' : 'messages'}
              </p>
              <button
                onClick={handleClear}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-inter hover:bg-red-600 transition-colors text-sm"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-4 max-w-3xl mx-auto">
              {feedbackList.map((feedback, index) => (
                <motion.div
                  key={feedback.id}
                  className="bg-white rounded-lg shadow-lg p-6 paper-texture"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="text-2xl">💕</div>
                    <span className="font-inter text-xs text-gray-500">
                      {formatDate(feedback.timestamp)}
                    </span>
                  </div>
                  <p className="font-inter text-gray-800 whitespace-pre-wrap">
                    {feedback.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
