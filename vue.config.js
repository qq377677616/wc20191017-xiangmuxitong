    const path = require('path');
    const webpack = require('webpack')


function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/resources/game/wechat/dxl/cmkj_search/' : '/',
    // publicPath: process.env.NODE_ENV === 'production' ? '/resources/game/wechat/dxl/wckj/' : '/',
  //   publicPath: process.env.NODE_ENV === 'production' ? '/resources/game/wechat/dxl/wckj/' : '/',
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
        .set('components',resolve('src/components'))
        .set('views',resolve('src/views'))
        .set('common',resolve('src/common'))
        .set('base',resolve('src/base'))
        .set('api',resolve('src/api'))
  },
    devServer: {
        host: 'localhost',
		// host: '192.168.1.220',
        port: 8095,
        proxy: {
            '/api': {
                target: 'http://game.flyh5.cn/game/wc_project/public/api/Wcpro', //对应自己的接口
                // target: 'https://game.flyh5.cn/game/wuhui/wxapplet/applet/public/api/meituan', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    css: {
        loaderOptions: {
            postcss: {
                // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
                plugins: [
                    require("postcss-px2rem")({
                        remUnit: 37.5
                    })
                ]
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
	lintOnSave : false  //关闭seLint校验
};
