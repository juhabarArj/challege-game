import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AdminRoute({ children }) {
  const { userProfile } = useAuth();

  if (!userProfile?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
