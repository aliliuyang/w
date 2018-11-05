<template>
<div id="add-address">
	<div class="address">
		<p>
			<span>收货人：</span><input type="text" v-model="name"/>
		</p>
		<p>
			<span>所在地区：</span><span @click="citylist" class="city"><p><b v-for='item in province'>{{item.name}}</b></p>
				<b class="iconfont icon-jiantou-copy"></b>
			</span>
		</p>
		<p>
			<span>详细地址：</span><input v-model="street" type="text" />
		</p>
		<p>
			<span>收货人手机：</span><input v-model="phone" type="text" />
		</p>
		<p>
			<span>电子邮箱：</span><input v-model="email" type="text" />
		</p>
		<p><span>设为默认地址</span><mt-switch  v-model="myisdefault"></mt-switch></p>
		<div class="add">
			<button @click="addAddress">保存收货人信息</button>
		</div>
	</div>
	<city v-if="showcity" :allhidden="citylist" :setaddress=setaddress></city>
</div>

</template>

<script>
	import City from './City'
	import { Switch } from 'mint-ui'
	import axios from 'axios';
	import qs from 'qs';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	const AddAddress = {
	  	name: 'AddAddress',
	  	data () {
	    	return {
				showcity:false,
				name:'',
				province:[],
				street:'',
				myisdefault:false,
				phone:'',
				email:''
	    	}
	  	},
	  	methods:{
			citylist(){
				this.showcity=!this.showcity;
			},
			setaddress(city){
				this.province=city
			},
			addAddress(){
				var that =this
				var isdefault=0
				if(this.myisdefault){
					isdefault=1
				}
				if(this.province&&that.name&&that.phone&&that.email){
					if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.phone))){
					    Toast('请输入正确手机号')
					    return false;
					}
					if(!(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(this.email))){
						Toast('请输入正确邮箱')
						return false;
					}
					var token = localStorage.getItem("token");
					axios.post(BASE_URL+'/index.php?r=address/addAddress',qs.stringify({
				  		consigneename:that.name,
				  		consigneephone:that.phone,
				  		address:that.province,
				  		street:that.street,
				  		isdefault:isdefault,
				  		email:that.email,
				  		token:token
			  		})).then(function(res){
			  			var a=JSON.parse(Base64.decode(res.data))
			  			if(a.code==1000){
			  				Toast('添加成功');
			  				window.history.back()
			  			}else{
			  				Toast('操作失败')
			  			}
			  		}).catch(function(err){
			          	Toast('操作失败')
			        });
				}else{
					Toast('请填写完整信息')
				}
			}
	  	},
	  	mounted(){
        this.isgologin()
		},
		updated(){

		},
		activated(){

		},
	    components:{
			'city':City
	    }
	}

	export default AddAddress
</script>

<style  lang="scss">
#add-address{
	width: 100%;
	height: 100%;
	.address{
		width: 100%;
		height: 100%;
		background: #fff;
		padding-left: 0.75rem;
		color: #333;
		p{
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #eee;
			font-size: 0.75rem;
			line-height: 2.25rem;
			padding-right: 0.75rem;
			input{
				flex: 1;
				border: none;
				padding-left:0.5rem;
				padding-right: 0.75rem;
			}
			.city{
				flex: 1;
				display: flex;
				justify-content: space-between;
				b{
					color: #999;
					font-weight: normal;
				}
				p{
					border:none;
					b{
						display: inline-block;
						padding-left: 0.5rem;
						color: #333;
					}
				}

			}
			.mint-switch-core{
				width: 2rem;
				height: 1.1rem;
				margin-left: 0.5rem;

			}
			.mint-switch-input:checked + .mint-switch-core{
				width::2rem;
				height: 1.1rem;
				background: #FF3737;
				border: 1px solid #EEEEEE;
			}
			.mint-switch-core{
				border-radius: 0.6rem;
			}
			.mint-switch-core::before,.mint-switch-core::after {
				width: 1rem;
				height: 1rem;
				border-radius: 0.5rem;
			}
			.mint-switch-input:checked + .mint-switch-core::after{
				transform: translateX(1rem);
			}

		}
		.add{
			width: 100%;
			padding: 0.5rem 0.75rem;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 10;
			button{
				z-index: 10;
				width: 100%;
				height: 2.25rem;
				background: #FF3737;
				color: #fff;
				font-size: 0.75rem;
				text-align: center;
				border: none;
			}
		}
	}
}

</style>
