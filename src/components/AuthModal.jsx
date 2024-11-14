import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function AuthModal({ isOpen, onClose, mode = 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, login } = useAuth();
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
      toast.error(error.message);
    }

    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'signup' ? 'Create Account' : 'Login'}
        </h2>
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
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
