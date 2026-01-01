import api from '../lib/api';
import type { ApiResponse, User, UpdateProfileData } from '../types';

export const userService = {
  async updateProfile(data: UpdateProfileData): Promise<ApiResponse<User>> {
    const response = await api.put<ApiResponse<User>>('/user/profile', data);
    return response.data;
  },

  async deleteAccount(): Promise<ApiResponse> {
    const response = await api.delete<ApiResponse>('/user/account');
    return response.data;
  },
};
