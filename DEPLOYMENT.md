# 🚀 Vercel Deployment Quick Guide

## Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Neon database created
- [ ] Google OAuth credentials configured
- [ ] Groq API key obtained
- [ ] All environment variables ready

## Step-by-Step Deployment

### 1️⃣ Prepare Your Database

1. Create a PostgreSQL database at [neon.tech](https://neon.tech)
2. Copy your connection string
3. Save it for the next step

### 2️⃣ Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create OAuth 2.0 credentials
3. Note down Client ID and Client Secret
4. **Important**: You'll update redirect URIs after deployment

### 3️⃣ Get Groq API Key

1. Sign up at [console.groq.com](https://console.groq.com)
2. Navigate to API Keys
3. Create a new API key
4. Save it securely

### 4️⃣ Deploy to Vercel

1. Visit [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure environment variables:

```
DATABASE_URL=postgresql://...
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=(generate with: openssl rand -base64 32)
GROQ_API_KEY=your-groq-key
```

4. Click **Deploy**

### 5️⃣ Update Google OAuth (After Deployment)

1. Return to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Edit your OAuth 2.0 Client
3. Add to **Authorized redirect URIs**:
   ```
   https://your-app.vercel.app/api/auth/callback/google
   ```
4. Add to **Authorized JavaScript origins**:
   ```
   https://your-app.vercel.app
   ```
5. Save changes

### 6️⃣ Push Database Schema

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Push schema
npx prisma db push
```

### 7️⃣ Test Your Deployment

- [ ] Visit your Vercel URL
- [ ] Test Google login
- [ ] Access `/destinations` (should require login)
- [ ] Try `/chat` (should require login)
- [ ] Check admin dashboard
- [ ] Verify maps load correctly

## 🎉 You're Live!

Your Visit Nepal app is now deployed and accessible worldwide!

## 📝 Notes

- First deployment might take 2-3 minutes
- Changes to environment variables require redeployment
- Database schema changes need `prisma db push`
- Check Vercel logs if something doesn't work

## 🆘 Need Help?

Check the main README.md for troubleshooting common issues.
