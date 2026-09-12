import { request } from './client';
import { User } from '../types/user';

export interface SendOtpResponse {
  success: boolean;
  message: string;
  phone: string;
  demoOtp?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  token: string;
  user: User;
}

export const authApi = {
  sendOtp: (phone: string) =>
    request<SendOtpResponse>('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),

  verifyOtp: (phone: string, otp: string) =>
    request<VerifyOtpResponse>('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    }),

  logout: () =>
    request<{ success: boolean; message: string }>('/api/auth/logout', {
      method: 'POST',
    }),
};
