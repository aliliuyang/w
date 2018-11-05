<template>
	<!--售后-->
	<div id="after-sale">
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">售后申请</mt-tab-item>
		  <mt-tab-item id="2">申请记录</mt-tab-item>
		</mt-navbar>
		<mt-loadmore :bottom-method="loadBottom" :bottomLoadingText='""' :bottomDropText='""'  :bottomPullText='""' :auto-fill="false" ref='loadmore'  :bottomDistance=150>
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		  	<div class="after-goods" v-for="apply in canOrder">
		  		<p class="after-num">订单编号:<span>{{apply.childorderid}}</span>&nbsp;下单时间:<span>{{apply.canceltime}}</span></p>
		  		<div class="goods" v-for="goods in apply.childgoods">
		  			<div class="goods-img">
		  				<img :src="goods.goodsimage" alt="" />
		  			</div>
		  			<div class="goods-tlt">
		  				<p class="name">{{goods.goodstitle}}</p>
		  				<p class="number"><span>数量：{{goods.count}}</span><a @click="goafter(apply,goods)">申请售后</a></p>
		  			</div>
		  		</div>
		  	</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		  	<div class="after-goods" v-for="item in record">
		  		<p class="after-num">京东订单编号：<span>{{item.jdOrderId}}</span></p>
		  		<div class="goods">
		  			<div class="goods-img">
		  				<img :src="item.goodsimage" alt="" />
		  			</div>
		  			<div class="goods-tlt">
		  				<p class="name">{{item.goodstitle}}</p>
		  				<p class="after-plan"><a :href="'#/applyplan/'+item.childorderid+'/'+item.skuId">
                <img v-if="item.status>=50" src="../../assets/images/aaaad.jpg" alt="" />
                <img v-else src="../../assets/images/afterplan.jpg" alt="">
                </a>
              </p>
		  			</div>
		  		</div>
		  	</div>
		  </mt-tab-container-item>
		</mt-tab-container>
	<div slot="bottom" class="mint-loadmore-bottom"></div>
	</mt-loadmore>
	</div>
</template>
<script>
import { Navbar, TabItem } from "mint-ui";
import axios from "axios";
import qs from "qs";
import { MessageBox } from "mint-ui";
import { Indicator } from "mint-ui";
const After = {
  name: "After",
  data() {
    return {
      selected: "1",
      record: [],
      canOrder: [],
      store:''
    };
  },
  methods: {
    loadBottom() {
      var that = this;
      this.page++;
      var token = localStorage.getItem("token");
      axios
        .post(
          BASE_URL + "/index.php?r=user/orders",
          qs.stringify({
            status: 8,
            page: this.page,
            token: token
          })
        )
        .then(function(res) {
          that.canOrder.push(b.data.rows);
        })
        .catch(function(err) {});
    },
    goafter(order,goods){
      if(order.btocid==this.store){
        window.location.href='#/applyfor/2/'+ order.childorderid +'/'+goods.cpsgoodsid
      }else{
        a.onclick()
      }
    }
  },
  mounted() {

    var that = this;
    document.title = "售后服务";
    var token = localStorage.getItem("token");
    if (!token) {
      MessageBox.confirm("您还未登录，现在去登录?").then(
        action => {
          window.location.href = "#/login";
        },
        action => {
          window.location.href = "#/main";
        }
      );
    } else {
      Indicator.open()
      axios
        .all([
          axios.post(
            BASE_URL + "/index.php?r=user/orders",
            qs.stringify({ status: 8, page: 1, token: token })
          ),
          axios.post(
            BASE_URL + "/index.php?r=jdproduct/ProreturnList",
            qs.stringify({ token: token })
          )
        ])
        .then(
          axios.spread(function(order, record) {
            Indicator.close()
            var b = Base64.decode(order.data);
            b = JSON.parse(b);
            that.canOrder = b.data.rows;
            that.store=b.data.btocid
            if(record.data.flag==1){
              var a = Base64.decode(record.data.data);
              a = JSON.parse(a);
              that.record = a;
            }
          })
        );
    }
  },
  updated() {},
  activated() {},
  components: {},
};

export default After;
</script>

<style lang="scss">
#after-sale {
  .mint-navbar {
    padding: 0 5rem;
    height: 2.25rem;
    .mint-tab-item {
      .mint-tab-item-label {
        font-size: 0.75rem;
      }
    }
    .is-selected {
      color: #ff3737;
      border-color: #ff3737;
    }
  }
  .mint-tab-container {
    .mint-tab-container-wrap {
      .after-goods {
        margin-top: 0.5rem;
        background: #fff;
        .after-num {
          padding: 0 0.75rem;
          font-size: 0.5rem;
          line-height: 1.75rem;
          border-bottom: 1px solid #f5f5f5;
          color: #666;
          letter-spacing: 1px;
        }
        .goods {
          padding: 0.5rem 0.75rem;
          padding-right: 0;
          display: flex;
          justify-content: space-between;
          .goods-img {
            width: 3rem;
            height: 3rem;
            img {
              width: 3rem;
              height: 3rem;
              width: 100%;
            }
          }
          .goods-tlt {
            display: flex;
            flex-direction: column;
            flex: 1;
            margin-left: 0.5rem;
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
              span {
                font-size: 0.55rem;
                position: absolute;
                bottom: 0rem;
                padding: 0px;
                margin: 0px;
                color: #666;
              }
              a {
                width: 3.75rem;
                height: 1.5rem;
                line-height: 1.5rem;
                text-align: center;
                position: absolute;
                bottom: 0rem;
                right: 0.75rem;
                color: #666;
                border: 1px solid #ff3737;
                color: #ff3737;
                background: #fff;
                font-size: 0.55rem;
              }
            }
            .after-plan {
              margin-top: 0.3rem;
              background: #f5f5f5;
              height: 1.8rem;
              img {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
