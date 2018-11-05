<template>
  <div id="mobile">
    <h5><span><b >手机充值</b></span><b><a href="#/inform">温馨提示</a></b></h5>
    <div class="title">
      <div>
        <span>手机号码：</span>
        <p><input type="tel" v-model="mobile" @keyup="mobilenumber"/></p><b v-show="carrier"><i
        class="iconfont icon-xuanzhong"></i>{{carrier}}</b>
      </div>
      <div>
        <span>确认号码：</span>
        <p><input v-model="mobiletow" @keyup="againnum" type="tel"/></p>
      </div>
    </div>
    <p class="miane"><a :class="type=='phoneCharge'? 'active':''" @click="changeType('phoneCharge')">话费充值</a>
      <!--<a :class="type=='GPRS'? 'active':''" @click="changeType('GPRS')">流量充值</a>--></p>

    <div v-if="isshow">
      <flux ref="fl" :combo="combo" :vaildproduct="vaildproduct" :changeflow="changeflow" :type='type' :size='size'  :choseFlow="choseFlow " :money="money"></flux>
    </div>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import Flux from "./Flux.vue";
import Telephone from "./Telephone.vue";
import { Toast } from "mint-ui";
import axios from "axios";
import qs from "qs";
import jsonp from "jsonp";
import { MessageBox } from "mint-ui";

const Phone = {
  name: "Phone",
  data() {
    return {
      mobile: "",
      mobiletow: "",
      carrier: "",
      combo: [],
      choseFlow: "",
      money: "",
      type: "",
      size: [],
      isshow:false
    };
  },
  methods: {
    changeType(str) {
      if (this.combo.length || this.size.length) {
          if (str == "GPRS" && !(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(this.mobile))) {
            Toast('请输入手机号获取查询可用套餐')
            this.combo = [];
            this.size = []
            return
          }
          this.type = str;
          this.choseFlow = 0;
          this.money = 0;
          this.getcombo();
          this.$refs.fl.init();
      }
    },
    mobilenumber() {
      var that = this;
      that.carrier = "";
      if (this.mobile.length == 11) {
        if (/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.mobile)) {
          var url =
            "https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=" +
            this.mobile;
          jsonp(url, function callback(err, data) {
            that.carrier = data.carrier;
            that.getcombo();
          });
        } else {
          that.combo=[];
          that.size=[]
          Toast("手机号码格式不正确");
        }
      }else{
        that.isshow=false
        that.combo=[];
        that.size=[]
      }
    },
    againnum(){
  //     if(this.mobiletow.leng==11){
  //       if(this.mobiletow!=this.mobile){
  // Toast("手机号码不一致");
  //       }
  //     }
    },
    changeflow(item) {
      if (this.type == "GPRS") {
        this.choseFlow = item.flowvalue;
        this.money = item.frontPrice;
      } else {
        this.choseFlow = item.faceValue;
        this.money = item.money;
      }
    },
    getcombo() {
      var that = this;
      var token = localStorage.getItem("token");
      if (!token) {
        MessageBox.confirm("请你先登录").then(
          action => {
            window.location.href = "#/login";
          },
          action => {
            return;
          }
        );
      }
      if (this.type == "GPRS") {
        axios
          .post(
            BASE_URL + "/index.php?r=flow/getProduct",
            qs.stringify({
              phone: that.mobile,
              token: token
            })
          )
          .then(function(res) {
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            that.combo = a.data.product;
             that.isshow=true
          })
          .catch(function(err) {});
      } else {
        axios
          .post(
            BASE_URL + "/index.php?r=phone/index",
            qs.stringify({
              phone: that.mobile,
              token: token
            })
          )
          .then(function(res) {
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            that.size = a.data;
            that.isshow=true
            that.type='phoneCharge'
          })
          .catch(function(err) {});
      }
    },
    vaildproduct() {
      var that = this;
      var token = localStorage.getItem("token");
      if (this.mobiletow == this.mobile) {
        if (this.type == "GPRS") {
          axios
            .post(
              BASE_URL + "/index.php?r=flow/vaildproduct",
              qs.stringify({
                phone: this.mobile,
                token: token,
                flow: this.choseFlow
              })
            )
            .then(function(res) {
              var a = Base64.decode(res.data);
              a = JSON.parse(a);
              if (a.code == 1009) {
                that.gopay();
              } else {
                Toast(a.info);
              }
            })
            .catch(function(err) {});
        } else {
          axios
            .post(
              BASE_URL + "/index.php?r=phone/searchAvaildProduct",
              qs.stringify({
                phone: this.mobile,
                token: token,
                faceValue: this.choseFlow
              })
            )
            .then(function(res) {
              var a = Base64.decode(res.data);
              a = JSON.parse(a);
              if (a.code == 1000) {
                that.gopay();
              } else {
                Toast(a.info);
              }
            })
            .catch(function(err) {});
        }
      } else {
        Toast("手机号码不一致");
      }
    },
    gopay() {
      var token = localStorage.getItem("token");
      var that = this;
      if (this.type == "GPRS") {
        axios
          .post(
            BASE_URL + "/index.php?r=flow/order",
            qs.stringify({
              phone: this.mobile,
              conPhone: this.mobiletow,
              token: token,
              money: this.money,
              choseFlow: this.choseFlow
            })
          )
          .then(function(res) {
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            if (a.code == 1000) {
              window.location.href = "#/pay/" + a.data.orderId;
            } else {
              Toast(a.info);
            }
          })
          .catch(function(err) {});
      } else {
        axios
          .post(
            BASE_URL + "/index.php?r=phone/phoneOrder",
            qs.stringify({
              phone: this.mobile,
              conPhone: this.mobiletow,
              token: token,
              money: this.money,
              faceValue: this.choseFlow
            })
          )
          .then(function(res) {
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            if (a.code == 1000) {
              window.location.href = "#/pay/" + a.orderId;
            } else {
              Toast(a.info);
            }
          })
          .catch(function(err) {});
      }
    }
  },
  mounted() {
    document.title='手机充值'
    Toast('请先输入手机号获取套餐')
  },
  updated() {},
  activated() {},
  components: {
    flux: Flux
  }
};

export default Phone;
</script>

<style scoped lang="scss">
#mobile {
  h5 {
    display: flex;
    justify-content: space-between;
    padding: 0 0.75rem;
    line-height: 2.25rem;
    font-weight: normal;
    span {
      color: #333;
      font-size: 0.7rem;
    }
    b a {
      font-weight: normal;
      color: #ff3737;
      font-size: 0.7rem;
    }
  }
  .title {
    background: #fff;
    padding: 0 0.75rem;
    div {
      display: flex;
      justify-content: space-between;
      font-size: 0.65rem;
      color: #999;
      line-height: 2.25rem;
      border-bottom: 1px solid #eee;

      p {
        flex: 1;
        input {
          width: 100%;
          color: #333;
          border: none;
        }
      }
      b {
        color: #333;
        i {
          color: #16c460;
        }
      }
    }
  }
  .miane {
    color: #999;
    font-size: 0.65rem;
    display: flex;
    justify-content: space-around;
    background: #fff;
    a {
      flex: 1;
      text-align: center;
      line-height: 2rem;
      border: 1px solid #f5f5f5;
      border-top: none;
    }
    .active {
      color: #ff3535;
    }
  }
}
</style>
