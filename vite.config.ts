import { fileURLToPath, URL } from 'node:url'

// 使用 defineConfig 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 此处引用了path路径导向
import path from "path"
// export default defineConfig({
//   plugins: [vue()]
// })



export default defineConfig({
  // 查看 插件 API 获取 Vite 插件的更多细节 https://www.vitejs.net/guide/api-plugin.html
  plugins: [vue(), vueJsx()],
  // 在生产中服务时的基本路径
  base: './',
  // 配置别名绝对路径  https://webpack.js.org/configuration/resolve/
  resolve: {
    // resolve.alias: 更轻松地为import或require某些模块创建别名
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@store": path.resolve(__dirname, "./src/stores"),
    }
  },
  // 与根相关的目录，构建输出将放在其中，如果目录存在，它将在构建之前被删除
  // @default 'dist'
  build: {
    outDir: "dist",
  },
  server: {
    https: false, // 是否开启 https
    open: true, // 是否自动在浏览器中打开
    port: 8001, // 端口号
    host: "0.0.0.0",
    // 跨域代理
    proxy: {
      '/api': {
        target: "http://localhost:3000",  // 后台接口
        changeOrigin: true,
        // secure: false, // 如果是https接口，需要配置这个参数
        // ws: true, //websocket支持
        // 截取api，并用api代替
        // rewrite: (path) => path.replace(/^\/api/, "/api"),
      }
    }

  },

  // 引入第三方的配置
  optimizeDeps: {
    include: [],
  }

})

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { resolve } from "path"
// // import viteCompression from 'vite-plugin-compression'
// /** S-按需引入需要的插件 */
// // import AutoImport from 'unplugin-auto-import/vite'
// // import Components from 'unplugin-vue-components/vite'
// // import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// /** E-按需引入需要的插件 */

// // https://vitejs.dev/config/
// export default defineConfig({
//   base: './', // 生产环境下的公共路径
//   server:{
//     // host:'0.0.0.0', // 默认是 localhost
//     // port:8008, // 自定义端口
//     // strictPort:false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
//     // open: false, // 启动后是否浏览器自动打开
//     // hmr:true, // 热更新
//     // proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
//     //   '/api': {
//     //     target: 'http://127.0.0.1:7001', // 后端服务实际地址
//     //     changeOrigin: true,
//     //     rewrite: path => path.replace(/^\/api/, '')
//     //   }
//     // }
//   },
//   plugins: [
//     vue(),
//     // viteCompression({
//     //   algorithm: 'gzip', // 压缩算法，可选[‘gzip’，‘brotliCompress’，‘deflate’，‘deflateRaw’]
//     //   threshold: 10240, // 如果体积大于阈值，则进行压缩，单位为b
//     //   deleteOriginFile:true // 压缩后是否删除源文件
//     // }),
//     // // //按需引入element-plus
//     // AutoImport({
//     //   resolvers: [ElementPlusResolver()],
//     // }),
//     // Components({
//     //   resolvers: [ElementPlusResolver()],
//     // })
//   ],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, 'src'),// 兼容src目录下的文件夹可通过 @/components/HelloWorld.vue写法 
//       '@assetImg':resolve(__dirname,'src/assets/images'), 
//     }
//   },
//   build:{
//     outDir:'dmy_dist', //  打包构建输出路径，默认 dmy_dist ，如果路径存在，构建之前会被删除
//     rollupOptions: { 
//       output: {
//         /** S-静态文件按类型分包 */
//         chunkFileNames: 'static/js/[name]-[hash].js',
//         entryFileNames: 'static/js/[name]-[hash].js',
//         assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
//         /** E-静态文件按类型分包 */
//         manualChunks(id) {  // 超大静态资源拆分
//           if (id.includes('node_modules')) {
//             return id.toString().split('node_modules/')[1].split('/')[0].toString();
//           }
//         }
//       }
//     },
//     terserOptions: {
//       //打包后移除console和注释
//       compress: {
//           drop_console: true,
//           drop_debugger: true,
//       },
//     },
//   },
//   css:{
//     preprocessorOptions: {
//       scss: {
//          additionalData: ['@import "./src/style/base.scss";'], // 配置全局公共样式，可多个
//          charset:false
//       }
//    }
//   }
// })

