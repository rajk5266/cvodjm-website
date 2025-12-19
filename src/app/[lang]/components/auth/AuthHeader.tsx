// components/auth/AuthHeader.tsx
import React from 'react';
import { User } from 'lucide-react';
import { AuthHeaderProps } from '@/types/types';

const AuthHeader: React.FC<AuthHeaderProps> = ({ isLogin }) => (
    <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-gray-600">
            {isLogin
                ? 'Sign in to your account'
                : 'Sign up to get started'
            }
        </p>
    </div>
);

export default AuthHeader;