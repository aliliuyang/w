<template>
	<mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""' :bottomPullText='""' :auto-fill="false" ref='loadmore' :bottomDistance=150>
		<div>
			<div class="my-order" v-for='wancheng in completeOrder'>
				<div class="store">
					<div class="store-name"><span><img v-if='wancheng.btocid==store' src="../../assets/images/JD-log.png" alt=""/><img v-else src="../../assets/images/qustore.jpg" alt=""/></span>{{wancheng.catname_cn}}</div>
					<div class="state">{{wancheng.status_cn}} &nbsp;&nbsp;<span class="iconfont icon-shanchu" v-if='wancheng.status==8||wancheng.status==3' @click="shanchu(wancheng)"></span></div>
					<span class="statusok"></span>
			 	</div>
				<span></span>
				<a :href='"#/ordercontent/"+wancheng.childorderid+"/1"'>
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
						<a class="btn1" @click="goafter(wancheng)">申请售后</a>
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
const Complete = {
  name: "Complete",
  data() {
    return {
      completeOrder: [],
      token: "",
      page: "1",
      store:''
    };
  },
  methods: {
    loadBottom() {
      	this.page++;
		this.init()
	},
	goafter(order){
		if(order.btocid==this.store){
			window.location.href='#/applyfor/1/'+order.childorderid+'/1'
		}else{
			a.onclick()
		}
  } ,
    init() {
      var that = this;
      axios
        .post(
          BASE_URL + "/index.php?r=user/orders",
          qs.stringify({
            status: "8",
            token: this.token,
            page: this.page
          })
        )
        .then(function(res) {
          Indicator.close()
          that.completeOrder = JSON.parse(Base64.decode(res.data)).data.rows;
          that.store=JSON.parse(Base64.decode(res.data)).data.btocid
          if(that.page!=1){
          that.$refs.loadmore.onBottomLoaded();
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
    },
    shanchu(orderid) {
      var that = this;
      MessageBox.confirm("确定删除订单吗?").then(
        action => {
          var oid = orderid.childorderid;
          var ischild = "1";
          console.log(oid)

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
Vue.component("complete", Complete);
export default Complete;
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
