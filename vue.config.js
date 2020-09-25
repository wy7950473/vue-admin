const path = require('path');
module.exports = {
    // basic configuration
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    // ouput file directory
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader is it checked at the time of storage
    lintOnSave: false,
    // webpack configuration
    chainWebpack:(config) => {
        const svgRule = config.module.rule("svg");
        svgRule.uses.clear();
        svgRule.use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId:"icon-[name]",
                include:["./src/icons"]
            });
    },
    configureWebpack: (config) => {
        config.resolve = {
            // automatically add suffix to file name
            extensions : ['.js','.json','.vue'],
            alias:{
                '@':path.resolve(__dirname,'./src'),
                'public':path.resolve(__dirname,'./public'),
                'components':path.resolve(__dirname,'./src/components'),
                'common':path.resolve(__dirname,'./src/common'),
                'views':path.resolve(__dirname,'./src/views'),
                'vue':'vue/dist/vue.js'
            }
        }
    },
    // does the production environment generate a sourceMap file
    productionSourceMap: false,
    // css related configuration
    css: {
        // do you want to use css to separate plugin， ExtractTextPlugin
        extract: true,
        // open CSS source map ?
        sourceMap: false,
        // css preset configuration item
        loaderOptions: {
            sass: {
                prependData:`@import './src/styles/main.scss';`
            }
        },
        // open CSS modules for all / pre-processor files.
        modules : false
    },
    //
    parallel : require('os').cpus().length > 1,
    // PWA plugin related configuration
    pwa : {},
    // webpack-dev-server related configuration
    devServer : {
        open: false, // do you want to open the web page after compiling 
        host: '0.0.0.0', // make use of address，default localhost,0.0.0.0 representatives can be accessed by the outside world
        port: 8080, // access port
        https: false, // refresh page on compile failure
        hot: true,  // open hot load
        hotOnly: false,
        proxy: {  // proxy configuration
            '/api': {
                target: 'http://www.web-jshtml.cn/productapi/token', // API server address
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        overlay: { // is script error displayed in full screen mode
            warnings: true,
            errors: true 
        },
        before: app => {
        },
    },
    // third party plugin configuration
    pluginOptions: {}
}