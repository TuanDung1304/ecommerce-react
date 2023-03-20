import { Navigate } from 'react-router-dom';
import Pages from './pages/Pages';
import Login from './pages/auth/Login/Login';
import Register from './pages/auth/Register/Register';
import { MainLayout } from './components/Layout/MainLayout';
import { PrivateRoute } from './routes/PrivateRoute';
import { AuthRoute } from './routes/AuthRoute';
import Cart from './common/Cart/Cart';
import ProductDetail from './pages/ProductDetail';

export const routes = [
  {
    path: '/',
    component: (
      <PrivateRoute>
        <Pages />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: '/cart',
    component: (
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: '/product/:id',
    component: (
      <PrivateRoute>
        <ProductDetail />
      </PrivateRoute>
    ),
    layout: MainLayout,
  },
  {
    path: '/login',
    component: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: '/register',
    component: (
      <AuthRoute>
        <Register />
      </AuthRoute>
    ),
  },
  {
    path: '*',
    component: <Navigate replace to={'/'} />,
  },
];
