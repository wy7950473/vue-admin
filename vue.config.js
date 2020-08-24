const path = require('path');
module.exports = {
    // 基本配置
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // webpack配置
    chainWebpack:(config) => {
    },
    configureWebpack: (config) => {

    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css 相关配置
    css: {
        // 是否使用 css 分离插件， ExtractTextPlugin
        extract: true,
        // 开启 CSS source map ?
        sourceMap: false,
        // css 预设器配置项
        loaderOptions: {
            sass: {
                prependData:`@import './src/styles/main.scss';`
            }
        },
        // 启用 CSS modules for all / pre-processor files.
        modules : false
    },
    //
    parallel : require('os').cpus().length > 1,
    // PWA 插件相关配置
    pwa : {},
    // webpack-dev-server 相关配置
    devServer : {
        open: false, // 编译完成是否打开网页
        host: '0.0.0.0', // 制定使用地址，默认 localhost,0.0.0.0 代表可以被外界访问
        port: 8080, // 访问端口
        https: false, // 编译失败时刷新页面
        hot: true,  // 开启热加载
        hotOnly: false,
        proxy: null, // 代理设置
        overlay: { // 全屏模式下是否显示脚本错误
            warnings: true,
            errors: true 
        },
        before: app => {
        },
    },
    // 第三方插件配置
    pluginOptions: {}
}