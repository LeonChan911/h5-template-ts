/* eslint-disable no-console */
import { lyConfigApiList } from '@xmly/popup-checkstand';

// 初始化 native app sdk
export const initNativeSDK = (successFn: () => void, errorFn: () => void) => {
    console.log('init native sdk start');
    ly.config({
        appId: 'd0dbceec47f2a37e908a5cce3cddc30a',
        apiList: [
            'account.login',
            'account.getUserInfo',
            'nav.setRight',
            'nav.setLeft',
            'nav.setTitle',
            'nav.close',
            'util.share',
            'util.uploadImage',
            'util.downloadImage',
            'util.open',
            'util.openLink',
            'util.saveTempData',
            'util.slideClose',
            'util.encrypt',
            'nav.setMenu',
            'page.pullToRefresh',
            'page.stopPullToRefresh',
            'busi.getUserListenData',
            'device.getDeviceInfo',
        ].concat(lyConfigApiList),
    });
    ly.ready(() => {
        console.log('init native sdk success');
        successFn();
    });
    ly.error((error: any) => {
        console.error(`init native sdk error: ${error}`);
        errorFn();
    });
};

// native sdk promise化
const nativeSDKPromisify = (api: string, data?: any) =>
    new Promise((resolve, reject) => {
        ly.invokeApp(api, {
            ...data,
            success: resolve,
            fail: reject,
        });
    }).catch(err => {
        console.error(`native sdk ${api} 调用失败：${JSON.stringify(err)}`);
        throw err;
    });

// native 获取设备信息
export const nativeGetDeviceInfo = () => nativeSDKPromisify('device.getDeviceInfo');

// native 禁止页面右滑关闭
export const nativeSlideClose = () => {
    ly.invokeApp('util.slideClose', { disable: true });
};

// native 设置页面title
export const nativeSetTitle = (title: string) => {
    ly.invokeApp('nav.setTitle', { title });
};

// native 设置导航左侧按钮
export const nativeSetNavLeft = (data: {
    text?: string;
    control?: boolean;
    success?: (data: any) => any;
}) => {
    ly.invokeApp('nav.setLeft', data);
};

// native 设置导航右侧按钮
export const nativeSetNavRight = (data: {
    disable?: boolean;
    text?: string;
    control?: boolean;
    color?: string;
    success?: (data: any) => any;
}) => {
    ly.invokeApp('nav.setRight', data);
};

// native 下载图片
export const nativeDownloadImage = (data: { type: 'url' | 'base64'; source: string }) =>
    nativeSDKPromisify('util.downloadImage', data);

// native 将base64或json放到本地缓存空间 支持分享与下载
export const nativeSaveTempData = (data: { type: 'base64' | 'json'; data: string }) =>
    nativeSDKPromisify('util.saveTempData', data);

// native 分享
export const nativeShare = (data: {
    channel: string[];
    title?: string;
    desc?: string;
    link?: string;
    imgUrl?: string;
    type?: string;
    dataUrl?: string;
}) => nativeSDKPromisify('util.share', data);

// native 登录
export const nativeLogin = (data: {
    halfScreen?: boolean;
    control?: boolean;
    success?: (data: { uid: number; imgUrl: string; token: string; nickName: string }) => any;
}) => {
    ly.invokeApp('account.login', data);
};

// native 打开应用内页面
export const nativeOpen = (data: {
    name: string;
    params?: { [key: string]: string | number };
    keep?: boolean;
    success?: (...args: any[]) => any;
}) => {
    ly.invokeApp('util.open', data);
};

// native 打开页面
export const nativeOpenLink = (data: { url: string }) => {
    ly.invokeApp('util.openLink', data);
};

// native 设置菜单
export const nativeSetMenu = (
    items: { id: string; icon: string; text: string }[],
    success: (id: { id: string }) => void,
) => {
    console.log(items);
    ly.invokeApp('nav.setMenu', { items, success });
};

// native获取用户信息
export const nativeGetUserInfo = () => nativeSDKPromisify('account.getUserInfo');

// 启用下拉刷新
export const nativePullRefresh = (data: { enable: boolean }) => {
    ly.invokeApp('page.pullToRefresh', {
        disable: !data.enable,
        icon: 'wave-gray',
        bgColor: '#FAFEFE',
        success: () => {
            ly.invokeApp('page.stopPullToRefresh', {
                success: () => {
                    window.location.reload();
                },
            });
        },
    });
};

// 关闭页面
export const nativeClosePage = () => nativeSDKPromisify('nav.close');

// 获取用户收听时长
export const nativeGetUserListenData = () => nativeSDKPromisify('busi.getUserListenData');

// 加密数据
export const nativeEncrypt = (data: { type: 'rsa'; data: { [key: string]: string } }) =>
    nativeSDKPromisify('util.encrypt', data);
