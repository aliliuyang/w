<template>
	<div id="go-top" @click="backtop">
		<b class="iconfont icon-jiantou1"></b>
	</div>
</template>

<script>
	const BackTop = {
	  	name: 'BackTop',
	  	props:['showbacktop'],
	  	data () {
	    	return {

	    	}
	  	},
	  	methods:{
	  		backtop(){
		  		document.body.scrollTop = 0
				  document.documentElement.scrollTop = 0
	  		},
	  		handleScroll () {
			    if(window.scrollY > 100){
			    	this.showbacktop(true)
			    }else{
			    	this.showbacktop(false)
			    }
			}
	  	},
	  	mounted(){
			window.addEventListener('scroll', this.handleScroll);
		},
		updated(){

		},
		activated(){

		},
	    components:{

	    }
	}

	export default BackTop
</script>

<style scoped lang="scss">
#go-top{
	width: 2rem;
	height: 2rem;
	border:1px solid #EEEEEE;
	text-align: center;
	border-radius: 50%;
	position: fixed;
	bottom: 3rem;
	right:1rem;
	background: #Fff;
	b{
		font-size: 1.6rem;
		color: #666;
		line-height: 1.8rem;
	}
}

</style>
