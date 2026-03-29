// All auth calls go through here. Screens call these functions so that swapping
// stubs for real Supabase calls only requires changes in this one file.
// TODO: replace every stub return with real Supabase calls from feature/backend-fix.

import { AuthUser, UserRole } from '../context/AuthContext';

export interface LoginPayload {
  email: string;
  password: string;
}
export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  token?: string;
  error?: string;
}
export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

// TODO: const { data, error } = await supabase.auth.signInWithPassword({ email, password })
export const signInUser = async (
  payload: LoginPayload,
): Promise<AuthResult> => {
  return {
    success: true,
    user: { id: 'stub-user-id', email: payload.email, role: 'user' },
    token: 'stub-token',
  };
};

// TODO: same as signInUser + check guardians table for this user_id
export const signInGuardian = async (
  payload: LoginPayload,
): Promise<AuthResult> => {
  return {
    success: true,
    user: { id: 'stub-guardian-id', email: payload.email, role: 'guardian' },
    token: 'stub-token',
  };
};

// TODO: await supabase.auth.signInWithOAuth({ provider })
export const signInWithSocial = async (
  provider: 'google' | 'apple' | 'facebook',
  role: UserRole,
): Promise<AuthResult> => {
  return {
    success: true,
    user: { id: `stub-${provider}-id`, email: '', role },
    token: 'stub-social-token',
  };
};

// TODO: await supabase.auth.signUp({ email, password, options: { data: { fullName, role } } })
export const registerUser = async (
  payload: RegisterPayload,
): Promise<AuthResult> => {
  return {
    success: true,
    user: {
      id: 'stub-new-id',
      email: payload.email,
      role: payload.role,
      fullName: payload.fullName,
    },
    token: 'stub-token',
  };
};

// TODO: await supabase.auth.signOut()
export const signOut = async (): Promise<void> => {};

// TODO: await supabase.auth.resetPasswordForEmail(email)
export const sendPasswordResetEmail = async (
  email: string,
): Promise<{ success: boolean; error?: string }> => {
  return { success: true };
};

// TODO: await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
export const verifyOtp = async (
  email: string,
  otp: string,
): Promise<{ success: boolean; error?: string }> => {
  return { success: true };
};

// TODO: await supabase.auth.updateUser({ password: newPassword })
export const updatePassword = async (
  newPassword: string,
): Promise<{ success: boolean; error?: string }> => {
  return { success: true };
};
