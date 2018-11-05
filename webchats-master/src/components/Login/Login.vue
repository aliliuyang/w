<template>
	<div id="login">
		<img src="../../assets/images/login.png" alt="" />
		<p><span>手机号码：<i><input type="tel" v-model="phonenum"/></i></span></p>
		<p><span>验证码:<i><input type="tel"  v-model="code"/></i></span><button @click="jiyan">{{time}}</button></p>
    <p id="captcha" style="height: 40px;" v-show="yanzheng"></p>
		<div class="go-login">
			<button @click="login">登录</button>
		</div>
		<div class="go-register">
			<a href="#/register/setphone">立即注册</a>
			<!--<a href="#/reset">忘记密码</a>-->
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	import { MessageBox } from 'mint-ui';
	import {mapState,mapActions} from 'vuex'
	import { Toast } from 'mint-ui';
  import { Indicator } from "mint-ui";
const Login = {
  	name: 'Login',
  	data () {
    	return {
	        phonenum:'',
	        time:'获取验证码',
	        code:'',
          yanzheng:false,
          validate:''
	    }
  	},
    computed:{
      ...mapState({
        cargoods:'cargoods',
      }),
    },
  	methods:{
      	get(){
            var that=this
            axios.post(BASE_URL +'/index.php?r=site/sendjx',qs.stringify({
              mobile:this.phonenum,
              validate:this.validate,
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
                  message: '请求频繁，请稍后再试',
                })
              }
              if(res.data.data.err==10008){
                MessageBox({
                  title: '提示',
                  message: '请点击图形验证码',
                })
              }
              if(res.data.data.err==10007){
                MessageBox({
                  title: '提示',
                  message: '获取验证码失败',
                })
              }
            }).catch(function(err){

            })
        },
        counttime() {
            if(this.validate){
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
            }else{
              Toast('请重新验证')
            }
        },
       	login(){
       		var that=this
       		if(this.code&&this.phonenum){
    			axios.post(BASE_URL +'/index.php?r=site/login',qs.stringify({
            		mobile:this.phonenum,
            		verifycode:this.code
	           })).then(function(res){
	                if(res.data.data.err==10002){
	                	var user =JSON.stringify(res.data.data.user);
	                	var token=res.data.data.token
	                	localStorage.setItem("user",user);
                		localStorage.setItem("token",token);
                		var c=[]
                    for(var i= 0;i<that.cargoods.length;i++){
                		  c=c.concat(that.cargoods[i].carlist);
                    }
                    	axios.post(BASE_URL +'/index.php?r=shop/joincarttwo',qs.stringify({
	                      	token:token,
	                        param:JSON.stringify(c)
	                    })).then(function(res){
	                    	Toast('登录成功')
	                    	var token = localStorage.getItem("token");
	                    	setTimeout(function(){
	                    	 window.history.back(-1)
	                    	},2000)

	                    }).catch(function(err){

	                    })

	                }
	                if(res.data.data.err==10004){
	                	MessageBox({
		                    title: '提示',
		                    message: '验证码不正确',
	                  	})
	                }
	                if(res.data.data.err==10007){
	                	MessageBox({
		                    title: '提示',
		                    message: '用户未注册',
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
       	},
      jiyan() {
        var that =this
        if (!(/^1[3|4|5|8|7][0-9]\d{8,8}$/.test(this.phonenum))) {
          MessageBox({
            title: '提示',
            message: ' 请输入正确的手机号码',
          })
          this.phonenum = ""
        } else {
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
              that.yanzheng = true
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
            Toast("请重新获取验证码")
          })

        }
      }
 	},

  	mounted(){
        document.title = '登录'
      var that=this

	},
	updated(){

	},
	activated(){

	},
    components:{

    }
}
	export default Login
</script>

<style scoped lang="scss">
#login{
	padding: 0 0.75rem;
	padding-top: 3rem;
	img{
		display: block;
		width: 5.25rem;
		margin: 0 auto;
		margin-bottom: 3rem;
	}
  #captcha{
    padding: 0;
  }
	p{
		box-sizing: border-box;
		height: 2.25rem;
		padding: 0.25rem 0.375rem;
		display: flex;
		justify-content: space-between;
		background: #fff;
		margin-top:0.75rem;
		font-size: 0.65rem;
		border:1px solid #eee;
		box-shadow: 0 3px  10px #ffd6d6;
		span{
			display: flex;
			color: #999;
			align-items: center;
			justify-content:flex-start;
			flex-flow: 1;
			align-items: center;
			i{
				display: flex;
				flex: 1;
			}
			input{
				width: 100%;
				margin-left: 0.5rem;
				display: flex;
				flex-flow: 1;
				border:none;
			}
		}
		button{
			width:6rem;
			color: #ffecec;
			background: #FF3737;
			border: none;
			font-size: 0.65rem;
		}
	}
	.go-login{
		padding-top: 1rem;
		button{
			width: 100%;
			background: #FF3737;
			line-height: 2.25rem;
			border: none;
			color: #fff;
			font-size: 0.7rem;
		}
	}
	.go-register{
		font-size: 0.7rem;
		text-align: center;
		padding-top:1rem;
		a{
			color: #666;
			margin: 0 1rem;
		}

	}
}

</style>
