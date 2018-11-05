<template>
	<div id="pay">
		<pay-list :order=order></pay-list>
		<h5>选择支付方式</h5>
		<div class="selectpay">
			<div class="yve">
				<p><b><img src="../../assets/images/yve.png"/></b>账户余额&nbsp<span>¥&nbsp<b>{{mymoney}}</b></span><a href="#/recharge">充值</a></p>
				<div class="selected" :class="this.payway=='remainingSum'? 'activepay':''" @click="changeway('remainingSum')"></div>
			</div>
			<div>
				<p><b><img src="../../assets/images/ZXcard.png"/></b>中欣卡</p>
				<div class="selected" :class="this.payway=='joisetcard'? 'activepay':''" @click="changeway('joisetcard')"></div>
			</div>
			<div>
				<p><b><img src="../../assets/images/yveandwx.png"/></b>余额+微信支付</p>
				<div class="selected" :class="this.payway=='andwx'? 'activepay':''" @click="changeway('andwx')"></div>
			</div>
			<div>
				<p><b><img src="../../assets/images/WX.png"/></b>微信支付</p>
				<div class="selected" :class="this.payway==4? 'activepay':''" @click="changeway(4)"></div>
			</div>
		</div>
		<a class="paygo" @click="paymoney">确定</a>
	</div>
</template>
<script>
	import { Radio } from 'mint-ui';
	import PayList from './PayList';
	import wx from 'weixin-js-sdk'
	import axios from 'axios';
	import qs from 'qs';
	import { MessageBox } from 'mint-ui';
	import { Indicator } from "mint-ui";

	export default{
	  	name: 'Pay',
	  	data () {
	    	return {
			  	payway:'remainingSum',
			  	openid:'',
			  	orderid:'',
			  	order:{},
			  	mymoney:"",
			  	token:''
	    	}
		},

	  	methods:{
	  		changeway(way){
	  			this.payway=way
	  		},
	  		paymoney(){
	  			var that= this
	  			this.orderid=this.$route.params.orderid
	  			if(this.order.status==40){
	  				if(this.payway==4){
	  					this.getwxStr()
	  				}else{
	  					MessageBox({
	  						title: '提示',
               				 message: '该订单只能使用微信支付',
	  					})
	  				}
	  			}else{
	  				if(this.payway==4){
	  					axios.post(BASE_URL+'/index.php?r=weiXinPay/actualPay',qs.stringify({
			                orderId:this.orderid,
			                payMethod:'8',
			                from:'1',
			                openid:this.openid,
			                payMoney:Number(this.order.orderMoney).toFixed(2),
			                body:this.orderid,
			                fee:this.order.orderMoney,
			                token:this.token
				  		})).then(function(res){
					  		var a=JSON.parse(Base64.decode(res.data))
					  		var b=JSON.parse(a)
							    WeixinJSBridge.invoke(
				                'getBrandWCPayRequest',b,
				                function(res){
			             		  	if(res.err_msg == "get_brand_wcpay_request:ok" ) {
										          window.location.href='#/order/1'
			             		  	}
				                }
				            );
				  		}).catch(function(err){

				        });
		  			}else{

	  				  	if(this.payway=="andwx"&&(this.mymoney-that.order.orderMoney)>=0){
		                  MessageBox({
		                    title: '提示',
		                    message: '您的余额充足，请优先使用余额支付',
		                  })
                			return
		  				}
		  					window.location.href='#/paymoney/'+this.payway+'/'+this.orderid
		  			}
	  			}
        },
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
	  		getorder(){
	  			var that=this
				  axios.post(BASE_URL+'/index.php?r=order/view',qs.stringify({
		  			oid:Base64.encode(this.orderid),
		  			ischild:Base64.encode("0"),
		  			token:this.token
		  		})).then(function(res){
		  			var a =Base64.decode(res.data)
		  			a=JSON.parse(a)
		  			that.order=a.data.order
		  		}).catch(function(err){

		        })
	  		},
	  		getYue(){
	  			var that= this
	  			axios.post(BASE_URL +'/index.php?r=site/userinfo',qs.stringify({
					token:this.token
	  			})).then(function(data){
	          		var a = JSON.parse(Base64.decode(data.data))
	                if(a.data.err==10002){
						that.mymoney=a.data.allMoney;
	                }
		        }).catch(function(err){

		        })
	  		},
	  		getwxStr(){
	        	var that=this
	        	var wxpaycode=''
	        	var remainordermoney=this.order.orderMoney-this.order.orderPayed
            var myopenid=localStorage.getItem("openid");
    			axios.post(BASE_URL+'/index.php?r=weiXinPay/actualPay',qs.stringify({
		            orderId:this.orderid,
		            payMoney:Number(remainordermoney).toFixed(2),
		            payMethod:"7",
		            from:"1",
		            body:this.orderid,
		            fee:remainordermoney,
		            openid:myopenid
		  		})).then(function(res){
		  			var a=Base64.decode(res.data)
		  			a=JSON.parse(a)
            	wxpaycode=JSON.parse(a.data.data)
		  			  WeixinJSBridge.invoke(
		                'getBrandWCPayRequest',wxpaycode,
		                function(res){
	             		  	if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                        window.location.href="#/succeedpay/"+that.orderid
	             		  	}
		                }
	            	)
		  		}).catch(function(err){

		        });
	        }

	  	},
	  	mounted(){
        this.isgologin()
	  		var that =this
	  		this.token = localStorage.getItem("token");
	  		document.title = '订单支付'
        	this. directRightUrl ()
	  		var url=window.location.href
	  		var myopenid=localStorage.getItem("openid");
	  		this.orderid=this.$route.params.orderid
	  		if(!myopenid){
		  		if(url.indexOf('openid=')=='-1'){
					var myurl= Base64.encode(url)
					var gohref=encodeURIComponent(BASE_URL+"/index.php?r=weiXinPay/getOP&vueUrl="+myurl+'&token='+this.token)
					window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd11d5e7feb979553&redirect_uri='+gohref+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
		  		}else{
		  			this.openid=url.split("openid=")[1];
		  			localStorage.setItem("openid",this.openid);
		  		}
	  		}else{
	  			this.openid=localStorage.getItem("openid")
//	  			localStorage.removeItem('openid');
			  }
			  Indicator.close()
	  		this.getorder()
	  		this.getYue()

		},
		updated(){



		},
		activated(){

		},
	    components:{
			  'pay-list':PayList
	    }
	}

