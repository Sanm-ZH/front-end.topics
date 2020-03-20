### webpack配置
#### 配置详解
```js
'use strict'
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8181,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'url',
        headers: {
          //接口域名
        },
        secure: false,
        changeOrigin: true
      }
    }
  },
  configureWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new CompressionWebpackPlugin({
        test: /\.js$|\.css$|\.html$/,
        threshold: 204800, // 对查过200k的文件进行压缩
        deleteOriginalAssets: false // 是否删除原文件
      }))
      // 打包zip
      if (process.argv.includes('build') && process.argv.includes('--zip')) {
        config.plugins.push(new FileManagerPlugin({
          onEnd: {
            delete: [
              './dist.zip'
            ],
            archive: [
              {source: './dist', destination: './dist.zip'}
            ]
          }
        }))
      }
    }
    // 命名定义
    Object.assign(config.resolve, {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        'styles': resolve('src/styles')
      }
    })
  },
  chainWebpack(config) {
    // url导入第三方组件，打包时排除
    config.externals({
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'echarts': 'echarts',
      'xlsx': 'XLSX',
      'moment': 'moment'
    })
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test
    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      // 生成map文件，便于调试
      .when(process.env.NODE_ENV === 'development', config =>
        config.devtool('source-map')
      )

    config.when(process.env.NODE_ENV !== 'development', config => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      config.optimization.splitChunks({
        // 切包
        // cacheGroups其实是splitChunks里面最核心的配置，一开始我还认为cacheGroups是可有可无的，这是完全错误的，splitChunks就是根据cacheGroups去拆分模块的，包括之前说的chunks属性和之后要介绍的种种属性其实都是对缓存组进行配置的。splitChunks默认有两个缓存组：vender(initial)和default(reuseExistingChunk)
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          // elementUI: {
          //   name: 'chunk-elementUI', // split elementUI into a single package
          //   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
          //   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          // },
          commons: {
            name: 'chunk-components',
            test: /[\\/]src[\\/]components[\\/]/, // can customize your rules
            minChunks: 3, //  minimum common number
            priority: -30,
            reuseExistingChunk: true
          }
        }
      })
      config.optimization.runtimeChunk('single')
    })
  }
}
```