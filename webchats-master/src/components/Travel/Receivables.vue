<template>
  <div id="receivables" v-if="imgsrc">
    <div class="receivablesbox">
      <p class="pfont">扫一扫，付款给</p>
      <p class="store_name">{{name}}</p>
      <div class="img">
        <img :src='imgsrc'/>
      </div>
      <div class="money">
        <span>￥</span>
        <p @click="changemoney()"><label for="money"  number>{{message}}</label></p>
        <input type='text' id="money" ref="money" v-model="message" @focus="showbutton" @blur="change()" @keyup="inputmoney">
      </div>
      <div class="content" v-text="tit"></div>
      <div class="operation">
        <a class="modify" @click="changemoney()">修改金额</a>
        <a class="preservation" v-if="showtrue">确定修改</a>
      </div>
    </div>
    <a class="jump" href="#/travel/settlement">查看结算账户</a>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import {Toast, MessageBox, Indicator, Spinner} from 'mint-ui'

  export default {
    name: 'Receivables',
    data() {
      return {
        message: '',
        goodid: '',
        token: '',
        imgsrc: '',
        name: '',
        payway: '',
        tit: '',
        showtrue:false,
        maxMoney:''
      }
    },
    methods: {
      inputmoney() {
        var len1 = this.message.substr(0, 1);
        var len2 = this.message.substr(1, 1);
        if (this.message.length > 1 && len1 == 0 && len2 != '.') {
          this.message = this.message.substr(1, 1);
        }
        if (len1 == '.') {
          this.message = '0.';
        }
        if (!(/\d+(?:\.\d{0,3})?$/.test(this.message))) {
          // this.message=this.message.substr(0,this.message.length-1)
          this.message=this.message.replace(/[^0-9+\.]/ig,'')
        }
        //只能输1个小数点
        if (this.message.indexOf(".") != -1) {
          var str_ = this.message.substr(this.message.indexOf(".") + 1);
          //限制只能输入一个小数点
          if (str_.indexOf(".") != -1) {
            this.message = this.message.substr(0, this.message.indexOf(".") + str_.indexOf(".") + 1);
          } else {
            if (str_.length > 2) {
              this.message = this.message.substr(0, this.message.indexOf(".") + 3)
            }
          }
        }
        if ( this.payway == 'wx'&& this.message-this.maxMoney>0) {
          MessageBox.alert('金额不能超过'+this.maxMoney)
          this.message =this.maxMoney
        }
      },
      setmoney() {
        var that = this
        if (!(/\d+(?:\.\d{0,4})?$/.test(this.message))) {
          Toast('金额格式不正确')
          return
        }

        if (this.message <= 0 || !this.message) {
          Toast('请输入正确金额')
          return
        }
        if (this.payway == 'wx') {
              that.wxcode()
        } else {
          Indicator.open()
          axios.post(BASE_URL + '/index.php?r=YinjiaStage/PayQrcode', qs.stringify({
            token: this.token,
            productId: this.goodid,
            money: this.message
          })).then(function (res) {
            var a = JSON.parse(Base64.decode(res.data))
            Indicator.close()
            if (a.code == 10000) {
              if (a.data.err == 10000) {
                Toast("二维码获取成功")
                that.imgsrc = a.data.data.codeUrl
              } else {
                MessageBox.alert(a.data.msg, '提示')
              }
            } else {
              Toast(a.msg)
            }
          }).catch(function (err) {

          })
        }
      },
      wxcode() {
        Indicator.open()
        var that = this
        axios.post(BASE_URL + '/index.php?r=YinjiaStage/WayAllPay', qs.stringify({
          token: this.token,
          productId: this.goodid,
          money: this.message,
          payWay: '9',
          stageWay: '',
          stageTitle: '微信全额支付',
          stageContent: ''
        })).then(function (res) {
          var data = JSON.parse(Base64.decode(res.data))
          Indicator.close()
          if (data.code == 10000) {
            if (data.data.err = 10000) {
              Toast({
                message: '二维码获取成功',
                iconClass: 'iconfont icon-chenggong',
                duration: 1000
              })
              that.imgsrc = data.data.data.code_url
              that.maxMoney= data.data.data.payLimit
              that.showWX = true
            } else {
              Toast(data.data.msg)
            }
          } else if(data.code == 10012){
            Toast(data.info)
            setTimeout(function(){
              window.location.href='#/travel'
            },2000)
          }else{
            Toast(data.info)
          }
        }).catch(function (err) {

        })
      },
      changemoney() {
        this.$refs.money.focus()
      },
      change() {
        this.setmoney()
        this.showtrue=false
      },
      showbutton(){
        this.showtrue=true
      }

    },

    mounted() {
      document.title = '分期业务'
      this.payway =   this.$route.params.type
      this.goodid = this.$route.params.id
      this.token = localStorage.getItem('tenant')
      this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      var that = this
      Indicator.open()
      axios.post(BASE_URL + '/index.php?r=YinjiaStage/GetGoods', qs.stringify({
        token: this.token,
        id: this.goodid,
      })).then(function (res) {
        var a = JSON.parse(Base64.decode(res.data))
        Indicator.close()
        if (a.code == 10000) {
          if (a.data.err == 10000) {
            that.message = a.data.data.money
            that.name = a.data.data.companyname
            that.tit = a.data.data.pname
            that.setmoney()
          } else {
            MessageBox.alert(a.data.msg, '提示')
          }
        } else {
          Toast(a.msg)
        }
      }).catch(function (err) {

      })
    },
    updated(){

    }

  }
