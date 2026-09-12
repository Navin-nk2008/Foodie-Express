import { request } from './client';
import { User, Address } from '../types/user';

export const userApi = {
  getProfile: () => request<{ user: User }>('/api/users/me'),

  updateProfile: (data: Partial<User>) =>
    request<{ user: User; message: string }>('/api/users/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  addAddress: (address: Address) =>
    request<{ address: Address; addresses: Address[] }>('/api/users/addresses', {
      method: 'POST',
      body: JSON.stringify(address),
    }),
};
