<template>
  <div class="addcredit" v-html="">
    <div class="creditcard">
      <p><span><i>*</i>姓名：</span><input type="text" placeholder="请输入姓名" v-model="cname"></p>
      <p><span><i>*</i>身份证号码：</span><input type="text" placeholder="请输入身份证号码" v-model="idcard"></p>
      <p><span><i>*</i>信用卡卡号：</span><input type="tel" placeholder="请输入信用卡卡号" v-model="bank" @blur="changeCount"></p>
      <p><span><i>*</i>预留手机号：</span><input type="tel" placeholder="请输入预留手机号" v-model="mobile"></p>
      <p><span><i>*</i>有效期：</span><i class="data" v-text="date" @click="selectDate"></i></p>
      <p><span><i>*</i>CVV2码：</span><input type="tel" placeholder='卡背末三位' v-model="cvv"><b @click="explain">说明</b></p>
    </div>
    <div v-html="Html">
    </div>
    <div class="btn">
      <p @click="gopay">提交</p>
      <!--<p >提交</p>-->
    </div>
    <div class="cvv" v-if="showcvv2">
      <div class="CVVpic">
        <img src="../../assets/images/jpay/cvvcode.png" alt="">
      </div>
      <p class="text">CVV2码为银行卡背面如图所示位置末位三位</p>
      <p class="butto" @click="explain">确定</p>
    </div>
    <div class="zhezhao" v-if="showcvv2"></div>
    <div class="vzhezhao" v-if="showver"></div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="new Date()"
      :endDate="new Date('2070-12-31')"
      @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
  import axios from 'axios'
  import qs from 'qs'
  import {Toast, Indicator, MessageBox} from 'mint-ui'

  export default {
    name: 'Userinfo',
    data() {
      return {
        cname: '',
        idcard: '',
        date: '请选择有效期号',
        showcvv2: false,
        showver: false,
        bank: '',//银行
        mobile: '',//手机号
        time: '',//有效期
        cvv: '',//cvv2
        format: '',//有效期对应
        verification: '',//获取银行卡信息
        orderNo: '',
        token: '',
        Html:''
      }
    },
    computed:{
        datatime(){
          return this.time.replace(0,7)
        }
    },
    methods: {

      selectDate() {
        this.$refs.picker.open();
      },
      handleConfirm(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        this.date = y + '-' + m
        this.format = this.date
      },
      explain() {
        this.showcvv2 = !this.showcvv2
      },
      vheck() {
        this.showver = !this.showver
      },
      changeCount() {
        var token = '6fHdQpdyvCQGgokuQQ';
        var that = this
        if (!that.bank) {
          return
        }
        if (!(/^[0-9]*$/.test(this.bank))) {
          Toast('请填写正确银行卡号')
          return
        }
        axios.post(BASE_URL + '/index.php?r=CardjPay/CheckCard', qs.stringify({
          token: token,
          type: '2',
          cardNo: that.bank
        }))
          .then(function (res) {
            var edoc = Base64.decode(res.data)
            edoc = JSON.parse(edoc)
            if (edoc.code == 10000) {
              if (edoc.data.err == 10000) {
                that.verification = edoc.data.data.id
              } else {
                Toast(edoc.data.msg)
                that.verification = ''
              }
            } else {
              Toast(edoc.info)
              that.verification = ''
            }

          })
          .catch(function (err) {
          });
      },
      gopay() {
        if (!this.cname) {
          Toast('请输入姓名')
          return
        }
        if (!(/^([\u4e00-\u9fa5]){2,7}$/).test(this.cname)) {
          Toast('姓名格式有误')
          return
        }
        if (!this.idcard) {
          Toast('请填写身份证号码')
          return
        }
        // if(!(/^[0-9]*$/.test(this.idcard))){
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(this.idcard))) {
          Toast('请输入正确的身份证号')
          return
        }
        if (!this.bank) {
          Toast('请填写银行卡号')
          this.bank = ""
          return
        }
        if (!(/^[0-9]*$/.test(this.bank))) {
          Toast('请填写正确银行卡号')
          return
        }
        if (!this.mobile) {
          Toast('请填写手机号码')
          this.mobile = ""
          return
        }
        if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.mobile))) {
          Toast('请填写正确手机号码')
          this.mobile = ""
          return
        }
        if (this.date != this.format) {
          Toast('请选择有效期日期')
          this.date = ""
          return
        }
        if (!this.cvv) {
          Toast('请填写cvv2码')
          return
        }
        if (!(/^\d{3}$/.test(this.cvv))) {
          Toast('请填写正确cvv2码')
          this.cvv = ""
          return
        }
        var that = this
        Indicator.open()
        axios.post(BASE_URL + '/index.php?r=YinjiaStage/UserInfo', qs.stringify({
          token: this.token,
          orderid: this.orderNo,
          signedName: this.cname,
          idNo: this.idcard,
          accountNumber: that.bank,
          selectFinaCode: that.verification,
          cvn2: that.cvv,
          validityCard: that.date,
          mobileNo: that.mobile,
        })).then(function (res) {
          Indicator.close()
          var a = Base64.decode(res.data)
          a = JSON.parse(a)
          if (a.code == 10000) {
            if(a.data.err==10011){
              var Btokem =that.token.replace(/\//g,'@')
              window.location.href='#/travel/paycode/'+Btokem+'/'+that.orderNo+'/'+a.data.data.signOrderid
            }else if(a.data.err==10010){
              that.Html=a.data.data.url
              setTimeout(function () {
                Indicator.close()
                document.all.pay_form.submit()
              },1000)
            }else{
              MessageBox.alert(a.data.data.Msg)
            }
          } else {
            Toast(a.info)
          }
        }).catch(function (err) {
          Indicator.close()
        });
      },
    },
    mounted() {
      // this.$router.replace()
      this.token = (this.$route.params.token).replace(/@/g,'/')
      this.orderNo = this.$route.params.orderid
    },
    updated() {
      // document.all.pay_form.submit()
    },
    activated() {

    },
    components: {}
  }
