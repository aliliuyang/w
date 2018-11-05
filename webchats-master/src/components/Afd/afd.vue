<template>
	<div id="afd">
		<div class="bg1">
			<div class="fillin">
				<p class="p1">
					<label>手机号码</label>
					<input type="tel" value="" v-model="phone"/>
					<!--<button :disabled="disabled" @click="submit">{{buttontext}}</button>-->
				</p>
				<div class="box">
					<p class="p2">
						<label>验证码</label>
						<input type="text" value=""  v-model="code" @keyup="testing">
					</p>
					<button :disabled="disabled" @click="submit">{{buttontext}}</button>
					<!--<button v-if="tips" >输入错误</button>
					<button v-if="correct" class="btng"></button>-->
				</div>
				<!--<p class="p3"><label>代金券码：</label><input type="text" value="" @blur="cashcoupon" v-model="cashcouponcode" ></p>-->
				<p class="p3">
					<label>代金券码</label>
					<input type="text" value="" v-model="cashcouponcode" >
				</p>
				<button class="binding"  @click="sbinding" v-show="binding">立即绑定</button>
				<button class="binding"  @click="sbinding" v-show="jump">立即绑定</button>
			</div>
		</div>
		<div class="bg2">
		</div>
		<!--<div class="mask"></div>
		<div></div>-->
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import axios from "axios";
import qs from "qs";
export default {
	data () {
    return {
    	phone:null,
    	code:null,
    	cashcouponcode:null,
    	disabled:false,
    	buttontext:"获取验证码",
    	time:0,
    	//tips:false,
    	correct:false,
    	binding:true,
    	jump:false
      }
  	},
  	methods:{
  		//验证手机号码
  		submit(){
			 var testphone=11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
//			 var testphone=/^((13|14|15|17|18)[0-9]{1}\d{8})$/
  			 var that =this
  			if(!this.phone){
                    MessageBox({
		            	title: "提示",
		                message: "请输入手机号"
		            });
		     }else if(!testphone.test(this.phone)){
                    //alert("手机格式不正确");
                    MessageBox({
	                	title: "提示",
	                	message: "手机号格式不正确"
              		});
             }else{
             		this.disabled=true;

                    axios.post(
						BASE_URL+'/index.php?r=ReceiveCou/Sendsms',
						qs.stringify({
				  			mobile:this.phone
				  		})
					)
					.then(function(res){
				  			var a=JSON.parse(Base64.decode(res.data))
							if(a.err==10002){

								MessageBox({
					            	title: "提示",
					                message: a.msg
					            });
						        that.time=60;
			                    that.timer();

							}else{
								MessageBox({
					            	title: "提示",
					                message: a.msg
					            });
							}
				  	}).catch(function(err){});
              }
  		},

		//验证码抬起验证
		testing(){
			var that =this
			if(this.code.length==6){
				axios.post(
						BASE_URL+'/index.php?r=ReceiveCou/Checksms',
						qs.stringify({
							smscode:this.code,
				  			mobile:this.phone
				  		})
				)
				.then(function(res){
				  	var a=JSON.parse(Base64.decode(res.data))
					if(a.err==10000){
						//that.tips=false;
						that.correct=true;
					}else{
						//that.tips=true
						that.correct=false
					}
				}).catch(function(err){});
			}else{
				//that.tips=true
				that.correct=false
			}

		},
  		//立即绑定
  		sbinding(){
  			var that =this
  			if(!this.phone){
  				MessageBox({
					title: "提示",
					message: '请输入手机号'
				});
  			}else if(!this.code){
				MessageBox({
					title: "提示",
					message: "请输入验证码"
				});
			}else if(!this.correct){
  					MessageBox({
						title: "提示",
						message: '验证码填写有误'
				    });
  			}else if(!this.cashcouponcode){
  					MessageBox({
						title: "提示",
						message: '代金券不能为空'
				    });
  			}else{
	  			axios.post(
							BASE_URL+'/index.php?r=ReceiveCou/batchCoupon  ',
							qs.stringify({
					  			smscode:this.code,
					  			mobile:this.phone,
					  			coucode:this.cashcouponcode
					  		})
				)
				.then(function(res){
								if(res.data.err==1000){
//									MessageBox({
//						            	title: "提示",
//						                message: res.data.msg
//						            });

									MessageBox.confirm('绑定成功，前往去趣商城进行登录').then(action => {
                 						window.location.href='#/login'
					                },
					               	action => {
					                 	return
					               	});
							       this.binding=false
								   this.jump=true
								}else{
									MessageBox({
						            	title: "提示",
						                message: res.data.msg
						          });
						          this.binding=true
								  this.jump=false
								}
				}).catch(function(err){});
  			}
  		},

  		//倒计时
  		timer() {
                if(this.time > 0) {
                     this.time--;
                     this.buttontext=this.time+"s后重新获取";
                     setTimeout(this.timer, 1000);
                }else{
                     this.time=0;
                     this.buttontext="获取验证码";
                     this.disabled=false;
                }
        },
        //倒计时
  	}
}
</script>

