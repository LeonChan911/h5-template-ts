const { toString } = Object.prototype;

export const isUndefined = (x: any): x is undefined => typeof x === 'undefined';

export const isNumber = (x: any): x is number => typeof x === 'number' && !Number.isNaN(x);

export const isBoolean = (x: any): x is boolean => typeof x === 'boolean';

// 是否为普通对象 {k:v}
export function isPlainObject(x: any): x is object {
    return toString.call(x) === '[object Object]';
}

export const isType = (type: string) => (x: any) => toString.call(x).slice(8, -1) === type;

export const isString = isType('String');

export const isFunction = isType('Function');

export const fixNumber = (source: number) => Math.round(source * 100) / 100;

export const isEqual = (a: number, b: number, tolerance: number = 0) =>
    Math.abs(a - b) <= tolerance;

export const camelToUnderline = (str: string) => {
    let result = '';

    for (let i = 0; i < str.length; i += 1) {
        if (str[i] > 'A' && str[i] < 'Z') {
            // result = result + '_' + str[i].toLowerCase();
            result = `${result}_${str[i].toLowerCase()}`;
        } else {
            // result = result + str[i];
            result = `${result}${str[i]}`;
        }
    }

    return result;
};

export const convertParams = (params: any) => {
    const paramsNew = params || {};
    const res: any = {};
    // eslint-disable-next-line
    for (const p in paramsNew) {
        if (p === 'charSet') {
            res.charset = paramsNew[p];
        } else {
            res[camelToUnderline(p)] = paramsNew[p];
        }
    }

    return res;
};

/**
 * async retry to do things
 * @param {*} conditionFn 同步条件函数
 * @param {*} cb 成功回调
 * @param {*} times 最大重试次数
 * @param {*} checkTimeInterval 重试时间间隔
 */
export function retry(
    conditionFn: () => boolean,
    cb: () => void,
    times = 10,
    checkTimeInterval = 1000,
    timeOutFn?: () => void,
) {
    let t = times;
    const setID = setTimeout(() => {
        if (times === 0) {
            clearTimeout(setID);
            if (timeOutFn) timeOutFn();
            return;
        }
        if (conditionFn() === true) {
            clearTimeout(setID);
            cb();
        } else {
            t -= 1;
            // eslint-disable-next-line consistent-return
            return retry(conditionFn, cb, t, checkTimeInterval, timeOutFn);
        }
    });
}

/**
 *  * 注册特殊的全局分享
 *   * @param data
 *    */
export function injectShareSDK(data: {
    title: string;
    desc: string;
    imgUrl: string;
    url: string;
}): void {
    // eslint-disable-next-line no-underscore-dangle
    if (ly && ly._getShareData) {
        return;
    }

    // eslint-disable-next-line no-underscore-dangle
    ly._getShareData = () => {
        return data;
    };
}
