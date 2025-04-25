import { Navigate, useLocation } from 'react-router-dom';
import { decodeToken } from './auth';

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem('authToken');
  const decodedToken = decodeToken(token);
  
  console.log('Auth check:', {
    isAuthenticated: !!decodedToken,
    tokenInfo: decodedToken ? {
      username: decodedToken.username,
      role: decodedToken.role,
      tokenExpiry: decodedToken.exp
    } : null
  });

  if (!decodedToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return element;
};

export default PrivateRoute;