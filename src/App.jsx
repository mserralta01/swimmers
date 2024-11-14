import React, { useState } from 'react';
import { FiAward, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { AuthProvider } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import Navbar from './components/Navbar';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'signup' });
  const { ref: featuresRef, inView: featuresVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">SwimTrack Pro</h1>
          <p className="text-xl md:text-2xl mb-8">Track, Analyze, and Improve Swimming Performance</p>
          {!user && (
            <div className="space-x-4">
              <button 
                onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
              >
                Get Started
              </button>
              <button 
                onClick={() => setAuthModal({ isOpen: true, mode: 'login' })}
                className="bg-transparent hover:bg-white hover:text-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors border-2 border-white"
              >
                Login
              </button>
            </div>
          )}
          {user && (
            <div className="space-y-4">
              <h2 className="text-2xl">Welcome, {user.displayName || user.email}!</h2>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
              >
                View Dashboard
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div 
        ref={featuresRef}
        className={`py-20 px-4 bg-gray-50 transition-opacity duration-1000 ${
          featuresVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose SwimTrack Pro?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">
              <FiTrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
              <p className="text-gray-600">Track times, splits, and progress across multiple events and competitions</p>
            </div>

            <div className="feature-card">
              <FiAward className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Competition Management</h3>
              <p className="text-gray-600">Organize and manage swim meets with ease. Track results and rankings</p>
            </div>

            <div className="feature-card">
              <FiUsers className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
              <p className="text-gray-600">Connect with coaches and teammates. Share achievements and feedback</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {!user && (
        <div 
          className="py-20 px-4 text-center"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1519861155730-0b5fbf0dd889?auto=format&fit=crop&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Swimming Performance?</h2>
            <p className="text-xl mb-8">Join thousands of swimmers and coaches who trust SwimTrack Pro</p>
            <button 
              onClick={() => setAuthModal({ isOpen: true, mode: 'signup' })}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors"
            >
              Sign Up Now
            </button>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal({ ...authModal, isOpen: false })}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
