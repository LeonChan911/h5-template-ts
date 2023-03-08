# 项目名称

> 本项目基于[移动端项目模板-TypeScript](http://gitlab.ximalaya.com/zhiwen.zhao/h5-template-ts) 搭建.

## 相关文档

- 需求文档：[Thoughts](http://thoughts.ximalaya.com)
- 视觉稿：[蓝湖](https://lanhuapp.com)
- 线上入口：[入口页面](https://m.ximalaya.com)

## 目录结构

```bash
├── README.md         # 自述文件
├── config            # 开发及打包相关配置 无需关心
├── iris.config.js    # 配置文件，详细内容见下文
├── mock              # mock文件夹
├── package.json      # package.json
├── src               # 项目原文件
│   ├── app.tsx
│   ├── common        # 公用脚本、样式文件、图片
│   ├── components    # 公用组件
│   ├── enum          # 枚举值及常量
│   ├── index.tsx     # 入口
│   ├── layouts       # 布局layouts相关
│   ├── models        # 数据层-存放effects以及reducers等rematch相关文件
│   ├── router        # 路由配置定义
│   ├── schemas       # 后端接口类型定义
│   ├── services      # 请求方法
│   ├── store.ts      # 全局store
│   ├── typings       # 为第三方库编写的声明文件
│   ├── utils         # 工具方法
│   └── views         # 页面组件
├── tsconfig.json     # typescript编译相关配置（vscode）
└── yarn.lock         # 依赖锁定
```

## 基本命令

**安装依赖**

```bash
yarn
```

**开发**

```bash
yarn start

# or

yarn dev
```

**打包**（已接入云效，无需手动打包）

```bash
yarn build-test # 测试环境打包

yarn build-uat  # 预发环境打包

yarn build-prod # 生产环境打包
```

**打包分析**

```bash
yarn build-analyze
```

**Commit**

```bash
yarn commit # 交互式生成符合规范的commit message
```

## 相关开发要点

暂无
