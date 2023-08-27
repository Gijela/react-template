# 项目模版
技术栈：vite、react、ts、ant design

## 安装依赖 && 运行
- 安装依赖：`pnpm i`
- 运行：`pnpm run dev`

## 进度
- [x] 抽离出路由配置文件，可以通过在 router.config.ts 中直接配置路由，目前只支持一个层级、二个层级的路由使用
- [x] 支持使用scss写样式，支持在 `src/styles/global.scss` 中写全局公共样式
- [x] 支持使用`@`作为src文件夹的路径别名
- [x] 解决刷新会回到首页的问题
- [x] 中后台项目的基本布局
- [x] 登录页、Header、面包屑
- [x] 跨域配置

## 使用
- 新增一个菜单或者页面可以在 `src/router.config.ts` 中配置，会自动生成。
- 跨域在根目录的 `vite.config.ts` 中配置，只需要替换掉 server/proxy 下的 target 值即可。
- 所有的接口请求可以从 `src/service/request.ts` 导入 request 统一发送。目前的测试接口写在了 `src/service/api.ts` 中，小项目建议接口直接写在 `api.ts`，然后使用 `import * as Api from '@/service/api'` 统一导入使用即可。参考 `src/pages/testComponent/content2.tsx`
