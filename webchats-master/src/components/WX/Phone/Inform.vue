<template>
	<div class="infrom">
		<p>1.正常充值时间为5到30分钟，如遇运营商系统繁忙到账时间会有延迟。</p>
		<p>2.充值金额可能会分多次到账。</p>	
		<p>3.本充值不参加当地运营商活动。</p>
		<p>4.支持全国各省市（不包括港、澳、台地区）。</p>
		<p>5.部分地区无法提供充值发票，请谨慎购买。</p>
		<p>6.话费到账情况请拨打运营商客服电话查。<br/>
			（移动：10086，联通：10010，电信：1000）。
		</p>
		<p>7.同一手机号当天充值话费次数最多5次，月充充值次数最多20次。</p>
		<p>8.移动特殊套餐用户和电信时长计费用户不可使用流量充值，根据运营商规定其他用户部分充值有次数限制。</p>
		<p>9.联通单个流量充值产品当月限购5次。</p>
	</div>
</template>

<script>

	const Inform = {
	  	name: 'Inform',
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
	export default Inform
</script>

<style scoped lang="scss">
.infrom{
	padding: 1.15rem 0.75rem;
	p{
		font-size: 0.65rem;
		color: #333;
		padding-bottom: 1.25rem;
		line-height: 1rem;
	}
}

</style>
