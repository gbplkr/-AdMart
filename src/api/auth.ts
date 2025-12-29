// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  userId?: string;
  user?: {
    id: string;
    email: string;
    accountType: string;
    name?: string;
    companyName?: string;
  };
}

interface RegisterCustomerRequest {
  email: string;
  password: string;
  name: string;
  phone: string;
  termsAccepted: boolean;
  collectionAccepted: boolean;
  promotionAccepted: boolean;
}

interface RegisterMediaCompanyRequest {
  email: string;
  password: string;
  companyName: string;
  firstName: string;
  lastName: string;
  phone: string;
  termsAccepted: boolean;
  collectionAccepted: boolean;
  promotionAccepted: boolean;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  userId?: string;
}

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

interface ResetPasswordRequest {
  token: string;
  password: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

// Login API
export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// Register Customer API
export async function registerCustomerApi(data: RegisterCustomerRequest): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      accountType: 'customer',
    }),
  });

  return response.json();
}

// Register Media Company API
export async function registerMediaCompanyApi(data: RegisterMediaCompanyRequest): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      accountType: 'media_company',
    }),
  });

  return response.json();
}

// Forgot Password API
export async function forgotPasswordApi(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
  const response = await fetch(`${API_BASE_URL}/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// Reset Password API
export async function resetPasswordApi(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  const response = await fetch(`${API_BASE_URL}/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

// Logout API
export async function logoutApi(): Promise<LogoutResponse> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}

// Verify Token API
export async function verifyTokenApi(token: string): Promise<{ valid: boolean; user?: LoginResponse['user'] }> {
  const response = await fetch(`${API_BASE_URL}/verify-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json();
}
