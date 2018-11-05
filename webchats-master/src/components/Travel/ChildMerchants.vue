<template>
  <div id="child_merchants">
    <p class="page_title">商户快捷入驻</p>
    <div class="input_box"><i class="mast">*</i><mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email" :state="email_state"  @keyup.native="testemail"></mt-field></div>
    <div class="input_box"><i class="mast">*</i><mt-field label="企业名称" placeholder="请输入企业名称" v-model="merchants_name" :state="merchants_state" @keyup.native="testname"></mt-field> </div>
    <div class="input_box" @click="showcity()"><i class="mast">*</i><div class="input_tit"><b>城市</b><span v-text="showaddress"></span></div></div>
    <div class="input_box"><i class="mast">*</i><mt-field label="手机号" :attr="{ maxlength: 11 }" placeholder="请输入手机号" type="tel" v-model="phone"  :state="phone_state" @keyup.native="testphone(1)"></mt-field></div>
    <div class="input_box"><i class="mast">*</i><mt-field label="激活码" :attr="{ maxlength: 11 }" placeholder="请输入总店联系人手机号" type="tel" v-model="activation"  :state="activation_state" @keyup.native="testphone(2)"></mt-field></div>
    <div class="img_box">
      <p class="card_title"><i>*</i>请上传店主身份证正面照片</p>
      <div class="dimg just"  @click="clickDom('faceIdcard')">
        <img  v-if='faceIdcard' :src="faceIdcard" alt="">
        <a v-if='!faceIdcard'></a> <input  type="file" id="faceIdcard" accept="image/*"  @change="ImgBase64($event,'faceIdcard')">
      </div>
      <p class="card_title"><i>*</i>请上传店主身份证反面照片</p>
      <div  class="dimg just" @click="clickDom('backIdcard')">
        <img v-if="backIdcard"  :src="backIdcard" alt="">
        <a v-if="!backIdcard"></a> <input  type="file" id="backIdcard" accept="image/*"  @change="ImgBase64($event,'backIdcard')">
      </div>
    </div>
    <div class="cos"><button  @click="submitMerchants">确认提交</button></div>
    <picker-address v-if="isshow" :selectCity=showcity :sureCity=sureCity></picker-address>
  </div>
</template>

