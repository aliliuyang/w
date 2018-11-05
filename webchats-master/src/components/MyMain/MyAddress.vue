<template>
	<div id="my-adress">
		<ul>
			<li v-for="item in allAddress">
				<h4><span>{{item.consigneename}}</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>{{item.consigneephone}}</span></h4>
				<p><b class="iconfont icon-dizhi"></b>&nbsp;<span>{{item.province_cn+item.city_cn+item.county_cn+item.street}}</span></p>
				<div class="bianji">
					<div class="default"><b class="chack-car" :class="item.id==isdefault?'select-goods':''" @click="setdefault(item)"></b>默认地址</div>
					<div class="modification">
						<span><b class="iconfont icon-bianji" @click="revampAddress(item)"></b>编辑</span>
						<span><b class="iconfont icon-shanchu" @click="delAddress(item.id)"></b>删除</span>
					</div>
				</div>
			</li>
		</ul>
		<div class="bottom"></div>
		<div class="add-address">
			<a href="#/addaddress">+&nbsp;新建地址</a>
		</div>
		<revamp-ads v-if='showrevamp' :revamp=revamp :okrevamp=okrevamp></revamp-ads>
	</div>
</template>

<script>
	import axios from 'axios';
	import qs from 'qs';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import RevampAds from '../Address/RevampAds';
	import { Indicator } from "mint-ui";
	const MyAddress = {
	  	name: 'MyAddress',
	  	data () {
	    	return {
				allAddress:[],
				revamp:[],
				showrevamp:false,
				isdefault:'',
				a:false
	    	}
	  	},
	  	methods:{
			delAddress(id){
				var that =this
				var token = localStorage.getItem("token");
				axios.post(BASE_URL+'/index.php?r=address/delAddress',qs.stringify({
		  			id:id,
		  			token:token
		  		})).then(function(res){
		  			var a=JSON.parse(Base64.decode(res.data))
		  			if(a.code==1000){
		  				for(var i=0;i<that.allAddress.length;i++){
		  					if(that.allAddress[i].id==id){
		  						that.allAddress.splice(i,1)
		  					}
		  				}
		  				Toast('删除成功')
		  			}else{
		  				Toast('删除失败,请重试')
		  			}
		  		}).catch(function(err){

		        });
			},
			revampAddress(arr){
				this.revamp=arr;
				this.showrevamp=true
			},
			okrevamp(){
				this.showrevamp=false
				Indicator.close()
				this.init()

			},
			setdefault(arr){
				if(this.isdefault==arr.id){
					return false
				}
				this.isdefault =arr.id;
				var that = this
				var token = localStorage.getItem("token");
				var	province =[]
					province.push({'name':arr.province_cn,'aid':arr.province})
					province.push({'name':arr.city_cn,'aid':arr.city})
					province.push({'name':arr.county_cn,'aid':arr.county_cn})
				axios.post(BASE_URL+'/index.php?r=address/editAddress',qs.stringify({
						id:arr.id,
				  		consigneename:arr.consigneename,
				  		consigneephone:arr.consigneephone,
				  		address:province,
				  		street:arr.street,
				  		isdefault:1,
				  		email:arr.email,
				  		token:token
			  		})).then(function(res){
			  			var a=JSON.parse(Base64.decode(res.data))
			  			if(a.code==1000){
			  				Toast('修改成功')

			  			}else{
			  				Toast('操作失败,请重试')
			  			}
			  		}).catch(function(err){
			          	Toast('操作失败')
			        });

			},
			init(){
				var that =this
				var token = localStorage.getItem("token");
				axios.post(BASE_URL+'/index.php?r=address/getByUserid',qs.stringify({
		  			token:token
		  		})).then(function(res){
		  			var a=JSON.parse(Base64.decode(res.data))
		  			if(a.code==1000){
		  				that.allAddress=a.data.data.reverse()
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

	  		}

	  	},
	  	mounted(){
	  		 document.title = '收货地址管理'
	  		var token = localStorage.getItem("token");
	  		if(!token){
	  			MessageBox.confirm('您还未登录，现在去登录?').then(action => {
					window.location.href="#/login";
				},
				action => {
					window.location.href="#/main";
				})
	  		}
	  		var that =this
	  		if(token){
	  			this.init()
	  		}else{
	  			 MessageBox({
	                title: '提示',
	                message: '请先登录',
	            })
			}

		},
		updated(){

		},
		activated(){

		},
	    components:{
			'revamp-ads':RevampAds
	    }
	}
	export default MyAddress
</script>

<style scoped lang="scss">
#my-adress{
	background:#F5F5F5;
	position: relative;
	ul{
		background:#F5F5F5;
		li{
			background: #fff;
			padding-left: 0.75rem;
			margin-bottom: 0.5rem;
			border-bottom: 1px solid #eee;
			h4{
				font-size: 0.75rem;
				color: #333;
				font-weight: 600;
				line-height: 2rem;
			}
			p{
				padding-right: 0.75rem;
				border-bottom: 1px solid #eee;
				height: 2.5rem;
				display: flex;
				justify-content: space-between;
				b{
					font-size: 0.8rem;
					color: #FF3737;
				}
				span{
					flex: 1;
					color: #999;
					font-size: 0.65rem;
					overflow: hidden;
				}
			}
			.bianji{
				display: flex;
				justify-content: space-between;
				line-height: 2.25rem;
				padding-right: 0.75rem;
				.default{
					font-size: 0.65rem;
					color: #666;
				}
				.modification{
					font-size: 0.6rem;
					color: #999;
					.iconfont{
						color: #333;
						padding: 0 0.3rem;
					}
				}

			}
			.chack-car{
				display: inline-block;
			  	border: 1px solid #666;
			  	height: 0.75rem;
			  	width: 0.75rem;
			  	border-radius: 50%;
			  	vertical-align: middle;
			  	margin-right: 0.25rem;
			}
			.select-goods{
				background: url(../../assets/images/select.png);
				background-size: 100%;
				border: none;
			}
		}
	}
	.bottom{
		height: 5rem;
		background: #F5F5F5;
	}
	.add-address{
		background: #F5F5F5;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		padding: 0.5rem 0.75rem;
		a{
			background: #FF3737;
			display: block;
			color: #fff;
			border: none;
			height: 2.25rem;
			width: 100%;
			font-size: 0.75rem;
			text-align: center;
			line-height: 2.25rem;
		}
	}
}

</style>
