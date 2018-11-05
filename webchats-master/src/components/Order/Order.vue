<template>
<div id="my-order">
	<div class="order-nav">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">全部</mt-tab-item>
		  <mt-tab-item id="2">待付款</mt-tab-item>
		  <mt-tab-item id="3">待收货</mt-tab-item>
		  <mt-tab-item id="4">已完成</mt-tab-item>
		  <mt-tab-item id="5">已取消</mt-tab-item>
		</mt-navbar>
	</div>
	<div class="order-list">
		<mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""'  :bottomPullText='""' :auto-fill="false" ref='loadmore'  :bottomDistance=150>
	<mt-tab-container v-model="selected">
		<mt-tab-container-item id="1">
		    <div class="my-order" v-for="allitem in allorder">
		    	<div class="store">
		    		<div class="store-name"><span><img src="../../assets/images/JD-log.png" alt="" /></span>{{allitem.catname_cn}}</div>
		    		<div class="state">{{allitem.status_cn}} &nbsp;&nbsp;<span v-if="allitem.status=='8'||allitem.status=='3'||allitem.status=='11'" class="iconfont icon-shanchu" @click="shanchu(allitem)"></span></div>
		    		<span class="statusok" v-if='allitem.status_cn=="已完成"'></span>
		    	</div>
		    	<span></span>
			    <a :href='"#/ordercontent/"+ischildorderid(allitem)'>
			    	<div class="order-good" v-for="goods in allitem.childgoods">
			    		<div class="order-img">
			    				<img :src="goods.goodsimage" alt="" />
			    		</div>
			    		<div class="order-name">
			    			{{goods.goodstitle}}
			    		</div>
			    	</div>
		    	</a>
		    	<p>订单金额：<b>¥ <span>{{allitem.childmoney}}</span></b></p>
		    	<div class="btn clear">
		    		<div class="need-pay handle" v-if="allitem.status_cn=='等待付款'">
			    		<a class="btn1" @click="quxiao(allitem.id)">取消订单</a>
			    		<a class="btn2" :href="'?#/pay/'+allitem.id">付款</a>
			    	</div>
			    	<div class="wait-receiving handle" v-if="allitem.btocorderid">
			    		<a class="btn1" :href="'#/logistics/'+allitem.btocorderid">查物流</a>
			    		<a class="btn2"  @click="shouhuo(wait.childorderid)">确认收货</a>
			    	</div>
			    	<div class="succeed handle" v-if="allitem.status_cn=='已完成'">
			    		<a class="btn1" :href="'#/applyfor/1/'+allitem.childorderid+'/1'">申请售后</a>
			    	</div>
			    	<div class="cancel handle" v-if="allitem.status_cn=='已取消'">
			    		<a class="btn1"@click="huifu(allitem.id)">恢复订单</a>
			    	</div>
		    	</div>
		    </div>
		</mt-tab-container-item>
		<!--等待付款-->
		<mt-tab-container-item id="2">
		     <div class="my-order" v-for="needpayitem in needPay">
		    	<div class="store">
		    		<div class="store-name"><span><img src="../../../src-m/assets/images/JD-log.png" alt="" /></span>京东</div>
		    		<div class="state">{{needpayitem.status_cn}} &nbsp;&nbsp;</div>
		    		<span class="statusok" v-if='needpayitem.status_cn=="已完成"'></span>
		    	</div>
		    	<span></span>
		    	 <a :href='"#/ordercontent/"+ischildorderid(needpayitem)'>
			    	<div class="order-good" v-for="needpaygood in needpayitem.childgoods">
			    		<div class="order-img">
			    			<img :src="needpaygood.goodsimage" alt="" />
			    		</div>
			    		<div class="order-name">
			    			{{needpaygood.goodstitle}}
			    		</div>
			    	</div>
			   	</a>
		    	<p v-if="needpayitem.restToPay">
		    		<span>订单金额：¥<b>{{needpayitem.orderMoney}}</b></span> <span>&nbsp;&nbsp;已支付：<b>¥{{payed(needpayitem.orderMoney,needpayitem.restToPay)}}</b></span></br>
		    		<i style="color: #FF3737;">还需付：<b>¥{{needpayitem.restToPay}}</b></i>
		    	</p>
		    	<p v-else>订单金额：<b>¥ <span>{{needpayitem.orderMoney}}</span></b></p>
		    	<div class="btn clear">
		    		<div class="need-pay handle">
			    		<a class="btn1" @click="quxiao(needpayitem.id)">取消订单</a>
			    		<a class="btn2" :href="'?#/pay/'+needpayitem.id">付款</a>
			    	</div>
		    	</div>
		    </div>
		</mt-tab-container-item>
		  <!--待收货-->
		  <mt-tab-container-item id="3">
		  	 <div class="my-order" v-for="wait in waitGet">
		    	<div class="store">
		    		<div class="store-name"><span><img src="../../../src-m/assets/images/JD-log.png" alt="" /></span>京东</div>
		    		<div class="state">{{wait.status_cn}} &nbsp;&nbsp;</div>
		    		<span class="statusok" v-if='wait.status_cn=="已完成"'></span>
		    	</div>
		    	<span></span>
		    	<a :href='"#/ordercontent/"+ischildorderid(wait)'>
			    	<div class="order-good" v-for="waitgood in wait.childgoods">
			    		<div class="order-img">
			    			<img :src="waitgood.goodsimage" alt="" />
			    		</div>
			    		<div class="order-name">
			    			{{waitgood.goodstitle}}
			    		</div>
			    	</div>
		    	</a>
		    	<p>订单金额：<b>¥ <span>{{wait.childmoney}}</span></b></p>
		    	<div class="btn clear">
			    	<div class="wait-receiving handle">
			    		<a class="btn1" :href='"#/logistics/" + wait.btocorderid'>查物流</a>
			    		<a class="btn2"  @click="shouhuo(wait.childorderid)">确认收货</a>
			    	</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		  <!--已完成-->
		  <mt-tab-container-item id="4">
		   	<div class="my-order" v-for='wancheng in completeOrder'>
		    	<div class="store">
		    		<div class="store-name"><span><img src="../../../src-m/assets/images/JD-log.png" alt="" /></span>京东</div>
		    		<div class="state">{{wancheng.status_cn}} &nbsp;&nbsp;<span class="iconfont icon-shanchu" v-if='wancheng.status==8||quxiao.status==3' @click="shanchu(wancheng)"></span></div>
		    		<span class="statusok" v-if='wancheng.status==8'></span>
		    	</div>
		    	<span></span>
		    	<a :href='"#/ordercontent/"+ischildorderid(wancheng)'>
			    	<div class="order-good" v-for="good in wancheng.childgoods">
			    		<div class="order-img">
			    			<img :src="good.goodsimage" alt="" />
			    		</div>
			    		<div class="order-name">
			    			{{good.goodstitle}}
			    		</div>
			    	</div>
		    	</a>
		    	<p>订单金额：<b>¥ <span>{{wancheng.childmoney}}</span></b></p>
		    	<div class="btn clear">
			    	<div class="succeed handle">
			    		<a class="btn1" :href="'#/applyfor/1/'+wancheng.childorderid+'/1'">申请售后</a>
			    	</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		  <!--已取消-->
		  <mt-tab-container-item id="5">
		     <div class="my-order" v-for="quxiao in abolishOrder">
		    	<div class="store">
		    		<div class="store-name"><span><img src="../../../src-m/assets/images/JD-log.png" alt="" /></span>京东</div>
		    		<div class="state">{{quxiao.status_cn}} &nbsp;&nbsp;<span class="iconfont icon-shanchu" v-if='quxiao.status==8||quxiao.status==3' @click="shanchu(quxiao)"></span></div>
		    		<span class="statusok" v-if='quxiao.status==8'></span>
		    	</div>
		    	<span></span>
		    	<a :href='"#/ordercontent/"+ischildorderid(quxiao)'>
			    	<div class="order-good" v-for="good in quxiao.childgoods">
			    		<div class="order-img">
			    			<img :src="good.goodsimage" alt="" />
			    		</div>
			    		<div class="order-name">
			    			{{good.goodstitle}}
			    		</div>
			    	</div>
		    	</a>
		    	<p>订单金额：<b>¥ <span>{{quxiao.childmoney}}</span></b></p>
		    	<div class="btn clear">
			    	<div class="cancel handle">
			    		<a class="btn1" @click="huifu(quxiao.id)">恢复订单</a>
			    	</div>
		    	</div>
		    </div>
		  </mt-tab-container-item>
		  <div slot="bottom" class="mint-loadmore-bottom"></div>
		</mt-tab-container>
	 </mt-loadmore>
	</div>