<script>
  import { Field,Indicator,Toast ,MessageBox } from 'mint-ui'
  import axios from "axios";
  import qs from "qs";
  import PickerAddress from './PickerAddress'
  export default{
    name: 'ChildMerchants',
    data() {
      return {
        time:'',
        sign:'',
        token:'',
        email:'',
        email_state:'',
        merchants_name:'',
        merchants_state:'',
        phone:'',
        phone_state:'',
        activation:'',
        activation_state:'',
        isshow:false,//选择城市
        showaddress:'',
        address:[],
        cardInfo: {idCardNo: '', cname: '', startdate: '', enddate: ''},//身份证信息
        faceIdcard:'',
        backIdcard:'',
      }
    },
    methods: {
      showcity(){
        this.isshow=!this.isshow
      },
      sureCity(attr){
        this.address = attr;
        this.showaddress = this.address[0].cat + this.address[1].cat
        this.isshow = false
      },
      clickDom(Dom){
        var img = document.getElementById(Dom)
        img.click()
      },
      testname(){
          if((/(?=[\x21-\x7e]+)[^A-Za-z0-9]/).test(this.merchants_name)){
              this.merchants_state='error'
          }else{
            this.merchants_state='success'
          }
      },
      testemail() {
        if (!this.email) {
          return
        }
        if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(this.email)) {
         this.email_state='error'

        }else{
          this.email_state='success'
        }
      },
      testphone(number){
        var   phone =''
        if(number==1){
          phone =this.phone
        }else{
          phone=this.activation
        }
        if (!phone) {
          return
        }
        if (!(/^1[3|4|5|8|7][0-9]\d{8,8}$/).test(phone)) {
          if(number==1){
            this.phone_state='error'
          }else{
            this.activation_state='error'
          }

        }else{
          if(number==1){
            this.phone_state='success'
          }else{
            this.activation_state='success'
          }
        }
      },
      upimg(imgsrc, category, _this) {
        var _this = this
        var token = '6fHdQpdyvCQGgokuQQ';
        if (category == 'faceIdcard') {
          Indicator.open('身份证照片上传中')
          axios.post(BASE_URL + '/index.php?r=CardjPay/checkIdCard', qs.stringify({
            token: token,
            type: 'face',
            cardImg: imgsrc
          })).then(function (res) {
            Indicator.close()
            var a = Base64.decode(res.data)
            a = JSON.parse(a)
            if (a.code == 10000 && a.data.err == "10000") {
              _this.cardInfo.idCardNo = a.data.data.idCardNo
              _this.cardInfo.cname = a.data.data.cname
              _this.faceIdcard = a.data.data.cardImg
            } else {
              MessageBox.alert('身份证识别失败，请您重新上传', '提示');
            }
          }).catch(function (err) {
            Indicator.close()
          });
        }
        if (category == 'backIdcard') {
          Indicator.open('身份证照片上传中')
          axios.post(BASE_URL + '/index.php?r=CardjPay/checkIdCard', qs.stringify({
            token: token,
            type: 'back',
            cardImg: imgsrc
          })).then(function (res) {
            Indicator.close()
            var a = Base64.decode(res.data)
            a = JSON.parse(a)
            if (a.code == 10000 && a.data.err == "10000") {
              _this.cardInfo.enddate = a.data.data.enddate
              _this.cardInfo.startdate = a.data.data.startdate
              _this.backIdcard = a.data.data.cardImg
            } else {
              MessageBox.alert('身份证识别失败，请您重新上传', '提示');
            }
          }).catch(function (err) {
            Indicator.close()
          });
        }
      },
      ImgBase64(e, type) {
        let tag = e.target;
        let fileList = tag.files;
        let imgNum = fileList.length;
        let _this = this;
        var _type = type
        if (!fileList.length) {
          return
        }
        var Orientation = null
        EXIF.getData(fileList[0], function () {
          Orientation = EXIF.getTag(fileList[0], 'Orientation');
        });
        let reader = new FileReader();
        reader.readAsDataURL(fileList[0]);
        reader.onload = function (e) {
          var image = new Image();
          image.src = e.target.result;
          image.onload = function () {
            var expectWidth = image.naturalWidth;
            var expectHeight = image.naturalHeight;
            if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
              expectWidth = 800;
              expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
            } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
              expectHeight = 1200;
              expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
            }
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = expectWidth;
            canvas.height = expectHeight;
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
            var base64 = null;
            base64 = canvas.toDataURL("image/jpeg", 1);
            _this.upimg(base64, _type, _this)
          }
        }
      },
      submitMerchants(){
        if (!this.email) {
          Toast({
            message: '请输入邮箱',
            duration: 2000
          });
          return
        }
        if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(this.email)) {
          Toast({
            message: '请输入正确邮箱',
            duration: 2000
          });
          return
        }
        if(!this.merchants_name){
          Toast({
            message: '请输入企业名称',
            duration: 2000
          });
          return
        }
        if((/(?=[\x21-\x7e]+)[^A-Za-z0-9]/).test(this.merchants_name)){
          Toast({
            message: '请输入正确企业名称',
            duration: 2000
          });
          return
        }
        if(!this.phone){
          Toast({
            message: '请输入手机号码',
            duration: 2000
          });
          return
        }
        if(!(/^1[3|4|5|8|7][0-9]\d{8,8}$/).test(this.phone)){
          Toast({
            message: '请输入正确手机号码',
            duration: 2000
          });
          return
        }
        if(!this.activation){
          Toast({
            message: '请输入激活码',
            duration: 2000
          });
          return
        }
        if(!(/^1[3|4|5|8|7][0-9]\d{8,8}$/).test(this.activation)){
          Toast({
            message: '请输入正确激活码',
            duration: 2000
          });
          return
        }
          if(!this.faceIdcard){
            Toast({
              message: '请上传身份证正面图片',
              duration: 2000
            });
            return
          }
        if(!this.backIdcard){
          Toast({
            message: '请上传身份证反面图片',
            duration: 2000
          });
          return
        }
        if(this.address.length!=2){
          Toast({
            message: '请选择城市',
            duration: 2000
          });
          return
        }
        Indicator.open()
          axios.post(BASE_URL+"/index.php?r=YinjiaStageShare/InputMerchShare",qs.stringify({
          token:this.token,
          username:this.email,
          province:this.address[0].catid,
          city:this.address[1].catid,
          linkphone:this.phone,
          salerphone:this.activation,
          companyname:this.merchants_name,
          linkname:this.cardInfo.cname,
          legalidcard:this.cardInfo.idCardNo,
          idstartdate:this.cardInfo.startdate,
          idenddate:this.cardInfo.enddate,
          legalface:this.faceIdcard,
          legalback:this.backIdcard,
          time:this.time,
          sign:this.sign,
        })).then(function(res){
            var a =Base64.decode(res.data)
            a=JSON.parse(a)
            Indicator.close()
            if(a.code==10000){
              Toast({
                message: '入驻成功',
                duration: 1000
              });
              window.location.href ='#/travel/login'
            }else{
              MessageBox.alert(a.info)
            }
        }).catch(function (err) {

        })
      },
    },
    mounted() {
      this.token =this.$route.params.token.replace(/@/g,'/')
      this.time =this.$route.params.time
      this.sign =this.$route.params.sign
      var nowtime=Date.parse(new Date())/1000
      if(nowtime>=this.time ){
          MessageBox.alert('链接已失效,请联系总店获取最新链接').then(action=>{
            window.location.href ='#/travel/login'
          })
       }
    },
    updated() {

    },
    activated() {

    },
    components: {
      'picker-address': PickerAddress
    }
  }
