<template>
		<div id="cartab">
			<div class="collect">
				<span class="iconfont icon-kefu" @click="talk"></span>
				<div>客服</div>
			</div>
			<div class="gocar">
				<a href="#/car" >
					<span class="iconfont icon-gouwuche"><b class="allcarnum">{{allnumber}}</b></span>
					<p>购物车</p>
				</a>
			</div>
	    	<div class="addcar" @click="nice">
	    		<a ><span>加入购物车</span></a>
	   		</div>
		</div>
</template>

<script>

	import Vue from 'vue'
  import {mapState,mapActions} from 'vuex'
	const CarTab = {
	  	name: 'CarTab',
	  	props:['nice'],
	  	data () {
	    	return {
				  goodsnum:'1'
	    	}
	  	},
	  	computed:{
        ...mapState({
          cargoods:'cargoods',
        }),
	  		allnumber(){
            var allcar=0;
            for(var k=0;k<3;k++){
              for(var i=0;i<this.cargoods[k].carlist.length;i++){
                allcar +=this.cargoods[k].carlist[i].number/1
              }
            }
	  			return  allcar
	  		}
	  	},
	  	methods:{
        talk(){
          a.onclick()
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
	export default CarTab
</script>

<style scoped lang="scss">
#cartab{
	height:2.45rem;
	position: fixed;
	bottom:0rem;
	width: 100%;
	box-shadow: 0 -1px 3px #EEEEEE;
	background: #fff;
	display: flex;
	flex-direction: row;
	color: #999;
	font-size: 0.5rem;
	text-align: center;
	z-index: 3333;
	.collect{
		padding: 0.45rem 0;
		width: 2.45rem;
    .icon-kefu{
       font-size: 1rem;
     }
	}
	.gocar{
		padding: 0.45rem 0;
		width:2.45rem;
		position: relative;
		a{
			display: block;
			color: #999;
			font-size: 0.5rem;
		/*	border-left: 1px solid #eee;*/
			span{
				font-size: 1rem;
				display: block;
			}
			span::before{
				position:relative;
				.allcarnum{
					position: absolute;
					top: -0.8rem;
					right: -0.8rem;
					font-size: .8rem;
				}
			}


		}
		.allcarnum{
			position: absolute;
			text-align: center;
			right:0.25rem;
			top: 0.125rem;
			color: #FFf;
			width: 0.9rem;
			height: 0.9rem;
			line-height: 0.9rem;
			background: #FF3737;
			border-radius: 50%;
			font-size: 0.5rem;
			font-weight: normal;
		}
	}
	.addcar{
		a{
			color: #fff;
		}
		flex: 1;
		background: #ff3b3c;
		line-height: 2.45rem;
		color: #fff;
		font-size: 0.8rem;
	}
	.mint-cell:last-child{
		background-image: none;
	}
	.mint-cell-wrapper{
		background-image: none;
	}

}

</style>
