// utils/api.ts
import axios, { AxiosRequestConfig, Method } from 'axios'
import toast from 'react-hot-toast'
import { baseUrl } from '../constants'
import {
  getAccessToken,
  clearTokens,
} from './tokenUtils'
import { refreshToken as doRefresh } from './refreshToken'

export interface ApiRequestOptions {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: Record<string, string>
  withAuth?: boolean
}

export async function apiRequest<T = any>({
  url,
  method = 'GET',
  data,
  params,
  headers,
  withAuth = true,
}: ApiRequestOptions): Promise<T> {
  try {
    let token = withAuth ? getAccessToken() : null

    if (withAuth && !token) {
      const newToken = await doRefresh()
      token = newToken
    }

    const config: AxiosRequestConfig = {
      baseURL: baseUrl,
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      params,
      data,
    }

    const response = await axios.request<T>(config)

    return response.data
  } catch (err: any) {
    console.log(err);

    // if 401 and we haven't just retried via refresh flow, do it now
    if (err.response?.status === 401) {
      console.log("error is ", err.response?.status);

      try {
        const newToken = await doRefresh()
        // retry original with fresh token
        return apiRequest<T>({ url, method, data, params, headers, withAuth })
      } catch {
        // failed to refresh, force logout
        clearTokens()
        toast.error('Session expired, please log in again.')
        throw new Error('Authentication expired')
      }
    }
    if (err.response?.status) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Something went wrong'        
      toast.error(msg)
      throw new Error(msg)
    }

    const msg =
      err.response?.data?.message ||
      err.message ||
      'Something went wrong'
    window.location.href = '/login';
    throw new Error(msg)
  }
}

// shorthand helpers
export const get = <T>(url: string, opts: Omit<ApiRequestOptions, 'url' | 'method'> = {}) =>
  apiRequest<T>({ url, method: 'GET', ...opts })

export const post = <T>(url: string, opts: Omit<ApiRequestOptions, 'url' | 'method'> = {}) =>
  apiRequest<T>({ url, method: 'POST', ...opts })

export const put = <T>(url: string, opts: Omit<ApiRequestOptions, 'url' | 'method'> = {}) =>
  apiRequest<T>({ url, method: 'PUT', ...opts })

export const patch = <T>(url: string, opts: Omit<ApiRequestOptions, 'url' | 'method'> = {}) =>
  apiRequest<T>({ url, method: 'PATCH', ...opts })

export const del = <T>(url: string, opts: Omit<ApiRequestOptions, 'url' | 'method'> = {}) =>
  apiRequest<T>({ url, method: 'DELETE', ...opts })
