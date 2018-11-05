<template>
	<div id="order-select-address">
		<ul>
			<li v-for="item in address">
				<div @click="changeaddress(item)">
					<div class="selected" :class="slelct.id==item.id? 'activeaddress':''"></div>
				</div>
				<div class="person"  @click="changeaddress(item)">
					<p class="name"><span>{{item.consigneename}}</span><span>{{item.consigneephone}}</span><b v-if="isdefault==item.id">默认</b></p>
					<p class="personaddress">{{item.province_cn+item.city_cn+item.county_cn+item.street}}</p>
				</div>
				<div class="bianji">
					<b>
						<i class="iconfont icon-bianji"  @click="show(item)"></i>
					</b>
				</div>
			</li>
		</ul>
		<div class="addaddress">
			<a @click="uesnew">使用新地址</a>
		</div>
		<revamp-ads v-if='showRevampAds' :revamp=revamp :okrevamp=okrevamp></revamp-ads>
	</div>
</template>
<script>
	import axios from 'axios';
	import qs from 'qs';
	import RevampAds from '../Address/RevampAds';
	import { Indicator } from "mint-ui";
	import {mapState,mapActions} from 'vuex'
 	export default{
	  	name: 'SelecAddress',
	  	props:['alladdress','slelct','changeaddress'],
	  	data () {
	    	return {
				address:[],
				isdefault:'',
				showRevampAds:false,
				revamp:[],
	    	}
	  	},
	  	methods:{
			...mapActions({
				changeuseadr:'changeuseadr'
			}),
			uesnew(){
				this.changeuseadr()
				window.location.href='#/addaddress'
			},
			show(a){
				this.showRevampAds=true;
				this.revamp=a
			},
			okrevamp(){
				this.showRevampAds=false
				var that =this
				var token = localStorage.getItem("token");
				axios.post(BASE_URL+'/index.php?r=address/getByUserid',qs.stringify({
		  			token:token
		  		})).then(function(res){
					  var a=JSON.parse(Base64.decode(res.data))
					  Indicator.close()
		  			if(a.code==1000){
						  that.address=a.data.data.reverse()
		  				for(var i=0;i<that.allAddress.length;i++){
		  					if(that.allAddress[i].isdefault==1){
		  						that.isdefault=that.allAddress[i].id
		  					}
		  				}
		  				
		  			}else{
		  				Toast('获取失败,请刷新页面')
		  			}
		  		}).catch(function(err){ 
		          	
		        });
			},
	  	},
	  	mounted(){
	  		var that =this
	  		that.address=this.alladdress
		},
		updated(){

		},
		activated(){

		},
	    components:{
			'revamp-ads':RevampAds
	    }
	}

</script>
<style scoped lang="scss">
#order-select-address{
	background: #fff;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	ul{
		li{
			display: flex;
			justify-content: space-between;
			padding: 0 0.75rem;
			align-items: center;
			height: 4.5rem;
			border-bottom:1px solid #f5f5f5;
			.selected{
				width: 0.75rem;
				height: 0.75rem;
				border: 1px solid #999;
				border-radius: 50%;
				margin-right: 0.75rem;
			}
			.activeaddress{
				background: url(../../assets/images/active.png) no-repeat center;
				background-size: 250%;
				border: none;
			}
			.person{
				flex: 1;
				.name{
					font-size: 0.75rem;
					color:#333333;
					span{
						padding-right: 1.25rem;
					}
					b{
						display: inline-block;
						color: #FF3737;
						font-size: 0.45rem;
						border: 1px solid #FF3737;
						line-height: 0.8rem;
						width: 1.75rem;
						text-align: center;
						font-weight: normal;
					}
				}
				.personaddress{
					padding-top: 0.5rem;
					font-size: 0.65rem;
					color: #b6b6b6;
				}
				.selectname{
					color:#ff3737 ;
				}
			}
			.bianji{
				b{
					border-left: 1px solid #eee;
					padding-left: 0.75rem;
					margin-left: 0.75rem;
					i{
						display: inline-block;
						color: #666;
						font-size: 0.75rem;
						
					}
				}
			}
			
		}
	}
	.addaddress{
		width: 100%;
		position: fixed;
		bottom: 0;
		padding: 0.75rem;
		
		
		a{
			display: block;
			background: #FF3737;
			color: #fff;
			width: 100%;
			height: 2.25rem;
			text-align: center;
			line-height: 2.25rem;
			font-size: 0.75rem;
		}
	}
}

</style>
