<template>
  <div id="app">
   	<!--<keep-alive>-->
    <!--<navigation>-->
    	<router-view></router-view>
    <!--</navigation>-->
    <!--</keep-alive>-->
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import axios from 'axios';
import qs from 'qs';
import wx from 'weixin-js-sdk'
export default {
  name: 'app',
  methods:{
  	...mapActions({
      getcar:'getcar',
  	}),
    directRightUrl () {
      let paths = window.location.href.split('#')
      paths[1] = paths[1] || '/'
      // 老式的#!分隔跳转
      if (paths[0].charAt(paths[0].length - 1) !== '?') {
        paths[0] = `${paths[0]}?`
      }
      if (paths[1].charAt(0) === '!') {
        paths[1] = paths[1].substr(1)
      }
      let url = `${paths[0]}#${paths[1]}`
      if (window.location.href !== url) {
        window.location.href = url
      }
    },
    islogin(){
  	  var token=localStorage.getItem("token");
  	  if(token){
        axios.post(BASE_URL +'/index.php?r=site/userinfo',qs.stringify({
          token:token
        })).then(function(data){
          var a = JSON.parse(Base64.decode(data.data))
          if(a.data.err==10007){
            localStorage.clear()
          }
        }).catch(function(err){

        })
      }

    }
  },
  mounted(){
   	this.getcar()
    this.islogin()
    this.directRightUrl()
    var url=window.location.href  //'https://webchats.7shengqian.com/?#/qustore'     //
	  wx.checkJsApi({
	    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
	    success: function(res) {
	      // 以键值对的形式返回，可用的api值true，不可用为false

	      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}

	    }
	  });
    axios.post(BASE_URL+'/index.php?r=weiXin/weiJsdk',qs.stringify({
      url:Base64.encode(url)
    })).then(function(res){
      var a=Base64.decode(res.data)
      a=JSON.parse(a)
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: a.appId, // 必填，公众号的唯一标识
          timestamp: a.timestamp, // 必填，生成签名的时间戳
          nonceStr: a.nonceStr, // 必填，生成签名的随机串
          signature: a.signature,// 必填，签名，见附录1
          jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(){
		      wx.onMenuShareTimeline({
		        title: '趣商城', // 分享标题
		        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
		        imgUrl: 'https://webchats.7shengqian.com/static/img/logo.jpg', // 分享图标
		        success: function () {// 用户确认分享后执行的回调函数
		        },
		        cancel: function () {// 用户取消分享后执行的回调函数
		        }
		      })
			    wx.onMenuShareAppMessage({
			      title: '趣商城', // 分享标题
			      desc: '', // 分享描述
			      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			      imgUrl: 'https://webchats.7shengqian.com/static/img/logo.jpg', // 分享图标
			      type: '', // 分享类型,music、video或link，不填默认为link
			      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			      success: function () {// 用户确认分享后执行的回调函数
			      },
			      cancel: function () {// 用户取消分享后执行的回调函数
            }
			    });
		    });
    }).catch(function(err){
    });
  }
}
</script>

<style lang="scss" >
@import './assets/css/reset.scss';
body,html{
	width: 100%;
	height: 100%;
}
#app {
	width: 100%;
  height:100%;
  background:#f5f5f5;
}
.mint-msgbox-btns{
	.mint-msgbox-btn.mint-msgbox-confirm{
		color: #FF3737;
	}
}
.mint-msgbox{
	border-radius: 12px;
	z-index: 9999;
}
.mint-msgbox-btn.mint-msgbox-confirm.gocard{
  background: #ff3737;
  color: #fff;
}
  .picker-toolbar{
    .mint-datetime-action{
      color: #ff3737;
    }
  }
</style>
