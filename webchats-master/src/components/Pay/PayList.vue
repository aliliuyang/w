<template>
	<div class="pay-tittle">
		<div class="oredr-information">

			<p>订单号码：<span>{{order.id}}</span></p>
      <div>
        <p>订单总额：<b>{{order.orderMoney}}</b>元</p>
        <p ><span class="make">中欣通专享价</span><b class="makemoney">{{order.zxtmoney
          }}</b>元</p>

      </div>
			<p v-if="order.orderPayed>0">已付金额：{{fixed(order.orderPayed)}}元&nbsp;&nbsp;&nbsp;&nbsp;还需支付：{{fixed(needpaymoney)}}元</p>
			<h6>请您在提交订单后24小时内完成支付，超时将自动取消</h6>
		</div>
	</div>
</template>

<script>
	const PayList = {
	  	name: 'PayList',
	  	props:['order','needpaymoney'],
	  	data () {
	    	return {

	    	}
	  	},
	  	methods:{
        fixed(str){
          str=Number(str)
          return str.toFixed(2)
        }
	  	},
	  	mounted(){

		},
		updated(){

		},
		activated(){

		},
	}
	export default PayList
</script>

<style scoped lang="scss">
	.oredr-information{
		background: #fff;
		padding: 0.75rem;
		font-size: 0.65rem;
		color: #666;
		line-height: 1.45rem;
		p{
			span{
				color: #333;
				font-weight: bold;

			}
      .make{
        font-size: 0.5rem;
        color: #fff;
        border:1px solid #29218e;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        padding: 0 4px;
        margin-right: 5px;
        background: #29218e;
        font-weight: bold;
      }
      .makemoney{
        color: #4a4a4a;
      }
			b{
				color: #FF3737;
			}
		}
		h6{
			font-size: 0.5rem;
			font-weight: normal;
		}
	}

</style>
