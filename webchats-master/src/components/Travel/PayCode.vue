<template>
<div id="pay_code">
  <div class="order">
      <p>订单号: <span>{{order.orderid}}</span></p>
      <p>商品名称: <span>{{order.pname}}</span></p>
      <p>金额: <span>￥{{order.orderprice}}</span></p>
    <div class="card">
      <p>银行卡号: <span>{{order.bankaccountnumber}}</span></p>
      <p>持卡人姓名: <span>{{order.signedname}}</span></p>
      <p>验证码：<input type="tel" v-model="code"><button @click="getcode">{{codeMsg}}</button></p>
      <div class="codehint">验证码只发送一次,如未收到请返回支付方式页面重新下单</div>
    </div>
  </div>
  <div class="gopay" @click="gopay"><button>立即支付</button></div>
</div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import {Indicator,Toast,MessageBox} from 'mint-ui'
  export default{
    name: 'PayCode',
    data() {
      return {
        token:'',
        sign:'',
        orderid:'',
        order:'',
        code:'',
        codeMsg:'获取验证码'
      }
    },
    methods: {
      getcode(){
        var that = this
        if(this.codeMsg=='已发送'){
          MessageBox.confirm('未收到验证码，重新下单？').then(action => {
            window.location.href='#/travel/travelpay/mtoken='+that.token +'&productId='+ that.order.pid +'&money='+that.order.orderprice
          },action => {
            return
          });
        }else{
          Indicator.open()
          axios.post(BASE_URL+'/yinjiastage/getTerms',qs.stringify({
            token:this.token,
            orderid:this.orderid,
            signOrderid:this.sign
          })).then(function(res){
            Indicator.close()
            var a = Base64.decode(res.data)
            a=JSON.parse(a)
            if(a.code==10000){
              Toast('验证码已发送')
              that.codeMsg='已发送'
            }else{
              MessageBox.confirm(a.info+'重新下单？').then(action => {
                window.location.href='#/travel/travelpay/mtoken='+that.token +'&productId='+ that.order.pid +'&money='+that.order.orderprice
              },action => {
                return
              });
            }
          }).catch(function(err){
            Indicator.close()
            Toast('网络故障，请稍后再试')
          })
        }
      },
      gopay(){
        Indicator.open()
        var that = this
        axios.post(BASE_URL+'/index.php?r=YinjiaStage/InstallPay',qs.stringify({
          token:this.token,
          orderid:this.orderid,
          signOrderid:this.sign,
          smsCode:this.code
        })).then(function(res){
          Indicator.close()
          var a = Base64.decode(res.data)
          a=JSON.parse(a)
          if(a.code==10000){
            Toast({
              message: '支付成功',
              duration: 1000
            });
            var mtoken = that.token.replace(/\//g,'@')
            window.location.href='#/travel/sccessful/'+ that.orderid+'/'+ mtoken
          }else{
            MessageBox.confirm(a.info+'重新下单？').then(action => {
              window.location.href='#/travel/travelpay/mtoken='+that.token +'&productId='+ that.order.pid +'&money='+that.order.orderprice
            },action => {
              return
            });
          }
        }).catch(function(err){
          Indicator.close()
        })
      }
    },
    mounted() {
      this.token = (this.$route.params.token).replace(/@/g,'/')
      this.orderid = this.$route.params.orderid
      this.sign=this.$route.params.sign.split('&')[0]
        Indicator.open()
        var that = this
        axios.post(BASE_URL+'/index.php?r=YinjiaStage/OrderDetail',qs.stringify({
          token:this.token,
          orderid:this.orderid,
          signOrderid:this.sign
        })).then(function(res){
            Indicator.close()
            var a = Base64.decode(res.data)
            a=JSON.parse(a)
          if(a.code==10000){
            that.order=a.data.data
          }else{
            Toast(a.info)
          }
        }).catch(function(err){
          Indicator.close()
          Toast('网络故障，请稍后再试')
        })

    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>
<style scoped lang="scss">
#pay_code{
  .order{
    background: #fff;
    padding: 0.75rem 0;
    padding-bottom: 0;
  }
  p{
    padding:0 0.75rem ;
    font-size: 0.7rem;
    display: flex;
    align-items: center;
    justify-content:space-between;
    height:2rem;
    border-bottom: 1px solid #eee;
    color: #333;

  }
  .codehint{
    color: #666;
    font-size: 0.65rem;
    padding: 0.6rem 0.75rem;
  }
  span{
    flex: 1;
    padding-left: 0.5rem;
  }
  .card{
    input{
    width: 10rem;
      padding: 0.3rem 0.5rem;
      border: none;
    }
    button{
      font-size: 0.6rem;
      width: 4rem;
      height: 1.5rem;
      background: #f0ad4e;
      border:none;
      color: #ffff;
      border-radius: 8px;
      line-height: 1.5rem;
    }
  }
  .gopay{
    width: 100%;
    padding: 0.75rem;
    button{
      width: 100%;
      height: 2rem;
      border: none;
      background: #ff3737;
      color: #fff;
      font-size:0.7rem;
    }
  }
}
</style>
