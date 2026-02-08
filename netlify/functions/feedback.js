// Netlify Serverless Function for feedback storage
// This file should be in /netlify/functions/feedback.js

// For Netlify, we'll use a simpler approach with environment variables
// or you can use Netlify's built-in storage or connect to a database

// Note: Netlify Functions run in a serverless environment
// For persistent storage, consider using:
// - Netlify Identity + FaunaDB
// - MongoDB Atlas
// - Supabase
// - Or store in a JSON file (less reliable for serverless)

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // For Netlify, you'll need to use a database or external storage
  // This is a placeholder that uses environment variables or a database
  // For now, we'll return a message suggesting localStorage fallback
  
  if (event.httpMethod === 'GET') {
    // In production, fetch from your database
    // For now, return empty array (localStorage will handle it)
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback: [] }),
    };
  }

  if (event.httpMethod === 'POST') {
    const feedback = JSON.parse(event.body);
    // In production, save to your database here
    // For now, just return success (localStorage will handle it)
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true }),
    };
  }

  if (event.httpMethod === 'DELETE') {
    // In production, delete from your database
    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};
