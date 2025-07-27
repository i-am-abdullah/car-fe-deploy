// utils/refreshToken.ts
import axios from 'axios'
import { baseUrl } from '../constants'
import { setTokens, getRefreshToken, clearTokens } from './tokenUtils'

export async function refreshToken(): Promise<string> {
  const refreshToken = getRefreshToken()
  if (!refreshToken) {
    clearTokens()
    throw new Error('No refresh token available')
  }

  try {
    // Use axios directly to avoid recursive calls to our API utility
    const response = await axios.post<{
      accessToken: string
      refreshToken?: string
    }>(`${baseUrl}/auth/refresh`, 
      { refreshToken }, // data
      {
        headers: {
          'Content-Type': 'application/json',
        },
        // Explicitly no auth header - this is the refresh call
      }
    )

    const { accessToken, refreshToken: newRefresh } = response.data

    if (!accessToken) {
      clearTokens()
      throw new Error('Invalid refresh response')
    }

    setTokens(accessToken, newRefresh || refreshToken)
    return accessToken
  } catch (error: any) {
    // Clear tokens on any refresh error
    clearTokens()
    
    // Re-throw the original error so the API utility can handle it properly
    throw error
  }
}