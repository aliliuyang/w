<template>
	<div class="promotion-viw">
		<div class="promotion-tit">
			<span></span><h3>优惠券</h3><span @click="allhidden">x</span>
		</div>
		<div class="promotion-content">
		<p>可领取的优惠券</p>
			<ul>
				<li>
					<img src="../../assets/images/youhuiquan.jpg" alt="" />
				</li>
				<li>
					<img src="../../assets/images/youhuiquan.jpg" alt="" />
				</li>
				<li>
					<img src="../../assets/images/youhuiquan.jpg" alt="" />
				</li>
				
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
	  	name: 'caryouhui',
	  	props:['allhidden'],
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

</script>

<style scoped lang="scss">
.promotion-viw{
	position: fixed;
	bottom: 0rem;
	z-index: 999999;
	background: #FFF;
	width: 100%;
	height:  20rem;
	padding: 0 0.925rem;
	display: flex;
	flex-direction:column;
	.promotion-tit{
		font-size: 0.75rem;		
		color: #999;
		display: flex;
		justify-content: space-between;
		width:100%;
		border-bottom:1px solid #F5F5F5;
		line-height:2.25rem;
		h3{
			font-size: 0.75rem;
			text-align: center;
			font-weight: normal;
		}
	}
	.promotion-content{
		font-size: 0.65rem;
		color: #333333;
		padding: 1rem 0;
		overflow: scroll;
		flex: 1;
		ul{
			li{
				padding: 0.5rem 0.75rem;
				border-bottom: 1px solid #eee;
				display: flex;
				img{
					width: 100%;
					height: 4.5rem;
				}
			}
		}
	}
	.promotion-content::-webkit-scrollbar{display:none;}
}
	
		
</style>