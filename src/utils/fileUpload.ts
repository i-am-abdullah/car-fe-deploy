import axios from 'axios';
import { baseUrl } from '../constants';
import toast from 'react-hot-toast';
import { getAccessToken } from './tokenUtils';

export async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);

  try {
    const res = await axios.post<{ url: string }>(
      `${baseUrl}/files/upload`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return res.data.url;
  } catch (err: any) {
    const msg =
      err.response?.data?.message ||
      err.message ||
      'Failed to upload file';
    toast.error(msg);
    throw new Error(msg);
  }
}
