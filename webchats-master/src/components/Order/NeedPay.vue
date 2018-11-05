<template>
    <mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""' :bottomPullText='""':auto-fill="false" ref='loadmore' :bottomDistance=150>
	<div class="neepayOrder">
		<div class="my-order"  v-for="needpayitem in needPay">
			<div class="store">
				<div class="store-name"><span><img v-if='needpayitem.btocid==store' src="../../assets/images/JD-log.png" alt=""/><img v-else src="../../assets/images/qustore.jpg" alt=""/></span>{{needpayitem.catname_cn}}</div>
				<div class="state"><span>{{needpayitem.status_cn}} &nbsp;&nbsp;</span></div>
				<span class="statusok" v-if='needpayitem.status_cn=="已完成"'></span>
			</div>
			<span></span>
			 <a :href='"#/ordercontent/"+ needpayitem.id + "/0"'>
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
      <div v-else>
        <p>订单金额：<b>¥ <span>{{needpayitem.orderMoney}}</span></b>
          <span class="savem" v-if="needpayitem.savem!=0" > <b>中欣通支付约省{{needpayitem.savem}}%</b></span>
        </p>

      </div>

			<div class="btn clear">
				<div class="need-pay handle">
		    		<a class="btn1" @click="quxiao(needpayitem.id)">取消订单</a>
		    		<a class="btn2" :href="'?#/pay/'+needpayitem.id">付款</a>
		    	</div>
			</div>
		</div>
		</div>
	 </mt-loadmore>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import qs from "qs";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
const NeedPay = {
  name: "NeedPay",
  data() {
    return {
      token: "",
      page: "1",
      needPay: [],
      store:''
    };
  },
  methods: {
    loadBottom() {
      this.page++;
      this.init();
    },
    payed(max,min){
        return (max*100-min*100)/100
    },
    init() {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/orders",
          qs.stringify({
            status: 1,
            token: this.token,
            page: this.page
          })
        )
        .then(function(res) {
          Indicator.close()
          that.needPay = JSON.parse(Base64.decode(res.data)).data.rows;
          that.store=JSON.parse(Base64.decode(res.data)).data.btocid
          if (that.page != 1) {
            that.$refs.loadmore.onBottomLoaded();
          }
        })
        .catch(function(err) {});
    },
    quxiao(orderid) {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/cancel",
          qs.stringify({
            token: this.token,
            oid: Base64.encode(orderid)
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
    }
  },
  mounted() {
    Indicator.open()
    this.token = localStorage.getItem("token");
    this.init();
  },
  updated() {},
  activated() {},
  components: {}
};
Vue.component("need-pay", NeedPay);
export default NeedPay;
</script>

<style scoped lang="scss">
.my-order {
  margin-top: 0.55rem;
  background: #fff;
  border-top: 1px solid #eeeeee;
  border-bottom: 1px solid #eeeeee;
  position: relative;
  .store {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: #474747;
    line-height: 2rem;
    padding: 0 1.1rem;
    background: #fff;
    .state {
      color: #ff3737;
    }
    .store-name {
      img {
        width: 0.8rem;
        margin-right: 0.3rem;
      }
    }
    .statusok {
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
  .iconfont {
    color: #7a7a7a;
  }
}
.savem{
  display: block;
  width: 100%;
  line-height: 1rem;
  margin-bottom: 5px;
  b{
    font-size: 0.5rem;
    font-weight: normal;
    color: #29218e;
    border:1px solid #29218e;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    padding: 1px 4px;
    margin-right: 5px;
  }
}
.order-good {
  display: flex;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 0.75rem;
  position: relative;
  border-bottom: 1px solid #eee;
  .order-img {
    width: 3rem;
    img {
      width: 100%;
    }
  }
  .order-name {
    display: flex;
    flex: 1;
    font-size: 0.55rem;
    padding-left: 0.7rem;
  }
}
p {
  font-size: 0.55rem;
  line-height: 2rem;
  text-align: right;
  border-bottom: 1px solid #eeeeee;
  padding-right: 1.05rem;
  background: #fff;
  b {
    font-size: 0.6rem;
  }
}
.btn {
  height: 2rem;
  padding-right: 1rem;
  padding-top: 0.2rem;
  background: #fff;
  .handle {
    float: right;
    a {
      display: inline-block;
      text-align: center;
      font-size: 0.6rem;
      border-radius: 0.3rem;
      width: 3.75rem;
      line-height: 1.4rem;
    }
    .btn1 {
      border: 1px solid #999999;
    }
    .btn2 {
      border: 1px solid #ff3737;
      color: #ff3737;
    }
  }
}
</style>
