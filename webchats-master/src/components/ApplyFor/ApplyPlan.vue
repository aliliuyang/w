<template>
	<div class="apply-plan">
		<div class="after-goods">
			<p class="after-num">订单编号：<span>{{order.childorderid}}</span>&nbsp;&nbsp;&nbsp;下单时间：<span>{{order.addtime}}</span></p>
			<div  class="goods">
				<div class="goods-img">
					<img :src="goods.goodsimage" alt="" />
				</div>
				<div class="goods-tlt">
					<p class="name">{{goods.goodstitle}}</p>
					<p class="number"><span class="after-number">数量：{{goods.count}}</span><span class="after-price">价格：<b>¥&nbsp<i>{{goods.money}}</i></b></span></p>
				</div>
			</div>
			<!--已退款-->
			<!--<div v-if="plan==5" class="refunded ">-->
				<!--<h5><i></i>已退款<span>¥&nbsp;<b>138.00</b></span></h5>-->
				<!--<p>退回至余额<span>¥&nbsp;<b>100.00</b></span></p>-->
				<!--<p>退回至微信<span>¥&nbsp;<b>38.00</b></span></p>-->
			<!--</div>-->
		</div>

		<div class="plan">
			<p class="plannum">售后进度</p>
      <div class="numing">
        <div class="myplan">
          <span class="none"></span>
          <b class="iconfont icon-xuanzhong"></b>
          <span></span>
        </div>
        <div  :class="plan>=21? 'myplan':'hear' ">
          <span></span>
          <b class="iconfont icon-xuanzhong"></b>
          <span></span>
        </div>
        <div  :class="plan>=31? 'myplan':'hear'">
          <span></span>
          <b class="iconfont icon-xuanzhong"></b>
          <span></span>
        </div>
        <div  :class="plan>=33? 'myplan':'hear'">
          <span></span>
          <b class="iconfont icon-xuanzhong"></b>
          <span></span>
        </div>
        <div  :class="plan>=40? 'myplan':'hear'">
          <span></span>
          <b class="iconfont icon-xuanzhong"></b>
          <span></span>
        </div>
        <div  :class="plan>=50? 'myplan':'hear'">
          <span></span>
          <b class="iconfont icon-xuanzhong"></b>
          <span class="none"></span>
        </div>
      </div>
      <div>
        <div class="numing-tit">
          <p>申请阶段</p>
          <p>客服审批</p>
          <p>京东收货</p>
          <p>京东处理</p>
          <p>用户确认</p>
          <p>完成</p>
        </div>
      </div>

		</div>
		<div class="description">
			<h3><span>问题描述</span><!--<button>补充描述</button>--></h3>
			<div class="text">
				<div class="borin">
					<p>{{orderReturn.questionDesc}}</p>
					<p class="borin-time">
						<span>{{orderReturn.createtime}}</span><span></span>
					</p>
				</div>
				<div class="borin-img" >
					<img v-for="img in returnimg" :src="img" alt="" />
				</div>
			</div>
		</div>
		<!--<div class="cancel">-->
			<!--<p @click="cancel">取消申请</p>-->
		<!--</div>-->
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import Vue from 'vue'
	import axios from 'axios';
	import qs from 'qs';
	const ApplyPlan = {
	  	name: 'ApplyPlan',
	  	data () {
	    	return {
				  plan:'',
          childorderid:'',
          goodsid:'',
          order :{},
          goods:{},
          orderReturn:{},
          returnimg:[]
	    	}
	  	},
	  	methods:{
	  		cancel(){
	  			MessageBox({
            title: '提示',
            message: '确定取消申请吗?',
            showCancelButton: true
				  })
	  		}

	  	},
	  	mounted(){
	  		var that= this
        this.isgologin()
	  		 document.title = '售后进度'
	        this.childorderid=this.$route.params.id;
	        this.goodsid=this.$route.params.goodsid;
	        var token = localStorage.getItem("token");
     		axios.post(BASE_URL+'/index.php?r=jdproduct/Proreturnview',qs.stringify({
			    	childorderid:this.childorderid,
				    id:this.goodsid,
	          token:token
				  })).then(function(res){
	          var a=Base64.decode(res.data.data)
	          a=JSON.parse(a)
	          that.order=a.order
	          that.goods=a.goods
	          that.orderReturn=a.orderReturn
	          that.plan=a.return_status
            that.returnimg=a.orderReturn.goodsimage.split('###')
            that.returnimg.splice(0,1)
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

	export default ApplyPlan
</script>

<style scoped lang="scss">
.apply-plan{
	width: 100%;
	overflow: hidden;
	.after-goods {
		background: #fff;
		/*售后进度完成*/
		.refunded{
			h5{
				font-size: 0.9rem;
				color: #50c65f;
				text-align: center;
				line-height: 3.6rem;
				font-weight: 600;
				span{
					color: #333;
					padding-left: 1.25rem;
					b{
						font-weight: 600;
					}
				}
			}
			p{
				display: flex;
				justify-content: space-between;
				padding:0 0.75rem;
				font-size: 0.65rem;
				color: #999;
				padding-bottom: 1rem;
				span{
					font-weight: 500;
					color: #666;

				}
			}
		}

		.after-num {
			padding: 0 0.75rem;
			font-size: 0.5rem;
			line-height: 1.75rem;
			border-bottom: 1px solid #f5f5f5;
			color: #666;
		}
		.goods {
			padding: 0.5rem 0.75rem;
			display: flex;
			justify-content: space-between;
			.goods-img {
				width: 3rem;
				height: 3rem;
				img {
					width: 100%;
				}
			}
			.goods-tlt {
				display: flex;
				flex-direction: column;
				padding-left: 0.5rem;
				flex: 1;
				.name {
					width: 12.5rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 0.5rem;
					color: #333;
				}
				.number {
					flex: 1;
					position: relative;
					display: flex;
					justify-content: space-between;
					.after-number {
						font-size: 0.55rem;
						position: absolute;
						bottom: 0rem;
						padding: 0px;
						margin: 0px;
						color: #666;
					}
					.after-price {
						position: absolute;
						bottom: 0rem;
						right: 0.75rem;
						color: #666;
						background: #fff;
						font-size: 0.55rem;
						b {
							color: #FF3737;
						}
					}
				}
			}
		}
	}
	.plan{
		margin-top: 0.5rem;
		width: 100%;
		padding: 0 0.75rem;
		background:#fff;
		.plannum{
			border-bottom: 1px solid #D5D5D5;
			font-size: 0.675rem;
			line-height: 1.75rem;
      margin-bottom: 0.5rem;
		}
    .numing,.numing-tit{
      padding:0 0 0.5rem 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .numing{
      /*padding:0 0.75rem ;*/
    }
    .hear{
      display: flex;
      justify-content:space-between;
      flex: 1;
      align-items: center;
      .icon-xuanzhong{
        display: flex;
        color: #fff;
        border:1px solid #999;
        border-radius: 50%;
        font-size: 0.9rem;
        margin: 0 0.2rem;
      }
      span{
        display: flex;
        flex: 1;
        height:0;
        border: 1px solid #999;
      }
      .none{
        border: none;
      }
    }
    .myplan{
      display: flex;
      justify-content:space-between;
      flex: 1;
      align-items: center;

      .icon-xuanzhong{
        display: flex;
        color: #51c560;
        font-size: 0.9rem;
        margin: 0 0.2rem;
      }
      span{
        display: flex;
        flex: 1;
        height:0;
        border: 1px solid #51c560;
      }
      .none{
        border: none;
      }

    }
    p{
      flex:1;
      padding-top: 0.5rem;
      font-size: 0.5rem;
      color: #51c560;
      text-align: center;
    }
		img{
			width: 100%;
		}
	}
	.description{
		padding: 0 0.75rem;
		background: #fff;
		margin-top: 0.5rem;
		padding-bottom: 0.75rem;
		h3{
			font-weight: normal;
			display: flex;
			justify-content: space-between;
			line-height: 1.75rem;
			font-size: 0.675rem;
			border-bottom: 1px solid #D5D5D5;
			align-items: center;
			button{
				height: 1.2rem;
				background: #fff;
				border: 1px solid #bfbfbf;
				color: #666;
				padding: 0 0.5rem;
				font-size: 0.5rem;
			}
		}
		.borin{
			padding-top: 0.75rem;
			font-size: 0.55rem;
			line-height: 0.9rem;
			color: #666;
			.borin-time{
				color: #999;
				line-height: 1.6rem;
			}
		}
		.borin-img{
			width: 120%;
			display: flex;
			padding-top: 0.5rem;
			img{
				display: block;
				width: 2.85rem;
				height: 2.85rem;
				margin-right: 0.75rem;
			}
		}
	}
	.cancel{
		margin-top: 0.5rem;
		background: #fff;
		color: #333;
		font-size: 0.75rem;
		text-align: center;
		line-height: 2.25rem;
	}


}

</style>
