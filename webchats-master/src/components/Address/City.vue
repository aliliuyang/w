<template>
	<div id="add-city">
		<div  class="zhezhao"></div>
		<div class="city-list">
			<h5><b   class="iconfont icon-arrow-right-copy"></b><span>选择地址</span><b @touchend="allhidden">X</b></h5>
			<p><span v-for='item in lookaddress'>{{item.name}}</span><b>请选择</b></p>
			<div class="city-name">
				<ul>
					<li v-for='item in address' @click="getaddress(item)">{{item.name}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios';
	import qs from 'qs';
	import { Toast } from 'mint-ui';
	export default{
	  	name: 'City',
	  	props:['allhidden','setaddress',],
	  	data () {
	    	return {
				address:[],
				lookaddress:[],
				getaddressState:false
	    	}
	  	},
	  	methods:{
			getaddress(aa){
				if(this.getaddressState){
					return
				}
				this.getaddressState=true
				var that =this
				axios.post(BASE_URL+'/index.php?r=address/getJDArea',qs.stringify({
			  		pid:Base64.encode(aa.aid),

		  		})).then(function(res){
		  			var a=JSON.parse(Base64.decode(res.data))
		  			that.lookaddress.push(aa)
		  			if(a.data.err==10002){
	  					that.address=a.data.area

	  				}
		  			if(a.data.err==10004){
		  				that.setaddress(that.lookaddress)
		  				that.allhidden()
					}
		  			that.getaddressState=false
		  		}).catch(function(err){

		        });

			},
			init(){
				var that =this
				axios.post(BASE_URL+'/index.php?r=address/getJDArea',qs.stringify({
		  			pid:'',
		  		})).then(function(res){
		  			var a=JSON.parse(Base64.decode(res.data))
		  			if(a.data.err==10002){
		  				that.address=a.data.area
		  			}
		  		}).catch(function(err){

		       });

			}

	  	},
	  	mounted(){
	  		this.init()
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
#add-city{
	width: 100%;
	height: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 999;
	.zhezhao{
		width: 100%;
		height: 100%;
		position: absolute;
		background: #000;
		opacity: 0.6;
		top: 0;
		left: 0;
		z-index: 3333;
	}
	.city-list{
		z-index: 4441;
		position: absolute;
		width: 100%;
		height: 20rem;
		bottom: 0;
		left: 0;
		background: #fff;
		display: flex;
		flex-direction: column;
		h5{
			display: flex;
			justify-content: space-between;
			padding: 0 0.75rem;
			font-weight: normal;
			font-size: 0.75rem;
			color: #999;
			line-height: 2.25rem;
		}
		p{
			padding: 0 0.75rem;
			font-size: 0.65rem;
			border-bottom: 1px solid #eee;
			line-height: 1.5rem;
			span{
				padding-right: 0.25rem;
			}
			b{
				display: inline-block;
				margin-left: 1.5rem;
				font-size: 0.65rem;
				color: #FF3737;
				border-bottom: 2px solid #FF3737;
			}
		}
		.city-name{
			flex: 1;
			overflow: scroll;
			ul{
				padding:0 0.75rem;
				li{
					font-size: 0.65rem;
					line-height: 2rem;
				}
			}
		}
	}
}

</style>
