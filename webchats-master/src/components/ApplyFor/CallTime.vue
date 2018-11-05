<template>
	<div id="call-time">
		<h5><i></i><span>取件地址</span><b @click="show">x</b></h5>
		<div class="call">
			<div class="date">
				<ul>
					<li >2017-09-26(星期二)</li>
					<li class="active-time">2017-09-27(星期三)</li>
					<li>2017-09-28(星期四)</li>
					<li>2017-09-29(星期五)</li>
					<li>2017-09-30(星期一)</li>
					<li>2017-10-01(星期二)</li>
				</ul>
			</div>
			<div class="time">
				<p class="active-time">9:00-15:00</p>
				<p>15:00-19:00</p>
			</div>
		</div>
	</div>
</template>

<script>

	const CallTime = {
	  	name: 'CallTime',
	  	props:['show'],
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
	export default CallTime
</script>

<style scoped lang="scss">
#call-time{
	position: fixed;
	bottom: 0;
	left: 0;
	width:100%;
	height: 20rem;
	background: #fff;
	z-index: 100;
	h5{
		display: flex;
		justify-content: space-between;
		font-weight: normal;
		font-size: 0.65rem;
		padding: 0 0.75rem;
		line-height: 2.25rem;
	}
	.call{
		font-size: 0.65rem;
		display: flex;
		justify-content: space-between;
		color: #555555;
		line-height: 2.25rem;
		.date{
			width:50%;
			ul{
				background:#f5f5f5 ;
				li{
					width: 100%;
					text-align: center;
				}
			}
		}
		.time{
			width: 50%;
			p{
				width: 100%;
				text-align: center;
			}
		}
		.active-time{
			background: #fff;
			color: #FF3737;
		}
		
	}
	
}

</style>
