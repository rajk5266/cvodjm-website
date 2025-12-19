// components/auth/SubmitButton.tsx
import React from 'react';
import { SubmitButtonProps } from '@/types/types';

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLogin, isLoading, onClick }) => (
    <button
        onClick={onClick}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
        {isLoading ? (
            <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {isLogin ? 'Signing In...' : 'Creating Account...'}
            </div>
        ) : (
            isLogin ? 'Sign In' : 'Create Account'
        )}
    </button>
);

export default SubmitButton;