<template>
  <div id="set-password">
    <div v-if=user>
      <p><span>设置密码：</span><input type="password" v-model="password" placeholder="请输入6-18位密码"/></p>
      <p><span>确认密码：</span><input type="password" v-model="again" placeholder="请再次输入密码"/></p>
      <div class="next">
        <button @click="setpassword">确认</button>
      </div>
    </div>
    <into-user v-if='!user'></into-user>
  </div>
</template>

<script>
  import IntoUser from './IntoUser'
  import {MessageBox} from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  import { Indicator } from "mint-ui";
  const SetPassword = {
    name: 'SetPassword',
    data() {
      return {
        user: true,
        password: '',
        again: ''
      }
    },
    methods: {
      setpassword() {
        var that = this
        var phonenum=''
        if (!(/^[a-zA-Z0-9]{6,18}$/.test(this.password))) {
          MessageBox({
            title: '提示',
            message: '请输入6-18位密码',
          })
          return
        }
        if (this.password == this.again) {
          var user = localStorage.getItem("user")
          if(user){
            phonenum= JSON.parse(user).username
          }else{
            phonenum = localStorage.getItem("setphone");
          }
          Indicator.open()
          axios.post(BASE_URL + '/index.php?r=site/editpass', qs.stringify({
              mobile:phonenum,
              password: this.password,
              password2: this.again
            })).then(function (res) {
                Indicator.close()
              if (res.data.data.err == 10001) {
                that.user = !that.user
                setTimeout(function () {
                  window.location.href = "#/login";
                }, 3000)
              }
              if (res.data.data.err == 10004) {
                MessageBox({
                  title: '提示',
                  message: '操作失败，请稍后再试',
                })
              }
            }).catch(function (err) {
            })
          }else{
            MessageBox({
              title: '提示',
              message: ' 密码不一致',
            })
         }
      }
    },
    mounted() {
      document.title = '设置密码'
    },
    updated() {

    },
    activated() {

    },
    components: {
      'into-user': IntoUser
    }
  }
  export default SetPassword
</script>

<style scoped lang="scss">
  #set-password {
    padding: 0.5rem 0.75rem;
    p {
      background: #fff;
      display: flex;
      justify-content: space-between;
      color: #333;
      font-size: 0.65rem;
      padding-left: 0.25rem;
      margin-top: 0.75rem;
      height: 2.25rem;
      align-items: center;
      border: 1px solid #eee;
      input {
        flex: 1;
        border: none;
      }
    }
    .next {
      padding: 0.5rem 0rem;
      button {
        width: 100%;
        background: #FF3737;
        line-height: 2.25rem;
        border: none;
        color: #fff;
        font-size: 0.7rem;
      }
    }
  }

</style>
