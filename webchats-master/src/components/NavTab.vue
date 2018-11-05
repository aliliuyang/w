<template>
	<div id="navtab" class="mint-tabbar is-fixed">
		<a href="#/qustore" class="mint-tab-item" :class="[this.istrue==1?'istrue':'']">
			<div class="mint-tab-item-icon">
				<span class="iconfont icon-shangcheng"></span>
			</div>
			<div class="mint-tab-item-label">趣商城</div>
		</a>
		<a href="#/car" class="mint-tab-item" :class="[this.istrue==2?'istrue':'']">
			<div class="mint-tab-item-icon">
				<span class="iconfont icon-gouwuche"></span>
			</div>
			<div class="mint-tab-item-label">购物车</div>
		</a>
	    <a href="#/main" class="mint-tab-item" :class="[this.istrue==3?'istrue':'']">
	    	<div class="mint-tab-item-icon">
	    		<span class="iconfont icon-wode"></span>
	   		</div>
		    <div class="mint-tab-item-label">我的</div>
	    </a>
	</div>
</template>

<script>
	import Vue from 'vue'
	const NavTab={
	  	name: 'NavTab',
	  	props:['istrue'],
	  	data () {
		    return {

		    }
	  	},
	  	methods:{

	  	},
	}
  Vue.component('nav-tab',NavTab )
  export default NavTab

</script>

<style scoped="" lang="scss">
	#navtab,.mint-tabbar.is-fixed{
    border-top: 1px solid #eee;
		background-color: #fff;
	}
	.mint-tab-item{
		height: 2.5rem;
		font-size:0.45rem;
		padding-bottom: 0.25rem;
		color: #999999;
		background: #ffffff;
		text-align:center;
		display: block;
		.mint-tab-item-icon{
			height:1.0rem;
			span{
				height:1.0rem;
				font-size:1.1rem;
				text-align: center;
			}
		}
		.mint-tab-item-label{
			font-size: 0.55rem;
			text-align: center;
		}
	}
	.mint-tab-item.istrue{
		background: #ffffff;
		.mint-tab-item-icon{
			color: #ff3b3b;
		}
		.mint-tab-item-label{
			color: #ff3b3b;
		}

	}
</style>
