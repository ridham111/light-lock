// Mock authentication service

interface AuthResult {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

// Mock user database
const VALID_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: 'Demo User',
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock login function
 * @param email User email
 * @param password User password
 * @returns Promise with auth result
 */
export const login = async (email: string, password: string): Promise<AuthResult> => {
  // Simulate API call delay
  await delay(1000);
  
  const user = VALID_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  
  if (user) {
    // In a real app, you would set cookies, tokens, etc.
    // For this demo, we'll just return the success result
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
  
  return {
    success: false,
    message: 'Invalid email or password',
  };
};

/**
 * Check if user is authenticated
 * In a real app, this would verify tokens, session, etc.
 * For this demo, we'll just simulate it
 */
export const isAuthenticated = (): boolean => {
  // In a real app, check for valid token/session
  // For demo purposes, we'll just return true if we're on the dashboard page
  if (typeof window !== 'undefined') {
    return window.location.pathname.includes('/dashboard');
  }
  return false;
};

/**
 * Mock logout function
 */
export const logout = async (): Promise<void> => {
  // Simulate API call delay
  await delay(500);
  
  // In a real app, clear tokens, cookies, etc.
  // For this demo, we'll just redirect to home
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};