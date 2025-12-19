// pages/SignupPage.tsx
'use client';

import React from 'react';
import AuthHeader from '@/app/[lang]/components/auth/AuthHeader';
import SignupForm from '@/app/[lang]/components/auth/SignupForm';
// import GoogleLoginButton from '@/app/[lang]/components/ui/GoogleLoginButton';
import { useParams } from "next/navigation";

const SignupPage: React.FC = () => {

    const { lang } = useParams();
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <AuthHeader isLogin={false} />
                    
                    <SignupForm />

                    {/* Social Login */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        
                        <div className="mt-4">
                            {/* <GoogleLoginButton /> */}
                        </div>
                    </div>

                    {/* Link to Login */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <a href={`/${lang}/login`} className="text-blue-600 hover:text-blue-700 font-medium">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;