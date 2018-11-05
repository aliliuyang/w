<template>
<div id="reset">
	<h5><span>验证身份</span></h5>
	<p><span>手机号码：<i><input type="tel" v-model="phonenum" /></i></span></p>
	<p><span>验证码:<i><input type="tel" v-model="code" /></i></span><button @click="jiyan">{{time}}</button></p>
  <p id="captcha" style="height: 40px;" v-show="yanzheng"></p>
	<div class="next">
		<button @click="next">下一步</button>
	</div>
</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import { Indicator } from "mint-ui";
	const Reset = {
	  	name: 'Reset',
	  	data () {
	    	return {
				  phonenum:'',
				  time:'获取验证码',
		          code:'',
		          yanzheng:false,
		          validate:''
	    	}
	  	},
	  	methods:{
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
                  }else{
                    if(res.data.data.err==10008){
                      MessageBox({
                        title: '提示',
                        message: '请点击图形验证码',
                      })
                    }else{
                      MessageBox({
                        title: '提示',
                        message: '获取失败，请稍后再试 ',
                      })
                    }
                  }
              }).catch(function(err){

              })
	        },
		  	  counttime() {
           		if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.phonenum))) {
		             MessageBox({
		               title: '提示',
		               message: ' 请输入正确的手机号码',
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
          jiyan() {
			      var that =this
            if (!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.phonenum))) {
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
                  Indicator.close()
                  that.yanzheng = true
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
                Toast('请重新获取验证码')
              })

            }
          },
         	next(){
              var that =this
              if(this.code){
                Indicator.open()
                  axios.post(BASE_URL +'/index.php?r=site/Ypass',qs.stringify({
                        mobile:this.phonenum,
                        verifycode :this.code
                    })).then(function(res){
                      Indicator.close()
                        if(res.data.data.err==10002){
                          localStorage.setItem("setphone",that.phonenum);
                          window.location.href="#/register/setpassword";
                        }else{
                          MessageBox({
                              title: '提示',
                              message: '验证码不正确',
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
        	}
	  	},
	  	mounted(){
			 document.title = '重置密码'
        var that = this

      },
      updated(){

      },
      activated(){

      },
      components:{

      }
	}
	export default Reset
</script>

<style scoped lang="scss">
#reset{
	padding: 0 0.75rem;
	padding-top: 1rem;
  #captcha{
    margin-top: 3rem;
  }
	h5{
		border-top: 1px solid #333;
		position: relative;
		span{

			width: 3.25rem;
			display: block;
			font-size: 0.5rem;
			color: #333;
			font-weight: normal;
			margin: 0 auto;
			margin-top: -0.4rem;
			background: #f5f5f5;
			text-align: center;
		}
	}
	p{
		box-sizing: border-box;
		height: 2.25rem;
		display: flex;
		justify-content: space-between;
		margin-top:0.75rem;
		font-size: 0.65rem;
		border:1px solid #eee;
		span{
			padding-left: 0.375rem;
			width: 100%;
			background: #fff;
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
			margin-left: 0.5rem;
			width:6rem;
			color: #ffecec;
			background: #FF3737;
			border: none;
			font-size: 0.65rem;
		}
	}
	.next{
		margin-top: 0.5rem;
		button{
			width: 100%;
			background: #FF3737;
			line-height: 2.25rem;
			border: none;
			color: #fff;
			font-size: 0.7rem;
		}
	}
}

</style>
