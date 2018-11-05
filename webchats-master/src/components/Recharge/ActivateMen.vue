<template>
	<div id="opa">
		<div class="wp">温馨提示</div>
		<p class="wpf">• 姓名与身份证是您重置网上支付口令的凭证，请如实填写</p>
		<p class="wpf">• 支付口令用于网上购物，请您牢记</p>
		<div class="dinp">
			<p>
			<label>用户名：</label><input type="text" v-model="username" placeholder="请输入用户名"/>
			</p>
			<p>
			<label>姓名：</label><input type="text" v-model="name" placeholder="请输入姓名"/>
			</p>
			<p>
			<label>身份证：</label><input type="text" v-model="ic" placeholder="请输身份证号"/>
			</p>
			<p>
			<label>手机号：</label><input type="text" v-model="cpn" placeholder="请输入手机号"/>
			</p>
			<p>
			<label>支付口令：</label><input type="text" v-model="ptp" placeholder="请输入支付密码" />
			</p>
			<p>
			<label>确认支付口令：</label><input type="text" v-model="cpp" placeholder="请再此输入支付密码" />
			</p>
			<p>
			<label>验证码：</label><input type="text" class="verification" v-model="vc" placeholder="请输入验证码" />
			<img src="../../assets/images/vn.jpg"  class="vdimg"/>
			</p>
		</div>
		<button class="ins" @click="detection">提交</button>
	</div>
</template>

<script>
import { MessageBox } from 'mint-ui';	
	const  ArRe1={
	  	name: 'ArRe1',
	  	data () {
	    	return {
				username:"",
				name:"",
				ic:"",
				cpn:"",
				ptp:"",
				cpp:"",
				vc:"",
	    	}
	  	},
	  	methods:{
			detection(){
				if(this.username){
				}else{
					this.username="";
					
					MessageBox.alert( '请输入正确信息');
					return
				}
				
				if(this.name){
				}else{
					this.name="";
					MessageBox.alert( '请输入正确信息');
					return
				}
				
				if(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.ic)){
				}else{
					this.ic="";
					MessageBox.alert( '请输入正确信息');
					return
				}
				
				if(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.cpn)){
				}else{
					this.cpn="";
					MessageBox.alert( '请输入正确信息');
					return
				}
				
				 if(this.ptp.length==6&/^[0-9]*$/.test(this.ptp)){
				}else{
					this.ptp="";
					this.character5="请输入6位数字"
					MessageBox.alert( '请输入正确信息');
					return
				}
				
				if(this.cpp==this.ptp&&this.cpp){
				}else{
					this.cpp="";
					MessageBox.alert( '请输入正确信息');
					return
				}
				
				if(this.vc){
				}else{
					this.vc="";
					MessageBox.alert( '请输入正确信息');
					return
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
export default ArRe1

</script>

<style scoped lang="scss">
#opa {
	.cr{color: #FF3737;}
	padding: 0.75rem 0.75rem 0rem 0.75rem;
	background:#f5f5f5;
	div.wp {
		color: #333333;
		font-size: 0.8rem;
		margin-bottom: 0.75rem;
	}
	p.wpf {
		color: #666666;
		font-size: 0.65rem;
		margin-bottom: 0.75rem;
	}
	div.dinp p {
		position: relative;
		label {
			position: absolute;
			width: 5.7rem;
			line-height: 2.15rem;
			font-size: 0.7rem;
			padding-left: 0.75rem;
			top: 0rem;
			left: 0rem;
		}
		img.vdimg {
			position: absolute;
			width: 5.2rem;
			height: 2rem;
			right: 0.1rem;
			top: 0.075rem;
		}
		#opa input.ins {
			width: 17.2rem;
			height: 2.25rem;
			line-height: 2.25rem;
			background-color: #ff3737;
			color: #fff;
			border: none;
			border-radius: 0.1rem;

		}
	}
	div.dinp input {
		width: 17.2rem;
		padding: 0rem 0.75rem 0rem 5.5rem;
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
		padding: 0rem 5.275rem 0rem 5.5rem;
	}
	button.ins {
		width: 17.2rem;
		height: 2.25rem;
		line-height: 2.25rem;
		background-color: #ff3737;
		color: #fff;
		border: none;
		border-radius: 0.1rem;
		font-size: 0.7rem;
	}
}
/*#opa div.wp{ color: #333333; font-size: 0.8rem; margin-bottom: 0.75rem;}
#opa p.wpf{ color: #666666; font-size:0.65rem;  margin-bottom: 0.75rem;}
#opa div.dinp{}
#opa div.dinp p{ position: relative;}
#opa div.dinp p label{ position: absolute; width:5.7rem; line-height: 2.125rem; font-size: 0.7rem; padding-left:0.75rem; top:0rem; left: 0rem;}
#opa div.dinp input{ width:17.2rem; padding: 0rem 0.75rem 0rem 5.5rem; line-height:2.125rem; color: #333333;font-size: 0.7rem; border-radius: 0.1rem; border:none; border: 0.025rem solid #c8c8c8; margin-bottom: 0.75rem;}
#opa div.dinp input.verification{ width:17.2rem; padding: 0rem 5.275rem 0rem 5.5rem;}
#opa div.dinp p img.vdimg{ position: absolute; width:5.2rem; height: 2.05rem; right: 0.1rem; top:0.075rem; }
#opa input.ins{width:17.2rem; height: 2.25rem; line-height: 2.25rem; background-color: #ff3737; color: #fff; border: none; border-radius: 0.1rem; cursor: pointer;}*/
</style>
