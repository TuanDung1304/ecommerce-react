import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user?.username ? <Navigate to={'/'} replace /> : <>{children}</>;
};
