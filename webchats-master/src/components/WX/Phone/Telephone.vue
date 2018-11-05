<template>
	<div id="hf">
		<h5><span>话费充值</span><b><a href="#/phone/inform">温馨提示</a></b></h5>
		<div class="title">
			<div>
				<span>手机号码：</span><p><input type="text" /></p><b><i class="iconfont icon-xuanzhong"></i>中国电信</b>
			</div>
			<div>
				<span>确认号码：</span><p><input type="text" /></p>
			</div>
		</div>
		<div class="much">
			<p>充值面额</p>
			<div class="how">
				<span :class="money==50?'active':''" @click="change(50)">50元</span>
				<span :class="money==100?'active':''" @click="change(100)">100元</span>
				<span :class="money==200?'active':''" @click="change(200)">200元</span>
			</div>
			<p class="pay"><span>应付金额：&nbsp;<b>¥&nbsp;<i>{{this.howmoney}}</i></b></span><span>提示：手机充值收取3%手续费</span></p>
      <p><span>中欣通支付立省{{}}%</span></p>
		</div>
		<div class="gopay">
			<a href="#/pay">选择充值方式</a>
		</div>
		<p class="dao">正常充值时间为5到30分钟，如遇运营商系统繁忙到账时间会有延迟</p>
	</div>
</template>
<script>


	const Telephone = {
	  	name: 'Telephone',
	  	data () {
	    	return {
				money:50,

	    	}
	  	},
	  	methods:{
			change(res){
				this.money=res
			}
	  	},
	  	computed: {
		    howmoney: function () {
		      return this.money*103/100
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
	export default Telephone
</script>

<style scoped lang="scss">
#hf{
	h5{
		display: flex;
		justify-content: space-between;
		padding: 0 0.75rem;
		line-height: 2.25rem;
		font-weight: normal;
		span{
			color: #333;
			font-size: 0.7rem;
		}
		b a{
			font-weight: normal;
			color: #FF3737;
			font-size: 0.7rem;
		}
	}
	.title{
		background: #fff;
		padding: 0 0.75rem;
		div{
			display: flex;
			justify-content: space-between;
			font-size: 0.65rem;
			color: #999;
			line-height: 2.25rem;
			border-bottom: 1px solid #eee;
			p{
				flex: 1;
				input{
					width: 100%;
					color: #333;
					border: none;
				}
			}
			b{
				color: #333;
				i{
					color:#16c460 ;
				}
			}
		}
	}
	.much{
		background: #fff;
		p{
			color: #999;
			padding: 0.75rem;
			font-size: 0.65rem;
		}
		.how{
			padding: 0 0.75rem;
			display: flex;
			justify-content: space-between;
			span{
				border: 1px solid #eee;
				font-size: 0.6rem;
				color: #333;
				width: 5.2rem;
				line-height:2.15rem;
				text-align: center;
			}
			.active{
				border-color: #FF3737;
				color: #FF3737;
			}
		}
		.pay{
			display: flex;
			justify-content: space-between;
			color: #999;
			b{
				color: #FF3737;
			}
		}
	}
	.gopay{
		padding: 0 0.75rem;
		padding-top: 0.5rem;
		a{
			display: block;
			width: 100%;
			background: #FF3737;
			color: #fff;
			text-align: center;
			line-height: 2.25rem;
			font-size: 0.7rem;
		}
	}
	.dao{
		padding:0 0.75rem;
		font-size: 0.65rem;
		color: #666;
		padding-top: 0.75rem;
	}
}

</style>
