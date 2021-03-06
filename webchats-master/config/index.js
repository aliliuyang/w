// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
//  host:'10.10.18.14',
    host:'localhost',
    port: 3001,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {//生产环境
			//  '/index.php':{
			//  		target:'http://api.7shengqian.com/',
			//  		secure:true,
			//  		changeOrigin:true
			//  },
      // '/index.php':{//预生成
      //   target:'https://tapi.7shengqian.com/',
      //   secure:true,
      //   changeOrigin:true
      // },
		// 	 '/manage-web':{//本地测试
      //       target:'http://10.10.18.12:8080/',
		// 	 		// target:'http://testapi.7shengqian.com/',
      //    // target:'http://121.40.40.219:8601/', //蔡磊
      //    secure:true,
		// 	 		changeOrigin:true
      //  	},
      '/index.php':{//本地测试
        target:'http://testapi.7shengqian.com/',
        // target:'http://121.40.40.219:8601/', //蔡磊
        secure:true,
        changeOrigin:true
      },
      // 	 '/index.php':{
      //
      //   // target:'http://testapi.7shengqian.com:9528',// 振华
		// 	 		secure:true,
      //      changeOrigin: true
      //  	},

    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
