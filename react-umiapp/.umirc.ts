import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 配置式路由
  routes: [
    {
      path: '/',
      name:'我的工作台',  // 配置Menu和国际化
      component: '@/pages/home/index',
      icon: 'AreaChartOutlined',  // 配置icon
      // access: 'admin'  // 权限字段
    },
    {
      path: '/article',
      name: '文章管理',
      icon: 'smile',
      // 嵌套路由（二级菜单）
      routes: [
        {
          path: 'list',
          name: '文章列表',
          component: './article/index'
        }
      ]
    },
    // 404和重定向必须是路由规则的最后两条
    { path: '/404', component: './404' },
    { path: '/*', redirect: '/404' },
  ],
  history: {
    // type: 'browser',   // History路由
    type: 'hash',   // Hash路由
  },
  // build打包时文件后缀带有Hash值（解决浏览器缓存问题的）
  hash: true,
  fastRefresh: {},
  // 布局设计
  layout: {
    siderWidth: 200
  },
  // 开启国际化
  // locale: {},
  // 配置dva数据数据流
  dva: {
    hmr: true,
    immer: true
  },
  // 开启加速
  mfsu: {},
  // 开启webpack(v5)
  webpack5: {},
  // 本地服务
  devServer: {
    port: 8000
  },
  // 开启动态导入（代码分割）
  dynamicImport: {
    loading: '@/pages/Loading'
  },
  favicon: '/favicon.ico',
  // 支持自动向head标签中插入js代码或js链接
  headScripts: [
    `console.log('head script')`
  ],
  // 支持自动向head标签中插入link链接
  links: [],
  // 向index.html中添加meta标签
  metas: [],
  // 配置额外的umi插件
  plugins: [],
  // 配置接口代理
  proxy: {},
  // 更新antd主题色
  theme: {
    '@primary-color': '#1DA57A',
  },
  // 还有很多与umi有关的额外配置，请参考umi插件文档
});
