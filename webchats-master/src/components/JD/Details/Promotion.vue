<template>
	<div class="promotion-viw">
		<div class="promotion-tit">
			<span></span><h3>促销</h3><span @click="allhidden" class="iconfont icon-guanbi"></span>
		</div>
		<div class="promotion-content">
			<ul>
				<li><span><b>满减</b></span><p>满xx元立减xx元</p><i></i></li>
				<li><span><b>满减</b></span><p>满xx元立减xx元</p><i></i></li>
				<li><span><b>满额返券</b></span><p>购买自营手机指定产品满599元返自营笔记本这顶产品代金券1张</p><i></i></li>
				<li><span><b>满减</b></span><p>满xx元立减xx元</p><i></i></li>
				<li><span><b>满减</b></span><p>满xx元立减xx元</p><i></i></li>
				<li><span><b>满减</b></span><p>满xx元立减xx元</p><i></i></li>
				<li><span><b>满额返券</b></span><p>购买自营手机指定产品满599元返自营笔记本这顶产品代金券1张</p><i></i></li>
				<li><span><b>满减</b></span><p>满xx元立减xx元</p><i></i></li>
			
			</ul>
		</div>
	</div>
</template>

<script>
	
	import { Picker } from 'mint-ui';
	export default{
	  	name: 'Promotion',
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
	padding: 0.75rem 0.925rem;
	display: flex;
	flex-direction:column;
	.promotion-tit{
		font-size: 0.75rem;		
		color: #999;
		display: flex;
		justify-content: space-between;
		width:100%;
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
				padding: 0.8rem 0;
				border-bottom: 1px solid #eee;
				display: flex;
				justify-content: space-between;
				span{
					b{
						color: #ff3737;
						font-size: 0.5rem;
						margin-right: 0.5rem;
						border: 1px solid #ff3737;
						font-weight: normal;
					}
					
				}
				p{
					flex: 1;
					text-align: left;
					padding-right: 1rem;
				}
			}
		}
	}
	.promotion-content::-webkit-scrollbar{display:none;}
}
	
		
</style>
