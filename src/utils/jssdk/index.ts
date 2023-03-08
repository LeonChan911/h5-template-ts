/* eslint-disable no-console */
import env from '@/utils/env';
import {
    initNativeSDK,
    nativeGetDeviceInfo,
    nativeSlideClose,
    nativeSetTitle,
    nativeSetNavLeft,
    nativeSetNavRight,
    nativeDownloadImage,
    nativeSaveTempData,
    nativeShare,
    nativeLogin,
    nativeOpenLink,
    nativeGetUserInfo,
    nativePullRefresh,
    nativeClosePage,
    nativeGetUserListenData,
    nativeEncrypt,
    nativeSetMenu,
} from './native';

const errorMsg = (api: string) => `请在喜马拉雅APP中打开-${api}`;

// 为什么有的sdk调用失败要reject error，而有的只用console一下
// 比如saveTempData这种 业务代码肯定要返回值的，没有返回值可能会使得后面代码出错，所以reject error去catch中断 避免依赖返回值不符合预期
// 没有返回值的sdk调用大不了console一下 不影响代码执行的，就像阻止页面右滑关闭这种 执行失败也没关系

// sdk初始化
export const initSDK = (successFn: () => void, errorFn: () => void) => {
    // 如果是主app环境
    console.log('initSDK');
    if (env.isNative) {
        console.log('inNative');
        initNativeSDK(successFn, errorFn);
    } else {
        console.warn('There is no sdk for current environment');
        errorFn();
    }
};
// 获取设备信息
export const getDeviceInfo = () => {
    if (env.isNative) {
        return nativeGetDeviceInfo();
    }

    return Promise.reject(new Error(errorMsg('device.getDeviceInfo')));
};

// 禁止页面右滑关闭
export const disableSlideClose = () => {
    if (env.isNative) {
        nativeSlideClose();
    } else {
        console.error(errorMsg('util.slideClose'));
    }
};

// 设置页面title
export const setTitle = (title: string) => {
    if (env.isNative) {
        nativeSetTitle(title);
    } else {
        document.title = title;
    }
};

// 设置左上角按钮
export const setNavLeft = (data: {
    text?: string;
    control?: boolean;
    success?: (data: any) => any;
}) => {
    if (env.isNative) {
        nativeSetNavLeft(data);
    } else {
        console.error(errorMsg('nav.setLeft'));
    }
};

// 设置右上角按钮
export const setNavRight = (data: {
    disable?: boolean;
    text?: string;
    control?: boolean;
    color?: string;
    success?: (data: any) => any;
}) => {
    if (env.isNative) {
        nativeSetNavRight(data);
    } else {
        console.error(errorMsg('nav.setRight'));
    }
};

// 设置右侧菜单
export const setRightMenu = (
    items: { id: string; icon: string; text: string }[],
    success: (id: { id: string }) => void,
) => {
    if (env.isNative) {
        console.log('setmmmm');
        nativeSetMenu(items, success);
    } else {
        console.error(errorMsg('nav.setRight'));
    }
};

// 下载图片
export const downloadImage = (data: { type: 'url' | 'base64'; source: string }) => {
    if (env.isNative) {
        return nativeDownloadImage(data);
    }
    return Promise.reject(new Error(errorMsg('util.downloadImage')));
};

// 暂存数据至本地 图片或Json
export const saveTempData = (data: { type: 'base64' | 'json'; data: string }) => {
    if (env.isNative) {
        return nativeSaveTempData(data);
    }
    return Promise.reject(new Error(errorMsg(' util.saveTempData')));
};

// 去分享
export const toShare = (data: {
    channel: string[];
    title?: string;
    desc?: string;
    link?: string;
    imgUrl?: string;
    type?: string;
    dataUrl?: string;
    success: (data: any) => void;
}) => {
    if (env.isNative) {
        return nativeShare(data);
    }

    return Promise.reject(new Error(errorMsg('util.share')));
};

// 登录
export function login(data: {
    halfScreen?: boolean;
    control?: boolean;
    success?: (data: { uid: number; imgUrl: string; token: string; nickName: string }) => any;
}): void {
    if (env.isNative) {
        nativeLogin(data);
    } else {
        console.error(errorMsg('account.login'));
    }
}

// 获取用户信息
export function getUserInfo() {
    // ! 本地开发测试用
    if (env.isDev && !env.isNative) {
        return { isLogin: true, nickName: '始悔不悟', uid: 161974722 };
    }
    // ! 本地开发测试用

    if (env.isNative) {
        return nativeGetUserInfo();
    }
    return Promise.reject(new Error(errorMsg('account.getUserInfo')));
}

// 启用下拉刷新
export function pullRefresh(data: { enable: boolean }) {
    if (env.isNative) {
        nativePullRefresh(data);
    } else {
        console.error(errorMsg('page.pullToRefresh/page.stopPullToRefresh'));
    }
}

// 关闭页面
export function closePage() {
    if (env.isNative) {
        nativeClosePage();
    } else {
        console.error(errorMsg('nav.close'));
    }
}

// 打开页面 备注：跳转延迟，跳转前必须有延迟，支持埋点发送
export function openPage(data: { url: string }, delay?: number) {
    setTimeout(() => {
        if (env.isNative) {
            try {
                nativeOpenLink(data);
            } catch (error) {
                window.location.href = data.url;
            }
        } else {
            window.location.href = data.url;
        }
    }, delay || 100);
}

// 获取用户收听时长
export const getUserListenData = () => {
    // ! 本地开发测试用
    if (env.isDev && !env.isNative) {
        return { dailyListeningTask: { listenTime: 31 } };
    }
    // ! 本地开发测试用

    if (env.isNative) {
        return nativeGetUserListenData();
    }
    return Promise.reject(new Error(errorMsg(' busi.getUserListenData')));
};

// 加密数据
export const encryptData = (data: { type: 'rsa'; data: { [key: string]: string } }) => {
    // ! 本地开发测试用
    if (env.isDev && !env.isNative) {
        return { checkData: 'zzwzstbl' };
    }
    // ! 本地开发测试用

    if (env.isNative) {
        return nativeEncrypt(data);
    }
    return Promise.reject(new Error(errorMsg(' util.encrypt')));
};
