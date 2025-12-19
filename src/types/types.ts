// types/auth.ts
export interface FormData {
    email: string;
    password: string;
}

export interface FormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    icon: React.ReactNode;
    error?: string;
    showPasswordToggle?: boolean;
    showPassword?: boolean;
    onTogglePassword?: () => void;
      autoComplete?: string;
}

export interface AuthHeaderProps {
    isLogin: boolean;
}


export interface SubmitButtonProps {
    isLogin: boolean;
    isLoading: boolean;
    onClick: () => void;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData {
    email?: string;
    phone?: string;
    password: string;
}

export type IdentifierType = 'email' | 'phone';