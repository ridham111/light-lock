import Image from "next/image";
import { Metadata } from "next";
import LoginForm from "../components/LoginForm";

export const metadata: Metadata = {
  title: "Light-Lock Gallery | Sign In",
  description: "Sign in to access your photo gallery",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md mb-8">
          <div className="flex justify-center mb-8">
            <Image
              className="dark:invert animate-float"
              src="/image.png"
              alt="light-lock logo"
              width={150}
              height={30}
              priority
            />
          </div>
          <LoginForm />
        </div>
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Demo application - Use email: user@example.com / password: Password@2807</p>
        </footer>
      </div>

      {/* Right side - Image Showcase */}
      <div className="hidden md:block w-1/2 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 opacity-90 z-10"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating images */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="relative w-4/5 h-4/5">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-lg shadow-xl overflow-hidden transform -rotate-6 animate-float">
              <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&w=800&q=75"
                alt="Landscape"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute top-1/4 right-0 w-48 h-48 rounded-lg shadow-xl overflow-hidden transform rotate-12 animate-float delay-300">
              <Image
                src="https://images.unsplash.com/photo-1511300636408-a63a89df3482?auto=format&w=800&q=75"
                alt="City"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute bottom-0 right-1/4 w-56 h-56 rounded-lg shadow-xl overflow-hidden transform -rotate-3 animate-float delay-500">
              <Image
                src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&w=800&q=75"
                alt="Beach"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-30 p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center animate-slide-up">
            Welcome to Light-Lock Gallery
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-lg animate-slide-up delay-200">
            Explore and showcase your favorite photos in a beautiful, interactive gallery
          </p>
        
        </div>
      </div>
    </div>
  );
}

