<template>
	<div id="banner">
      <div  class="swiper-container1">
          <div class="swiper-wrapper clear">
              <div class="swiper-slide" v-for='item in weixinBanner'>
                <a :href="item.jumpurl"  v-lazy="item">
                  <img :src="'http://image.yifuka.com/'+item.path" alt="" />
                </a>
              </div>
          </div>
      </div>
		<div class="swiper-pagination"></div>
	</div>
</template>

<script>
	import { Lazyload } from 'mint-ui';
	const Banner = {
	  	name: 'Banner',
	  	props:['weixinBanner'],
	  	data () {
	    	return {

	    	}
	  	},
	  	methods:{
	  		banner(){
	  			var swiper = new Swiper('.swiper-container1', {
			        pagination: '.swiper-pagination',
			        paginationClickable: true,
              loop:true
    			});
	  		}
	  	},
	  	mounted(){
	  		this.banner()
      	},
	    updated(){
			
	    },
	    activated(){

	    }
	}
	export default Banner
</script>

<style  lang="scss">
	#banner{
		position: relative;
		width: 100%;
	    overflow:hidden;
	    .swiper-container1{
	    	width: 100%;
	    	overflow: hidden;
		    .swiper-wrapper{
		      	width: 20000px;
			    .swiper-slide{
			        text-align: center;
			        background: #fff;
			        float: left;
			        img{
				        display: block;
				        width: 100%;
			        }
		      	}
		    }
		}
		.swiper-pagination.swiper-pagination-clickable{
		    height: 0.4rem;
		    position: absolute;
		    bottom: 0.5rem;
		    display: flex;
		    width: 100%;
		    justify-content: center;
			.swiper-pagination-bullet{
  	 			z-index: 3333;
				display: block;
				background: #fff;
				opacity: 0.6;
				width: 1rem;
				height: 0.15rem;
				margin: 0 0.1rem;
				border-radius: 0.1rem;
			}
			.swiper-pagination-bullet-active{
				opacity: 1;
			}
    	}
  }


</style>
