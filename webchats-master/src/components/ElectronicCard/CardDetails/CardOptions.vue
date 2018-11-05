<template>
	<div id="goods-options" v-cloak>
		<div class="goodsshow">
			<div class="goods-img">
				<img :src="selectGoods[0].img" alt="" />
			</div>
			<div class="goods-num">
				<p><i @click="allhidden" class="iconfont icon-guanbi"></i></p>
				<h5><b>¥ {{selectGoods[0].frontPrice}}</b></h5>
				<p>商品编号: <span v-text="selectGoods[0].sku"></span></p>
			</div>
		</div>
		<div class="options">
      <dl class="clear" v-for="item in searproduct">
        <dt v-text="item.salename"></dt>
        <dd v-for="style in item.salevalue" :class="style.isshow==1?'active-options':''" @click="getmore(style.skuIds)" v-text="style.saleValue"></dd>
      </dl>
			<div class="number">
				<span>数量</span>
				<div class="went-number">
					<span @click="changeNum('22')" class="minus"><b>-</b></span>
					<input class="idnumber" :value=number type="text" />
					<span @click="changeNum('add')" class="add"><b>+</b></span>
				</div>
			</div>
		</div>
		<!--<div class="addcar">-->
			<!--<div class="collect">-->
        <!--<span class="iconfont icon-gouwuche"></span>-->
				<!--&lt;!&ndash;<span class="iconfont icon-shoucang"></span>&ndash;&gt;-->
				<!--<div>购物车</div>-->
			<!--</div>-->
	    	<!--<div class="btncar" @click="nice">-->
	    		<!--<span >加入购物车</span>-->
	   		<!--</div>-->
		<!--</div>-->
	</div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
import {mapState,mapActions} from 'vuex'
	import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
	export default{
	  	name: 'GoodsOptions',
	  	props:['allhidden','selectGoods',"number",'changeNum','detaildsinit','transmissionid'],
	  	data () {
	    	return {
          searproduct:[],
	    	}
	  	},
	  	computed:{

	  	},
	  	methods:{
	  		...mapActions({
		        addCar:'addCar',
		    }),
		
        getmore(sku){
	  		  var b=sku[0]
          var that =this
          var options=''
          // axios.post(BASE_URL+'/index.php?r=jdproduct/Chonggou',qs.stringify({
          //    sku:Base64.encode(b),
          // })).then(function(res){
          //
          //   var a=JSON.parse(Base64.decode(res.data)).data
          //   if(a.err==10005) {
          //     MessageBox({
          //       title: '提示',
          //       message: '该商品以下架',
          //     })
          //     return
          //   }
          //     that.searproduct = a.product
          //     for (var i = 0; i < that.searproduct.length; i++) {
          //       for (var j = 0; j < that.searproduct[i].salevalue.length; j++) {
          //         if (that.searproduct[i].salevalue[j].isshow == 1) {
          //           options += that.searproduct[i].salevalue[j].saleValue + ',';
          //         }
          //       }
          //     }
          //
          //   that.detaildsinit(b,options)
          // }).catch(function(err){
          //
          // });
        },
	  	},
	  	mounted(){
        var that = this
        // axios.post(BASE_URL+'/index.php?r=jdproduct/Chonggou',qs.stringify({
        //   sku:Base64.encode(this.selectGoods[0].sku),
        // })).then(function(res){
        //
        //   var a=JSON.parse(Base64.decode(res.data)).data
        //   if(a.err==10002){
        //     that.searproduct=a.product
        //
        //   }else{
        //     options=''
        //   }
        //
        // }).catch(function(err){
        //
        // });
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
#goods-options{
	position: fixed;
	bottom: 2.45rem;
	height: 24rem;
	width: 100%;
	z-index: 100;
	background: #FFF;
	display: flex;
	flex-direction:column;
	.goodsshow{
		position: relative;
		width: 100%;
		height: 4.75rem;
		border: 1px solid #eee;
		.goods-img{
      display: flex;
      align-items: center;
			width: 4.95rem;
			height: 4.95rem;
			position: absolute;
			top: -1.2rem;
			left: 1.25rem;
			border:1px solid #eee;
			background: #fff;

			img{
				width: 100%;

			}
		}
		.goods-num{
			margin-left: 6rem;
			font-size: 0.6rem;
			padding: 0.75rem;
			h5{
				padding-top: 1rem;
				color: #ff3737;
			}
			p{
				color: #999;
				i{
					float: right;
				}
			}
		}
	}
	.options{
		flex: 1;
		overflow: scroll;
		font-size: 0.65rem;
		color: #999;
		padding:0.85rem;
		dl{
			dt{
				margin-bottom: 0.75rem;
			}
			dd{
				float: left;
				padding: 0.25rem 0.375rem;
				border:1px solid #eee;
				margin-right: 0.85rem;
				margin-bottom: 0.5rem;
				color: #333;
			}
		}
		.active-options{
			border-color: #FF3737;
			color: #FF3737;
		}
		.number{
			position: relative;
		}
		.went-number{
			position: absolute;
			right: 0;
			top: 0;
			color: #333;
			border:1px solid #999;
			.idnumber{
				width:1.7rem;
				height: 1.1rem;
				text-align: center;
				font-size: 0.65rem;
				border:1px solid #999;
				border-top: none;
				border-bottom: none;
				border-radius: 0;

			}
			.minus,.add{
				display: inline-block;
				width: 1.1rem;
				text-align: center;
				font-size: 0.65rem;
			}

		}
	}
	.options::-webkit-scrollbar{display:none;}
	.addcar{
		height:2.45rem;
		width: 100%;
		box-shadow: 0 -1px 3px #EEEEEE;
		background: #fff;
		display: flex;
		flex-direction: row;
		color: #999;
		font-size: 0.5rem;
		text-align: center;
		.collect{
			padding: 0.45rem 0;
			width: 2.45rem;
		}
		.btncar{
			flex: 1;
			background: #ff3b3c;
			line-height: 2.45rem;
			color: #fff;
			text-align: center;
			font-size: 0.8rem;
		}
	}
}

</style>
