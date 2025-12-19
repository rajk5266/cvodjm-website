// components/auth/LoginForm.tsx
'use client'
import React from 'react';
import { Mail, Lock } from 'lucide-react';
import InputField from './Input';
import SubmitButton from './SubmitButton';
import ErrorMessage from './ErrorMessage';
import ForgotPasswordLink from './ForgotPasswordLink';
import { useLoginForm } from '@/hooks/useLoginForm';

const LoginForm: React.FC = () => {
    const {
        showPassword,
        setShowPassword,
        isLoading,
        formData,
        errors,
        handleInputChange,
        handleSubmit,
    } = useLoginForm();

    return (
        <div className="space-y-6">
            {/* Email field */}
            <InputField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                icon={<Mail className="w-5 h-5" />}
                error={errors.email}
                autoComplete="email" //
            />

            {/* Password field */}
            <InputField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
                placeholder="Enter your password"
                icon={<Lock className="w-5 h-5" />}
                error={errors.password}
                showPasswordToggle={true}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                autoComplete="current-password" // 
            />

            {/* General error */}
            {errors.general && <ErrorMessage message={errors.general} />}

            {/* Forgot password link */}
            <ForgotPasswordLink />

            {/* Submit button */}
            <SubmitButton
                isLogin={true}
                isLoading={isLoading}
                onClick={handleSubmit}
            />
        </div>
    );
};

export default LoginForm;
