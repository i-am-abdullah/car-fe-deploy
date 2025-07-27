// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getAccessToken, getRefreshToken, clearTokens } from '../utils/tokenUtils'
import { refreshToken } from '../utils/refreshToken'
import toast from 'react-hot-toast'

// Add the parseJwt function if not already imported
export function parseJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT token:', error);
    return null;
  }
}

interface UseAuthOptions {
  redirectTo?: string;
}

export function useAuth(options: UseAuthOptions = {}) {
  const { redirectTo = '/login' } = options;
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function init() {
      const access = getAccessToken();
      
      if (access) {
        // Parse the token to get user info
        const payload = parseJwt(access);
        
        if (payload) {
          setUser(payload);
          const userIsAdmin = payload.role === 'admin';
          setIsAdmin(userIsAdmin);
          
          // Check if current route is an admin route
          const isAdminRoute = pathname.includes('/admin');
          
          if (isAdminRoute && !userIsAdmin) {
            toast.error('Admin access required.');
            router.replace('/dashboard');
            setLoading(false);
            return;
          }
          
          setLoading(false);
          return;
        }
      }

      // Try to refresh token if no valid access token
      const refresh = getRefreshToken();
      if (refresh) {
        try {
          await refreshToken();
          
          // After refresh, get the new access token and check role again
          const newAccess = getAccessToken();
          if (newAccess) {
            const payload = parseJwt(newAccess);
            
            if (payload) {
              setUser(payload);
              const userIsAdmin = payload.role === 'admin';
              setIsAdmin(userIsAdmin);
              
              // Check if current route is an admin route
              const isAdminRoute = pathname.includes('/admin');
              
              if (isAdminRoute && !userIsAdmin) {
                toast.error('Admin access required.');
                router.replace('/dashboard');
                setLoading(false);
                return;
              }
              
              setLoading(false);
              return;
            }
          }
        } catch {
          // fall through to logout
        }
      }

      // If we reach here, user is not authenticated
      clearTokens();
      toast.error('Please log in.');
      router.replace(redirectTo);
      setLoading(false);
    }

    init();
  }, [router, redirectTo, pathname]);

  return { 
    loading, 
    user, 
    isAdmin,
    // Helper method to check if current user is admin
    checkAdmin: () => isAdmin,
    // Helper method to check if current route is admin route
    isAdminRoute: pathname.includes('/admin')
  };
}