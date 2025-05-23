// services/authService.ts
import { FileWithPath } from '@mantine/dropzone'
import { post } from '../utils/api'
import { setTokens, clearTokens } from '../utils/tokenUtils'
import toast from 'react-hot-toast'
import { uploadFile } from '@/utils/fileUpload'

export interface SignupPayload {
  first_name: string
  last_name?: string | null
  phone_number: string
  profile_picture_url?: string | null
  username: string
  email: string
  password: string
  profileFile?: FileWithPath;
}

export interface LoginPayload {
  email: string
  password: string
}

export async function signup(data: SignupPayload) {
    try {
      let profile_picture_url: string | null = null;
  
      // if user provided a file, upload it first
      if (data.profileFile) {
        profile_picture_url = await uploadFile(data.profileFile as File);
      }
  
      // call signup endpoint
      await post('/auth/register', {
        data: {
          first_name: data.first_name,
          last_name: data.last_name ?? null,
          phone_number: data.phone_number,
          profile_picture_url,
          username: data.username,
          email: data.email,
          password: data.password,
        },
        withAuth: false,
      });
  
      toast.success('Account created! Please log in.');
    } catch (err) {
      // apiRequest / uploadFile already toasts errors
      throw err;
    }
  }
  

export async function login(data: LoginPayload) {
  try {
    const { accessToken, refreshToken, user } = await post<{
      accessToken: string
      refreshToken: string
      user:any
    }>('/auth/login', { data, withAuth: false })

    setTokens(accessToken, refreshToken)
    toast.success('Logged in successfully!')
    return user
  } catch (err) {
    // already handled
    throw err
  }
}

export function logout() {
  clearTokens()
  toast('Logged out.')
  window.location.href = '/login'
}
