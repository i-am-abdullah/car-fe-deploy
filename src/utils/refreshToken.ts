// utils/refreshToken.ts
import { post } from './api'
import { setTokens, getRefreshToken, clearTokens } from './tokenUtils'

export async function refreshToken(): Promise<string> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    clearTokens()
    throw new Error('No refresh token available')
  }

  const { accessToken, refreshToken: newRefresh } = await post<{
    accessToken: string
    refreshToken?: string
  }>('/auth/refresh', { data: { refreshToken } , withAuth: false })

  if (!accessToken) {
    clearTokens()
    throw new Error('Invalid refresh response')
  }

  setTokens(accessToken, newRefresh || refreshToken)
  return accessToken
}