<style scoped>
#afd{width: 100%;}
#afd div{background-repeat: no-repeat; background-size: cover;}
.bg1{ background-image: url(../../assets/images/afd/afd1.png); height:11.92rem; position: relative;}
.bg1 div.fillin{ width:15.87rem; margin:0 auto; position: absolute; top:14.12rem; left:50%;margin-left:-7.93rem;}
.bg1 div.fillin p label{ width:3.2rem; font-size: 0.7rem; color: #fcd0ab; text-align: left; display: inline-block; margin-left: 0.75rem; font-weight: bold;}
.bg1 div.fillin p input{ padding:0px 0.37rem ; font-size:0.7rem;  border:none; border-radius: 0.25rem;height: 1rem; line-height: 1rem; background-color: #931111; display: inline-block;}
.bg1 div.fillin p.p1{ width:15.75rem; height:2.25rem; line-height:2rem; background-color: #931111; border-radius: 0.2rem; margin:0 auto 0.87rem auto; box-shadow:0rem 0rem 0.12rem 0.12rem #670c0c inset; }
.bg1 div.fillin p.p1 input{width:70%;  color: #fff; height:0.95rem;display: inline-block; }
.bg1 div.fillin p.p1 button{padding:0.07rem 0.05rem;  border-radius: 0.15rem; background-color: #dc0039; color: #fff; font-size: 0.5rem; border:0.05rem solid #fff; }
.bg1 div.fillin div.box{margin-bottom: 0.87rem;}
.bg1 div.fillin div.box:after{content: "."; display: block; height: 0;  clear: both;  visibility: hidden;}
.bg1 div.fillin p.p2{ width:9.25rem; float: left; height:2.25rem; line-height:2rem; background-color: #931111;  border-radius: 0.2rem;  box-shadow:0rem 0rem 0.12rem 0.12rem #670c0c inset;}
.bg1 div.fillin p.p2 input{width:50%;  color: #fff; height:0.95rem;display: inline-block;}
.bg1 div.fillin div.box button{width:6rem; height: 2.12rem; line-height:2.3rem; margin-left: 0.5rem; border:none; border-radius: 0.2rem; background-color: #ffc7a7; color: #db0139; font-size:0.7rem; box-shadow:0px 3px 3px #e5885e; font-weight:bold; }
/*.bg1 div.fillin div.box button{ padding: 0.1rem 0.25rem; margin-left:0.17rem; font-size: 0.5rem; color: #db0139; background-color: #fff;border: none; border-radius: 0.15rem; float:left;}
.bg1 div.fillin div.box button.btng{width:0.9rem; height: 0.95rem; background-image: url(../../assets/images/afd/correct.png);background-repeat: no-repeat;background-size: cover; float:left;}*/
.bg1 div.fillin p.p3{ width:15.75rem; height:2.25rem; line-height:2rem; background-color: #931111; border-radius: 0.2rem; margin:0 auto 0.87rem auto; box-shadow:0rem 0rem 0.12rem 0.12rem #670c0c inset;}
.bg1 div.fillin p.p3 input{width:70%;  color: #fff;  height:0.95rem;display: inline-block;}
.bg1 div.fillin button.binding{ display: block; width:12.5rem; height: 2.37rem; line-height: 2.37rem; margin: 0 auto;  border-radius: 0.2rem; background-color: #ffc7a7;  font-size:0.7rem; color: #db0139; font-weight:bold; border:none;  box-shadow:0px 3px 3px #e5885e; }
.bg2{ background-image: url(../../assets/images/afd/afd2.png); height:21.3rem; margin-top:-0.02rem;}
#afd div.mask{position: absolute;background: #333333;opacity: 0.6;top: 0;left: 0;width: 100%;height: 100%;}
</style>
