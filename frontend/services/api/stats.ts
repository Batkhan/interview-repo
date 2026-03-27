import { apiClient } from './client';
import { APIResponse, UserStats } from '../../types';

export const statsAPI = {
  getStats: async (): Promise<UserStats> => {
    const { data } = await apiClient.get<APIResponse<UserStats>>('/user/stats');
    return data.data;
  },
};
