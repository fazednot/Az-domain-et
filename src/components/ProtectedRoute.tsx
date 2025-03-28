import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../lib/store';

export default function ProtectedRoute() {
  const user = useStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}