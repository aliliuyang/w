<template>
	<mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""' :bottomPullText='""' :auto-fill="false" ref='loadmore' :bottomDistance=150>
		<div>
      <div class="my-order" v-for="quxiao in CancelOrder">
				<div class="store">
					<div class="store-name"><span><img v-if='quxiao.btocid==store' src="../../assets/images/JD-log.png" alt=""/><img v-else src="../../assets/images/qustore.jpg" alt=""/></span>{{quxiao.catname_cn}}</div>
					<div class="state">{{quxiao.status_cn}} &nbsp;&nbsp;<span class="iconfont icon-shanchu" v-if='quxiao.status==8||quxiao.status==3' @click="shanchu(quxiao.id)"></span></div>
					<span class="statusok" v-if='quxiao.status==8'></span>
				</div>
				<span></span>
				<a :href='"#/ordercontent/"+quxiao.id+"/0"'>
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
const Cancel = {
  name: "Cancel",
  data() {
    return {
      CancelOrder: [],
      token: "",
      page: 1,
      store:''
    };
  },
  methods: {
    loadBottom() {
      this.page++;
 			this.init()
    },
    init() {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/orders",
          qs.stringify({
            status: 3,
            token: this.token,
            page: this.page
          })
        )
        .then(function(res) {
           Indicator.close()
          that.CancelOrder = JSON.parse(Base64.decode(res.data)).data.rows;
          that.store=JSON.parse(Base64.decode(res.data)).data.btocid;
					if(that.page!=1){
						that.$refs.loadmore.onBottomLoaded();
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
    shanchu(orderid) {
      var that = this;
      MessageBox.confirm("确定删除订单吗?").then(
        action => {
          var oid = orderid;
          var ischild = "0";
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
Vue.component("cancel", Cancel);
export default Cancel;
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
