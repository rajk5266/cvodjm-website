// types/login.ts
export interface LoginFormData {
    email: string;
    password: string;
}

export interface LoginFormErrors {
    email?: string;
    password?: string;
    general?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

// export type IdentifierType = 'email' | 'phone';