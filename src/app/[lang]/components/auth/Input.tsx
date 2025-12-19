// components/auth/InputField.tsx
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { InputFieldProps } from '@/types/types';

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    icon,
    error,
    showPasswordToggle = false,
    showPassword = false,
    onTogglePassword,
    autoComplete // ✅ accept the prop
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
        </label>
        <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
                {icon}
            </div>
            <input
                type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                autoComplete={autoComplete} // ✅ forward to <input>
                className={`w-full pl-11 ${showPasswordToggle ? 'pr-11' : 'pr-4'} py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={placeholder}
            />
            {showPasswordToggle && onTogglePassword && (
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            )}
        </div>
        {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
    </div>
);

export default InputField;
