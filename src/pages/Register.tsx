import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRedirectIfLoggedIn } from '@/contexts/AuthContext';
import { registerCustomerApi, registerMediaCompanyApi } from '@/api/auth';

type AccountType = 'customer' | 'media_company';

export default function Register() {
  useRedirectIfLoggedIn(); // Redirect if already logged in
  
  const [accountType, setAccountType] = useState<AccountType>('customer');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    phone: '',
    company_name: '',
    first_name: '',
    last_name: '',
    subscriber_type: [] as string[]
  });
  const [agreements, setAgreements] = useState({
    terms: false,
    collection: false,
    promotion: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      subscriber_type: checked
        ? [...prev.subscriber_type, value]
        : prev.subscriber_type.filter(t => t !== value)
    }));
  };

  const handleAgreementChange = (name: keyof typeof agreements) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreements(prev => ({ ...prev, [name]: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    if (!agreements.terms || !agreements.collection) {
      setError('Please accept the required agreements');
      return;
    }

    setIsLoading(true);

    try {
      let data;
      
      if (accountType === 'customer') {
        data = await registerCustomerApi({
          email: formData.email,
          password: formData.password,
          name: formData.username,
          phone: formData.phone,
          termsAccepted: agreements.terms,
          collectionAccepted: agreements.collection,
          promotionAccepted: agreements.promotion
        });
      } else {
        data = await registerMediaCompanyApi({
          email: formData.email,
          password: formData.password,
          companyName: formData.company_name,
          firstName: formData.first_name || formData.username,
          lastName: formData.last_name || '',
          phone: formData.phone,
          termsAccepted: agreements.terms,
          collectionAccepted: agreements.collection,
          promotionAccepted: agreements.promotion
        });
      }

      if (data.success) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT BACKGROUND */}
      <div
        className="hidden lg:block w-2/3 bg-cover bg-center relative"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/3 bg-white flex items-center justify-center">
        <div className="w-full max-w-md px-6 py-8">
          {/* LOGO */}
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-blue-600">Create an account</h1>
            <p className="text-sm text-gray-500">Sign up now</p>
          </div>

          {/* TABS */}
          <div className="flex border-b mb-6">
            <button
              type="button"
              onClick={() => setAccountType('customer')}
              className={`flex-1 py-2 text-sm font-medium border-b-2 ${
                accountType === 'customer'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-400'
              }`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setAccountType('media_company')}
              className={`flex-1 py-2 text-sm font-medium border-b-2 ${
                accountType === 'media_company'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-400'
              }`}
            >
              Media Company
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Username"
            />

            {accountType === 'media_company' && (
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                required
                className="w-full border px-3 py-2 rounded"
                placeholder="Company name"
              />
            )}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Email address"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Password"
            />

            <input
              type="password"
              name="password_confirm"
              value={formData.password_confirm}
              onChange={handleInputChange}
              required
              className="w-full border px-3 py-2 rounded"
              placeholder="Verify password"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="Phone number"
            />

            {accountType === 'customer' && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Subscriber Type</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {['enterprise', 'local_government', 'public_institutions', 'organization', 'individual', 'etc'].map(
                    type => (
                      <label key={type} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={type}
                          onChange={handleCheckboxChange}
                          className="accent-blue-600"
                        />
                        {type.replace('_', ' ')}
                      </label>
                    )
                  )}
                </div>
              </div>
            )}

            <hr />

            <div className="space-y-2 text-xs text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" required />
                [Required] Must be 14 years of age or older
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={agreements.terms}
                  onChange={handleAgreementChange('terms')}
                  required 
                />
                [Required] Agree to Terms of Service &gt;{' '}
                <a className="text-blue-700" href="/assets/TermsAndConditions.pdf" target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={agreements.collection}
                  onChange={handleAgreementChange('collection')}
                  required 
                />
                [Required] Consent to collection and use of personal information &gt;{' '}
                <a className="text-blue-700" href="/assets/CollectionOfPersonalInformation.pdf" target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={agreements.promotion}
                  onChange={handleAgreementChange('promotion')}
                />
                [Optional] Agree to receive promotional and marketing information &gt;{' '}
                <a className="text-blue-700" href="/assets/PromotionAndMarketing.pdf" target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Joining...' : 'Join the membership'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            If you already have an account,{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              log in
            </a>
          </p>

          <p className="mt-6 text-center text-sm">© 2025 Advertising Play</p>
        </div>
      </div>
    </div>
  );
}
