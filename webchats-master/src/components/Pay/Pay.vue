<template>
  <div id="pay">
    <pay-list :order=order :needpaymoney="needpaymoney"></pay-list>
    <h5>选择支付方式 <span v-show="'ZXcard'==payway">(支持多张中欣卡支付)</span></h5>
    <div class="selectpay">
        <div class="waylist "  @click="changeway('yve')" :class="payway=='yve'? 'active':''">
          <b>
            <img v-if="payway=='yve'" src="../../assets/images/yveT.png"/>
            <img v-if="payway!='yve'" src="../../assets/images/noyve.png"/>
          </b>
            <p>中欣通</p></div>
        <div class="waylist" @click="changeway('ZXcard')" :class="payway=='ZXcard'? 'active':''">
          <b>
            <img  v-if="payway!='ZXcard'" src="../../assets/images/actCard.png" alt="">
            <img v-if="payway=='ZXcard'" src="../../assets/images/noCard.png" alt="">
          </b>
          <p>中欣卡</p></div>
        <div class="waylist" @click="changeway('wx')" :class="payway=='wx'? 'active':''">
          <b><img  v-if="payway!='wx'" src="../../assets/images/WX.png"/>
            <img v-if="payway=='wx'" src="../../assets/images/noWX.png" alt="">
            </b>
          <p>微信支付</p></div>
    </div>
    <div class="card-tit" v-if="payway=='ZXcard'" >
        <p ><b>支付金额：</b><input v-model="cardpayNum" type="tel" placeholder="请输入支付金额"></p>
        <p ><b>中欣卡号：</b><input v-model="cardpayNo" type="tel" placeholder="请输入中欣卡号"></p>
       <div v-if="showisactive">
          <p><b>手机号码：</b><input v-model="phone"  type="tel" placeholder="手机号码"/></p>
          <p><b>激活码：</b><input  v-model="activcode" type="tel" placeholder="激活码"/></p>
          <p><b>身份证号：</b><input v-model="personid"  type="tel" placeholder="身份证号"/></p>
        </div>
        <p ><b>验证码：</b><input v-model="msgCode" type="tel" placeholder="请输入短信验证码"><button @click="getCardCode">{{cardTime}}</button></p>
    </div>
    <div class="card-tit"  v-if="payway=='yve'">
      <p><b>当前余额：</b><i v-text="mymoney"></i><a class="gorechange" href="#/recharge">充值</a></p>
      <p><b>本次支付金额：</b><i v-text="mymoney-needpaymoney>0? needpaymoney:mymoney"></i></p>
      <p><b>验证码：</b><input v-model="yvecode" type="tel" placeholder="请输入短信验证码"><button @click="getyveCode">{{yvetime}}</button></p>
    </div>
    <div class="hint"><a href="https://mp.weixin.qq.com/s/H1qnJoeGaS1p8ogERMepCg">支付说明 <i class="iconfont icon-iconfontquestion"></i></a></div>
    <div class="infobox" v-if="showpart">

    </div>
    <div class="partPay" v-if="showpart">
      <div class="payTit">
        <div class="pic"></div>
        <p class="paytit">已支付<i>{{payedMoney.payed}}</i>元 还需支付<i>{{payedMoney.nextneed}}</i>元</p>
        <button @click="backPay" class="backpay">继续支付</button>
      </div>
    </div>
    <div class="bottom"></div>
    <a class="paygo" @click="paymoney">确定</a>
  </div>
