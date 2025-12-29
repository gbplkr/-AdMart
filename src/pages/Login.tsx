import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useRedirectIfLoggedIn } from '@/contexts/AuthContext';
import { loginApi } from '@/api/auth';

export default function Login() {
  useRedirectIfLoggedIn(); // Redirect if already logged in
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const data = await loginApi({ email, password });

      if (data.success && data.userId && data.token) {
        login(data.userId, data.token);
        // Store username for dashboard display
        if (data.user?.name) {
          localStorage.setItem('username', data.user.name);
        }
        navigate('/customer/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
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
        <h2 className="text-xl font-bold mb-4">Login</h2>
        
        {error && (
          <p className="text-red-500 mb-3">{error}</p>
        )}

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
        />

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border p-2 mb-3 rounded"
          placeholder="Password"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        <div className="mt-3 text-sm flex justify-between">
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
