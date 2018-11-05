<template>
	<div class="succeed-pay">
		<div class="pay-tittle">
			<div class="pay-img" v-if='!(remainordermoney>0&&this.order.payway==40)'>
				<img src="../../assets/images/pay-succeed.png" alt="" />
			</div>
			<div  class="pay-img" v-else>
					<img src="../../assets/images/moretype.jpg" alt="" />
					<p>已支付<span>{{order.orderPayed}}元</span>还需支付<span>{{remainordermoney}}元</span></p>
			</div>
			<!--<p class="pay-way">支付方式<span>{{payway}}</span></p>-->
			<div class="pay-num"  >
				<div v-if='!(remainordermoney==0&&this.order.payway==25)'>
					<p>支付金额(元)</p>
					<h3>{{order.orderPayed}}</h3>
				</div>
		</div>
		</div>
		<div v-if="remainordermoney>0&&this.order.payway==40" class="wxpay">
			<p @click="wxpay"><b class="iconfont icon-weixinzhifu"></b>使用微信支付剩余{{remainordermoney}}元</p>
		</div>
		<div v-else class="goshopping">
			<a href="#/index">继续购物</a>
			<a href="#/order/all">查看订单</a>
		</div>
	</div>
</template>

<script>
  import axios from 'axios';
  import qs from 'qs';
	const SucceedPay = {
	  	name: 'SucceedPay',
	  	props:[],
	  	data () {
	    	return {
          orderid: "",
          order:{}
	    	}
	  	},
    computed:{
      payway(){
        if(this.order.payway==1){
          return '余额支付'
        }
        if(this.order.payway==3){
          return '中欣卡支付'
        }
        if(this.order.payway==24){
          return '微信支付'
        }
        if(this.order.payway==25) {
          if (this.order.orderPayed < this.order.orderMoney) {
            return '余额支付'
          } else {
            return '余额支付和微信支付'
          }
        }
      },
      remainordermoney(){
        if(this.order.hasZxk){
          return (this.order.zxtmoney - this.order.orderPayed).toFixed(2)
        }else{
          return (this.order.orderMoney - this.order.orderPayed).toFixed(2)
        }

      }

    },
	  	methods:{
        init() {
          var that = this
          var token = localStorage.getItem("token");
          this.orderid = this.$route.params.orderid
          axios.post(BASE_URL + '/index.php?r=order/view', qs.stringify({
            oid: Base64.encode(this.orderid),
            ischild: Base64.encode(0),
            token: token,
          })).then(function (res) {
            var a = Base64.decode(res.data)
            a = JSON.parse(a)
            that.order = a.data.order
          }).catch(function (err) {

          })
        },
        getwxStr(){
          var that=this
          var myopenid=localStorage.getItem("openid");
          var token = localStorage.getItem("token");
          axios.post(BASE_URL+'/index.php?r=weiXinPay/actualPay',qs.stringify({
            orderId:this.orderid,
            payMoney:Number(this.remainordermoney).toFixed(2),
            payMethod:"7",
            from:"1",
            body:this.orderid,
            fee:this.remainordermoney,
            openid:myopenid,
            token:token
          })).then(function(res){
            var a=Base64.decode(res.data)
            a=JSON.parse(a)
            that.wxpaycode=JSON.parse(a.data.data)
          }).catch(function(err){

          });
        },
        wxpay(){
					var that =this
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',this.wxpaycode,
            function(res){
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
               that.init()
              }
            }
          )
        },

	  	},
	  	mounted(){
        this.isgologin()
        this.init()
        this.getwxStr()
		},
	    updated(){

      },
	    activated(){

      },
	    components:{

	    }
	}
	export default SucceedPay
</script>

<style scoped lang="scss">
	.succeed-pay{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		padding: 0.75rem;
		.pay-tittle{
			padding: 0 0.75rem;
			background: url(../../assets/images/bottom.jpg) no-repeat bottom #fff;
      background-size: 100%;

			.pay-img{
				img{
					padding: 2rem 0;
					display: block;
					margin: 0 auto;
					width: 40%;
				}
				p{
					width: 100%;
					padding-bottom: 0.5rem;
					text-align: center;
					font-weight: normal;
					color: #999;
					span{
						width: 100%;
						text-align: center;
						font-size: 0.95rem;
						color: #FF3737;
					}
				}
			}
			.pay-way{
				font-size: 0.65rem;
				line-height: 2.25rem;
				border-top:1px dashed #eee ;
				border-bottom:1px dashed #eee;
				padding: 0 0.75rem;
				color: #999;
				display: flex;
				justify-content: space-between;
				span{
					color: #333;
				}
			}
			.pay-num{
				padding: 1.25rem 0;
				text-align: center;
				p{
					color: #999;
					font-size: 0.65rem;
					line-height: 1.5rem;
				}
				h3{
					font-size: 0.95rem;
					font-weight: normal;
					padding-bottom: 1.25rem;
				}
			}
		}
		.wxpay{
			p{
				background:#3ab54a;
				height: 2.25rem;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
				b{
					font-size: 1rem;
					color: #fff;
				}
			}
		}
		.goshopping{
			display: flex;
			justify-content: space-between;
      padding-top: 1rem;
			a{
				display: block;
				width: 45%;
				height: 2.25rem;
				background: #FF3737;
				color: #fff;
				font-size: 0.8rem;
				line-height: 2.25rem;
				text-align: center;
			}
		}
	}

</style>
