<template>
  <div class="addTravel">
    <div class="persen">
      <div class="dtitles">
        <span>请输入商户信息</span>
      </div>
      <div class="list">
        <ul>
          <li><label for="email"><i>* </i>邮箱：</label><input id="email" v-model="email" type="text"
                                                            placeholder="请输入您的邮箱 " @blur="testemail"></li>
          <li><label for="compony_name"><i>* </i>企业名称：</label><input id="compony_name" v-model="companyname" type="text"
                                                                     placeholder="请输入企业名称"
                                                                     @blur="errinput(companyname)"/></li>
          <li @click="selectCity"><label><i>* </i>城市：</label><b v-if="showaddress" v-text="showaddress"></b><b
            class="citytit" v-else>请选择城市</b></li>
          <li><label for="linkname"><i>* </i>联系人：</label><input id="linkname" v-model="linkname" type="text"
                                                                placeholder="请输入联系人姓名 "
                                                                @blur="testname('name',linkname)"/></li>
          <li><label for="linkphone"><i>* </i>联系电话：</label><input id="linkphone" v-model="linkphone" maxlength="11"
                                                                  type="tel" placeholder="请输入联系人手机号 " @blur="testphone">
          </li>
          <li><label for="bslicenseNO"><i>* </i>营业执照号：</label><input id="bslicenseNO" v-model="bslicenseNO" type="text"
                                                                     placeholder="请输入营业执照号 "></li>
          <li><label for="salerphone">激活码：</label><input id="salerphone" v-model="salerphone" type="tel"
                                                         placeholder="请输入激活码 "
                                                         @blur="isnumber(salerphone)"><span>非必填选项</span></li>
        </ul>
      </div>
      <div class="upload">
        <div class="upload">
          <p><i>* </i>请上传法人身份证正面照片</p>
          <div class="dimg just" @click="clickDom('faceIdcard')">
            <a v-if='!faceIdcard'></a>
            <img v-if='faceIdcard' :src="faceIdcard" alt="">
            <input type="file" id="faceIdcard" ref="faceIdcard" accept="image/*"
                   @change="ImgBase64($event,'faceIdcard')" name="bslicense">
          </div>
          <p><i>* </i>请上传法人身份证反面照片</p>
          <div class="dimg just" @click="clickDom('backIdcard')">
            <a v-if='!backIdcard'></a>
            <img v-if='backIdcard' :src="backIdcard" alt="">
            <input type="file" id="backIdcard" ref="backIdcard" accept="image/*"
                  @change="ImgBase64($event,'backIdcard')" ImgBase64 name="bslicense">
          </div>
          <p><i>* </i>请上传手持身份证照片</p>
          <div class="dimg just" @click="clickDom('takeIdcard')">
            <a v-if='!takeIdcard'></a>
            <img v-if='takeIdcard' :src="takeIdcard" alt="">
            <input type="file" id="takeIdcard" ref="takeIdcard" accept="image/*"
                   @change="ImgBase64($event,'takeIdcard')" name="bslicense">
          </div>
          <p><i>* </i>请上传营业执照</p>
          <div class="dimg just" @click="clickDom('bslicense')">
            <a v-if='!bslicense'></a>
            <img v-if='bslicense' :src="bslicense" alt="">
            <input type="file" id="bslicense" ref="bslicense" accept="image/*"
                   @change="ImgBase64($event,'bslicense')" name="bslicense">
          </div>
          <p><i>* </i>请上传企业Logo</p>
          <div class="dimg back" @click="clickDom('logo')">
            <a v-if='!logo'></a>
            <img v-if='logo' :src="logo" alt="">
            <input type="file" id="logo" ref="logo" accept="image/*" @change="ImgBase64($event,'logo')">
          </div>
          <p>请上传企业资质<span><i>*</i>非必填选项</span></p>
          <div class="dimg hic" @click="clickDom('aptitude')">
            <a v-if='!aptitude'></a>
            <img v-if='aptitude' :src="aptitude" alt="">
            <input type="file" id="aptitude" ref="aptitude" accept="image/*" @change="ImgBase64($event,'aptitude')">
          </div>
        </div>
      </div>
      <div class="cos">
        <button @click="gosubmit">确认提交</button>
      </div>
    </div>
    <picker-address v-if="isshow" :selectCity=selectCity :sureCity=sureCity></picker-address>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import { Indicator, MessageBox, Toast } from "mint-ui";
