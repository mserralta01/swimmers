import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export default function AuthModal({ isOpen, onClose, mode = 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, login, signInWithGoogle, signInWithFacebook } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'signup') {
        await signup(email, password);
        toast.success('Account created successfully!');
      } else {
        await login(email, password);
        toast.success('Logged in successfully!');
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed');
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Logged in with Google successfully!');
      onClose();
    } catch (error) {
      console.error('Google auth error:', error);
      toast.error(error.message || 'Google authentication failed');
    }
    setLoading(false);
  }

  async function handleFacebookSignIn() {
    setLoading(true);
    try {
      await signInWithFacebook();
      toast.success('Logged in with Facebook successfully!');
      onClose();
    } catch (error) {
      console.error('Facebook auth error:', error);
      toast.error(error.message || 'Facebook authentication failed');
    }
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'signup' ? 'Create Account' : 'Login'}
        </h2>
        
        {/* Social Login Buttons */}
        <div className="space-y-3 mb-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
          
          <button
            onClick={handleFacebookSignIn}
            className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white rounded-lg px-4 py-2 hover:bg-[#1864D9] transition-colors"
            disabled={loading}
          >
            <FaFacebook className="text-xl" />
            Continue with Facebook
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            disabled={loading}
          >
            {loading ? 'Processing...' : mode === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>
        
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
}