</template>
<script>
  import { Radio } from 'mint-ui';
  import PayList from './PayList';
  import wx from 'weixin-js-sdk'
  import axios from 'axios';
  import qs from 'qs';
  import { MessageBox } from 'mint-ui';
  import { Indicator,Toast } from "mint-ui";

  export default{
    name: 'Pay',
    data () {
      return {
        payway:'yve',
        openid:'',
        orderid:'',
        order:{},
        orderMoney:'',////////////
        mymoney:"",
        needpaymoney:'',
        cardpayNo:'',
        cardpayNum:'',
        active:'1',
        showisactive: false,
        cardTime:'获取验证码',
        msgCode:'',
        pay: {phonecode: '', rechargeCode: ''},
        //未激活参数
        phone:'',
        activcode:'',
        personid:'',
        token:'',
        showpart:false,
        yvecode:'',
        yvetime:'获取验证码',
        payedMoney:{payed:'',nextneed:''},
        isuseZXT:true
      }
    },

    methods:{
      changeway(way){
        if(this.order.status==40){
          if(this.isuseZXT&&way=='ZXcard'){
            Toast('请用其他方式支付剩余金额')
            return
          }
          if(!this.isuseZXT&&way=='yve'){
            Toast('请用其他方式支付剩余金额')
            return
          }
          this.payway=way
        }else{
          if (way=='yve'||way=='wx'){
            this.needpaymoney=this.order.zxtmoney
          }
          if (way=='ZXcard'){
            this.needpaymoney=this.order.orderMoney
          }
          this.payway=way
        }
      },
      getyveCode(){
        var that = this
        if (this.yvetime <= 60) {
          return
        } else {
          if (this.mymoney > 0) {
            Indicator.open()
            axios.post(BASE_URL + '/index.php?r=weiXinPay/send', qs.stringify({
              orderId: this.orderid,
              payMoney: this.mymoney-this.needpaymoney>0? this.needpaymoney:this.mymoney,
              token: this.token
            })).then(function (res) {
              Indicator.close()
              var a = Base64.decode(res.data)
              a = JSON.parse(a)
              Toast(a.msg)
              if (a.err == "1000") {
                that.yvetime=60
                var timer = setInterval(function () {
                  that.yvetime--
                  if ( that.yvetime == 1) {
                    that.yvetime = "获取验证码"
                    clearTimeout(timer)
                  }
                }, 1000)
              }
            }).catch(function (err) {
              Indicator.close()
            });

          } else {
            Toast("您的余额不足，请更换支付方式")
          }
        }
      },
      getCardCode(){
        var that = this
        if (this.cardTime < 0) {
          retutn
        }
        if(!this.cardpayNo){
            Toast('请输入正确卡号')
            return
        }
        if(this.cardpayNum){
            if(this.active == 1){
              Indicator.open()
              axios.post(BASE_URL + '/index.php?r=weiXinPay/zxkSend', qs.stringify({
                orderId: this.orderid,
                cardNo:this.cardpayNo,
                class:'2',
                payMethod: '2',
                token: this.token,
                rechargeMoney:this.cardpayNum
              })).then(function (res) {
                Indicator.close()
                var a = Base64.decode(res.data)
                a = JSON.parse(a)
                Toast(a.info);
                if (a.code == "1000") {
                  that.pay.phonecode = a.data.phonecode;
                  that.pay.rechargeCode = a.data.rechargeCode
                  that.cardTime=60
                  var timer = setInterval(function () {
                    that.cardTime--
                    if ( that.cardTime == 1) {
                      that.cardTime = "获取验证码"
                      clearTimeout(timer)
                    }
                  }, 1000)
                }else {
                  Toast(a.info)
                  if (a.code == "1012") {
                    MessageBox({
                      title: '提示',
                      message: '尚未激活</br>请完善信息  激活并支付',
                    })
                    that.active = 2
                    that.showisactive = true
                  }
                }
              }).catch(function (err) {
                Indicator.close()
              });
            }else{
              //卡未激活
              var cardNum = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
              if (!(cardNum.test(this.personid))) {
                Toast("请填写正确身份证号")
                return false
              }
              if (!(/^1[34578]\d{9}$/.test(this.phone))) {
                Toast("请填写正确手机号")
                return false
              }
              Indicator.open()
              axios.post(BASE_URL + '/index.php?r=weiXinPay/zxkSend', qs.stringify({
                cardNo: this.cardpayNo,
                orderId: this.orderid,
                class: '2',
                payMethod: '2',
                phone: this.phone,
                activcode: this.activcode,
                personid: this.personid,
                rechargeMoney:this.cardpayNum,
                token: this.token
              })).then(function (res) {
                Indicator.close()
                var a = Base64.decode(res.data)
                a = JSON.parse(a)

                if (a.code == "1000") {
                  that.cardTime=60
                  var timer = setInterval(function () {
                    that.cardTime--
                    if ( that.cardTime == 1) {
                      that.cardTime = "获取验证码"
                      clearTimeout(timer)
                    }
                  }, 1000)
                  that.pay.phonecode = a.data.phonecode;
                  that.pay.rechargeCode = a.data.rechargeCode
                  Toast(a.info);
                } else {
                  Toast(a.info)
                }
              }).catch(function (err) {
                Indicator.close()
              });
            }

        }else {
          Toast('请输入支付金额')
        }
      },
      paymoney(){
        var that= this
        this.orderid=this.$route.params.orderid
        //微信支付
        if(this.payway=='wx'){
          axios.post(BASE_URL+'/index.php?r=weiXinPay/actualPay',qs.stringify({
            orderId:this.orderid,
            payMethod:'8',
            from:'1',
            openid:this.openid,
            payMoney:this.needpaymoney,
            body:this.orderid,
            fee:this.order.orderMoney,
            token:this.token
          })).then(function(res){
            var a=JSON.parse(Base64.decode(res.data))
            if(a.code==1000){
              if(a.data.err==10002){
                var b=JSON.parse(a.data.data)
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest',b,
                  function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                      window.location.href='#/succeedpay/'+that.orderid
                    }
                  });
               }else {
                  Toast(a.data.msg)
              }
            }else{
              Toast(a.info)
            }
          }).catch(function(err){

          });
        }else{
          //余额支付
          if(this.payway=='yve'){
            if(!this.yvecode){
              Toast('请输入验证码')
              return false
            }
            if(this.mymoney==0){
              Toast('您的余额不足，请更换支付方式')
              return false
            }
            Indicator.open()
            axios.post(BASE_URL + '/index.php?r=weiXinPay/actualPay', qs.stringify({
                orderId : this.orderid,
                payMoney : this.mymoney - this.needpaymoney> 0 ? this.needpaymoney : this.mymoney,
                payMethod : '1',
                verifycode : this.yvecode,
                token : this.token
            })).then(function (res) {
              Indicator.close()
              var a = Base64.decode(res.data)
              a = JSON.parse(a)
              Toast(a.info)
              if (a.code == 2000) {
                window.location.href = '#/succeedpay/' + that.orderid
              }else{
                if(a.code == 2001){
                  that.showpart=true
                  that.payedMoney.payed=a.data.hasMoney
                  that.payedMoney.nextneed=a.data.money
                }
              }
            }).catch(function (err) {
              Indicator.close()
            });
          }

          //中欣卡支付
          if(this.payway=='ZXcard'){
            if (!this.cardpayNo) {
              Toast("请填写中欣卡卡号")
              return false
            }
            if (!this.cardpayNum||this.cardpayNum<0) {
              Toast("请输入正确支付金额")
              return false
            }
            if (!this.msgCode) {
              Toast("请输入短信验证码")
              return false
            }
            if (this.active == 1) {
              Indicator.open()
              axios.post(BASE_URL + '/index.php?r=weiXinPay/actualPay', qs.stringify({
                cardNo: this.cardpayNo,
                orderId: this.orderid,
                payMoney: this.cardpayNum,
                payMethod: "2",
                msgCode: this.msgCode,
                phonecode: this.pay.phonecode,
                rechargeCode: this.pay.rechargeCode,
                isactive: this.active,
                token: this.token
              })).then(function (res) {
                Indicator.close()
                var a = Base64.decode(res.data)
                a = JSON.parse(a)
                Toast(a.info)
                if (a.code == 2000) {
                  window.location.href = '#/succeedpay/' + that.orderid
                }else {
                  if (a.code == 2001) {
                    that.showpart = true
                    that.payedMoney.payed=a.data.hasMoney
                    that.payedMoney.nextneed=a.data.money
                  }
                }
              }).catch(function (err) {
                Indicator.close()
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
              if (!this.activcode) {
                Toast("请输入激活码")
                return false
              }
              Indicator.open()
              axios.post(BASE_URL + '/index.php?r=weiXinPay/actualPay', qs.stringify({
                cardNo: this.cardpayNo,
                orderId: this.orderid,
                payMoney: this.cardpayNum,
                payMethod: "2",
                msgCode: this.msgCode,
                phone: this.phone,
                activcode: this.activcode,
                personid: this.personid,
                phonecode: this.pay.phonecode,
                rechargeCode: this.pay.rechargeCode,
                isactive: this.active,
                token: this.token
              })).then(function (res) {
                Indicator.close()
                var a = Base64.decode(res.data)
                a = JSON.parse(a)
                Toast(a.info)
                if (a.code == 2000) {
                  window.location.href = '#/succeedpay/' + that.orderid
                }else {
                  if (a.code == 2001) {
                    that.showpart = true
                    that.payedMoney.payed=a.data.hasMoney
                    that.payedMoney.nextneed=a.data.money
                  }
                }
              }).catch(function (err) {
                Indicator.close()
              });
            }
          }
        }
      },
      directRightUrl () {
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
      getorder(){
        Indicator.open()
        var that=this
        axios.post(BASE_URL+'/index.php?r=order/view',qs.stringify({
          oid:Base64.encode(this.orderid),
          ischild:Base64.encode("0"),
          token:this.token
        })).then(function(res){
          Indicator.close()
          var a =Base64.decode(res.data)
          a=JSON.parse(a)
          that.order=a.data.order
          if(a.data.order.status==40||a.data.order.status==1){
            if(a.data.order.status==40){
              that.isuseZXT=that.order.hasZxk
              if(that.isuseZXT){
                that.needpaymoney=(that.order.zxtmoney*100-that.order.orderPayed*100)/100
              }else{
                that.needpaymoney=(that.order.orderMoney*100-that.order.orderPayed*100)/100
                that.cardpayNum= that.needpaymoney
                that.payway='ZXcard'
              }
            }else{
              that.needpaymoney=that.order.zxtmoney
              that.cardpayNum= that.order.orderMoney
            }
          }else{
            Toast('该订单已支付完成')
            window.location.href="#/order/all"
          }
        }).catch(function(err){
          Indicator.close()
        })
      },
      getYue(){
        Indicator.open()
        var that= this
        axios.post(BASE_URL +'/index.php?r=site/userinfo',qs.stringify({
          token:this.token
        })).then(function(data){
          Indicator.close()
          var a = JSON.parse(Base64.decode(data.data))
          if(a.data.err==10002){
            that.mymoney=a.data.allMoney;
          }
        }).catch(function(err){
          Indicator.close()
        })
      },
      getwxStr(){
        var that=this
        var wxpaycode=''
        var remainordermoney=this.order.orderMoney-this.order.orderPayed
        var myopenid=localStorage.getItem("openid");
        axios.post(BASE_URL+'/index.php?r=weiXinPay/actualPay',qs.stringify({
          orderId:this.orderid,
          payMoney:Number(remainordermoney).toFixed(2),
          payMethod:"7",
          from:"1",
          body:this.orderid,
          fee:remainordermoney,
          openid:myopenid
        })).then(function(res){
          var a=Base64.decode(res.data)
          a=JSON.parse(a)
          wxpaycode=JSON.parse(a.data.data)
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest',wxpaycode,
            function(res){
              if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                window.location.href="#/succeedpay/"+that.orderid
              }
            }
          )
        }).catch(function(err){

        });
      },
      backPay(){
        window.location.reload()
      }

    },
    mounted(){
      this.isgologin()
      Indicator.open()
      var that =this
      this.token = localStorage.getItem("token");
      document.title = '订单支付'
      this. directRightUrl ()
      var url=window.location.href
      var myopenid=localStorage.getItem("openid");

      this.orderid=this.$route.params.orderid
      if(!myopenid){
        if(url.indexOf('openid=')=='-1'){
          var myurl= Base64.encode(url)
          var gohref=encodeURIComponent(BASE_URL+"/index.php?r=weiXinPay/getOP&vueUrl="+myurl+'&token='+this.token)
       window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd11d5e7feb979553&redirect_uri='+gohref+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'; //正式appid
          // window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb68ed0995576d589&redirect_uri='+gohref+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';	//测试  appid
        }else{
          this.openid=url.split("openid=")[1];
          localStorage.setItem("openid",this.openid);
        }
      }else{
        this.openid=localStorage.getItem("openid")
//	  			localStorage.removeItem('openid');
      }
      Indicator.close()
      this.getorder()
      this.getYue()
    },
    updated(){
    },
    activated(){
    },
    components:{
      'pay-list':PayList
    }
  }

