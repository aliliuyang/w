<template>
<div class="order-content" v-if='isok'>
	<div class="contner">
		<div class="order-state" v-if="!(order.status==3)">
			<h4 ><b class="iconfont icon-shijian"></b>&nbsp;&nbsp;<span>{{order.status_cn}}</span></h4>
		</div>
		<div class="order-state2" v-if="order.status==3">
			<h4><b class="iconfont icon-shijian"></b>&nbsp;&nbsp;<span>已取消</span></h4>
		</div>
		<div class="oredr-adddress">
			<h5><span>{{order.address_consigneename}}</span> <span>{{order.address_consigneephone}}</span></h5>
			<p v-if="order.address_all!=0"><i class='iconfont icon-dizhi'></i>&nbsp;<span>{{order.address_all}}</span> </p>
		</div>
		<h4>商品清单</h4>
		<div class="order-title">
			 <div class="goods" v-for="item in order.childgoods">
				<div class="goods-img">
					<a :href=item.phonehref>
					<img :src=item.goodsimage alt="" />
					</a>
				</div>
				<div class="goods-tlt">
					<p class="name">{{item.goodstitle}}</p>
					<p class="style"></p>
          <p class="zxt"><span>中欣通专享价</span>¥&nbsp<i>{{item.zxtmoney}}</i></p>
					<p class="number"><span class="after-price">价格：<b>¥&nbsp<i>{{item.money}}</i></b></span><span class="after-number">数量：{{item.count}}</span></p>
				</div>
			</div>
			<div class="order-number">
				<p>订单编号：<span>{{order.childorderid}}</span></p>
				<p>下单时间：{{order.addtime}}</p>
			</div>
		</div>
		<div class="money">
			<p><span>总商品金额</span><span>¥<b v-text="change(order.allyMoney-order.orderFare)"></b></span></p>
			<p><span>运费</span><span>¥<b v-text="change(order.orderFare)"></b></span></p>
			<p v-if="order.couponPayed"><span>优惠券</span><span> - ¥<b v-text="change(order.couponPayed)"></b></span></p>
			<!--<p><span>趣豆</span><span>¥<b>0.00</b></span></p>-->
			<div class="allmoney">
				<h5>实付金额：<span>¥&nbsp<b v-text="order.realPay"></b></span></h5 >
			</div>
		</div>
		<div class="tuijian">
			<h3><img src="../../assets/images/tuijian.jpg" alt="" /></h3>
			<ul>
				<li v-for="item in hot">
					<a :href='"#/details/"+base64(item.sku)'>
						<img :src="item.goodsimage" alt="" />
						<p v-text="item.name"></p>
						<h6>¥<span v-text="item.frontPrice"></span></h6>
					</a>
				</li>

			</ul>
		</div>
	</div>
	<div class="btn">
		<div class="gopay" v-if="order.status=='1'||order.status=='40'" >
			<a :href='"#/pay/"+order.id'>立即付款</a>
			<button @click="quxiao" v-if="order.status!='40'">取消订单</button>
		</div>
		<div class="shouhuo" v-if="order.btocid==btocid&&order.status!=8&&order.status!=1&&order.status!=11&&order.status!=3&&order.btocorderid">
			<a :href='"#/logistics/" + order.btocorderid'>查询物流</a>
			<button @click="shouhuo">确认收货</button>
		</div>
		<div class="shanchu" v-if="order.status==3">
			<p @click="shanchu">删除订单</p>
			<a  @click="huifu" >恢复订单</a>
		</div>
		<div class="wancheng" v-if="order.status==8">
			<p @click="shanchu">删除订单</p>
			<div>
				<a @click="goafter(order)">申请售后</a>
				<!--<a @click="againShoping">再次购买</a>-->
			</div>
		</div>
	</div>
