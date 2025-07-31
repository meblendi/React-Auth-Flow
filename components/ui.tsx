
import React, { forwardRef } from 'react';

// Spinner Component
export const Spinner: React.FC = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, className, isLoading, ...props }) => {
  return (
    <button
      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors ${className}`}
      {...props}
      disabled={isLoading || props.disabled}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, name, error, ...props }, ref) => {
  const errorId = name ? `${name}-error` : undefined;
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="mt-1">
        <input
          id={name}
          name={name}
          ref={ref}
          className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-500 focus:outline-none sm:text-sm bg-gray-800 transition-colors
            ${error 
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500 text-red-400' 
              : 'border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-gray-100'
            }
          `}
          aria-invalid={!!error}
          aria-describedby={errorId}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500" id={errorId}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
