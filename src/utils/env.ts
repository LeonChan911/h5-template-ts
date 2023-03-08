/*
 * @Author: your name
 * @Date: 2022-04-26 11:07:05
 * @LastEditTime: 2022-04-26 11:10:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-template-ts/src/utils/env.ts
 */
import { CommonConstant } from '@/constant';
import { CommonEnum } from '@/enum';
import qs from 'qs';
import { parse } from '@xmly/xmly-ua-parser';

const { REACT_APP_ENV } = process.env;

const isSupportWebp =
    !![].map &&
    document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0;

const ua = navigator.userAgent.toLowerCase();

const getFullParamValue = () => {
    const queryObj = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    const fullWithTransparentBarQuery = queryObj[CommonConstant.SEARCH_KEYS.FullWithTransparentBar];

    return Array.isArray(fullWithTransparentBarQuery)
        ? fullWithTransparentBarQuery[0]
        : fullWithTransparentBarQuery;
};

const parserXmlyUa = () => {
    return parse(navigator.userAgent);
};

export default {
    isDev: REACT_APP_ENV === 'dev',
    isTest: REACT_APP_ENV === 'test',
    isUat: REACT_APP_ENV === 'uat',
    isProd: REACT_APP_ENV === 'prod',
    isAndroid: /linux|android/.test(ua),
    isSafari: /safari/.test(ua) && !/chrome/.test(ua),
    isIos: !!ua.match(/\(i[^;]+;( u;)? cpu.+mac os x/),
    isWeiXin: /micromessenger/.test(ua),
    isNative: /iting/i.test(ua),
    isMobile: /mobile/.test(ua),
    isWeiXinDebug: /wxdebug/.test(window.location.href),
    isDebug: !!/__debug/.test(window.location.href),
    isSupportWebp,
    /* 不再支持暗黑主题使用 */
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    isXmlyDomain: /ximalaya.com/i.test(window.location.host),
    isFull: getFullParamValue() === CommonEnum.FullEnum.YES,
    parserXmlyUa,
};
