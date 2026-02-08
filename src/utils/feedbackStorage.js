// Feedback storage utility
// For production, this will use serverless functions
// For now, uses localStorage as fallback

const FEEDBACK_STORAGE_KEY = 'valentine_feedback';

export const saveFeedback = async (feedbackText) => {
  const feedback = {
    id: Date.now(),
    text: feedbackText,
    timestamp: new Date().toISOString(),
  };

  // Try to save via API (serverless function)
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(feedback),
    });

    if (response.ok) {
      console.log('Feedback saved via API');
      return { success: true };
    } else {
      throw new Error('API response not OK');
    }
  } catch (error) {
    console.log('API not available, using localStorage:', error.message);
    
    // Fallback to localStorage
    try {
      const existingFeedback = await getFeedback();
      const updatedFeedback = [...existingFeedback, feedback];
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(updatedFeedback));
      console.log('Feedback saved to localStorage');
      return { success: true };
    } catch (localError) {
      console.error('Failed to save to localStorage:', localError);
      // Even if localStorage fails, try to save directly
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify([feedback]));
      return { success: true };
    }
  }
};

export const getFeedback = async () => {
  // Try to fetch from API (serverless function)
  try {
    const response = await fetch('/api/feedback');
    if (response.ok) {
      const data = await response.json();
      console.log('Feedback loaded from API');
      return data.feedback || [];
    } else {
      throw new Error('API response not OK');
    }
  } catch (error) {
    console.log('API not available, using localStorage:', error.message);
    
    // Fallback to localStorage
    try {
      const stored = localStorage.getItem(FEEDBACK_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('Feedback loaded from localStorage:', parsed.length, 'items');
        return parsed;
      }
      return [];
    } catch (localError) {
      console.error('Failed to read from localStorage:', localError);
      return [];
    }
  }
};

export const clearFeedback = async () => {
  // Try to clear via API
  try {
    await fetch('/api/feedback', { method: 'DELETE' });
  } catch (error) {
    console.log('API not available, using localStorage');
  }

  // Fallback to localStorage
  localStorage.removeItem(FEEDBACK_STORAGE_KEY);
};