</script>
<style scoped lang="scss">
	#pay{

		h5{
			margin-top: 0.75rem;
			color: #333;
			line-height: 2.25rem;
			padding-left: 0.75rem;
			background: #fff;
			font-weight: normal;
			font-size: 0.65rem;
			color: #666;
		}
		.selectpay{
			padding-left: 0.75rem;
			background: #FFf;
			font-size:0.75rem ;
			border-top: 1px solid #eee;
			div{
				line-height: 3rem;
				border-top: 1px solid #eee;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 0.65rem;
				p{
					font-size:0.65rem;
					color: #333;
					b{
						img{
							width: 1.5rem;
							margin-right: 0.4rem;
						}

					}
					span{
						color: #FF3737;
					}
					a{
						color: #FF3737;
						display:inline-block;
						border: 1px solid #FF3737;
						line-height: 1.075rem;
						padding: 0 0.6rem;
						border-radius: 0.125rem;
						margin-left: 0.25rem;

					}
				}

				.selected{
					width: 0.75rem;
					height: 0.75rem;
					border: 1px solid #999;
					border-radius: 50%;
					margin-right: 0.75rem;
				}
				.activepay{
					background: url(../../assets/images/active.png) no-repeat center;
					background-size: 250%;
					border: none;
				}
			}
			.yve{
					border: none;
			}

		}
		.paygo{
			background: #ff3737;
			height: 2.5rem;
			text-align: center;
			line-height: 2.5rem;
			position: fixed;
			bottom: 0;
			width: 100%;
			color: #fff;
		}

	}

</style>
