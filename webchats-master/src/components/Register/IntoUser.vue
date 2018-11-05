<template>
	<div class="into-user">
		<img src="../../assets/images/register.jpg"/>
		<h5>操作成功</h5>
		<p><a href="#/main">前往个人中心</a></p>

	</div>
</template>

<script>

	const IntoUser = {
	  	name: 'IntoUser',
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

	export default IntoUser
</script>

<style scoped lang="scss">
.into-user{
	text-align: center;
	img{
		width: 100%;
	}
	h5{
		color: #333;
		font-size: 1.15rem;
		text-align: center;
	}
	p{
		padding-top: 3.5rem;
	}
	a{
		display: inline-block;
		padding: 0.675rem 1.5rem;
		background: #FF3737;
		font-size: 0.65rem;
		color: #fff;
		border-radius: 1.3rem;
		margin: 0 auto;
	}
}

</style>
