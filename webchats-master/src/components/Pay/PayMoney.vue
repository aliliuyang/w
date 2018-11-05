<template>
  <div id="pay-money">
    <pay-list :order=order></pay-list>
    <div class="container">
      <!--中欣卡-->
      <div class="zhongxincard" v-if='payway=="joisetcard"'>
        <p><span>中欣卡号：</span><input v-model="cardNo" type="text" placeholder="请输入你的卡号"/></p>
        <div v-if="showisactive">
          <p><span>手机号码：</span><input v-model="phone" type="text" placeholder="手机号码"/></p>
          <p><span>激活码：</span><input v-model="activcode" type="text" placeholder="激活码"/></p>
          <p><span>身份证号：</span><input v-model="personid" type="text" placeholder="身份证号"/></p>
        </div>
        <p><span>验证码：</span><input v-model="phoneCode" type="text" placeholder="请输入验证码"/>
          <button @click="getcode">{{time}}</button>
        </p>
      </div>
      <!--余额-->
      <div class="yve" v-else>
        <div class="pay-way">
          <p><b><img src="../../assets/images/yve.png"/></b>账户余额&nbsp<span>¥&nbsp<b>{{mymoney}}</b></span></p><a
          href="#/recharge">充值</a>
        </div>
        <div class="paycode">
          <p>支付验证码：</p><input v-model="phoneCode" type="text" placeholder="请输入短信验证码"/>
          <button @click="getcode">{{time}}</button>
        </div>
      </div>
    </div>
    <div class="happy">
      <a @click="payorder">确定支付</a>
    </div>

  </div>
</template>

