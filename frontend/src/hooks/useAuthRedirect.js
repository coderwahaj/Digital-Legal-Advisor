import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useAuthRedirect = (redirectPath = '/platform') => {
  const { isAuth, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (! loading && isAuth) {
      // Redirect admin to admin dashboard
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        // Redirect regular users to platform
        navigate(redirectPath);
      }
    }
  }, [isAuth, user, loading, navigate, redirectPath]);
};

export default useAuthRedirect;