</script>

<style  lang="scss">
#child_merchants{
  height: 100%;
  overflow: scroll;
  .input_box{
    display: flex;
    background: #fff;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #eee;
   .mast{
        display: flex;
        padding-left: 0.75rem;
        font-size: 0.7rem;
        color: #ff3737;
        align-items: center;
      }
    .mint-cell:last-child,.mint-cell-wrapper{
      border: none;
      background-image:none;
    }
    .input_tit{
      flex: 1;
      font-size: 0.7rem;
      height: 2.4rem;
      line-height: 2.4rem;
      b{
        display: inline-block;
        font-weight: normal;
        width: 4rem;
      }
    }
    .mint-cell{
      width: 100%;
      height: 2.4rem;
    }
    .mint-cell-title{
      width: 4rem;
    }
    .mint-cell-wrapper{
      padding-left: 0;
    }
    .mint-cell-wrapper{
      font-size: 0.7rem;
    }
  }
  .page_title{
    padding: .75rem;
    font-size: .8rem;
    color: #333;
  }
  .img_box{
    background: #fff;
    margin-top: 0.75rem;
    padding-bottom: 0.75rem;
    .card_title{
      i{
        font-size: 0.7rem;
        color: #ff3737;
        line-height: 2.4rem;
      }
      font-size: .7rem;
      font-weight: 700;
      color: #666;
      padding-left: .75rem;
      line-height: 2.4rem;
    }
    .dimg{
      border: 1px solid #eee;
      background: #eee;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 17.25rem;
      height: 8.75rem;
      border-radius: .1rem;
      margin: 0 .75rem;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: relative;
      overflow: hidden;
      img{
        width: 100%;
      }
      a{
        width: 2.5rem;
        height: 2.5rem;
        background-image: url('../../assets/images/j-pay-img/camera.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: block;
        position: absolute;
        top: 2.75rem;
        left: 50%;
        margin-left: -1.25rem;
      }
      input{
        display: none;
      }
    }
  }
  .cos{
    padding:0rem 0.75rem 0.75rem 0.75rem;
    background: #fff;
    z-index: 1;
    button {
      width: 100%;
      padding: 0.75rem 0rem;
      background-color: #ff3737;
      color: #fff;
      text-align: center;
      font-size: 0.7rem;
      border: none;
      border-radius: 0.1rem;
    }
  }

}
</style>
