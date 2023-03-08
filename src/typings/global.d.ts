/*
 * @Author: your name
 * @Date: 2022-04-26 09:25:27
 * @LastEditTime: 2022-04-26 13:18:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /h5-template-ts/src/typings/global.d.ts
 */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module 'vconsole';

declare namespace Sentry {
    function init({ dsn: string, release: string }): void;
}

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'dev' | 'prod' | 'test';
        readonly PUBLIC_URL: string;
    }
}

declare module '*.bmp' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
}

declare module '*.jpg' {
    const src: string;
    export default src;
}

declare module '*.jpeg' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.webp' {
    const src: string;
    export default src;
}

declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

    const src: string;
    export default src;
}

declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

declare const wx: any;

declare module 'in-view' {
    const inView: { is: (node: HTMLElement) => boolean };

    export default inView;
}

declare const ly : any;