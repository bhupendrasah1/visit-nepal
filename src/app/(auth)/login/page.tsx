"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Compass, Flag, MessageCircle, Mountain, PartyPopper } from "lucide-react";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background with Nepal landmarks */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-green-500 to-red-500 opacity-90" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 space-y-6">
            {/* Logo/Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-red-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition">
                <Mountain className="h-10 w-10 text-white" aria-hidden="true" />
              </div>
            </div>

            {/* Heading */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-red-500 bg-clip-text text-transparent">
                Visit Nepal
              </h1>
              <p className="text-gray-600 text-sm">
                Discover the beauty of the Himalayas
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 py-4">
              <div className="text-center space-y-1">
                <div className="text-2xl flex items-center justify-center">
                  <Compass className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <p className="text-xs text-gray-600">Explore</p>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl flex items-center justify-center">
                  <PartyPopper className="h-6 w-6 text-red-500" aria-hidden="true" />
                </div>
                <p className="text-xs text-gray-600">Festivals</p>
              </div>
              <div className="text-center space-y-1">
                <div className="text-2xl flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <p className="text-xs text-gray-600">AI Guide</p>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="space-y-3">
              <button
                onClick={() => signIn("google", { callbackUrl })}
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
              
              <p className="text-xs text-center text-gray-500">
                Sign in to access destinations, chat, and more
              </p>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-500">Why Visit Nepal?</span>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span>Explore 8000+ meter peaks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span>Experience vibrant festivals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                <span>Chat with AI travel guide</span>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-white/80 text-sm mt-6 flex items-center justify-center gap-2">
            Nepal - Where Earth Meets Sky
            <Flag className="h-4 w-4" aria-hidden="true" />
          </p>
        </div>
      </div>
    </main>
  );
}
