<template>
	<div id="recycle">
		<img src="../../assets/images/zhuanzhuan.png" alt="" />
		<div class="text">
			<p><span>选择卡种:</span><i><select>
				<option></option>
				<option value="中欣卡">中欣卡</option>
				<option value="京东卡">京东卡</option>
				<option value="商通卡">商通卡</option>
				<option value="福卡">福卡</option>
			</select></i></p>
			<p><span>转让金额：</span><i><input type="text"  placeholder="如3000"/></i><b>元</b></p>
			<p><span>折扣：</span><i><input type="text"  placeholder="如9.8"/></i><b>折</b></p>
			<p><span>联系电话：</span><i><input type="text"/></i></p>
			<button>确定</button>
		</div>
	</div>
</template>

<script>
	//购物卡回收
	const Recycle = {
	  	name: 'Recycle',
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
	export default Recycle
</script>

<style scoped lang="scss">
#recycle{
	width: 100%;
	height: 100%;
	background: url(../../assets/images/recycle.jpg) no-repeat;
	background-size: 100% auto;
	padding-top: 2.25rem;
	img{
		width: 100%;
	}
	.text{
		padding:0 1.85rem;
		p{
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #eee;
			height: 2.25rem;
			align-items: center;
			font-size: 0.6rem;
			background: #fff;
			padding: 0 0.5rem;
			color: #333;
			i{
				display: flex;
				flex: 1;
				input{
					width: 100%;
					border: none;
				}
				select{
					width: 100%;
					border: none;
					outline: none;
				}
			}
		}
		button{
			width: 100%;
			background: #FF3737;
			color: #fff;
			border: none;
			height: 2.25rem;
			margin-top: 0.75rem;
		}
	}
}

</style>
