<template>
	<div class="succeed-pay">
		<div class="pay-tittle">
			<div class="pay-img">
			  <img src="../../assets/images/pay-succeed.png" alt="" />
			</div>
			<p class="pay-way">支付方式<span>中欣通</span></p>
			<div class="pay-num">
        <p>充值金额(元)</p>
        <h3>{{money}}</h3>
      </div>
		</div>
		<div class="goshopping">
			<a href="#/record">充值记录</a>
			<a href="#/main">我的账户</a>
		</div>
	</div>
</template>

<script>

	const SucceedRe = {
	  	name: 'SucceedRe',
	  	props:["money"],
	  	data () {
	    	return {
	    	}
	  	},
	  	methods:{

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
	export default SucceedRe
</script>

<style scoped lang="scss">
	.succeed-pay{

		background: #f5f5f5;

		.pay-tittle{
			padding: 0 0.75rem;
			background: url(../../assets/images/bottom.jpg) no-repeat bottom #fff;
			.pay-img{
				img{
					padding: 2rem 0;
					display: block;
					margin: 0 auto;
					width: 40%;
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
