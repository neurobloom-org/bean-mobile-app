// Re-exports useAuth from AuthContext so screens import from hooks, not context.
//
// Usage:
//   const { user, isAuthenticated, login, logout } = useAuth();

export { useAuth } from '../context/AuthContext';
