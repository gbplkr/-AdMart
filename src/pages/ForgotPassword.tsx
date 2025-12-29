import { useState } from 'react';
import { useRedirectIfLoggedIn } from '@/contexts/AuthContext';
import { forgotPasswordApi } from '@/api/auth';

export default function ForgotPassword() {
  useRedirectIfLoggedIn(); // Redirect if already logged in
  
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const data = await forgotPasswordApi({ email });

      if (data.success) {
        setMessage(data.message || 'Password reset link sent to your email.');
      } else {
        setError(data.message || 'Email not found.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>

        {message && <p className="text-green-600 mb-3">{message}</p>}
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 mb-3 rounded"
          placeholder="Your Email"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>

        <p className="mt-4 text-center text-sm">
          <a href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </a>
        </p>
      </form>
    </div>
  );
}
