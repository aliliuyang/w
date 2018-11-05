<template>
	<div id="main-order">
		<div class="order-nav">
      <router-link :to="{ path: '/order/all'}" :class="ordertype=='/order/all'? 'active':''" replace>全部</router-link>
      <router-link :to="{ path: '/order/needpay'}" :class="ordertype=='/order/needpay'? 'active':''" replace>待付款</router-link>
      <router-link :to="{ path: '/order/wait'}" :class="ordertype=='/order/wait'? 'active':''" replace>待收货</router-link>
      <router-link :to="{ path: '/order/complete'}" :class="ordertype=='/order/complete'? 'active':''" replace> 已完成</router-link>
      <router-link :to="{ path: '/order/cancel'}" :class="ordertype=='/order/cancel'? 'active':''" replace>已取消</router-link>
			<!--<a href="#/order/all" :class="ordertype=='/order/all'? 'active':''" replace>全部</a>-->
			<!--<a href="#/order/needpay" :class="ordertype=='/order/needpay'? 'active':''" replace>待付款</a>-->
			<!--<a href="#/order/wait" :class="ordertype=='/order/wait'? 'active':''" replace>待收货</a>-->
			<!--<a href="#/order/complete" :class="ordertype=='/order/complete'? 'active':''" replace>已完成</a>-->
			<!--<a href="#/order/cancel" :class="ordertype=='/order/cancel'? 'active':''" replace>已取消</a>-->
		</div>
    <div class="list">
      <router-view></router-view>
    </div>


	</div>
</template>
<script>
	import Vue from 'vue'
  import { MessageBox } from 'mint-ui';
	const MyOrder = {
	  	name: 'MyOrder',
	  	data () {
	    	return {
          token:''
	    	}
	  	},
      computed:{
        ordertype(){
          return this.$route.path
        }

      },
	  	methods:{



	  	},
	  	mounted(){
	  		document.title = '我的订单'
	        this.token = localStorage.getItem("token");
//	        if(!this.token){//暂时注释
			if(this.token){//测试
	          MessageBox.confirm('你还未登录，现在去登录?').then(action => {
	              window.location.href="#/login";
	            },
	            action => {
	              window.location.href="#/main";
	            })
	        }
         
		},
		updated(){

		},
		activated(){

		},
	    components:{

	    }
	}
	Vue.component('my-order',MyOrder )
	export default MyOrder
</script>

<style scoped lang="scss">
#main-order{
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 100%;
  .order-nav{
		display: flex;
		justify-content: space-between;
		background:#fff;
    height:2.45rem;
		a{
			flex: 1;
			text-align: center;
			font-size:0.55rem ;
			line-height: 2.45rem;
		}
    .active{
        border-bottom: 1px solid #ff3737;
        color: #ff3737;
    }
	}
  .list{
    flex: 1;
    flex-flow: 1;
    overflow: scroll;
  }
  .list::-webkit-scrollbar {
    display: none;
  }

}

</style>
