import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    console.log('Sign in button clicked');
    try {
      console.log('Starting Google sign in...');
      console.log('Auth:', auth);
      console.log('Provider:', googleProvider);
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Sign in successful:', result);
      navigate('/');
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert(`Authentication error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div>
            <button
              type="button"
              onClick={() => {
                console.log('Button clicked');
                signInWithGoogle();
              }}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
