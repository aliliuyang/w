<template>
	<div class="my-qudou">
		<img src="../../assets/images/mymymy.jpg" alt="" />
		<!--<div class="residue-qudou">
			<div class="quoud-num">
				<p>当前趣豆（个）</p>
				<h3>123</h3>
			</div>
			<p><span @click="show('use') "class="look">已使用</span><span @click="show('award')">已奖励</span></p>
		</div>
		<div v-if="qudoustats=='use'" class="use-qudou">
			<i></i>
			<ul>
				<li>
					<h5><b>已使用</b><p>2017.05.03</p></h5>
					<h4><span>-50</span>趣豆</h4>
				</li>
				<li>
					<h5><b>已使用</b><p>2017.05.03</p></h5>
					<h4><span>-50</span>趣豆</h4>
				</li>
				<li>
					<h5><b>已使用</b><p>2017.05.03</p></h5>
					<h4><span>-50</span>趣豆</h4>
				</li>
				<li>
					<h5><b>已使用</b><p>2017.05.03</p></h5>
					<h4><span>-50</span>趣豆</h4>
				</li>
				<li>
					<h5><b>已使用</b><p>2017.05.03</p></h5>
					<h4><span>-50</span>趣豆</h4>
				</li
			</ul>			
		</div>
		<div v-if="qudoustats=='award'" class="award-qudou">
			<i></i>
			<ul>
				<li>
					<h5><b>已奖励</b><p>2017.05.03</p></h5>
					<h4><span>-50</span>趣豆</h4>
				</li>
				<li>
					<h5><b>已奖励</b><p>2017.05.03</p></h5>
					<h4><span>-50</span>趣豆</h4>
				</li>
				<li>
					<h5><b>已奖励</b><p>2017.05.03</p></h5>
					<h4><span>-50</span>趣豆</h4>
				</li>
				<li>
					<h5><b>已奖励</b><p>2017.05.03</p></h5>
					<h4><span>-50</span>趣豆</h4>
				</li>
			</ul>			
		</div>-->
	</div>

</template>

<script>

	const MyQudou = {
	  	name: 'MyQudou',
	  	data () {
	    	return {
				qudoustats:'use',
	    	}
	  	},
	  	methods:{
			show(statsed){
				this.qudoustats=statsed
			}
	  	},
	  	mounted(){
			document.title = '我的趣豆'
		},
		updated(){

		},
		activated(){

		},
	    components:{
	
	    }
	}
	export default MyQudou
</script>

<style scoped lang="scss">
.my-qudou{
	background: #f5f5f5;
	img{
		width: 100%;
		margin-top: 1rem;
	}
	.residue-qudou{
		height: 10rem;
		background: url(../../assets/images/qudou-bg.jpg) no-repeat;
		background-size: 100%;
		padding: 0 0.75rem;
		.quoud-num{
			height: 8.2rem;
			text-align: center;
			p{
				padding-top: 2.5rem;
				color: #ffb2b0;
				font-size: 0.6rem;
			}
			h3{
				color: #fff;
				font-size: 1.75rem;
				font-weight: normal;
			}
			
		}
		p{
			span{
				color: #ffb2b0;
				font-size: 0.7rem;
				margin-right: 1.5rem;
			}
			.look{
				color: #fff;
			}
		}
	}
	.use-qudou,.award-qudou{
		position: relative;
		background: #fff;
		
		ul{
			padding-left: 0.75rem;
			
			li{
				padding-right: 0.75rem;
				padding-top: 0.5rem;
				border-bottom:1px solid #F5F5F5;
				display: flex;
				justify-content:space-between;
				h5{
					b{
					font-size: 0.7rem;
					line-height: 1.25rem;
					font-weight: normal;
					}
					p{
						font-size: 0.5rem;
						line-height: 1.25rem;
						color: #666;
						font-weight: normal;
					}
				}
				h4{
					font-weight: normal;
					font-size: 0.75rem;
					line-height: 1.5rem;
					color: #FF3737;
					font-size: 0.75rem;
				}
				
			}
		}
		
	}
	.use-qudou i{
		display: block;
		position: absolute;
		width: 0.75rem;
		height: 0.35rem;
		top: -0.35rem;
		background: url(../../assets/images/sanjiao.jpg) no-repeat;
		background-size: 100%;
		left: 1.5rem;
	}
	.award-qudou i{
		display: block;
		position: absolute;
		width: 0.75rem;
		height: 0.35rem;
		top: -0.35rem;
		background: url(../../assets/images/sanjiao.jpg) no-repeat;
		background-size: 100%;
		left: 5rem;
	}
}

</style>
