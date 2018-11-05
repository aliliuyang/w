// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
(function (doc, win) {
    var docEl = doc.documentElement,

    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
    };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

Vue.prototype.isgologin=function (){
  var myusertoken=localStorage.getItem("token");
  if(!myusertoken){
    window.location.href='#/qustore'
  }
}

require('es6-promise').polyfill()


import Vue from 'vue'
import App from './App'
import router from './router'
require('js-base64').Base64
//import './assets/js/joiest'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)




import Navigation from 'vue-navigation'
// Vue.use(Navigation, {router})
import store from './_vuex/store'

Vue.config.productionTip = true


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

