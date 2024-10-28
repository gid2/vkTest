export interface RegisterSchema {
    isLoading: boolean;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    error?: string;
}
