import { LoginSchema } from '@/schemas';
import request from '@/utils/request';

export const getUserInfo = () =>
  request<LoginSchema.IUserInfoAPI['Response']>({
    url: '/productopen/user',
    method: 'get',
    withCredentials: true,
  });
