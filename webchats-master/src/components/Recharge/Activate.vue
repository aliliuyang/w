<template>
  <div id="opa">
    <div class="wps">在线支付激活</div>
    <div class="dinp">
      <p>
        <label>易付卡卡号：</label><input type="tel" placeholder="请输入卡号" v-model="cn"/>
      </p>
      <p>
        <label>激活码：</label><input type="text" placeholder="刮开卡背面图层获取激活码" v-model="ac"/>
      </p>
      <p>
        <label>手机号：</label><input type="text" placeholder="请输入手机号" v-model="cpn"/>
      </p>
      <p>
        <label>验证码：</label><input type="text" class="verification" placeholder="请输入验证码" v-model="vc"/>
        <button @click="ctdn">{{gain}}</button>
      </p>
    </div>
    <button class="ins" @click="detection">下一步</button>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';

  const Activate = {
    name: 'Activate',
    data() {
      return {
        cn: "",
        ac: "",
        cpn: "",
        vc: "",
        gain: "获取验证码",
      }
    },
    methods: {
      detection() {
        if (this.cn.length == 13 & /^[0-9]*$/.test(this.cn)) {
        } else {
          this.cn = "";
          MessageBox.alert('请输入正确卡号');
          return
        }
        if (this.ac.length == 6 & /^[0-9]*$/.test(this.ac)) {
        } else {
          this.ac = "";
          MessageBox.alert('请输入正确信息');
          return
        }
        if (/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.cpn)) {
        } else {
          this.cpn = "";
          MessageBox.alert('请输入正确手机号');
          return
        }
        if (this.vc) {
        } else {
          this.vc = "";
          MessageBox.alert('请输入正确的验证码');
          return
        }
      },
      ctdn() {
        var that = this
        if (!(that.gain <= 60)) {
          that.gain = "60";
          var time = setInterval(function () {
            that.gain--
            if (that.gain == 0) {
              that.gain = "获取验证码"
              clearInterval(time)
            }
          }, '1000')
        }
      }
    },
    mounted() {


    },
    updated() {

    },
    activated() {

    },
    components: {}
  }

  export default Activate
</script>

<style scoped lang="scss">
  #opa {
    padding: 0.75rem 0.75rem 0rem 0.75rem;
    .wps {
      width: 17.2rem;
      height: 2.25rem;
      line-height: 2.25rem;
      font-size: 0.8rem;
      color: #333333;
      text-align: center;
    }
    div.dinp p {
      position: relative;
      label {
        position: absolute;
        width: 5rem;
        line-height: 2.15rem;
        font-size: 0.7rem;
        padding-left: 0.75rem;
        top: 0rem;
        left: 0rem;
      }
      button {
        width: 7rem;
        height: 2.19rem;
        line-height: 2.19rem;
        font-size: 0.8rem;
        color: #fff;
        background-color: #ff3737;
        text-align: center;
        position: absolute;
        right: 0rem;
        top: 0rem;
        border: none;
        border-top-right-radius: 0.1rem;
        border-bottom-right-radius: 0.1rem;
      }
    }
    div.dinp input {
      width: 17.2rem;
      padding: 0rem 0.75rem 0rem 5rem;
      line-height: 2.125rem;
      color: #333333;
      font-size: 0.7rem;
      border-radius: 0.1rem;
      border: none;
      border: 0.025rem solid #c8c8c8;
      margin-bottom: 0.75rem;
    }
    div.dinp input.verification {
      width: 17.2rem;
      padding: 0rem 7rem 0rem 5rem;
    }
    button.ins {
      width: 17.2rem;
      height: 2.25rem;
      line-height: 2.25rem;
      background-color: #ff3737;
      color: #fff;
      border: none;
      border-radius: 0.1rem;
      cursor: pointer;
    }
  }

</style>
