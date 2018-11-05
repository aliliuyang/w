<template>
<div id="opa">
		<!--<div class="wps">易付卡充值</div>-->
		<!--<div class="attu">-->
			<!--<p>首次使用易付卡网上购物请先激活</p>-->
			<!--<a href="#/activate" >激活</a>-->
		<!--</div>-->
		<div class="ra">
			<p class="tur">充值金额(元)</p>
			<p class="num">500.00</p>
		</div>
		<div class="dinp">
			<p>
			<label>易付卡号：</label><input type="text" placeholder="请输入卡号" v-model="cn"/>
			</p>
			<p>
			<label>激活码：</label><input type="text"  placeholder="刮开卡背面图层获取激活码" v-model="ac"/>
			</p>
			<p>
			<label>手机号：</label><input type="text" placeholder="请输入手机号"  v-model="cpn" />
			</p>
			<p>
			<label>验证码：</label><input type="text" class="verification" placeholder="请输入验证码" v-model="vc"/>
			<button  @click="ctdn">{{gain}}</button>
			</p>
		</div>
		<button class="ins" @click="detection">提交</button>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
import qs from 'qs';
	const  ArRe3= {
	  	name: 'ArRe3',
	  	data () {
	    	return {
				cn:"",
				ac:"",
				cpn:"",
				vc:"",
				gain:"获取验证码",
	    	}
	  	},
	  	methods:{
			detection(){

				if(this.cn.length==13&/^[0-9]*$/.test(this.cn)){
				}else{
						this.cn="";
						MessageBox.alert( '请输入正确卡号');
						return
				}

				if(this.ac.length==6&/^[0-9]*$/.test(this.ac)){
				}else{
						this.ac="";
						MessageBox.alert( '请输入正确信息');
					return
				}

				if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.cpn)){
				}else{
						this.cpn="";
						MessageBox.alert( '请输入正确手机号');
						return
				}

				if(this.vc){
				}else{
						this.vc="";
						MessageBox.alert( '请输入正确的验证码');
						return
				}



			},
			ctdn(){
					var that = this
					if(!(that.gain <=60)){
						that.gain="60";
						 var time=setInterval(function(){
						 	that.gain--
							if(that.gain == 0){
								that.gain="获取验证码"
								clearInterval(time)

							}
					 	},'1000')
					}
			}
	  	},
	  	mounted(){

		},
		updated(){

		},
		activated(){

		},
	    components:{

	    }
	}
export default ArRe3

</script>

<style scoped lang="scss">
#opa{
	padding:0.75rem 0.75rem 0rem 0.75rem;
	.wps{
		width:17.2rem;
		height:2.25rem;
		line-height: 2.25rem;
		font-size: 0.8rem;
		color: #333333;
		text-align: center;
	}
	.attu{
		width: 17.2rem;
		background-color: #fff;
		margin: 0 auto;
		padding: 1.25rem 3.7rem;
		p{
			color: #333333;
			font-size: 0.65rem;
			margin-bottom: 0.75rem;
		}
		a{
			display: block;
			width:5rem;
			height: 1.75rem;
			line-height: 1.75rem;
			color: #fff;
			background-color: #ff3737;
			font-size: 0.75rem;
			text-align: center;
			border-radius: 0.1rem;
			margin: 0 auto;
		}
	}
	.ra{
		width: 17.2rem;
		margin: 0 auto;
		padding: 1.675rem 0rem 1.175rem 0rem;
		p{ text-align: center;
			margin-bottom: 0.5rem;
		}
		.tur{
			font-size: 0.6rem;
			color: #999999;
		}
		.num{
			font-size: 1.2rem;
			color: #333333;
		}
	}

	div.dinp p{
		position: relative;
		label {
			position: absolute;
			width: 4.3rem;
			line-height: 2.15rem;
			font-size: 0.7rem;
			padding-left: 0.75rem;
			top: 0rem;
			left: 0rem;
		}
		button{
			width:7rem;
			height: 2.19rem;
			line-height:2.19rem;
			font-size: 0.8rem;
			color: #fff;
			background-color: #ff3737;
			text-align: center;
			position: absolute;
			right: 0rem;
			top: 0rem;
			border: none;
			border-top-right-radius:0.1rem;
			border-bottom-right-radius:0.1rem;
		}
	}
	div.dinp input {
		width: 17.2rem;
		padding: 0rem 0.75rem 0rem 4.3rem;
		line-height: 2.125rem;
		color: #333333;
		font-size: 0.7rem;
		border-radius: 0.1rem;
		border: none;
		border: 0.025rem solid #c8c8c8;
		margin-bottom: 0.75rem;
	}
	div.dinp input.verification {
		width: 17.2rem;
		padding: 0rem 7rem 0rem 4.3rem;
	}
	button.ins {
		width: 17.2rem;
		height: 2.25rem;
		line-height: 2.25rem;
		background-color: #ff3737;
		color: #fff;
		border: none;
		border-radius: 0.1rem;
		cursor: pointer;
	}
}

</style>
