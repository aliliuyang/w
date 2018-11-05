<template>
	<div id="nav-banner" >
		<div class="swiper-container2 nav-swiper">
	        <div class="swiper-wrapper clear">
	            <div class="swiper-slide" v-for='item in weixinService'><a :href="item.jumpurl"><img :src="'http://image.yifuka.com/'+item.path"/><p>{{item.name}}</p></a></div>
	        </div>
   		</div>
	</div>
</template>

<script>

	import Vue from 'vue'
	const NavBanner = {
		name: 'NavBanner',
		props:["weixinService"],
		  	data () {
			    return {

			    }
		},
		methods:{
		  	navbanner(){
		  		var swiper = new Swiper('.swiper-container2', {
			        pagination: '.swiper-pagination',
			        slidesPerView:4,
			        slidesPerColumn: 1,
			        paginationClickable: true,
			    });
		  	}
		},
    mounted(){
	  		this.navbanner()
		},
		updated(){

		}
	}


	Vue.component('nav-banner',NavBanner )
	export default NavBanner
</script>

<style lang="scss">
	#nav-banner{
		width: 100%;
		overflow: hidden;
		background: #fff;
    padding-bottom: 0.5rem;
    background: #fff;
    margin-bottom: 0.75rem;
		.swiper-container2{
	        width: 100%;
	        height: auto;
	        margin-left: auto;
	        margin-right: auto;
	        overflow: hidden;
	    }
	    .swiper-wrapper{

	    }
	    .swiper-slide {
	        text-align: center;
	        font-size: 18px;
	        background: #fff;
	        /* Center slide text vertically */
	        display: -webkit-box;
	        display: -ms-flexbox;
	        display: -webkit-flex;
	        display: flex;
	        -webkit-box-pack: center;
	        -ms-flex-pack: center;
	        -webkit-justify-content: center;
	        justify-content: center;
	        -webkit-box-align: center;
	        -ms-flex-align: center;
	        -webkit-align-items: center;
	        align-items: center;
	        float: left;
	        padding: 0;
	        margin: 0;
	        height: 4rem;
	        img{
	        	width: 2.8rem;
	        	height: 2.8rem;
            margin-top: 12px;
	        }
	        p{
	        	font-size: 0.55rem;
	        	color: #666;

	        }
    	}

	}
</style>
