import { env, _ } from '@/utils';
import { setRightMenu, toShare } from '@/utils/jssdk';
import axios, { AxiosResponse } from 'axios';

type successType = (data: { channel: string }) => void;

export interface ShareType {
    shareTitle: string;
    shareUrl: string;
    shareImage: string;
    shareDesc: string;
    success?: successType;
}

export const iosApiList = [
    'checkJsApi',
    'updateTimelineShareData', //  朋友圈
    'updateAppMessageShareData', //  发给朋友
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ', //  分享到QQ
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'previewImage',
    'getNetworkType', //  获取网络状况
    'openLocation', //  使用微信内置地图
    'getLocation', //  获取地理位置
    'scanQRCode', //  扫一扫
    'chooseWXPay', //  微信支付
    'chooseImage',
    'uploadImage',
];

export const androidApiList = [
    'checkJsApi',
    'updateTimelineShareData', //  朋友圈
    'updateAppMessageShareData', //  发给朋友
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ', //  分享到QQ
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'previewImage',
    'getNetworkType', //  获取网络状况
    'openLocation', //  使用微信内置地图
    'getLocation', //  获取地理位置
    'scanQRCode', //  扫一扫
    'chooseWXPay', //  微信支付
    'chooseImage',
    'uploadImage',
];
export default class Share {
    static setup(obj: { xmly?: ShareType; wechat?: ShareType }) {
        if (env.isNative && obj.xmly) {
            this.shareInNative(obj.xmly);
        } else if (env.isWeiXin && obj.wechat) {
            this.shareInWechat(obj.wechat);
        }
    }

    static shareInNative({
        shareTitle = '',
        shareUrl = window.location.href.replace(window.location.hash, ''),
        shareImage = '',
        shareDesc = '',
        success = () => {},
    }: ShareType) {
        _.retry(
            () => Boolean(ly),
            () => {
                setRightMenu(
                    [
                        {
                            id: '1',
                            icon: 'share',
                            text: '分享',
                        },
                    ],
                    data => {
                        if (Number(data.id) === 1) {
                            toShare({
                                channel: ['weixin', 'weixinGroup', 'qq', 'tSina', 'qzone'], // 枚举值
                                title: shareTitle, // 分享标题
                                desc: shareDesc, // 分享描述
                                link: shareUrl, // 分享链接
                                imgUrl: shareImage, // 分享图标
                                success,
                            });
                        }
                    },
                );
            },
        );
    }

    static async shareInWechat({
        shareTitle = '',
        shareUrl = window.location.href.replace(window.location.hash, ''),
        shareImage = '',
        shareDesc = '',
        success,
    }: ShareType) {
        const tid = env.isXmlyDomain ? (env.isTest ? 31 : 17) : 77;
        const firstShowPageUrl: string = window.location.href.split('#')[0];
        const response: AxiosResponse = await axios.get(
            `https://passport.${
                env.isTest ? 'test.' : ''
            }ximalaya.com/xthirdparty-toolkit-web/wechat/jssdk/config/${tid}?signatureUrl=${encodeURIComponent(
                env.isIos ? firstShowPageUrl : window.location.href,
            )}`,
        );

        if (response.data.ret === 0) {
            const { appId, timestamp, nonceStr, signature } = response.data;

            const wxConfig = {
                debug: env.isDebug,
                appId,
                timestamp,
                nonceStr,
                signature,
                jsApiList: env.isIos ? iosApiList : androidApiList,
            };

            wx.config(wxConfig);

            wx.ready(() => {
                const info = {
                    title: shareTitle, // 分享标题
                    desc: shareDesc, // 分享描述
                    link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareImage, // 分享图标
                    success,
                };
                wx.updateAppMessageShareData(info);

                wx.updateTimelineShareData(info);
            });
        }
    }
}