</script>

<style lang="scss">
  .addcredit {
    width: 100%;
    height: 100%;
    .creditcard {
      background: #fff;
      margin-bottom: 0.75rem;
      p {
        padding: 0 0.75rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        input {
          flex: 1;
          border: none;
          font-size: 0.7rem;
          color: #666;
        }
        span {
          font-size: 0.7rem;
          line-height: 2.45rem;
          i {
            color: #ff3737;
          }
        }
        b {
          font-size: 0.7rem;
          line-height: 2.45rem;
          font-weight: normal;
          color: #ff3737;
          padding-left: 1rem;
        }
        i {
          font-style: normal;
          font-weight: normal;
          line-height: 2.45rem;
          flex: 1;
          font-size: 0.7rem;
          color: #666;
        }
      }

    }
    .btn {
      padding: 0.75rem;
      p {
        background: #ff3737;
        color: #fff;
        text-align: center;
        line-height: 2.45rem;
        font-size: 0.8rem;
        border-radius: 4px;
      }
    }
    .zhezhao {
      width: 100%;
      height: 100%;
      background: #000;
      position: fixed;
      top: 0;
      left: 0;
      opacity: 0.6;
    }
    .vzhezhao {
      width: 100%;
      height: 100%;
      background: #000;
      position: fixed;
      top: 0;
      left: 0;
      opacity: 0.6;
    }
    .cvv {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      height: 12.5rem;
      position: fixed;
      top: 50%;
      background: #fff;
      z-index: 111;
      margin: 0 1rem;
      margin-top: -7rem;
      img {
        width: 100%;
        height: 100%;
      }
      .CVVpic {
        padding: 1.8rem 3.4rem;
        padding-bottom: 0;
      }
      .text {
        font-size: 0.7rem;
        text-align: center;
        color: #666;
        line-height: 2.5rem;
      }
      .butto {
        width: 100%;
        background: #ff3737;
        text-align: center;
        color: #fff;
        font-size: 0.9rem;
        line-height: 2.45rem;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    .verifications {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      position: fixed;
      top: 50%;
      left: 50%;
      width: 15.75rem;
      margin-left: -7.875rem;
      background: #fff;
      z-index: 111;
      margin-top: -7rem;
      padding-top: 1.5rem;
      .title {
        font-size: 0.8rem;
        color: #333;
        text-align: center;
        margin-bottom: 1.125rem;
      }
      .box {
        margin: 0rem 1.75rem;
        border-right: none;
        .number {
          width: 2.038rem;
          height: 1.94rem;
          text-align: center;
          color: #333;
          line-height: 2.0rem;
          font-size: 0.9rem;
          float: left;
          border: 0.025rem solid #000000;
          border-left: none;
        }

        :nth-child(1) {
          border-left: 0.025rem solid #000000;
        }
        .clear {
          clear: both;
        }
      }
      .text {
        height: 0;
        border: none;
        overflow: hidden;
      }
      .tips {
        margin-top: 0.625rem;
        font-size: 0.55rem;
        color: #999999;
        text-align: center;
      }
      .button {
        border-top: 0.025rem #eeeeee solid;
        padding: 0.625rem 0rem 1.25rem 0rem;
        border-radius: 0 0 4px 4px;
        font-size: 0.85rem;
        text-align: center;
        color: #ff3737;
        margin-top: 1rem;
      }
    }
    .picker-slot-center:nth-of-type(3){
      display: none;
    }
  }

</style>