</script>

<style scoped lang="scss">
  #receivables {
    background: -webkit-linear-gradient(#ecbf71, #e6b559); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#ecbf71, #e6b559); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#ecbf71, #e6b559); /* Firefox 3.6 - 15 */
    background: linear-gradient(#ecbf71, #e6b559); /* 标准的语法 */
    padding: 1rem 1rem;
    height: 100%;
    overflow: scroll;
  }

  #receivables .receivablesbox {
    width: 16.75rem;
    margin: 0 auto 3.12rem auto;
    background-color: #fff;
    padding: 2rem 0;
    border-radius: 0.15rem;
  }

  .receivablesbox p.pfont {
    font-size: 0.8rem;
    color: #333333;
    text-align: center;
    line-height: 1.5rem;
  }

  .receivablesbox p.store_name {
    font-size: 0.8rem;
    color: #333333;
    text-align: center;
    line-height: 1.5rem;
    height: 1.5rem;
    overflow: hidden;
  }

  .receivablesbox div.img {
    width: 12rem;
    height: 12rem;
    margin: 0 auto 0rem auto;
  }

  .receivablesbox div.img img {
    width: 100%;
    height: 100%;
  }

  .receivablesbox div.money {
    text-align: center;
    color: #333333;
    font-size: 1.75rem;
  }

  .receivablesbox div.money label { /*display: inline-block;*/
  }

  /*.receivablesbox div.money input{*/
  /*text-align: center;*/
  /*width:90%;*/
  /*border: none;*/
  /*font-weight: bold;*/
  /*font-size: 1.75rem;*/
  /*font-family: tahoma,Helvetica,*/
  /*Arial,"\5FAE\8F6F\96C5\9ED1";*/
  /*}*/
  .receivablesbox div.content {
    font-size: 0.65rem;
    color: #999999;
    text-align: center;
    margin-bottom: 1.5rem;
    margin-top: 0.2rem;
  }

  .receivablesbox div.operation {
      width: 100%;
    display: flex;
    justify-content: center;
  }

  .receivablesbox div.operation a {
    display: inline-block;
    font-size: 0.7rem;
    color: #333333;
  }

  .receivablesbox div.operation a.modify {
    text-align: left;
    text-align: center;
    line-height: 30px;
  }

  .receivablesbox div.operation a.preservation {
    width: 4.3rem;
    height: 30px;
    line-height: 30px;
    text-align: right;
  }

  #receivables a.jump {
    font-size: 0.7rem;
    display: block;
    text-align: center;
    text-align: center;
    color: #fff;
  }

  .receivablesbox {
    .money {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      span {
        font-weight: normal;
        font-size: 1.5rem;
      }
      p {
        width: auto;
        max-width: 100%;
        font-weight: bold;
        padding: 0;
        margin: 0;
        outline: none;
        padding-right: 0rem;
      }
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
    }
    #money {
      margin-left:0.1rem;
      width: 1rem;
      border: none;
      opacity: 0;
    }

  }


</style>
