import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRedirectIfLoggedIn } from '@/contexts/AuthContext';
import { resetPasswordApi } from '@/api/auth';

export default function ResetPassword() {
  useRedirectIfLoggedIn(); // Redirect if already logged in
  
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing token');
      setIsValidToken(false);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const data = await resetPasswordApi({ token, password });

      if (data.success) {
        setSuccess(data.message || 'Password reset successful!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Invalid or expired token');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded shadow w-96 text-center">
          <h2 className="text-xl font-bold mb-4">Invalid Token</h2>
          <p className="text-red-500 mb-4">Invalid or missing reset token.</p>
          <a href="/login" className="text-blue-600 hover:underline">
            Back to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-600 mb-3">{success}</p>}

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 mb-3 rounded"
          placeholder="New Password"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Resetting...' : 'Reset'}
        </button>
      </form>
    </div>
  );
}