</div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { Toast } from "mint-ui";
import { Indicator } from 'mint-ui';
const OrderContent = {
  name: "OrderContent",
  data() {
    return {
      childorderid: "",
      ischild: "",
      order: {},
      hot: [],
      token: "",
      btocid: "",
      cargoods: [],
      isok:false
    };
  },
  methods: {
    goafter(order) {
      if (order.btocid == this.btocid) {
        window.location.href = "#/applyfor/1/" + order.childorderid + "/1";
      } else {
        a.onclick();
      }
    },
    change(Num) {
      return Number(Num).toFixed(2);
    },
    base64(str) {
      return Base64.encode(str);
    },
    shanchu() {
      var oid = "";
      var ischild = "";
      if (this.order.status == 3) {
        ischild = 0;
        oid = this.order.id;
      }
      if (this.order.status == 8) {
        ischild = 1;
        oid = this.order.childorderid;
      }
      if (this.order.status == 11) {
        ischild = 1;
        oid = this.order.childorderid;
      }
      axios
        .post(
          BASE_URL + "/index.php?r=user/recycle",
          qs.stringify({
            oid: Base64.encode(oid),
            ischild: Base64.encode(ischild),
            token: this.token
          })
        )
        .then(function(res) {
          var a = Base64.decode(res.data);
          a = JSON.parse(a);
          if (a.data.err == 10002) {
            Toast("删除成功");
            window.location.href = "#/order/1";
          }
        })
        .catch(function(err) {});
    },
    quxiao() {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/cancel",
          qs.stringify({
            oid: Base64.encode(this.order.id),
            token: this.token
          })
        )
        .then(function(res) {
          var a = Base64.decode(res.data);
          a = JSON.parse(a);
          if (a.data.err == 10002) {
            Toast("订单取消成功");
            that.init();
          }
        })
        .catch(function(err) {});
    },
    shouhuo() {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/receipt",
          qs.stringify({
            oid: Base64.encode(this.order.childorderid),
            ischild: Base64.encode(1),
            token: this.token
          })
        )
        .then(function(res) {
          var a = Base64.decode(res.data);
          a = JSON.parse(a);
          if (a.data.err == 10002) {
            Toast("已确认收货");
            that.init();
          }
        })
        .catch(function(err) {});
    },
    huifu() {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/recoverOrder",
          qs.stringify({
            oid: Base64.encode(this.order.id),
            token: this.token
          })
        )
        .then(function(res) {
          var a = Base64.decode(res.data);
          a = JSON.parse(a);
          if (a.data.err == 10002) {
            Toast("订单恢复成功");
            that.init();
          }
        })
        .catch(function(err) {});
    },
    init() {
      var that = this;
      this.childorderid = this.$route.params.childorderid;
      this.ischild = this.$route.params.ischild;
      axios
        .post(
          BASE_URL + "/index.php?r=order/view",
          qs.stringify({
            oid: Base64.encode(this.childorderid),
            ischild: Base64.encode(this.ischild),
            token: this.token
          })
        )
        .then(function(res) {
          var a = Base64.decode(res.data);
          a = JSON.parse(a);
          Indicator.close();
          that.order = a.data.order;
          that.hot = a.data.hotgoods;
          that.btocid = a.data.btocid;
          that.isok=true
        })
        .catch(function(err) {});
    },
    againShoping() {
      //	  		  this.cargoods= [{img:'',frontPrice:'',sku:'',name:'',number:1 ,options:'',store:'京东',wxgoodshref:''}]
      for (var i = 0; i < this.order.childgoods.length; i++) {
        var obj = {};
        obj.img = this.order.childgoods[i].goodsimage;
        obj.frontPrice = this.order.childgoods[i].money;
        obj.sku = this.order.childgoods[i].sku;
        obj.name = this.order.childgoods[i].goodstitle;
        obj.number = this.order.childgoods[i].count;
        obj.store = "京东";
        obj.options = "";
        obj.wxgoodshref =
          "#/details/" + Base64.encode(this.order.childgoods[i].sku);
        this.cargoods.push(obj);
      }
      axios
        .post(
          BASE_URL + "/index.php?r=shop/joincarttwo",
          qs.stringify({
            token: this.token,
            param: JSON.stringify(this.cargoods)
          })
        )
        .then(function(res) {
          Toast("填加购物车成功");
          //                window.location.href="#/car";
        })
        .catch(function(err) {});
    }
  },
  mounted() {
    this.isgologin()
    Indicator.open()
    this.token = localStorage.getItem("token");
    document.title = "订单详情";
    this.init();
  },
  updated() {},
  activated() {},
  components: {}
};

export default OrderContent;
</script>

