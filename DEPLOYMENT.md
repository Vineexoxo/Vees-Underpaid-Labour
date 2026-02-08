# Deployment Guide - Feedback Storage

This guide explains how to deploy your Valentine scrapbook with feedback storage to Vercel or Netlify.

## Current Setup

The app uses a **hybrid approach**:
- **Serverless Functions**: For persistent storage (when deployed)
- **localStorage**: Fallback for local development and if API is unavailable

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Install Vercel CLI (optional)
```bash
npm i -g vercel
```

### Step 2: Deploy
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect it's a Vite app
5. Click "Deploy"

### Step 3: Feedback Storage on Vercel

**Current Setup**: The `/api/feedback.js` file uses file system storage, which works but has limitations on Vercel (serverless functions are stateless).

**Better Options for Production**:

#### Option A: Use Vercel KV (Redis) - Recommended
1. Install Vercel KV: `npm install @vercel/kv`
2. Create a KV database in Vercel dashboard
3. Update `/api/feedback.js` to use KV instead of file system

#### Option B: Use a Database
- **MongoDB Atlas** (free tier available)
- **Supabase** (free tier available)
- **PlanetScale** (free tier available)

#### Option C: Keep File System (Current)
- Works for small deployments
- Data persists but may be lost on function cold starts
- Good for testing/demos

### Step 4: Access Feedback
Once deployed, visit: `https://your-app.vercel.app/feedback`

## Option 2: Deploy to Netlify

### Step 1: Install Netlify CLI (optional)
```bash
npm i -g netlify-cli
```

### Step 2: Deploy
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Click "Deploy"

### Step 3: Feedback Storage on Netlify

**Current Setup**: The `/netlify/functions/feedback.js` is a placeholder.

**Better Options**:

#### Option A: Use Netlify + FaunaDB
1. Sign up for [FaunaDB](https://fauna.com) (free tier)
2. Create a database
3. Update the Netlify function to use FaunaDB

#### Option B: Use Supabase
1. Sign up for [Supabase](https://supabase.com) (free tier)
2. Create a database table for feedback
3. Update the Netlify function to use Supabase

#### Option C: Use MongoDB Atlas
1. Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier)
2. Create a cluster
3. Update the Netlify function to use MongoDB

### Step 4: Access Feedback
Once deployed, visit: `https://your-app.netlify.app/feedback`

## Local Development

The app works locally using **localStorage** as a fallback:
- Feedback is saved to browser's localStorage
- Access feedback at: `http://localhost:5173/feedback`
- Data persists in your browser only

## Testing Feedback Storage

1. **Local**: Submit feedback → Check `/feedback` page → Data stored in localStorage
2. **Deployed**: Submit feedback → Check `/feedback` page → Data stored via serverless function

## Recommended: Upgrade to Database

For production, I recommend using a database. Here's a quick example with **Supabase**:

### 1. Install Supabase
```bash
npm install @supabase/supabase-js
```

### 2. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create a new project
- Create a table: `feedback` with columns: `id` (bigint), `text` (text), `timestamp` (timestamp)

### 3. Update `feedbackStorage.js`
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export const saveFeedback = async (feedbackText) => {
  const { data, error } = await supabase
    .from('feedback')
    .insert([{ text: feedbackText, timestamp: new Date().toISOString() }]);
  
  return { success: !error };
};

export const getFeedback = async () => {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('timestamp', { ascending: false });
  
  return data || [];
};
```

## File Structure

```
veeka/
├── api/
│   └── feedback.js          # Vercel serverless function
├── netlify/
│   └── functions/
│       └── feedback.js      # Netlify serverless function
├── src/
│   ├── pages/
│   │   └── FeedbackPage.jsx # Feedback display page
│   ├── utils/
│   │   └── feedbackStorage.js # Storage utility
│   └── ...
└── vercel.json              # Vercel config
```

## Notes

- **localStorage** works great for local development
- **Serverless functions** work for small deployments
- **Database** is recommended for production with many users
- The app gracefully falls back to localStorage if API is unavailable
