/*
 * @Author: your name
 * @Date: 2022-04-26 09:25:27
 * @LastEditTime: 2022-04-26 12:52:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-template-ts/src/services/demo.ts
 */
import { request } from '@/utils';
import { DemoSchema } from '@/schemas';

export const login = (data: DemoSchema.LoginAPI['Params']) =>
  request<DemoSchema.LoginAPI['Response']>({
    url: '/login/account',
    method: 'post',
    data,
  });
