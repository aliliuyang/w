<template>
  <div class="main">
    <ul>
      <li><a @click="gourl('#/travel/income')"><span><i class="recode"></i>收款记录</span><b class="iconfont icon-jiantou-copy"></b></a></li>
      <li><a @click="gourl('#/travel/refund')"><span><i class="refund"></i>退款</span><b class="iconfont icon-jiantou-copy"></b></a></li>
      <li v-if="ischild"><a @click="gourl('#/travel/invite')"><span><i class="yaoqing"></i>邀请分店入驻</span><b class="iconfont icon-jiantou-copy"></b></a></li>
    </ul>
    <div class="out_box">
      <button @click="loginout">退出登录</button>
    </div>
    <travel-tab :selectedpage="'我的'"></travel-tab>
  </div>
</template>

<script>
  import TravelTab from './TravelTab'
  import axios from "axios";
  import qs from "qs";
  import {Indicator, Toast} from "mint-ui";
  import {MessageBox} from 'mint-ui'

  export default {
    name: 'Main',
    data() {
      return {
        isadd: false,
        isok: false,
        ischild: false,
        status:null
      }
    },
    methods: {
      loginout() {
        MessageBox.confirm('确定退出', '提示').then(action => {
          localStorage.removeItem("tenant");
          window.location.href = '#/travel/login'
        }, action => {
          return false
        })
      },
      gourl(url) {
        if (!this.isadd) {
          MessageBox.alert('请补全认证信息', '提示').then(action => {
            window.location.href = '#/travel/addcredit'
          })
          return
        }
        if (!this.isok) {
          MessageBox.alert('您的信息正在认证中，请耐心等待', '提示')
          return
        }
        if(this.status!=0){
            MessageBox.alert('您的账户已冻结，请联系客服', '提示')
             return
        }
        window.location.href = url
      }
    },
    mounted() {
      var that = this
      this.token = localStorage.getItem('tenant')
      if (!this.token) {
        window.location.href = '#/travel/login'
      } else {
        //验证商户有无对公账户
        axios.post(BASE_URL + '/index.php?r=YinjiaStage/GetMerchBank', qs.stringify({
          token: this.token,
        })).then(function (res) {
          var a = JSON.parse(Base64.decode(res.data))
          if (a.code == 10000) {
            if (a.data.err == 10000) {
              if (a.data.data.bankno) {
                that.isadd = true
              }
            }
          }
        }).catch(function (err) {

        })
        //获取账户信息
        axios.post(BASE_URL + '/index.php?r=YinjiaStage/GetMerchatInfo', qs.stringify({
          token: this.token
        })).then(function (res) {
          var a = JSON.parse(Base64.decode(res.data))
          if (a.code == 10000) {
            if (a.data.err == 10000) {
              that.my = a.data.data
              that.ischild = a.data.data.store
              that.status=a.data.data.status
              if (a.data.data.attestation == 1) {
                that.isok = true
              }
            } else {
              Toast('商户信息获取失败，请刷新页面')
            }
          } else {
            Toast('商户信息获取失败')
          }
        }).catch(function (err) {

        })

      }

    },
    updated() {

    },
    activated() {

    },
    components: {
      'travel-tab': TravelTab
    }
  }
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    position: relative;
    ul {
      a {
        padding: 0 0.75rem;
        font-size: 0.75rem;
        color: #333;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #f5f5f5;
        background: #fff;
        height: 2.5rem;
        line-height: 2.5rem;
        span {
          display: flex;
          height: 100%;
          align-items: center;
        }
        i {
          width: 1rem;
          height: 100%;
          display: flex;
          display: inline-block;
          margin-right: 0.75rem;
        }
        .recode {
          background-image: url("../../assets/images/travel/collectionrecord.png");
          -webkit-background-size: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
        .refund {
          background-image: url("../../assets/images/travel/refund.png");
          -webkit-background-size: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
        .yaoqing{
          background-image: url("../../assets/images/travel/yaoqing.png");
          -webkit-background-size: 100%;
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }
        b {
          color: #dedede;
        }
      }
      li:last-child {
        border-bottom: none;
      }
    }
    .out_box {
      position: absolute;
      bottom: 2.5rem;
      left: 0;
      padding: 0.75rem 2.25rem;
      width: 100%;
      button {
        width: 100%;
        /*background: #ebbd6d;*/
        line-height: 2.25rem;
        border: none;
        color: #fff;
        font-size: 0.8rem;
        background: linear-gradient(#f0c47d, #e3b151);
        background: -moz-linear-gradient(#f0c47d, #e3b151);
        background: -webkit-linear-gradient(#f0c47d, #e3b151); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#f0c47d, #e3b151); /* Opera 11.1 - 12.0 */
        outline: none;
      }
    }
  }

</style>
