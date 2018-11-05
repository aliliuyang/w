<template>
<div id="opa">
	<div v-show="!nopay">
  <!--<div class="wps">中欣通充值</div>
      <div class="attu">-->
			<!--<p>首次使用中欣通网上购物请先激活</p>-->
			<!--<a href="#/activate" >激活</a>-->
		<!--</div>-->
		<div class="ra">
			<p class="tur">充值金额(元)</p>
			<p class="num">{{money}}</p>
		</div>
		<div class="dinp">
			<p>
			<label>中欣通卡：</label><input v-model="cardNo" type="text" placeholder="请输入卡号" />
			</p>
      <div v-if="showactive">
        <p>
        <label>卡激活码：</label><input v-model="activcode" type="password"  placeholder="刮开卡背面图层获取激活码"/>
        </p>
        <p>
          <label>身份证号：</label><input v-model="personid" type="text"placeholder="请输入身份证号码"/>
        </p>
        <p>
        <label>绑定手机号：</label><input v-model="phone" type="text"placeholder="请输入手机号"/>
        </p>
      </div>
			<p>
			<label>验证码：</label><input v-model="phonecode" type="text" class="verification" placeholder="请输入验证码" />
			<button @click="getcode">{{time}}</button>
			</p>
		</div>
		<button @click="gopay" class="ins">提交</button>
		</div>
		<succeed-re v-if="nopay" :money=money></succeed-re>
</div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'mint-ui';
import SucceedRe from './SucceedRe';
	const  ArRe4={
	  	name: 'ArRe4',
	  	data () {
	  	  return {
          showactive:false,
          nopay:false,
          orderid:'',
          active:1,
          cardNo:"",
          money:'',
          time:'获取验证码',
          phonecode:'',
          activcode:'',
          personid:'',
          phone:'',
          msgphonecode:''
        }
	  	},
    methods:{
      getcode(){
      	var token = localStorage.getItem("token");
      	var that= this
      	if(!this.cardNo){
  			Toast("请输入卡号")
  			return false;
  		}
      	if(this.time<=60){
      		return false;
      	}

      	if(this.active==1){
      		axios.post(BASE_URL +'/index.php?r=weiXinPay/zxkSend',qs.stringify({
        		class:'1',
	            cardNo:this.cardNo,
	            orderId:this.orderid,
	            rechargeMoney:this.money,
	            token:token
	        })).then(function(res){
	        	var a=Base64.decode(res.data)
	        	a=JSON.parse(a)
	        	Toast(a.info)
	        	if(a.code==1000){
	        		that.msgphonecode=a.data.phonecode
	        		that.counttime()
	        	}
	        	if(a.code==1012){
	        		that.showactive=true;
	        		that.active=2
              MessageBox({
                title: '提示',
                message: '尚未激活</br>请完善信息  激活并充值',
              })
	        	}
	        }).catch(function(err){

	        })
      	}else{
      		if(!(/^\d{6}$/.test(this.activcode))){
      			Toast("请输入6位激活码")
      			return false;
      		}
      		if(!(/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.phone))){
      			Toast("请输入正确手机号")
      			return false;
      		}
      		if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.personid))){
      			Toast("请输入正确身份证号")
      			return false;
      		}
      		axios.post(BASE_URL +'/index.php?r=weiXinPay/zxkSend',qs.stringify({
	            class:'1',
	            cardNo:this.cardNo,
	            orderId:this.orderid,
	            rechargeMoney:this.money,
	            phone:this.phone,
	            activcode:this.activcode,
	            personid:this.personid,
	            token:token
	        })).then(function(res){
		        	var a=Base64.decode(res.data)
		        	a=JSON.parse(a)
		        	Toast(a.info)
		        	if(a.code==1000){
		        		that.msgphonecode=a.data.phonecode
		        		that.counttime()
		        	}
	        }).catch(function(err){

	        })
      	}
      },
      counttime() {

		var that =this
      	var token = localStorage.getItem("token");
        	that.time = 60;
        	var timer = setInterval(function () {
	        	that.time--
		        if(that.time == 0) {
		        	that.time = "获取验证码"
              		clearTimeout(timer)
		        }
	       	}, 1000)
	   	},
		gopay(){

         var token = localStorage.getItem("token");
				if(!this.phonecode){
	      			Toast("请输入验证码")
		  			return false;
	  			}
				var that =this
				if(this.active==1){
					 axios.post(BASE_URL +'/index.php?r=weiXinPay/zxkRecharge',qs.stringify({
							cardNo:this.cardNo,
							orderId:this.orderid,
							rechargeMoney:this.money,
							msgCode:this.phonecode,
							isactive:this.active,
							phonecode:this.msgphonecode,
							token:token
			        })).then(function(res){
			        	var a=Base64.decode(res.data)
			        	a=JSON.parse(a)
			        	Toast(a.info)
			        	if(a.code==1000){
			        		that.nopay=true
			        	}
			        }).catch(function(err){

			        })
				}else{
					axios.post(BASE_URL +'/index.php?r=weiXinPay/zxkRecharge',qs.stringify({
						cardNo:this.cardNo,
						orderId:this.orderid,
						rechargeMoney:this.money,
						msgCode:this.phonecode,
						isactive:this.active,
						phone:this.phone,
						activcode:this.activcode,
						personid:this.personid,
						phonecode:this.msgphonecode,
						token:token
			        })).then(function(res){
			        	var a=Base64.decode(res.data)
			        	a=JSON.parse(a)
			        	Toast(a.info)
			        	if(a.code==1000){
			        		that.nopay=true
			        	}
	       			 }).catch(function(err){

	        		})
				}

			}
    },
    mounted(){
      this.isgologin()
    	var that =this
			this.orderid=this.$route.params.orderId;
			var token = localStorage.getItem("token");
			 axios.post(BASE_URL +'/index.php?r=weiXinPay/getInfobyRe',qs.stringify({
							rechargeCode:this.orderid,
							token:token
	        })).then(function(res){
	        	var a=Base64.decode(res.data)
	        	a=JSON.parse(a)

	        	that.money=a.data.data.money
	        }).catch(function(err){

	        })
		},
		updated(){

		},
		activated(){

		},
	    components:{
				"succeed-re":SucceedRe
	    }
	}
export default ArRe4

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
			width: 5rem;
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
			font-size: 0.7rem;
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
		padding: 0rem 0.75rem 0rem 5rem;
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
		font-size: 0.7rem;
	}
}

</style>