import PickerAddress from "./PickerAddress";

export default {
  name: "AddTravel",
  data() {
    return {
      email: "",
      companyname: "",
      linkname: "",
      linkphone: "",
      address: [],
      province: "",
      city: "",
      bslicenseNO: "", //营业执照号
      salerphone: "", //激活码
      faceIdcard: "", //身份证正面地址
      backIdcard: "", //身份证反面地址
      takeIdcard: "", //手持身份证地址
      cardInfo: { idCardNo: "", cname: "", startdate: "", enddate: "" }, //身份证信息
      aptitude: "", //资质
      bslicense: "", //营业执照
      logo: "", //企业LOGO
      isshow: false,
      showaddress: ""
    };
  },
  methods: {
    testname() {
      if (!this.linkname) {
        return;
      }
      if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,8}$/.test(this.linkname)) {
        Toast({
          duration: 1000,
          message: "姓名格式不正确"
        });
      }
    },
    testStr(trye, str) {
      var testRule = "";
      var email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g;
      var phone = /^1[3|4|5|7|8][0-9]\d{8}$/;
      // var name =  /^(([\u4E00-\u9FA5\uf900-\ufa2d]{1,8})+(·[\u4E00-\u9FA5\uf900-\ufa2d]{1,8}))|([\u4E00-\u9FA5\uf900-\ufa2d]{2,8})/g;
      var name = /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,8}$/;
      var idcard = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/g;
      var number = /^[0-9]*$/g;
      if (trye == "email") {
        testRule = email;
      }
      if (trye == "phone") {
        testRule = phone;
      }
      if (trye == "name") {
        testRule = name;
      }
      if (trye == "idcard") {
        testRule = idcard;
      }
      if (trye == "number") {
        testRule = number;
      }
      if (!testRule.test(str)) {
        MessageBox.alert("错误");
      } else {
        MessageBox.alert("正确");
      }
    },
    errinput(str) {
      //特殊字符匹配
      var pattern = /[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;
      if (pattern.test(str)) {
        Toast("不能输入特殊字符");
      }
    },
    //纯数字数字正则
    isnumber(str) {
      var pattern = /^[0-9]*$/g;
      if (!pattern.test(str)) {
        Toast("不能输入数字以外的其它字符");
      }
    },
    clickDom(Dom) {
      var img = document.getElementById(Dom);
      img.click();
    },
    selectCity() {
      this.isshow = !this.isshow;
    },
    sureCity(attr) {
      this.address = attr;
      this.showaddress = this.address[0].cat + this.address[1].cat;
      this.isshow = false;
    },
    upimg(imgsrc, category, _this) {
      var _this = this;
      var token = "6fHdQpdyvCQGgokuQQ";
      if (category == "faceIdcard") {
        Indicator.open("身份证照片上传中");
        axios
          .post(
            BASE_URL + "/index.php?r=CardjPay/checkIdCard",
            qs.stringify({
              token: token,
              type: "face",
              cardImg: imgsrc
            })
          )
          .then(function(res) {
            Indicator.close();
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            if (a.code == 10000 && a.data.err == "10000") {
              _this.cardInfo.idCardNo = a.data.data.idCardNo;
              _this.cardInfo.cname = a.data.data.cname;
              _this.faceIdcard = a.data.data.cardImg;
            } else {
              _this.ai = true;
              MessageBox.alert("身份证识别失败，请您重新上传", "提示");
            }
          })
          .catch(function(err) {
            Indicator.close();
          });
      }
      if (category == "backIdcard") {
        Indicator.open("身份证照片上传中");
        axios
          .post(
            BASE_URL + "/index.php?r=CardjPay/checkIdCard",
            qs.stringify({
              token: token,
              type: "back",
              cardImg: imgsrc
            })
          )
          .then(function(res) {
            Indicator.close();
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            if (a.code == 10000 && a.data.err == "10000") {
              _this.cardInfo.enddate = a.data.data.enddate;
              _this.cardInfo.startdate = a.data.data.startdate;
              _this.backIdcard = a.data.data.cardImg;
            } else {
              _this.ai = true;
              MessageBox.alert("身份证识别失败，请您重新上传", "提示");
            }
          })
          .catch(function(err) {
            Indicator.close();
          });
      }
      if (category == "bslicense") {
        Indicator.open("营业执照上传中");
        axios
          .post(
            BASE_URL + "/index.php?r=Common/UploadImg",
            qs.stringify({
              token: token,
              fileImg: imgsrc
            })
          )
          .then(function(res) {
            Indicator.close();
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            if (a.code == 10000 && a.data.err == "10000") {
              _this.bslicense = a.data.data.imgUrl;
            } else {
              Toast(a.info);
            }
          })
          .catch(function(err) {
            Indicator.close();
          });
      }
      if (category == "takeIdcard") {
        Indicator.open("手持身份证照片上传中");
        axios
          .post(
            BASE_URL + "/index.php?r=Common/UploadImg",
            qs.stringify({
              token: token,
              fileImg: imgsrc
            })
          )
          .then(function(res) {
            Indicator.close();
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            if (a.code == 10000 && a.data.err == "10000") {
              _this.takeIdcard = a.data.data.imgUrl;
            } else {
              Toast(a.info);
            }
          })
          .catch(function(err) {
            Indicator.close();
          });
      }
      if (category == "logo") {
        Indicator.open("企业logo上传中");
        axios
          .post(
            BASE_URL + "/index.php?r=Common/UploadImg",
            qs.stringify({
              token: "6fHdQpdyvCQGgokuQQ",
              fileImg: imgsrc
            })
          )
          .then(function(res) {
            Indicator.close();
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            if (a.code == 10000 && a.data.err == "10000") {
              _this.logo = a.data.data.imgUrl;
            } else {
              Toast(a.info);
            }
          })
          .catch(function(err) {
            Indicator.close();
          });
      }
      if (category == "aptitude") {
        Indicator.open("企业资质上传中");
        axios
          .post(
            BASE_URL + "/index.php?r=Common/UploadImg",
            qs.stringify({
              token: token,
              fileImg: imgsrc
            })
          )
          .then(function(res) {
            Indicator.close();
            var a = Base64.decode(res.data);
            a = JSON.parse(a);
            if (a.code == 10000 && a.data.err == "10000") {
              _this.aptitude = a.data.data.imgUrl;
            } else {
              Toast(a.info);
            }
          })
          .catch(function(err) {
            Indicator.close();
          });
      }
    },
    ImgBase64(e, type) {
      let tag = e.target;
      let fileList = tag.files;
      let imgNum = fileList.length;
      let _this = this;
      var _type = type;
      if (!fileList.length) {
        return;
      }
      var Orientation = null;
      EXIF.getData(fileList[0], function() {
        Orientation = EXIF.getTag(fileList[0], "Orientation");
      });
      let reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onload = function(e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          var expectWidth = image.naturalWidth;
          var expectHeight = image.naturalHeight;
          if (type == "logo") {
            expectWidth = 800;
            expectHeight = 800;
          } else {
            if (
              this.naturalWidth > this.naturalHeight &&
              this.naturalWidth > 800
            ) {
              expectWidth = 800;
              expectHeight =
                expectWidth * this.naturalHeight / this.naturalWidth;
            } else if (
              this.naturalHeight > this.naturalWidth &&
              this.naturalHeight > 1200
            ) {
              expectHeight = 1200;
              expectWidth =
                expectHeight * this.naturalWidth / this.naturalHeight;
            }
          }
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = expectWidth;
          canvas.height = expectHeight;
          ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
          var base64 = null;
          // 修复ios上传图片的时候 被旋转的问题
          // if (Orientation != "" && Orientation != 1) {
          //   switch (Orientation) {
          //     case 6://需要顺时针（向左）90度旋转
          //       _this.rotateImg(this, 'left', canvas);
          //       break;
          //     case 8://需要逆时针（向右）90度旋转
          //       _this.rotateImg(this, 'right', canvas);
          //       break;
          //     case 3://需要180度旋转
          //       _this.rotateImg(this, 'right', canvas);//转两次
          //       _this.rotateImg(this, 'right', canvas);
          //       break;
          //   }
          // }

          base64 = canvas.toDataURL("image/jpeg", 1);
          // if(!base64){
          //   Toast('上传失败，请重新选择图片，或者更换图片')
          //   return
          // }
          _this.upimg(base64, _type, _this);
        };
      };
    },
    rotateImg(img, direction, canvas) {
      //图片旋转
      var min_step = 0;
      var max_step = 3;
      if (img == null) return;
      var height = img.height;
      var width = img.width;
      var step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      var degree = step * 90 * Math.PI / 180;
      var ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    testemail() {
      if (!this.email) {
        return;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)
      ) {
        Toast("请输入正确邮箱地址");
      }
    },
    testphone() {
      if (!this.linkphone) {
        return;
      }
      if (!/^1[3|4|5|8|7][0-9]\d{8,8}$/.test(this.linkphone)) {
        Toast("请输入正确联系电话");
      }
    },
    gosubmit() {
      if (/(?=[\x21-\x7e]+)[^A-Za-z0-9]/.test(this.bslicenseNO)) {
        MessageBox.alert("营业执照号码格式不正确");
        return;
      }
      if (!this.email) {
        MessageBox.alert("请输入用户名邮箱");
        return;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)
      ) {
        MessageBox.alert("邮箱格式不正确");
        return;
      }
      if (!this.companyname) {
        MessageBox.alert("请输入企业名称");
        return;
      }
      if (!this.linkname) {
        MessageBox.alert("请输入联系人姓名");
        return;
      }
      if (!/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,8}$/.test(this.linkname)) {
        MessageBox.alert("联系人姓名格式不正确");
        return;
      }
      if (!this.bslicenseNO) {
        MessageBox.alert("请输入营业执照号");
        return;
      }

      if (!this.linkphone) {
        MessageBox.alert("请输入联系人手机号码");
        return;
      }
      if (!/^1[3|4|5|8|7][0-9]\d{8,8}$/.test(this.linkphone)) {
        MessageBox.alert("联系人手机号码格式不正确");
        return;
      }
      if (!this.bslicense) {
        MessageBox.alert("请上传营业执照");
        return;
      }
      if (!this.logo) {
        MessageBox.alert("请上传企业logo");
        return;
      }
      if (!this.faceIdcard) {
        MessageBox.alert("请上传身份证正面照片");
        return;
      }
      if (!this.backIdcard) {
        MessageBox.alert("请上传身份证反面照片");
        return;
      }
      if (!this.takeIdcard) {
        MessageBox.alert("请上传手持身份证照片");
        return;
      }

      if (
        !this.cardInfo.idCardNo ||
        !this.cardInfo.cname ||
        !this.cardInfo.startdate ||
        !this.cardInfo.enddate
      ) {
        MessageBox.alert("身份证信息有误，请重新上传");
        return;
      }
      Indicator.open()
      axios
        .post(
          BASE_URL + "/index.php?r=YinjiaStage/InputMerch",
          qs.stringify({
            username: this.email,
            companyname: this.companyname,
            linkname: this.linkname,
            linkphone: this.linkphone,
            salerphone: this.salerphone,
            bslicense: this.bslicense,
            province: this.address[0].catid,
            city: this.address[1].catid,
            legalname: this.cardInfo.cname,
            legalidcard: this.cardInfo.idCardNo,
            idstartdate: this.cardInfo.startdate,
            idenddate: this.cardInfo.enddate,
            legalface: this.faceIdcard,
            legalback: this.backIdcard,
            lefalhand: this.takeIdcard,
            certificate: this.bslicenseNO,
            logo: this.logo,
            aptitude: this.aptitude
          })
        )
        .then(function(res) {
          Indicator.close();
          var a = JSON.parse(Base64.decode(res.data));
          if (a.code == 10000) {
            localStorage.setItem("tenant", a.token);
            MessageBox.alert("请补全您的对公账户信息", "提示").then(action => {
              window.location.href = "#/travel/addcredit";
            });
          } else {
            MessageBox.alert(a.info, "提示");
          }
        })
        .catch(function(err) {
          Indicator.close();
        });
    }
  },
  mounted() {
    document.title = "商户入驻";
  },
  updated() {},
  activated() {},
  components: {
    "picker-address": PickerAddress
  }
};
</script>

