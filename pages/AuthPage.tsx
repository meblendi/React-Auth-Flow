
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../components/ui';
import { useAuth } from '../App';

const validatePhoneNumber = (phone: string): string | undefined => {
  if (!phone) {
    return 'Phone number is required.';
  }
  if (!/^09\d{9}$/.test(phone)) {
    return 'Must be an 11-digit number starting with "09".';
  }
  return undefined;
};

const AuthPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const validationError = validatePhoneNumber(phoneNumber);
    setError(validationError);

    if (validationError) {
      return;
    }

    try {
      await login();
      navigate('/dashboard');
    } catch (err) {
      setApiError('Login failed. Could not fetch user data.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
             <Input
                label="Phone Number (Iran format)"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="09123456789"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if(error) setError(validatePhoneNumber(e.target.value));
                }}
                error={error}
              />
          </div>
          
          {apiError && (
            <p className="text-sm text-red-500 text-center">{apiError}</p>
          )}

          <div>
            <Button type="submit" isLoading={loading}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
