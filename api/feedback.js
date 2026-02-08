// Vercel Serverless Function for feedback storage
// This file should be in /api/feedback.js for Vercel

// Note: Vercel serverless functions are stateless
// For persistent storage, use a database (Vercel KV, MongoDB, Supabase, etc.)
// This is a simple in-memory storage (data resets on function restart)

let feedbackStorage = [];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    // Get all feedback
    return res.status(200).json({ feedback: feedbackStorage });
  }

  if (req.method === 'POST') {
    // Add new feedback
    const newFeedback = {
      id: Date.now(),
      text: req.body.text,
      timestamp: req.body.timestamp || new Date().toISOString(),
    };
    feedbackStorage.push(newFeedback);
    return res.status(200).json({ success: true, feedback: newFeedback });
  }

  if (req.method === 'DELETE') {
    // Clear all feedback
    feedbackStorage = [];
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
