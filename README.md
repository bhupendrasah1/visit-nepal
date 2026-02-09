# 🇳🇵 Visit Nepal - Tourism Platform

A full-stack tourism web application for exploring Nepal's destinations, booking hotels/vehicles/flights, and getting AI-powered travel assistance.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=flat-square&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

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

## 🔑 Environment Variables

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