<style scoped lang="scss">
.addTravel {
  height: 100%;
  width: 100%;
  overflow: scroll;
}

.persen {
}

.dtitles {
  padding: 0.75rem 0.75rem;
  font-size: 0.8rem;
  font-weight: bold;
  span {
    font-size: 0.8rem;
    color: #333333;
  }
}

#aptitude,
#bslicense,
#logo,
#faceIdcard,
#backIdcard,
#takeIdcard {
  display: none;
}

.dimg {
  img {
    width: 100%;
    height: 100%;
  }
}

li {
  b {
    font-size: 0.7rem;
    font-weight: normal;
    color: #333;
    display: flex;
    flex: 1;
    line-height: 2.4rem;
    margin-left: 0.5rem;
  }
}

.list ul li span {
  font-size: 0.6rem;
  color: #ff3737;
  line-height: 2.4rem;
}

.upload {
  p {
    font-size: 0.7rem;
    font-weight: bold;
    color: #666;
    padding-left: 0.75rem;
    line-height: 2.4rem;
    i {
      color: #ff3737;
    }

    span {
      color: #ff3737;
      margin-left: 1rem;
      font-weight: normal;
      font-size: 0.6rem;
    }
  }
}

div.list ul li {
  padding: 0 0.75rem;
  background-color: #fff;
  border-bottom: 1px solid #e3e5e9;
  zoom: 1;
  display: flex;
  justify-content: space-between;
}

