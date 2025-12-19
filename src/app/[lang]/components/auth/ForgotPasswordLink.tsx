// components/auth/ForgotPasswordLink.tsx
import React from 'react';

const ForgotPasswordLink: React.FC = () => (
    <div className="text-right">
        <button
            type="button"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
            Forgot password?
        </button>
    </div>
);

export default ForgotPasswordLink;