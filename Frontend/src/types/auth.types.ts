// Type definitions for the authentication domain.

export type UserRole = 'user' | 'guardian';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
}

export type SocialProvider = 'google' | 'apple' | 'facebook';
