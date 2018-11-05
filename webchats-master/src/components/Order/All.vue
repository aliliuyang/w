<template>
  <mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""' :bottomPullText='""' :auto-fill="false" ref='loadmore' :bottomDistance=150>
    <div>
        <div class="my-order" v-for="allitem in allorder">
          <div class="store">
            <div class="store-name"><span><img v-if='allitem.btocid==store' src="../../assets/images/JD-log.png" alt=""/><img v-else src="../../assets/images/qustore.jpg" alt=""/></span>{{allitem.catname_cn}}
            </div>
            <div class="state">{{allitem.status_cn}} &nbsp;&nbsp;<span v-if="allitem.status=='8'||allitem.status=='3'"
                                                                       class="iconfont icon-shanchu"
                                                                       @click="shanchu(allitem)"></span></div>
            <span class="statusok" v-if='allitem.status=="8"'></span>
          </div>
          <span></span>
          <a :href='"#/ordercontent/"+ischildorderid(allitem)'>
            <div class="order-good" v-for="goods in allitem.childgoods">
              <div class="order-img">
                <img :src="goods.goodsimage" alt=""/>
              </div>
              <div class="order-name">
                {{goods.goodstitle}}
              </div>
            </div>
          </a>
          <p>订单金额：¥<b>{{allitem.orderMoney}}</b>
            <span v-if="allitem.status==40">
            	<span>
            		<span v-if="allitem.couponPayed!=0.00">&nbsp;&nbsp;优惠券：<b>-¥{{allitem.couponPayed}}</b></span>
            		&nbsp;&nbsp;已支付：<b>¥{{payed(allitem.orderMoney,allitem.restToPay,allitem.couponPayed)}}</b>
            	</span>
             </br> 
             
             
             
            <i style="color: #FF3737;">还需付：<b>¥{{allitem.restToPay}}</b></i></span>
            <span class="savem" v-if="allitem.savem!=0 && allitem.status=='1'" > <b>中欣通支付约省{{allitem.savem}}%</b></span>
          </p>

          <div class="btn clear">
            <div class="need-pay handle" v-if="allitem.status=='1'||allitem.status=='40'">
              <a class="btn1"  v-if="allitem.status!='40'  @click="quxiao(allitem.id)">取消订单</a>
              <a class="btn2" :href="'?#/pay/'+allitem.id">付款</a>
            </div>
            <div class="wait-receiving handle" v-if="allitem.btocid==store&&allitem.status!=8&&allitem.btocorderid&&allitem.status!=11">
              <a class="btn1" :href="'#/logistics/'+allitem.btocorderid">查物流</a>
              <a class="btn2" @click="shouhuo(allitem.childorderid)">确认收货</a>
            </div>
            <div class="succeed handle" v-if="allitem.status=='8'">
              <a class="btn1" @click="goafter(allitem)">申请售后</a>
            </div>
            <div class="cancel handle" v-if="allitem.status_cn=='已取消'">
              <a class="btn1" @click="huifu(allitem.id)">恢复订单</a>
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
import { MessageBox } from "mint-ui";
import { Indicator } from "mint-ui";
const All = {
  name: "All",
  data() {
    return {
      allorder: [],
      token: "",
      page: "1",
      store: ""
    };
  },
  methods: {
    goafter(order) {
      if (order.btocid == this.store) {
        window.location.href = "#/applyfor/1/" + order.childorderid + "/1";
      } else {
        a.onclick();
      }
    },
    base64(str) {
      return Base64.encode(str);
    },
    loadBottom() {
      this.page++;
      this.init();
    },
    payed(a, b, c) {
      return ((a * 100 - b * 100 - c * 100) / 100).toFixed(2);
    },
    ischildorderid(orderid) {
      if (orderid.status == 1||orderid.status == 3||orderid.status == 40) {
        return orderid.id + "/0";
      } else {
        return orderid.childorderid + "/1";
      }
    },
    init() {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/orders",
          qs.stringify({
            status: 0,
            token: this.token,
            page: this.page
          })
        )
        .then(function(res) {
        	
          Indicator.close();
//        that.stores = JSON.parse(Base64.decode(res.data)).data.rows;
//        console.log(that.stores)
          that.store = JSON.parse(Base64.decode(res.data)).data.btocid;
          that.allorder = JSON.parse(Base64.decode(res.data)).data.rows;
          if (that.page != 1) {
            that.$refs.loadmore.onBottomLoaded();
          }
        })
        .catch(function(err) {});
    },
    isueschid(oborderid) {
      if (orderid.status == 1) {
        ischild = 0;
        oid = oborderid.id;
      } else {
        ischild = 1;
        oid = oborderid.childorderid;
      }
    },
    shanchu(orderid) {
      var that = this;
      MessageBox.confirm("确定删除订单吗?").then(
        action => {
          var oid = "";
          var ischild = "";
          var arr = [];
          if (orderid.status == 3) {
            ischild = 0;
            oid = orderid.id;
            arr = this.abolishOrder;
          }
          if (orderid.status == 8) {
            ischild = 1;
            oid = orderid.childorderid;
            arr = this.completeOrder;
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
                that.init();
              }
            })
            .catch(function(err) {});
        },
        action => {
          return;
        }
      );
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
    },
    huifu(orderid) {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/recoverOrder",
          qs.stringify({
            oid: Base64.encode(orderid),
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
    shouhuo(orderid) {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/receipt",
          qs.stringify({
            oid: Base64.encode(orderid),
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
Vue.component("all", All);
export default All;
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
  .savem{
    display: block;
    width: 100%;
    line-height: 1rem;
    margin-bottom: 5px;
    b{
      font-size: 0.5rem;
      color: #29218e;
      border:1px solid #29218e;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      padding: 1px 4px;
      margin-right: 5px;
      font-weight: normal;
    }
  }
  b {
    font-size: 0.6rem;
  }
}

.btn {
  height: 2rem;
  padding-right: 1rem;
  padding-top: 0.2rem;
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