div.list ul li:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

div.list ul li label {
  font-size: 0.7rem;
  color: #666;
  font-weight: bold;
  line-height: 2.4rem;
}

div.list ul li label i {
  color: #ff3b3b;
}

div.list ul li input {
  border: none;
  display: flex;
  flex: 1;
  margin-left: 0.5rem;
  font-size: 0.7rem;
}

div.list ul li a {
  float: right;
  font-size: 0.35rem;
}

div.prompt {
  padding: 0.625rem 0.75rem 1.75rem 0.75rem;
}

div.prompt span {
  font-size: 0.7rem;
  color: #ff3b3b;
  font-weight: bold;
}

div.cos {
  padding: 1rem 0.75rem 0rem 0.75rem;
  background: #fff;
  z-index: 1;
}

div.cos button {
  width: 100%;
  padding: 0.75rem 0rem;
  background-color: #ff3737;
  color: #fff;
  text-align: center;
  font-size: 0.7rem;
  border: none;
  border-radius: 0.1rem;
}

div.upload {
  background-color: #fff;
  margin-top: 0.75rem;
}

div.dimg {
  width: 17.25rem;
  height: 8.75rem;
  border-radius: 0.1rem;
  margin: 0rem 0.75rem 0rem 0.75rem;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
}

div.dimg a {
  width: 2.5rem;
  height: 2.5rem;
  background-image: url(../../assets/images/j-pay-img/camera.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: block;
  position: absolute;
  top: 2.75rem;
  left: 50%;
  margin-left: -1.25rem;
}

/*div.just{ background-image:url(../../assets/images/j-pay-img/Identity_card.png); margin-bottom: 0.75rem; }*/
/*div.back{ background-image:url(../../assets/images/j-pay-img/Identity_card_counter.png); margin-bottom: 0.75rem; }*/
/*div.hic{ background-image:url(../../assets/images/j-pay-img/hic.png); margin-bottom: 0.75rem; }*/
/*div.bank_card{ background-image:url(../../assets/images/j-pay-img/bank_card.png); margin-bottom: 0.75rem; }*/
/*div.business_license{ background-image:url(../../assets/images/j-pay-img/business_license.png); margin-bottom: 0.75rem; }*/
.dimg {
  border: 1px solid #eee;
  background: #eee;
  display: flex;
  img {
    justify-content: center;
  }
}

.back img {
  width: 8.75rem;
  margin: 0 auto;
}

.citytit {
  color: #666;
}
</style>
