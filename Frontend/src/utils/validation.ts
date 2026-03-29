// Input validation helpers used in auth forms and contact forms.

// Returns true for a valid email address.
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

// Returns true if the password meets the minimum security requirements.
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

// Returns true if the password meets all four security rules
// shown on the CreateNewPasswordScreen checklist.
export const isStrongPassword = (password: string): boolean => {
  return (
    password.length >= 8 && /\d/.test(password) && /[^a-zA-Z0-9]/.test(password)
  );
};

// Returns true if both password strings are non-empty and identical.
export const passwordsMatch = (a: string, b: string): boolean => {
  return a.length > 0 && a === b;
};

// Returns true for a non-empty full name (at least 2 characters).
export const isValidFullName = (name: string): boolean => {
  return name.trim().length >= 2;
};

// Returns true for a plausible phone number (digits, spaces, +, -, parentheses).
export const isValidPhone = (phone: string): boolean => {
  return /^[+\d\s\-()]{7,15}$/.test(phone.trim());
};

// Returns true for a 4-digit numeric PIN (used for Bean pairing).
export const isValidPairingPin = (pin: string): boolean => {
  return /^\d{4}$/.test(pin);
};

// Returns true for a 6-digit OTP code.
export const isValidOtp = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};

// Returns a user-friendly error message for an email field, or null if valid.
export const emailError = (email: string): string | null => {
  if (!email.trim()) return 'Email address is required.';
  if (!isValidEmail(email)) return 'Please enter a valid email address.';
  return null;
};

// Returns a user-friendly error message for a password field, or null if valid.
export const passwordError = (password: string): string | null => {
  if (!password.trim()) return 'Password is required.';
  if (!isValidPassword(password))
    return 'Password must be at least 6 characters.';
  return null;
};
