<template>
	<div id="joiest-card">
		<h5><span>中欣卡</span></h5>
		<div class="carID">
			<p><span>中欣卡号：<i><input type="tel" /></i></span></p>
			<p><span>验证码:<i><input type="text" /></i></span><button>获取验证码</button></p>
			<div class="next">
				<button>查询余额</button>
			</div>
			<div class="card-img">
				<img src="../../assets/images/joiest.png" alt="" />
			</div>
		</div>
	</div>
</template>

<script>


	const JoiestCard = {
	  	name: 'JoiestCard',
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
	export default JoiestCard
</script>

<style scoped lang="scss">
#joiest-card{
	display: flex;
	flex-direction: column;
	padding-top: 1rem;
	width: 100%;
	height: 100%;
	h5{
		margin: 0 0.75rem;
		border-top: 1px solid #333;
		position: relative;
		height: 1.25rem;
		span{
			width: 3.25rem;
			display: block;
			font-size: 0.5rem;
			color: #333;
			font-weight: normal;
			margin: 0 auto;
			margin-top: -0.4rem;
			background: #f5f5f5;
			text-align: center;
		}
	}
	.carID{
		display: flex;
		padding: 0 0.75rem;
		background: #fff;
		flex: 1;
		flex-direction: column;
	}
	p{
		box-sizing: border-box;
		height: 2.25rem;
		display: flex;
		justify-content: space-between;	
		font-size: 0.65rem;
		border-bottom:1px solid #eee;
		align-items: center;
		span{
			padding-left: 0.375rem;
			width: 100%;
			background: #fff;
			display: flex;
			color: #999;
			align-items: center;
			justify-content:flex-start;
			flex-flow: 1;
			align-items: center;
			i{
				display: flex;
				flex: 1;
			}
			input{
				width: 100%;
				margin-left: 0.5rem;
				display: flex;
				flex-flow: 1;
				border:none;
				color: #333;
			}
		}
		button{
			width:4.5rem;
			color: #FF3737;
			background: #fff;
			border: 1px solid #FF3737;
			font-size: 0.55rem;
			height: 1.4rem;
		}
	}
	.next{
		padding:0 0.75rem;
		padding-top: 1rem;
		button{
			width: 100%;
			background: #FF3737;
			line-height: 2.25rem;
			border: none;
			color: #fff;
			font-size: 0.7rem;
		}
	}
	.card-img{
		padding: 0 0.75rem;
		padding-top: 2.5rem;
		img{
			width: 100%;
		}
	}
}


</style>
