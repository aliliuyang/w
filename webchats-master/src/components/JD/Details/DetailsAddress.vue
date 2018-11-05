<template>
	<div id="details-address">
		<div class="to-address">
			<span></span><h3>配送至</h3><span @click="allhidden" class="iconfont icon-guanbi"></span>
		</div>
		<div class="address-content">
			<ul>
				<li v-for="item in myaddress" @click="changemy(item)" :class="address==item.addresscount?'active-address':''" ><i class="iconfont icon-dizhi"></i><span>{{item.addresscount}}{{item.street}}</span></li>
			</ul>
		</div>
		<button @click="addadress">选择其他地址</button>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	export default{
	  	name: 'DetailsAddress',
	  	props:['allhidden','showaddadress','address','setaddress'],
	  	data () {
	    	return {
				myaddress:[]
	    	}
	  	},
	  	methods:{
	        addadress(){
	          this.allhidden()
	          this.showaddadress();
	        },
        	changemy(add){
              var province={name:add.province_cn,pid:add.province}
              var city={name:add.city_cn,pid:add.city}
              var county={name:add.county_cn,pid:add.county}
              var overaddress=[]
              overaddress.push(province);
              overaddress.push(city);
              overaddress.push(county);
	          this.setaddress(overaddress)
	          this.allhidden()
        	}
	  	},
	  	mounted(){
        var that =this
        var token = localStorage.getItem("token");
	  		axios.post(BASE_URL+'/index.php?r=jdproduct/Jdaddresscount',qs.stringify({
	  			uid:'',
	  			token:token
	  		})).then(function(res){
	  			var a=JSON.parse(Base64.decode(res.data))
	  			that.myaddress=a.data.address
	  		}).catch(function(err){

        });


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
	#details-address{
		position: fixed;
		bottom: 0rem;
		z-index: 999999;
		background: #FFF;
		width: 100%;
		height: 24rem;
		display: flex;
		flex-direction: column;
		.to-address{
			font-size: 0.75rem;
			padding: 0.75rem 0.925rem;
			color: #999;
			display: flex;
			justify-content: space-between;
			h3{
				text-align: center;
				font-weight: normal;
			}
		}
		.address-content{
			padding: 0 0.925rem;
			font-size: 0.65rem;
			overflow: scroll;
			flex: 1;
			li{
				border-bottom:1px solid #EEEEEE;
				line-height: 1rem;
				padding:0.8rem 0;
				display: flex;
				justify-content: space-between;
				.icon-dizhi{
					margin-right: 0.25rem;
				}
				span{
					text-align: left;
					flex: 1;
					padding-right: 1.1rem;
				}
			}
			.active-address{
				color: #ff3737;
			}

		}
		.address-content::-webkit-scrollbar{display:none;}
		button{
			height: 2.2rem;
			width: 100%;
			background: #ff3737;
			color: #fff;
			font-size: 0.8rem;
			text-align: center;
			line-height: 2.2rem;
			border: none;
			outline: none;
		}
	}

</style>
