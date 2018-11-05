<template>
  <div id="rans">
    <div class="bg1 bgstyle">
    </div>
    <div class="bg2 bgstyle">
      <div class="dform">
        <div class="mobile box">
          <label>手机号码</label>
          <input type="tel" value="" v-model="phone"/>
        </div>
        <div class="smscode box">
          <label>验证码</label>
          <!--<input type="text" value=""  v-model="code" @keyup="testing" />-->
          <input type="text" value="" v-model="code"/>
        </div>
        <button class="obtain" @click="submit" :disabled="disabled">
          {{buttontext}}
        </button>
      </div>
      <button class="binding" v-show="binding" @click="sbinding">立即领取</button>
      <router-link to="/qustore" class="binding" v-show="jump">前往趣商城</router-link>
    </div>
  </div>
</template>

<script>
  import {Toast} from "mint-ui";
  import {MessageBox} from "mint-ui";
  import axios from "axios";
  import qs from "qs";

  export default {
    data() {
      return {
        phone: null,
        code: null,
        disabled: false,
        buttontext: "获取验证码",
        time: 0,
        binding: true,
        jump: false,
        correct: false,
      }
    },

    methods: {
      //验证手机号码
      submit() {
        var testphone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        var that = this
        if (!this.phone) {
          MessageBox({
            title: "提示",
            message: "请输入手机号"
          });
        } else if (!testphone.test(this.phone)) {
          MessageBox({
            title: "提示",
            message: "手机号格式不正确"
          });
        } else {
          this.disabled = true;
          axios.post(
            BASE_URL + '/index.php?r=WeiUserapi/Sendsms',
            qs.stringify({
              mobile: this.phone
            })
          )
            .then(function (res) {
              var a = JSON.parse(Base64.decode(res.data))
              if (a.err == 10002) {
                MessageBox({
                  title: "提示",
                  message: a.msg
                });
                that.time = 60;
                that.timer();
              } else {
                MessageBox({
                  title: "提示",
                  message: a.msg
                });
              }
            }).catch(function (err) {
          });
        }
      },
      //验证码抬起验证
      /*testing(){
              var that =this
              if(this.code.length==6){
                  axios.post(
                          BASE_URL+'/index.php?r=WeiUserapi/BatchCoupon',
                          qs.stringify({
                              smscode:this.code,
                                mobile:this.phone
                            })
                  )
                  .then(function(res){
                        var a=JSON.parse(Base64.decode(res.data))
                      if(a.err==10000){
                          that.correct=true;
                      }else{
                          that.correct=false
                      }
                  }).catch(function(err){});
              }else{
                  that.correct=false
              }
          },*/

      //立即绑定
      sbinding() {
        var that = this
        if (!this.phone) {
          MessageBox({
            title: "提示",
            message: '请输入手机号'
          });
        } else if (!this.code) {
          MessageBox({
            title: "提示",
            message: "请输入验证码"
          });
        } else {
          axios.post(
            BASE_URL + '/index.php?r=WeiUserapi/BatchCoupon',
            qs.stringify({
              smscode: this.code,
              mobile: this.phone,
            })
          )
            .then(function (res) {
              if (res.data.err == 1002) {
                MessageBox.alert('您已领取过了呦~ 请前往趣商城').then(action => {
                  window.location.href = '#/qustore'
                });

              } else if (res.data.err == 1000) {
                MessageBox.confirm('领取成功，前往趣商城进行登录').then(action => {
                    window.location.href = '#/qustore'
                  },
                  action => {
                    return
                  });
                that.binding = false
                that.jump = true
              } else {
                MessageBox({
                  title: "提示",
                  message: res.data.msg
                });
                that.binding = true
                that.jump = false
              }
            }).catch(function (err) {
          });
        }
      },


      //倒计时
      timer() {
        if (this.time > 0) {
          this.time--;
          this.buttontext = this.time + "s后重新获取";
          setTimeout(this.timer, 1000);
        } else {
          this.time = 0;
          this.buttontext = "获取验证码";
          this.disabled = false;
        }
      },
      //倒计时
    }
  }
</script>

<style lang="scss">
  #rans {
    width: 100%;
    .bgstyle {
      background-repeat: no-repeat;
      background-size: cover;
    }
    .bg1 {
      background-image: url(../../assets/images/rnas/rnasb1.png);
      height: 18.7rem;

    }
    .bg2 {
      background-image: url(../../assets/images/rnas/rnasb2.png);
      height: 14.65rem;
      .dform {
        width: 15.8rem;
        margin: 0 auto 0 auto;
        padding-top: 19px;
        .box {
          height: 2.27rem;
          line-height: 2.27rem;
          background-color: #f6302d;
          border: none;
          border-radius: 0.2rem;
          box-shadow: 0rem 0rem 0.12rem 0.12rem #ad2220 inset;
          margin-bottom: 0.7rem;
          display: flex;
          align-items: center;
          label {
            font-size: 0.7rem;
            font-weight: bold;
            margin: 0 0.52rem 0 0.75rem;
            color: #ffecb2;
            display: inline-block;
          }
          input {
            flex: 1;
            height: 1.5rem;
            font-size: 0.7rem;
            color: #ffffff;
            border: none;
            background-color: #f6302d;
          }
        }
        .smscode {
          width: 9.25rem;
          float: left;
          input {
            width: 4.5rem;
          }
        }
        .obtain {
          width: 6.05rem;
          height: 2.12rem;
          background-color: #ffea77;
          line-height: 2.12rem;
          text-align: center;
          font-size: 0.7rem;
          font-weight: bold;
          color: #ff7d09;
          border: none;
          border-radius: 0.2rem;
          box-shadow: 0px 3px 3px #e28a1e;
          margin-left: 0.4rem;
        }
      }
      .dform:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
      .binding {
        display: block;
        width: 12.5rem;
        height: 2.35rem;
        background-color: #fde265;
        line-height: 2.35rem;
        margin: 0 auto;
        font-size: 0.7rem;
        text-align: center;
        color: #ff7d09;
        font-weight: bold;
        border: none;
        border-radius: 0.2rem;
        box-shadow: 0px 3px 3px #e1871a;
      }
    }
  }
</style>
