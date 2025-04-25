import { jwtDecode } from 'jwt-decode';

export interface TokenPayload {
  username: string;
  role: string;
  exp: number;
}

export const decodeToken = (token: string | null): TokenPayload | null => {
  if (!token) return null;
  
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    
    if (decoded.exp < currentTime) {
      console.log('Token expired');
      return null;
    }
    
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return decodeToken(token) !== null;
};