</div>
</template>

<script>
	import { Navbar, TabItem } from 'mint-ui';
	import axios from 'axios';
	import qs from 'qs';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default{
	  	name: 'Oreder',
	  	data () {
	    	return {
				selected:'1',
				allorder:[],
				completeOrder:[],
				abolishOrder:[],
				needPay:[],
				waitGet:[],
				page:1,
				token:''
	    	}
	  	},
	  	methods:{
	  		base64(str){
	  			return Base64.encode(str)
	  		},
	  		payed(a,b){
	  			return ((a*100-b*100)/100).toFixed(2)
	  		},
	  		ischildorderid(orderid){
	  			if(orderid.status==1){
	  				return orderid.id+"/0"
	  			}else{
	  				return orderid.childorderid+"/1"
	  			}
	  		},
	  		isueschid(oborderid){
	  			if(orderid.status==1){
	  				ischild=0;
	  				oid=oborderid.id
	  			}else{
	  				ischild=1
	  				oid=oborderid.childorderid
	  			}
	  		},
	  		shanchu(orderid){
	  			var that =this
	  			MessageBox.confirm('确定删除订单吗?').then(action => {
					var oid='';
		  			var ischild=''
		  			var arr=[]
		  			if(orderid.status==3){
		  				ischild=0;
		  				oid=orderid.id
		  			}
		  			if(orderid.status==8){
		  				ischild=1
		  				oid=orderid.childorderid
		  			}
		  			axios.post(BASE_URL+'/index.php?r=user/recycle',qs.stringify({
			  		 	oid:Base64.encode(oid),
			  		 	ischild:Base64.encode(ischild),
			  		 	token:this.token

			        })).then(function(res){
			        	var a =Base64.decode(res.data)
			        	a = JSON.parse(a)
						if(a.data.err==10002){
							Toast('删除成功');
								that.init()
						}

			        }).catch(function(err){

			        });
				},
				action => {
					return
				})

	  		},
	  		quxiao(orderid){
	  			var that=this
	  			axios.post(BASE_URL+'/index.php?r=user/cancel',qs.stringify({
	  				token:this.token,
		  		 	oid:Base64.encode(orderid),
		        })).then(function(res){
		        	var a =Base64.decode(res.data)
		        	a = JSON.parse(a)
					if(a.data.err==10002){
						Toast('订单取消成功');
						that.init()

					}
		        }).catch(function(err){

		        });
	  		},
	  		huifu(orderid){
	  			var that=this
	  			axios.post(BASE_URL+'/index.php?r=user/recoverOrder',qs.stringify({
		  		 	oid:Base64.encode(orderid),
		  		 	token:this.token
		        })).then(function(res){
		        	var a =Base64.decode(res.data)
		        	a = JSON.parse(a)
					if(a.data.err==10002){
						Toast('订单恢复成功');
							that.init()

					}
		        }).catch(function(err){

		        });
	  		},
	  		shouhuo(orderid){
	  			var that=this
	  			axios.post(BASE_URL+'/index.php?r=user/receipt',qs.stringify({
		  		 	oid:Base64.encode(orderid),
		  		 	ischild:Base64.encode(1),
		  		 	token:this.token
		        })).then(function(res){
		        	var a =Base64.decode(res.data)
		        	a = JSON.parse(a)
	              if(a.data.err==10002){
	                  Toast('已确认收货');
	                  	that.init()

	              }
		        }).catch(function(err){

		        });
	  		},
	  		loadBottom(){
	  			this.page++
	  			var that=this
	  			axios.all([
				    axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({status:0,page:this.page,token:this.token})),
				    axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({status:1,page:this.page,token:this.token})),
		            axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({status:22,page:this.page,token:this.token})),
		            axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({status:3,page:this.page,token:this.token})),
		            axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({status:8,page:this.page,token:this.token}))
				]).then(axios.spread(function (order,needPay,waitGet,abolishOrder,completeOrder) {
				    that.allorder=JSON.parse(Base64.decode(res.data)).data.rows
            that.needPay=JSON.parse(Base64.decode(needPay.data)).data.rows
            that.completeOrder=JSON.parse(Base64.decode(completeOrder.data)).data.rows
            that.abolishOrder=JSON.parse(Base64.decode(abolishOrder.data)).data.rows
            that.waitGet=JSON.parse(Base64.decode(waitGet.data)).data.rows

				}))
	  		},
	  		init(){
	  			var that=this
	  			axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({
		  		 	status:0,
		  		 	page:this.page,
		  		 	token:this.token
		        })).then(function(res){
					that.allorder=JSON.parse(Base64.decode(res.data)).data.rows

		        }).catch(function(err){

		        });
	  			axios.all([
				    axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({status:1,page:this.page,token:this.token})),
		            axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({status:22,page:this.page,token:this.token})),
		            axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({status:3,page:this.page,token:this.token})),
		            axios.post(BASE_URL+'/index.php?r=user/orders',qs.stringify({status:8,page:this.page,token:this.token}))
				]).then(axios.spread(function (needPay,waitGet,abolishOrder,completeOrder){
					that.needPay=JSON.parse(Base64.decode(needPay.data)).data.rows
					that.completeOrder=JSON.parse(Base64.decode(completeOrder.data)).data.rows
					that.abolishOrder=JSON.parse(Base64.decode(abolishOrder.data)).data.rows
					that.waitGet=JSON.parse(Base64.decode(waitGet.data)).data.rows

				})).catch(function(err){

				})
	  		}

	  	},
	  	mounted(){
	  		var that=this

	  		this.selected=this.$route.params.state;
	  		this.token = localStorage.getItem("token");
			if(!this.token){
	  			MessageBox.confirm('你还未登录，现在去登录?').then(action => {
					window.location.href="#/login";
				},
				action => {
					window.location.href="#/main";
				})
	  		}
	  		setDocumentTitle('我的订单');
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
	#my-order{
		background:#f5f5f5;
		.order-nav{
			.mint-navbar{
				.mint-tab-item{
					color:#666;
				}
			}
			.mint-tab-item.is-selected{
				color: #ff3737;
				border-bottom:1px solid #ff3737;
				margin-bottom: -1px;
			}
		}
		.order-list{
			.my-order{
				margin-top: 0.55rem;
				background: #fff;
				border-top: 1px solid #eeeeee ;
				border-bottom: 1px solid #eeeeee ;
				position: relative;
				.store{
					display: flex;
					justify-content:space-between;
					font-size: 0.7rem;
					color: #474747;
					line-height: 2rem;
					padding: 0 1.1rem;
					.state{
						color: #ff3737;
					}
					.store-name{
						img{
							width: 0.8rem;
							margin-right: 0.3rem;
						}
					}
					.statusok{
						position: absolute;
						top: 0rem;
						right: 2.3rem;
						display: block;
						background: url(../../assets/images/succeed.png);
						width: 3.2rem;
						height: 3.2rem;
						background-size: 100%;
						z-index: 1000;
					}
				}
				.iconfont{
					color: #7a7a7a;
				}
			}
			.order-good{
				display: flex;
				justify-content: space-between;
				background: #f9f9f9;
				padding: 0.75rem;
				position: relative;
				border-bottom: 1px solid #eee;
				.order-img{
					width: 3rem;
					img{
						width: 100%;
					}
				}
				.order-name{
					display: flex;
					flex: 1;
					font-size: 0.55rem;
					padding-left: 0.7rem;
				}
			}
		}
		p{
			font-size: 0.55rem;
			line-height: 2rem;
			text-align: right;
			border-bottom: 1px solid #eeeeee ;
			padding-right: 1.05rem;
			b{
				font-size: 0.6rem;
			}

		}
		.btn{
			height: 2rem;
			padding-right: 1rem;
			padding-top: 0.2rem;
			.handle{
				float: right;
				a{
					display: inline-block;
					text-align: center;
					font-size: 0.6rem;
					border-radius: 0.3rem;
					width: 3.75rem;
					line-height: 1.4rem;
				}
				.btn1{
					border:1px solid #999999;
				}
				.btn2{
					border:1px solid #ff3737;
					color: #FF3737
				}
			}


		}
	}
</style>