</script>
<style scoped lang="scss">
  #pay {
    h5 {
      margin-top: 0.75rem;
      color: #333;
      line-height: 2.25rem;
      padding-left: 0.75rem;
      background: #fff;
      font-weight: normal;
      font-size: 0.65rem;
      color: #666;
    }
    .selectpay {
      padding: 0.5rem 0.37rem;
      background: #FFf;
      font-size: 0.75rem;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-around;
      .waylist {
        padding: 0.5rem;
        display: flex;
        margin: 0 0.37rem;
        flex: 1;
        border: 1px solid #eee;
        border-radius: 4px;
        font-size: 0.52px;
        align-items: center;
        flex-direction: column;
        b {
          img{
            height: 1.2rem;
          }
        }
        p{
          padding-top: 3px;
         font-size: 0.6rem;
        }
      }
      .active{
        border: 1px solid #ff3737;
        background: #ff3737;
        color: #fff;
      }
    }
    .card-tit{
      background:#fff;

      .gorechange{
        margin:0 0.5rem ;
        margin-top: 0.5rem;
        border: 1px solid #ff3737;
        font-size: 0.6rem;
        padding:0 0.5rem;
        height: 1.1rem;
        border-radius: 2px;
        color: #ff3737;
        line-height: 1.0rem;
      }
      p{
        height: 2.2rem;
        padding:0 0.75rem  ;
        line-height: 2.2rem;
        font-size: 0.7rem;
        display: flex;
        border-bottom: 1px solid #eee;
        b{
          color: #666666;
        }
        input{
          flex: 1;
          border: none;
        }
        button{
          margin: 0.4rem 0;
          border: 1px solid #ff3737;
          background: #fff;
          color: #ff3737;
          width: 4.5rem;
        }
      }

    }
    .infobox{
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: #666;
      z-index: 444;
      opacity: 0.6;
    }
    .partPay{
      position: fixed;
      width: 100%;
      top: 50%;
      left: 0;
      height: 12rem;
      margin-top: -50%;
      z-index: 888;
      padding:0 1.5rem;
      .payTit{
        width: 100%;
        height:12rem;
        position: relative;
        background-image: url("../../assets/images/di.png");
        background-size: 100% 100%;
        .pic{
          position: absolute;
          width: 100%;
          height: 9rem;
          top: -4.5rem;
          left: 0;
          background: url("../../assets/images/ttttt.png") no-repeat center;
          background-size:auto 100%;
        }
        .backpay{
          position: absolute;
          bottom:1rem;
          left: 50%;
          margin-left: -4.2rem;
          width: 8.4rem;
          border: none;
          background: #ff3737;
          border-radius: 4px;
          line-height: 2.5rem;
          color: #fff;
          font-size: 14px;
          text-align: center;
        }
      }
      .paytit{
        width: 100%;
        position: absolute;
        top: 5rem;
        font-size: 16px;
        text-align: center;
        i{
          color: #ff3737;
          font-style: normal;
        }
      }
    }
    .hint{
        font-size: 0.7rem;
        line-height: 2.45rem;
        padding:0 0.75rem;
      a{
        color: #ff3737;
        i{
          color: #ff3737;
          font-size: 0.8rem;

        }
      }
    }
    .paygo{
      background: #ff3737;
      height: 2.5rem;
      text-align: center;
      line-height: 2.5rem;
      position: fixed;
      bottom: 0;
      width: 100%;
      color: #fff;
    }
    .bottom{
      height: 2.6rem;
      width: 100%;
    }

  }

</style>