<style scoped lang="scss">
.order-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .contner {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
  }
  .contner::-webkit-scrollbar {
    display: none;
  }
  .order-state,
  .order-state2 {
    height: 3.5rem;
    padding: 0 0.75rem;
    h4 {
      color: #fff;
      font-size: 0.85rem;
      line-height: 3.5rem;
    }
  }
  .order-state {
    background: url(../../assets/images/state.jpg) no-repeat center;
    background-size: 100%;
  }
  .order-state2 {
    background: url(../../assets/images/state2.jpg) no-repeat center;
    background-size: 100%;
  }
  .oredr-adddress {
    margin-top: 0.5rem;
    background: #fff;
    padding: 0.5rem 0.75rem;
    font-size: 0.6rem;
    h5 {
      font-weight: normal;
      padding-left: 0.75rem;
      color: #333;
      line-height: 1rem;
      span {
        margin-right: 1.8rem;
      }
    }
    p {
      color: #999;
      line-height: 1rem;
      i {
        font-size: 0.6rem;
      }
    }
  }
  h4 {
    font-size: 0.75rem;
    font-weight: normal;
    line-height: 2.25rem;
    padding: 0 0.75rem;
  }
  .goods {
    padding: 0.5rem 0.75rem;
    display: flex;
    justify-content: space-between;
    background: #fff;
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
        font-weight: bold;
      }
      .zxt{
        font-size: 0.5rem;
        padding-top: 5px;
        span{
          font-size: 0.5rem;
          color: #fff;
          font-weight: bold;
          border:1px solid #29218e;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          padding: 0 4px;
          margin-right: 5px;
          background: #29218e;
        }
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
          right: 0.75rem;
          padding: 0px;
          margin: 0px;
          color: #666;
        }
        .after-price {
          position: absolute;
          bottom: 0rem;
          left: 0;
          color: #666;
          background: #fff;
          font-size: 0.55rem;
          b {
            color: #ff3737;
          }
        }
      }
      .style {
        width: 12rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.5rem;
        color: #999;
      }
    }
  }
  .order-number {
    background: #fff;
    border-top: 0.025rem solid #dee;
    border-bottom: 0.025rem solid #dee;
    font-size: 0.5rem;
    color: #666;
    padding: 0.75rem;
    line-height: 1rem;
  }
  .money {
    padding-left: 0.75rem;
    background: #fff;
    padding-top: 0.75rem;
    p {
      padding-right: 0.75rem;
      font-size: 0.65rem;
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.75rem;
      color: #666;
      b {
        font-weight: normal;
      }
    }
    .allmoney {
      display: flex;
      justify-content: flex-end;
      border-top: 1px solid #eee;
      line-height: 2.25rem;
      padding-right: 0.75rem;
      font-size: 0.7rem;
      color: #333;
      span {
        color: #ff3737;
      }
    }
  }
  .tuijian {
    h3 {
      img {
        display: block;
        height: 2.25rem;
        margin: 0 auto;
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
      li {
        margin-bottom: 0.2rem;
        width: 49.5%;
        background: #fff;
        display: flex;
        flex-direction: column;
        img {
          width: 100%;
        }
        p {
          padding: 0.25rem;
          padding-bottom: 0;
          font-size: 0.6rem;
          color: #666;
          line-height: 0.75rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        h6 {
          padding: 0.25rem;
          color: #ff3737;
          padding-top: 1rem;
        }
      }
    }
  }

  .btn {
    height: 2.5rem;
    border-top: 1px solid #eee;
    background: #fff;
    .gopay {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      padding: 0 0.75rem;
      a,
      button {
        display: inline-block;
        width: 4rem;
        height: 1.8rem;
        font-size: 0.7rem;
        text-align: center;
        line-height: 1.8rem;
      }
      a {
        background: #ff3737;
        color: #fff;
        margin-right: 0.375rem;
      }
      button {
        background: none;
        border: 1px solid #333;
        color: #333;
      }
    }
    .shouhuo {
      height: 100%;
      display: flex;
      padding: 0 0.75rem;
      align-items: center;
      justify-content: flex-end;
      button {
        background: none;
        border: 1px solid #333;
        color: #333;
        font-size: 0.7rem;
        text-align: center;
        line-height: 1.8rem;
        width: 4rem;
        height: 1.8rem;
      }
      a {
        width: 4rem;
        height: 1.8rem;
        background: #ff3737;
        font-size: 0.7rem;
        line-height: 1.8rem;
        text-align: center;
        color: #fff;
        margin-right: 0.375rem;
      }
    }
    .shanchu {
      height: 100%;
      display: flex;
      padding: 0 0.75rem;
      align-items: center;
      justify-content: space-between;
      font-size: 0.7rem;
      a {
        background: none;
        border: 1px solid #333;
        color: #333;
        text-align: center;
        line-height: 1.8rem;
        width: 4rem;
        height: 1.8rem;
      }
      p {
        color: #333;
        line-height: 2.5rem;
      }
    }
    .wancheng {
      height: 100%;
      display: flex;
      padding: 0 0.75rem;
      align-items: center;
      justify-content: space-between;
      font-size: 0.7rem;
      a {
        display: inline-block;
        background: none;
        border: 1px solid #333;
        color: #333;
        font-size: 0.7rem;
        text-align: center;
        line-height: 1.8rem;
        width: 4rem;
        height: 1.8rem;
      }
    }
  }
}
</style>
