# 环境搭建
```
yarn create next-app --typescript
# 在项目创建过程中输入项目名称 react-nextapp
cd react-nextapp
npm run dev
```

- 版本：react(v18)、react-dom(v18)、next(v12)
- React(v18)给SSR增加了很多新特性

- 三个npm命令
  - npm run dev  启动开发环境（用于开发写代码的）
  - npm run build  打包生成静态的HTML文件们（用于SSG部署）
  - npm start  启动SSR服务（用于SSR/CSR部署）

- next.config.js
  - 是Next的环境配置文件（背后是webpack）

- pages目录（路由目录，约定式目录）
  - 不需要安装react-router-dom，因为next用的是约定式路由

- Link 用于Next中的约定式路由跳转，如果你要跳转外部链接建议使用 <a/>
- Head 用于给当前当前添加head标签，添加css链接、meta信息、title等。
- Script 用于加载内部或外部的JS脚本
- Image 用于加载内部或外部的图片，会自动帮我们优化图片性能、还默认支持图片懒加载。


- 若干概念

- SSG（Server Static Generation）
  - 描述：做完Next开发后，执行npm run build打包，生成静态的HTML，静态部署到CDN或其它服务上。
  - 场景：那些没有动态内容的页面建议使用SSG开发，那些需要调接口但是接口数据基本上不会发生变化的页面（假动态数据）也建议使用SSG开发。
  - 通过 getStaticProps 获取“假动态”数据
  - 在动态路由页面，使用 getStaticPaths 定义路由传参，再使用 getStaticProps 获取详情数据。

- SSR（Server Side Rendering）
  - 描述：在服务器上先执行npm start启动Next项目。当用户访问SSR页面时，Next开始工作，先调数据库接口，接着在服务端完成Next组件库编译成HTML，把HTML返回给用户。
  - 场景：那些有动态数据且数据是不确定的页面建议使用SSR开发。
  - 使用 getServerSideProps 获取真正的动态数据。

- CSR（Client Side Rendering）
  - 描述：在服务器上先执行npm start启动Next项目。当用户访问CSR页面时，Next开始工作，直接把Next页面编译成HTML(包含JS接口逻辑)，响应给用户端，在用户端发生真实的调接口和渲染工作。
  - 场景：那些对SEO优化要求不高的页面。
  - 使用 useEffect 或者 SWR 编写客户端获取动态数据的JS逻辑，交给客户端进行调接口。


- SEO 搜索引擎优化（爬虫爬取网站站点中的那些静态内容）
  - 公司为了提升网站排名，一般会做SEO优化。所谓的SEO优化，就是“迎合”爬虫的喜爱。爬虫喜欢静态内容，尤其喜欢meta标签、title标签、h1-h6标签、p标签、语义化标签、alt属性、title属性，等等带有静态内容；爬虫尤其还喜欢网站首页。爬虫对JS无感，爬虫也讨厌深层链接。
  - Next.js更适合做 ToC 产品（用户体验、SEO优化、访问速度等），不太擅长做 ToB系统。
  - 在做ToC的Next项目时，用户鉴权怎么做呢？在Layout中实现。

- Next同构渲染（同时支持SSR、CSR、SSG三种不同的页面构建方式）
  - MVVM = M + V + VM（VM发生在哪里？就有了Next服务端渲染）
  - 网页 = M数据 + V视图（M+V发生在哪一端？才有了 CSR/BSR、SSR）