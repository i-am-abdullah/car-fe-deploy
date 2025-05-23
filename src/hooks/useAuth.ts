// hooks/useAuth.ts
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAccessToken, getRefreshToken, clearTokens } from '../utils/tokenUtils'
import { refreshToken } from '../utils/refreshToken'
import toast from 'react-hot-toast'

export function useAuth(redirectTo: string = '/login') {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      const access = getAccessToken()
      if (access) {
        setLoading(false)
        return
      }

      const refresh = getRefreshToken()
      if (refresh) {
        try {
          await refreshToken()
          setLoading(false)
          return
        } catch {
          // fall through to logout
        }
      }

      clearTokens()
      toast.error('Please log in.')
      router.replace(redirectTo)
    }

    init()
  }, [router, redirectTo])

  return { loading }
}
