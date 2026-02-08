# Deploy to Vercel - Step by Step Guide

## Method 1: Deploy via Vercel Website (Easiest - Recommended)

### Step 1: Push Your Code to GitHub

1. **Create a GitHub repository** (if you haven't already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Valentine scrapbook"
   ```

2. **Create a new repository on GitHub**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it (e.g., "valentine-scrapbook")
   - Don't initialize with README
   - Click "Create repository"

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Login (you can use your GitHub account)

2. **Import your project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite app

3. **Configure build settings** (usually auto-detected):
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables** (optional for now):
   - You don't need any for basic deployment
   - Add later if you use a database

5. **Deploy**:
   - Click "Deploy"
   - Wait 1-2 minutes for build to complete
   - Your app will be live! 🎉

### Step 3: Access Your App

- Your app will be available at: `https://your-project-name.vercel.app`
- The feedback page: `https://your-project-name.vercel.app/feedback`

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project directory:

```bash
cd /Users/vineetpriyedarshi/Desktop/veeka
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time)
- **Project name?** → Press Enter (uses folder name) or type custom name
- **Directory?** → `./` (press Enter)
- **Override settings?** → No

### Step 4: Production Deploy

For production deployment:

```bash
vercel --prod
```

---

## Important Notes

### ✅ What Works Out of the Box

- ✅ Main scrapbook pages
- ✅ All animations and interactions
- ✅ Feedback form (saves to localStorage in browser)
- ✅ `/feedback` page (shows localStorage data)

### ⚠️ Feedback Storage on Vercel

**Current Status**: Feedback uses localStorage (browser storage)
- ✅ Works for each user individually
- ❌ Not shared across devices/users
- ❌ Data resets if browser cache is cleared

**To Enable Server-Side Storage** (optional):

1. The `/api/feedback.js` file is ready but uses in-memory storage
2. For persistent storage, you'll need a database:
   - **Vercel KV** (Redis) - Recommended
   - **MongoDB Atlas** (free tier)
   - **Supabase** (free tier)

See `DEPLOYMENT.md` for database setup instructions.

---

## Troubleshooting

### Build Fails?

1. **Check build logs** in Vercel dashboard
2. **Common issues**:
   - Missing dependencies → Run `npm install` locally first
   - Build errors → Check console for errors
   - Path issues → Ensure all file paths are correct

### Feedback Not Saving?

- Currently uses localStorage (works per browser)
- Check browser console for errors
- To enable server-side storage, set up a database (see `DEPLOYMENT.md`)

### Routes Not Working?

- Vercel auto-configures routing for React Router
- If `/feedback` doesn't work, add `vercel.json` (already included)

---

## Quick Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Repository imported to Vercel
- [ ] Build completed successfully
- [ ] App accessible at Vercel URL
- [ ] Test feedback submission
- [ ] Test `/feedback` page

---

## After Deployment

1. **Share your app**: Send the Vercel URL to your Valentine! 💕
2. **Monitor feedback**: Visit `your-url.vercel.app/feedback` to see submissions
3. **Custom domain** (optional): Add your own domain in Vercel settings

---

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
