<template>
	<div  id="account">
		<div v-if="!user" class="no-log">
			<div class="log-img">
			</div>
			<div class="go-log">
				<a href="#/login">登录/注册</a>
			</div>
		</div>
		<!---->
		<div  class="log-in" v-if="user">
			<div class="logged">
				<div class="log-img">
				</div>
				<div class="account-id">
					<p>{{user}}</p>
          <p><a href="#/qustore">前往购物</a><b class="iconfont icon-jiantou-copy"></b></p>
				</div>
			</div>
			<div class="account-handle">
				<p><a href="#reset"><span>修改登录密码</span><b class="iconfont icon-jiantou-copy"></b></a></p>
				<p><a href="#/myaddress"><span>收货地址管理</span><b class="iconfont icon-jiantou-copy"></b></a></p>
			</div>
			<p @click="logout" class="log-out">退出当前账户</p>
		</div>
	</div>
</template>

<script>
import { MessageBox } from "mint-ui";
import axios from "axios";
import qs from "qs";
const Account = {
  name: "Account",
  data() {
    return {
      register: true,
      user: ""
    };
  },
  methods: {
    logout() {
      var token = localStorage.getItem("token");
      MessageBox.confirm("确定退出登录?").then(
        action => {
          axios
            .post(
              BASE_URL + "/index.php?r=site/logout",
              qs.stringify({
                token: token
              })
            )
            .then(function(res) {})
            .catch(function(err) {});
          localStorage.removeItem("user");
          localStorage.removeItem("openid");
          localStorage.removeItem("token");
          this.islogin();
        },
        action => {
          return;
        }
      );
    },
    islogin() {
      var quuser = JSON.parse(localStorage.getItem("user"));
      if (quuser) {
        this.user = quuser.username;
      } else {
        this.user = false;
      }
    }
  },
  mounted() {
    this.islogin();
  },
  updated() {},
  activated() {},
  components: {}
};
export default Account;
</script>

<style scoped lang="scss">
#account {
  .no-log,
  .logged {
    height: 5.75rem;
    background: #fff;
    padding: 1.2rem 0.75rem;
    display: flex;
    justify-content: flex-start;
    .log-img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: url(../../assets/images/no-log.png) no-repeat center #f5f5f5;
      background-size: 2rem;
    }
    .go-log {
      font-size: 0.75rem;
      line-height: 3rem;
      padding-left: 1rem;
      color: #333;
    }
  }
  .log-in {
    .logged {
      .log-img {
        border: 1px solid #ff3737;
        background: url(../../assets/images/user.jpg) no-repeat center #fff;
        background-size: 2rem;
      }
      .account-id {
        display: flex;
        width: 14rem;
        justify-content: space-between;
        font-size: 0.75rem;
        line-height: 3rem;
        padding-left: 1rem;
        color: #333;
        a{
          color: #ff3737;
        }
        .iconfont {
          color: #eee;
        }
      }
    }
    .account-handle {
      margin-top: 0.75rem;
      background: #fff;
      padding-left: 0.75rem;
      p {
        a {
          padding-right: 0.75rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: #333;
          line-height: 2.25rem;
          border-bottom: 1px solid #f5f5f5;
          .iconfont {
            color: #eee;
          }
        }
      }
    }
    .log-out {
      margin-top: 0.75rem;
      height: 2.25rem;
      text-align: center;
      line-height: 2.25rem;
      color: #ff3737;
      font-size: 0.7rem;
      background: #fff;
    }
  }
}
</style>
