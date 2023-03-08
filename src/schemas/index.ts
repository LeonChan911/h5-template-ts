/*
 * @Author: your name
 * @Date: 2022-04-26 09:25:27
 * @LastEditTime: 2022-04-26 13:00:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-template-ts/src/schemas/index.ts
 */
import * as DemoSchema from './demo';
import * as LoginSchema from './login';

export { DemoSchema, LoginSchema };

// response wrapper
export interface Response<T> {
  code: number;
  msg: string;
  data: T;
}
