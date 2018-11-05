<template>
	<div class="recharge">
		<h5>温馨提示</h5>
		<div class="recharge-hint">
			<p>·充值资金不能提现或退回到原卡</p>
			<p>·充值完成后，您可以进入账户查看余额</p>
			<p>·充值过程中如有疑问请联系在线客服或拨打：400-010-6966</p>
		</div>
		<h5>充值信息</h5>
		<div class="recharge-money">
			<p>当前余额（元）<span><b>{{usermoney}}</b></span></p>
			<p>充值金额（元）<input type="text" v-model="Rnumber"/></p>
			<p>充值方式</p>
			<div class="recharge-way">
				<!--<button >中欣卡</button>-->
				<button :class="Rway==4? 'active-way' :''" @click="changeWay(4)">中欣通</button>
				<!--<button :class="Rway==5? 'active-way' :''" @click="changeWay(5)">易付卡</button>-->
			</div>
		</div>
		<div class="next-recharge">
			<a @click="gorecharge">下一步</a>
		</div>
	</div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';	
	const Recharge = {
	  	name: 'Recharge',
	  	data () {
	    	return {
	            Rway:4,
	            Rnumber:'',
	            usermoney:''
	    	}
	  	},
	  	methods:{
	        changeWay(str){
	            this.Rway=str
	        },
	        gorecharge(){
	        	var token = localStorage.getItem("token");
	          	var that= this
	          	if(this.Rnumber){
		          	axios.post(BASE_URL +'/index.php?r=weiXinPay/rechargeRecord',qs.stringify({
		          	   rechargeMoney:this.Rnumber,
			            payMethod:this.Rway,
			            token:token
			        })).then(function(res){
			            var a=JSON.parse(Base64.decode(res.data))
			            if(a.data.err==1000){
			                window.location.href='#/ArRe4/'+a.data.orderId
			            }else{
			            	Toast('请重试');
			            }
			        }).catch(function(err){
			
			        })
		        }else{
		        		Toast('请输入金额');
		        }
	        }
         
         
	  	},
	  	mounted(){
	  		var that =this
	  		var token = localStorage.getItem("token");
	  		document.title = '账户充值'
	  		if(!token){
	  			MessageBox.confirm('您还未登录，现在去登录?').then(action => {
					window.location.href="#/login";
				},
				action => {
					window.location.href="#/main";
				})
	  		}
			axios.post(BASE_URL +'/index.php?r=site/userinfo',qs.stringify({
				token:token
	        })).then(function(data){ 
          		var a = JSON.parse(Base64.decode(data.data))
                if(a.data.err==10002){
					that.usermoney=a.data.allMoney;
					
                }
	        }).catch(function(err){

	        })
		},
		updated(){

		},
		activated(){

		},
	    components:{

	    }
	}

	export default Recharge
</script>

<style scoped lang="scss">
	.recharge{
		h5{
			font-size: 0.75rem;
			padding:0.75rem;
		}
		.recharge-hint{
			background: #fff;
			color: #666;
			font-size: 0.65rem;
			padding: 0.75rem;
			line-height: 1.5rem;
		}
		.recharge-money{
			background: #fff;
			padding: 0.75rem 0;
			font-size: 0.65rem;
			color: #666;
			line-height: 1.5rem;
			p{
				padding:0 0.75rem;
				span{
					color: #FF3737;
					margin-left: 0.6rem;
				}
				input{
					flex:1;
					border: 0;
					background: #f5f5f5;
					height: 2rem;
					margin-left: 0.6rem;
					width: 11rem;
					font-size: 0.75rem;
				}
			}
			.recharge-way{
				border-top:1px solid #eee;
				display: flex;
				justify-content: space-between;
				padding: 0.75rem;
				padding-bottom: 0;
				button{
					width: 5.25rem;
					height:2.2rem;
					background: #FFf;
					color: #ff3737;
					border: 1px solid #FF3737;
				}
				.active-way{
					background: #FF3737;
					color: #fff;
				}
			}
		}
		.next-recharge{
			padding: 0.75rem;
			a{
				display: block;
				background: #FF3737;
				color: #FFF;
				height: 2.25rem;
				text-align: center;
				line-height: 2.25rem;
			}
		}

	}

</style>
