// types/signup.ts
export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignupFormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
}

export interface SignupData {
    name: string;
    email?: string;
    password: string;
}
