<template>
  <div id="main">
  	<div class="main-header">
  		<div class="userid">
  			<div><a href="#/account"><b class="iconfont icon-shezhi"></b>&nbsp;账号管理</a></div>
  		</div>
      <div class="user-information">
        <a @click="gome"><div class="userimg"><img src="../assets/images/user.jpg"/></div></a>
        <a @click="gome" ><p class="username">{{username}}</p></a>
      </div>
  	</div>
  	<div class="mystore">
  		<div class="money">
  			<div class="usable"><p>中欣通余额(元)：<b>{{usermoney}}</b></p></div>
  			<div class="disabled"><a href="#/recharge">充值</a></div>
  		</div>
	  	<div class="main-nav clear">
	  		<a href="#/order/needpay"><div><span><img src="../assets/images/k.png"/></span><p>待付款</p></div></a>
	  		<a href="#/order/all"><div><span><img src="../assets/images/a.png"/></span><p>我的订单</p></div></a>
	  		<a href="#/after"><div><span><img src="../assets/images/s.png"/></span><p>退款/售后</p></div></a>
	  		<a href="#/order/wait"><div><span><img src="../assets/images/w.png"/></span><p>物流查询</p></div></a>
	  		<hr style="height:1px;border-top:1px solid #f5f5f5"/>
	  		<a href="#/recharge"><div><span><img src="../assets/images/fk.png"/></span><p>充值</p></div></a>
	  		<a href="#/record"><div><span><img src="../assets/images/dd.png"/></span><p>充值记录</p></div></a>
	  		<a href="#/discounts"><div><span><img src="../assets/images/h.png"/></span><p>优惠券</p></div></a>
	  		<a href="#/myqudou"><div><span><img src="../assets/images/d.png"/></span><p>我的趣豆</p></div></a>
	  	</div>
	  	<div class="service">
	  			<div><i><img src="../assets/images/kf.png"/></i><p @click="talk"><span>在线客服</span><b class="iconfont icon-jiantou-copy"></b></p></div>
	  			<div><i><img src="../assets/images/dh.png"/></i><p><span>客服电话</span><a href="tel:400-010-6966">400-010-6966<b class="iconfont icon-jiantou-copy"></b></a></p></div>
	  			<div><i><img src="../assets/images/yx.png"/></i><p><span>投诉邮箱</span><b>service@7shengqian.com</b></p></div>
	  			<div><i><img src="../assets/images/sj.png"/></i><p><span>服务时间</span><b>周一至周日9:00-20:00</b></p></div>
	  	</div>
  	</div>
  	<div class="buttom"></div>
  	<nav-tab :istrue=3></nav-tab>
  </div>
</template>

<script>
import NavTab from "./NavTab";
import axios from "axios";
import qs from "qs";
import { MessageBox } from "mint-ui";
export default {
  name: "Main",
  data() {
    return {
      username: "登录/注册",
      usermoney: "0.00"
    };
  },
  methods: {
    gome() {
      var token = localStorage.getItem("token");
      if (token) {
        window.location.href = "#/account";
      } else {
        window.location.href = "#/login";
      }
    },
    talk() {
      a.onclick();
    }
  },
  mounted() {
    document.title = "我的趣商城";
    var user = JSON.parse(localStorage.getItem("user"));
    var that = this;
    var token = localStorage.getItem("token");
    axios.post(BASE_URL + "/index.php?r=site/userinfo",qs.stringify({
          token: token
        })).then(function(data) {
					var a = JSON.parse(Base64.decode(data.data));
					if (a.data.err == 10002) {
          that.username = a.data.user.username;
          that.usermoney = a.data.allMoney;
        }}).catch(function(err) {

				});
  }
};
</script>

<style lang="scss" scoped >
#main {
  background: #f5f5f5;
  .main-header {
    height: 8.75rem;
    padding: 1.25rem 0.75rem;
    background: url(../assets/images/useimg.jpg) no-repeat;
    background-size: 100%;
    .userid {
      display: flex;
      justify-content: flex-end;
      a {
        font-size: 0.55rem;
        color: #801f19;
      }
    }
    .user-information {
      text-align: center;
      width: 100%;
      .userimg {
        width: 3.1rem;
        height: 3.1rem;
        border-radius: 50%;
        background: #fff;
        margin: 0 auto;
        background: #fff;
        img {
          width: 90%;
          border-radius: 50%;
          margin: 5% auto;
        }
      }
      .username {
        font-size: 0.65rem;
        color: #fff;
        padding-top: 0.5rem;
      }
    }
  }
  .mystore {
    width: 100%;
    padding: 0 0.75rem;
    padding-top: 2.5rem;
    background: #f5f5f5;
    position: relative;
    .money {
      background: #fff;
      width: 17.25rem;
      height: 3rem;
      display: flex;
      /*box-shadow: 0 5px 15px #f5c3c3;*/
      position: absolute;
      top: -1.5rem;
      justify-content: space-between;
      border-radius: 8px;
      text-align: center;
      .usable {
        padding-left: 0.75rem;
        line-height: 3rem;
        p {
          color: #666;
          font-size: 0.55rem;
          b {
            color: #ff3737;
            font-size: 0.7rem;
          }
        }
      }
      .disabled {
        display: flex;
        align-items: center;
        a {
          display: block;
          margin-right: 0.75rem;
          color: #ff3737;
          font-size: 0.7rem;
          border: 1px solid #ff3737;
          line-height: 1.4rem;
          padding: 0 0.85rem;
          border-radius: 0.7rem;
        }
      }
    }
    .main-nav {
      background: #fff;
      padding: 0 0.75rem;
      border-radius: 8px;
      /*box-shadow: 0 5px 15px #f5c3c3;*/
      hr {
        color: #eee;
        height: 1px;
      }
      a {
        display: block;
        float: left;
        width: 25%;
        margin: 1rem 0;
        img {
          display: block;
          width: 1.25rem;
          margin: 0 auto;
        }
        p {
          text-align: center;
          font-size: 0.55rem;
        }
      }
    }
    .service {
      margin-top: 0.75rem;
      background: #fff;
      border-radius: 8px;
      /*box-shadow: 0 5px 15px #f5c3c3;*/
      div {
        display: flex;
        justify-content: space-between;
        line-height: 2.2rem;
        font-size: 0.65rem;
        color: #333;
        i {
          width: 2rem;
          display: block;
          padding: 0 0.5rem;
          img {
            width: 0.9rem;
          }
        }
        p {
          flex: 1;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          padding-right: 0.75rem;
          a,
          .icon-font,
          b {
            color: #999;
            font-weight: normal;
          }
        }
      }
    }
  }
  .buttom {
    margin-top: 0.375rem;
    width: 100%;
    height: 2.5rem;
  }
}
</style>