<script>
  import {MessageBox, Toast} from 'mint-ui';
  import PayList from './PayList'
  import axios from 'axios';
  import qs from 'qs';

  const PayMoney = {
    name: 'PayMoney',
    data() {
      return {
        payway: '',
        payway_cn: '',
        mymoney: '',
        time: '获取验证码',
        orderid: '',
        order: {},
        phoneCode: '',
        orderMoney: '1',
        cardNo: '',
        phone: "",
        activcode: '',
        personid: '',
        showisactive: false,
        active: 1,
        pay: {phonecode: '', rechargeCode: ''},
        wxpaycode: '',
        token: "",
        statistics: {orderId: '', orderTotal: '', item: []}
      }
    },
    computed: {
      money_cn() {
        if (this.payway == 'andwx') {
          return this.mymoney
        } else {
          return this.order.orderMoney
        }
      }
    },
    methods: {
      getYue() {
        var that = this
        axios.post(BASE_URL + '/index.php?r=site/userinfo', qs.stringify({
          token: this.token
        })).then(function (data) {
          var a = JSON.parse(Base64.decode(data.data))
          if (a.data.err == 10002) {
            that.mymoney = a.data.allMoney;
          }
        }).catch(function (err) {

        })
      },
      getcode() {
        var that = this
        if (this.time <= 60) {
          return
        } else {
          if (this.payway == "joisetcard") {
            //中欣卡支付
            if (this.active == 1) {
              axios.post(BASE_URL + '/index.php?r=weiXinPay/zxkSend', qs.stringify({
                cardNo: this.cardNo,
                orderId: this.orderid,
                class: '2',
                payMethod: '2',
                token: this.token,
                rechargeMoney: Number(this.order.orderMoney).toFixed(2)
              })).then(function (res) {
                var a = Base64.decode(res.data)
                a = JSON.parse(a)
                if (a.code == "1000") {
                  Toast(a.info);
                  that.pay.phonecode = a.data.phonecode;
                  that.pay.rechargeCode = a.data.rechargeCode
                  that.counttime()
                } else {
                  Toast(a.info)
                  if (a.code == "1012") {
                    MessageBox({
                      title: '提示',
                      message: '卡未激活，请填写信息激活支付',
                    })
                    that.active = 2
                    that.showisactive = true
                  }
                }
              }).catch(function (err) {

              });
            } else {
              var cardNum = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
              if (!(cardNum.test(this.personid))) {
                Toast("请填写正确身份证号")
                return false
              }
              if (!(/^1[34578]\d{9}$/.test(this.phone))) {
                Toast("请填写正确手机号")
                return false
              }
              axios.post(BASE_URL + '/index.php?r=weiXinPay/zxkSend', qs.stringify({
                cardNo: this.cardNo,
                orderId: this.orderid,
                class: '2',
                payMethod: '2',
                phone: this.phone,
                activcode: this.activcode,
                personid: this.personid,
                rechargeMoney: Number(this.order.orderMoney).toFixed(2),
                token: this.token
              })).then(function (res) {
                var a = Base64.decode(res.data)
                a = JSON.parse(a)
                if (a.code == "1000") {
                  that.counttime()
                  that.pay.phonecode = a.data.phonecode;
                  that.pay.rechargeCode = a.data.rechargeCode
                  Toast(a.info);
                } else {
                  Toast(a.info)
                }
              }).catch(function (err) {

              });
            }
          }
          if (this.payway == 'remainingSum') {
            if (this.mymoney > 0) {
              axios.post(BASE_URL + '/index.php?r=weiXinPay/send', qs.stringify({
                orderId: this.orederid,
                payMoney: Number(this.order.orderMoney).toFixed(2),
                token: this.token
              })).then(function (res) {
                var a = Base64.decode(res.data)
                a = JSON.parse(a)
                Toast(a.msg)
                if (a.err == "1000") {
                  that.counttime()
                } else {
                  if (a.err == "1003") {

                  }
                }

              }).catch(function (err) {

              });
            } else {
              Toast("您的余额不足，请更换支付方式")
            }

          }
          //and微信
          if (this.payway == 'andwx') {
            if (this.mymoney > 0) {
              axios.post(BASE_URL + '/index.php?r=weiXinPay/send', qs.stringify({
                orderId: this.orederid,
                payMoney: Number(this.mymoney).toFixed(2),
                token: this.token
              })).then(function (res) {
                var a = Base64.decode(res.data)
                a = JSON.parse(a)
                Toast(a.msg)
                if (a.err == "1000") {
                  that.counttime()
                } else {
                  if (a.err == "1003") {

                  }
                }

              }).catch(function (err) {

              });
            } else {
              Toast("您的余额不足，请更换支付方式")
            }
          }

        }
      },
      counttime() {
        var that = this
        that.time = 60;
        var timer = setInterval(function () {
          that.time--
          if (that.time == 1) {
            that.time = "获取验证码"
            clearTimeout(timer)
          }
        }, 1000)
      },
      payorder() {
        var that = this
        var payMethod = ''
        if (this.phoneCode) {
          if (this.payway == "joisetcard") {
            if (this.active == 1) {
              axios.post(BASE_URL + '/index.php?r=weiXinPay/actualPay', qs.stringify({
                cardNo: this.cardNo,
                orderId: this.orderid,
                payMoney: Number(this.order.orderMoney).toFixed(2),
                payMethod: "2",
                msgCode: this.phoneCode,
                phonecode: this.pay.phonecode,
                rechargeCode: this.pay.rechargeCode,
                isactive: this.active,
                token: this.token
              })).then(function (res) {
                var a = Base64.decode(res.data)
                a = JSON.parse(a)
                Toast(a.info)
                if (a.code == 1000) {
                  // _hmt.push(['_trackOrder', that.statistics]);
                  window.location.href = '#/succeedpay/' + that.orderid
                }

              }).catch(function (err) {

              });
            } else {
              var cardNum = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
              if (!(cardNum.test(this.personid))) {
                Toast("请填写正确身份证号")
                return false
              }
              if (!(/^1[34578]\d{9}$/.test(this.phone))) {
                Toast("请填写正确手机号")
                return false
              }
              axios.post(BASE_URL + '/index.php?r=weiXinPay/actualPay', qs.stringify({
                cardNo: this.cardNo,
                orderId: this.orderid,
                payMoney: Number(this.order.orderMoney).toFixed(2),
                payMethod: "2",
                msgCode: this.phoneCode,
                phone: this.phone,
                activcode: this.activcode,
                personid: this.personid,
                phonecode: this.pay.phonecode,
                rechargeCode: this.pay.rechargeCode,
                isactive: this.active,
                token: this.token
              })).then(function (res) {
                var a = Base64.decode(res.data)
                a = JSON.parse(a)
                Toast(a.info)
                if (a.code == 1000) {
                  // _hmt.push(['_trackOrder', that.statistics]);
                  window.location.href = '#/succeedpay/' + that.orderid
                }
              }).catch(function (err) {

              });
            }
          }
          if (this.payway == "remainingSum") {
            payMethod = 1;
            axios.post(BASE_URL + '/index.php?r=weiXinPay/actualPay', qs.stringify({
              orderId: this.orderid,
              payMoney: Number(this.order.orderMoney).toFixed(2),
              payMethod: "1",
              verifycode: this.phoneCode,
              token: this.token
            })).then(function (res) {
              var a = Base64.decode(res.data)
              a = JSON.parse(a)
              Toast(a.info)
              if (a.code == 1000) {
                // _hmt.push(['_trackOrder', that.statistics]);
                window.location.href = '#/succeedpay/' + that.orderid
              }

            }).catch(function (err) {

            });
          }
          if (this.payway == "andwx") {
            payMethod = 7
            var that = this
            var myopenid = localStorage.getItem("openid");
            axios.post(BASE_URL + '/index.php?r=weiXinPay/actualPay', qs.stringify({
              orderId: this.orderid,
              payMoney: Number(this.mymoney).toFixed(2),
              payMethod: "7",
              from: "1",
              body: this.orderid,
              fee: this.order.orderMoney,
              verifycode: this.phoneCode,
              openid: myopenid,
              token: this.token
            })).then(function (res) {
              var a = Base64.decode(res.data)
              a = JSON.parse(a)
              Toast(a.info)
              if (a.code == 2001) {
                // _hmt.push(['_trackOrder', that.statistics]);
                window.location.href = '#/succeedpay/' + that.orderid
              }
            }).catch(function (err) {

            });
          }


        } else {
          Toast('验证码不正确');
        }

      },
      directRightUrl() {
        let paths = window.location.href.split('#')
        paths[1] = paths[1] || '/'
        // 老式的#!分隔跳转
        if (paths[0].charAt(paths[0].length - 1) !== '?') {
          paths[0] = `${paths[0]}?`
        }
        if (paths[1].charAt(0) === '!') {
          paths[1] = paths[1].substr(1)
        }
        let url = `${paths[0]}#${paths[1]}`
        if (window.location.href !== url) {
          window.location.href = url
        }
      },
    },
    mounted() {
      this.isgologin()
      var that = this
      this.token = localStorage.getItem("token");
      this.directRightUrl()
      this.payway = this.$route.params.way;
      this.orderid = this.$route.params.orderid;
      this.getYue()
      axios.post(BASE_URL + '/index.php?r=order/view', qs.stringify({
        oid: Base64.encode(this.orderid),
        ischild: Base64.encode("0"),
        token: this.token
      })).then(function (res) {
        var a = Base64.decode(res.data)
        a = JSON.parse(a)
        that.order = a.data.order
        that.statistics.orderId = that.order.id;
        that.statistics.orderTotal = that.order.orderMoney;
        for (var k = 0; k < that.order.childgoods.length; k++) {
          var obj = {};
          obj.skuId = that.order.childgoods[i].cpsgoodsid;
          obj.skuName = that.order.childgoods[i].goodstitle;
          obj.category = that.order.childgoods[i].category;
          obj.Quantity = that.order.childgoods[i].count;
          obj.Price = that.order.childgoods[i].money;
          that.statistics.item.push(obj)
        }

      }).catch(function (err) {

      })


    },
    updated() {


    },
    activated() {

    },
    components: {
      'pay-list': PayList,
    }
  }
  export default PayMoney
