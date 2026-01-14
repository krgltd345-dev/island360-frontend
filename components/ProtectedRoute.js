'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';

/**
 * Component to protect routes that require authentication
 */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const router = useRouter();

  useEffect(() => {
    // TODO: Implement authentication check
    // For now, this is a placeholder
    // const authenticated = isAuthenticated();
    // if (!authenticated) {
    //   router.push('/login');
    //   return;
    // }
    
    // if (requireAdmin) {
    //   const admin = isAdmin();
    //   if (!admin) {
    //     router.push('/mybookings');
    //     return;
    //   }
    // }
  }, [router, requireAdmin]);

  return <>{children}</>;
}

