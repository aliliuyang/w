<template>
	<div id="set-phone">
		<p><span>手机号码：<i><input type="tel" v-model="phonenum"/></i></span></p>
		<p><span>验证码:<i><input type="text" v-model="code" /></i></span><button @click="yanzheng">{{time}}</button></p>
    <p id="captcha" style="height: 40px;" v-show="show"></p>
		<div class="check">
			<b @click="conset" class="iconfont" :class="check?'icon-xuanzhong':'icon-xuanzhong1'"></b>&nbsp;&nbsp;我已阅读并同意<a href="#/Register/agreement">《趣省钱注册协议》</a></div>
		<div class="next">
			<button :class="check?'':'no'" @click="next">下一步</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Indicator } from "mint-ui";
	const SetPhone = {
	  	name: 'SetPhone',
	  	data () {
	    	return {
          phonenum:'',
          time:'获取验证码',
          check:true,
          code:'',
          show:false,
          validate:''
	    	}
	  	},
	  	methods:{
	        conset(){
	          this.check=!this.check
	        },
	        get(){
	        	var that=this
	            axios.post(BASE_URL +'/index.php?r=site/sendjx',qs.stringify({
	                mobile:this.phonenum,
                  validate:this.validate
	            })).then(function(res){
	                if(res.data.data.err==10002){
	                  MessageBox({
	                    title: '提示',
	                    message: ' 验证码已发送至'+that.phonenum,
	                  })
	                }
	                if(res.data.data.err==10004){
	                  MessageBox({
	                    title: '提示',
	                    message: ' 操作过去频繁，请稍后再试',
	                  })
	                }
                if(res.data.data.err==10008){
                  MessageBox({
                    title: '提示',
                    message: '请点击图形验证码',
                  })
                }
	            }).catch(function(err){
	            })
	        },
	        counttime() {
	           	if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.phonenum))) {
		             MessageBox({
		               title: '提示',
		               message: '请输入正确的手机号码',
		             })
		             this.phonenum = ""
		           	} else {
			            var that = this;
			            if (this.time <= 60) {
			               return
			            } else {
			               this.time = 60;
			               this.get();
			               var timer = setInterval(function () {
			                 that.time--
			                 if (that.time == 0) {
			                   clearTimeout(timer)
			                   that.time = "获取验证码"
			                 }
			               }, 1000)
		             	}
	           		}
	         	},
          yanzheng(){
	          var that =this
            if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.phonenum))) {
              MessageBox({
                title: '提示',
                message: '请输入正确的手机号码',
              })
              this.phonenum = ""
            }else{
              Indicator.open()
              initNECaptcha({
                // config对象，参数配置
                captchaId: 'dfd7a0a8981b4fd4b28e3bc4b3d11609',
                element: '#captcha',
                mode: 'float',
                width: '100%',
                protocol:"https",
                lang:'zh-CN',
                onReady: function (instance) {
                  // 验证码一切准备就绪，此时可正常使用验证码的相关功能
                  that.show=true
                  Indicator.close()
                  Toast('请先验证下方图形验证码')
                },
                onVerify: function (err, data) {
                  if(!err){
                    that.validate=data.validate
                    if(that.validate){
                      that.counttime()
                    }
                  }
                }
              }, function onload (instance) {
                // 初始化成功
              }, function onerror (err) {
                // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
                Indicator.close()
                Toast('请重新获取')
              })

            }
          },
	        next(){
	          var that =this
              if(this.check==true){
                  if(this.code){
                    Indicator.open()
                    axios.post(BASE_URL +'/index.php?r=site/register',qs.stringify({
                          mobile:this.phonenum,
                          verifycode:this.code
                    })).then(function(res){
                      Indicator.close()
                      if(res.data.data.err==10002){
                        localStorage.setItem("setphone",that.phonenum);
                        window.location.href="#/register/setpassword";
                      }
                      if(res.data.data.err==10004){
                        MessageBox({
                            title: '提示',
                            message: '验证码不正确',
                          })
                      }
                      if(res.data.data.err==10006){
                        MessageBox({
                          title: '提示',
                          message: '用户已注册',
                        })
                      }
                    }).catch(function(err){

                     })
                  }else{
                    MessageBox({
                      title: '提示',
                      message: '请输入验证码',
                    })
                  }
              }else{
                  return
              }
	        }
	  	},
    mounted(){
      var that=this
      document.title = '注册'
		},
		updated(){

		},
		activated(){

		},
    components:{

    }
	}
	export default SetPhone
</script>
<style scoped lang="scss">
#set-phone{
	padding:0.5rem 0.75rem;
  #captcha{
    padding:0;
    margin-top: 3rem;
  }
	p{
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		height: 2.25rem;
		background: #fff;
		margin-top:0.75rem;
		font-size: 0.65rem;
		border:1px solid #eee;
		padding-left: 0.38rem;
		border-radius: 4px;
		span{
			display: flex;
			color: #333;
			align-items: center;
			justify-content:flex-start;
			flex: 1;
			align-items: center;
			i{
				display: flex;
				flex: 1;
			}
			input{
				width: 100%;
				margin-left: 0.5rem;
				display: flex;
				flex: 1;
				border:none;

			}
		}
		button{
			width:7rem;
			color: #fff;
			background: #FF3737;
			border: none;
			height: 2.25rem;
			font-size: 0.65rem;
		}
	}
	.check{
		font-size: 0.55rem;
		color: #999;
		line-height: 2rem;
		b{
			display:inline-block;
			font-size: 0.65rem;
			color: #16c460;
		}
		a{
			color: #FF3737;
		}
		.icon-xuanzhong1{
			color: #000;
			font-size: 0.65rem;
		}

	}
	.next{

		button{
			width: 100%;
			background: #FF3737;
			line-height: 2.25rem;
			border: none;
			color: #fff;
			font-size: 0.7rem;
			border-radius: 2px;
		}
		.no{
			background: #ddd;
		}
	}
}

</style>
