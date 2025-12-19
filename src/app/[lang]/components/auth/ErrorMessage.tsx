// components/auth/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-3">
        <p className="text-sm text-red-600">{message}</p>
    </div>
);

export default ErrorMessage;