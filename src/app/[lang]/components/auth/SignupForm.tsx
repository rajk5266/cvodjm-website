// components/auth/SignupForm.tsx
import React from 'react';
import { Mail, User, Lock } from 'lucide-react';
import InputField from './Input';
import SubmitButton from './SubmitButton';
import ErrorMessage from './ErrorMessage';
import { useSignupForm } from '@/hooks/useSignupForm';

const SignupForm: React.FC = () => {
    const {
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        isLoading,
        formData,
        errors,
        handleInputChange,
        handleSubmit,
    } = useSignupForm();

    return (
        <div className="space-y-6">
            {/* Name field */}
            <InputField
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="Enter your full name"
                icon={<User className="w-5 h-5" />}
                error={errors.name}
            />

            {/* Email field */}
            <InputField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder="Enter your email"
                icon={<Mail className="w-5 h-5" />}
                error={errors.email}
                autoComplete="email" // ✅ add this
            />

            {/* Password field */}
            <InputField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
                placeholder="Enter your password"
                icon={<Lock className="w-5 h-5" />}
                error={errors.password}
                showPasswordToggle={true}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
            />

            {/* Confirm Password field */}
            <InputField
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(value) => handleInputChange('confirmPassword', value)}
                placeholder="Confirm your password"
                icon={<Lock className="w-5 h-5" />}
                error={errors.confirmPassword}
                showPasswordToggle={true}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {/* General error */}
            {errors.general && <ErrorMessage message={errors.general} />}

            {/* Submit button */}
            <SubmitButton
                isLogin={false}
                isLoading={isLoading}
                onClick={handleSubmit}
            />
        </div>
    );
};

export default SignupForm;