</script>

<style lang="scss">
  #pay-money {
    .container {
      padding-top: 0.5rem;
      .yve {
        background: #fff;
        padding-left: 0.75rem;
        .pay-way {
          padding-right: 0.75rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.65rem;
          color: #333;
          line-height: 3rem;
          border-bottom: 1px solid #eee;
          b {
            img {
              width: 1.5rem;
              margin-right: 0.4rem;
            }

          }
          span {
            color: #FF3737;
          }
          a {
            color: #FF3737;
            display: inline-block;
            border: 1px solid #FF3737;
            line-height: 1.075rem;
            padding: 0 0.6rem;
            border-radius: 4px;

          }
        }
        .paycode {
          padding-right: 0.75rem;
          display: flex;
          justify-content: space-between;
          font-size: 0.60rem;
          align-items: center;
          p {
            line-height: 3rem;
          }
          input {
            flex: 1;
            border: none;
            border-bottom: 1px solid #eee;
            padding-left: 0.5rem;
            margin-right: 0.5rem;
          }
          button {
            width: 3.88rem;
            height: 1.4rem;
            background: #fff;
            border: 1px solid #FF3737;
            color: #ff3737;
            border-radius: 4px;
          }

        }
      }
      .zhongxincard {
        background: #fff;
        padding-left: 0.75rem;
        p {
          padding-right: 0.75rem;
          font-size: 0.65rem;
          color: #333;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            line-height: 2.25rem;
          }
          button {
            width: 3.88rem;
            height: 1.4rem;
            background: #fff;
            border: 1px solid #FF3737;
            color: #ff3737;
            border-radius: 4px;
            margin-left: 0.5rem;
          }
          input {
            flex: 1;
            border: none;
            border-bottom: 1px solid #eee;
            padding-left: 0.5rem;
            height: 1.2rem;
            line-height: 1rem
          }
        }
      }

    }

    .happy {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2.25rem;
      a {
        display: block;
        width: 100%;
        height: 2.25rem;
        background: #FF3737;
        color: #fff;
        text-align: center;
        line-height: 2.25rem;
        font-size: 0.75rem;
      }
    }
  }

  .mint-msgbox {
    border-radius: 8px;
  }

</style>
