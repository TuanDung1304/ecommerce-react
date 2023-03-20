import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  return user?.username ? <>{children}</> : <Navigate to={'/login'} />;
};
