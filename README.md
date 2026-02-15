# 🇳🇵 Visit Nepal - Tourism Platform

A full-stack tourism web application for exploring Nepal's destinations, booking hotels/vehicles/flights, and getting AI-powered travel assistance.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

> 🚀 **Ready to deploy?** Check out our [Quick Deployment Guide](./DEPLOYMENT.md) for step-by-step Vercel deployment instructions.

## ✨ Features

### 🗺️ Destinations
- Browse tourist destinations across Nepal
- View detailed information with interactive Leaflet maps
- Auto-geocoding for location coordinates
- Filter by region and budget

### 🤖 AI Chatbot
- Nepal tourism assistant powered by Groq AI (Llama 3.1)
- Persistent chat history per user
- Get travel recommendations and information

### 🔐 Authentication
- Google OAuth sign-in via NextAuth.js
- Protected routes for admin and chat features

### 📋 Admin Dashboard
- Add/manage destinations, hotels, vehicles, and flights
- View bookings and statistics

### 🗓️ Trip Planner
- Plan trips based on budget
- Get destination recommendations

### ❤️ Wishlist
- Save favorite destinations
- Personalized user experience

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Prisma 7
- **Authentication**: NextAuth.js with Google Provider
- **Styling**: Tailwind CSS 4
- **Maps**: Leaflet + React-Leaflet
- **AI**: Groq API (Llama 3.1)

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/login/       # Login page
│   ├── admin/              # Admin dashboard & management
│   ├── api/                # API routes
│   │   ├── admin/          # Admin CRUD endpoints
│   │   ├── auth/           # NextAuth configuration
│   │   ├── chat/           # Chat endpoints
│   │   └── ...
│   ├── bookings/           # User bookings
│   ├── chat/               # AI chatbot page
│   ├── destinations/       # Destination listing & details
│   ├── flights/            # Flight booking
│   ├── payment/            # Payment processing
│   └── trip-planner/       # Trip planning tool
├── components/             # Reusable React components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions & configs
└── types/                  # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (Neon recommended)
- Google Cloud Console account (for OAuth)
- Groq API key (for AI chatbot)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/visit-nepal.git
   cd visit-nepal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your credentials:
   ```env
   DATABASE_URL="your-neon-database-url"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   GROQ_API_KEY="your-groq-api-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## � Deploy to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/visit-nepal&env=DATABASE_URL,GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET,NEXTAUTH_URL,NEXTAUTH_SECRET,GROQ_API_KEY&envDescription=Required%20environment%20variables%20for%20Visit%20Nepal&project-name=visit-nepal&repository-name=visit-nepal)

### Manual Deployment Steps

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/visit-nepal.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Configure your project:
     - **Framework Preset**: Next.js (auto-detected)
     - **Build Command**: `npm run build` (default)
     - **Output Directory**: `.next` (default)
     - **Install Command**: `npm install` (default)

3. **Set Environment Variables**
   
   In Vercel project settings → Environment Variables, add:

   | Variable | Value | Notes |
   |----------|-------|-------|
   | `DATABASE_URL` | Your Neon database URL | From [neon.tech](https://neon.tech) |
   | `GOOGLE_CLIENT_ID` | Your Google OAuth ID | From Google Cloud Console |
   | `GOOGLE_CLIENT_SECRET` | Your Google OAuth secret | From Google Cloud Console |
   | `NEXTAUTH_URL` | `https://your-app.vercel.app` | Your Vercel deployment URL |
   | `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` | Keep this secret! |
   | `GROQ_API_KEY` | Your Groq API key | From [console.groq.com](https://console.groq.com) |

4. **Update Google OAuth Settings**
   - Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Select your OAuth 2.0 Client
   - Add Authorized redirect URIs:
     ```
     https://your-app.vercel.app/api/auth/callback/google
     ```
   - Add Authorized JavaScript origins:
     ```
     https://your-app.vercel.app
     ```

5. **Deploy the Database Schema**
   
   After first deployment, run Prisma migrations:
   ```bash
   # Install Vercel CLI (if not already installed)
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Link to your project
   vercel link
   
   # Push database schema
   npx prisma generate
   npx prisma db push
   ```

6. **Verify Deployment**
   - Your app should now be live at `https://your-app.vercel.app`
   - Test authentication with Google
   - Check all protected routes work
   - Verify database connections

### 🔧 Post-Deployment Checklist

- [ ] All environment variables are set correctly
- [ ] Database schema is pushed (`prisma db push`)
- [ ] Google OAuth redirect URIs are configured
- [ ] Login functionality works
- [ ] Chat feature connects to Groq API
- [ ] Maps load correctly
- [ ] Admin dashboard is accessible

### ⚠️ Common Deployment Issues

**Issue**: "Invalid database URL"
- **Solution**: Ensure your `DATABASE_URL` is correctly formatted and accessible from Vercel

**Issue**: OAuth redirect error
- **Solution**: Add your Vercel domain to Google OAuth authorized redirect URIs

**Issue**: "Module not found" errors
- **Solution**: Clear Vercel cache and redeploy, or check if all dependencies are in `package.json`

**Issue**: Prisma client not generated
- **Solution**: Add `"postinstall": "prisma generate"` to your `package.json` scripts

**Issue**: Environment variables not updating
- **Solution**: Redeploy after changing environment variables in Vercel dashboard

### 📊 Monitoring & Analytics

Enable Vercel Analytics and Speed Insights:

```bash
npm install @vercel/analytics @vercel/speed-insights
```

Then add to your root layout (`src/app/layout.tsx`):
```tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## �🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ✅ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | ✅ |
| `NEXTAUTH_URL` | Your app URL | ✅ |
| `NEXTAUTH_SECRET` | Random secret for NextAuth | ✅ |
| `GROQ_API_KEY` | Groq API key for AI chatbot | ✅ |

### Getting API Keys

1. **Neon Database**: Sign up at [neon.tech](https://neon.tech) and create a new PostgreSQL database
2. **Google OAuth**: Create credentials at [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
3. **Groq API**: Get your API key from [Groq Console](https://console.groq.com/keys)
4. **NextAuth Secret**: Generate with `openssl rand -base64 32`

## 📜 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🗃️ Database Schema

Key models:
- **User** - User accounts with OAuth
- **Destination** - Tourist destinations with geocoding
- **Hotel** - Hotels linked to destinations
- **Vehicle** - Vehicle rentals
- **Flight** - Flight information
- **Booking** - User bookings
- **Chat** - AI chat history
- **Wishlist** - User wishlists

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Nepal Tourism Board](https://ntb.gov.np) for inspiration
- [OpenStreetMap](https://openstreetmap.org) for mapping data
- [Groq](https://groq.com) for AI API
