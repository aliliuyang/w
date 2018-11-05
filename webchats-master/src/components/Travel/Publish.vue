<template>
<div id="publish">
 <div class='name'><input v-model="pname" type="text" placeholder="标题 输入商品名称" id="tittle"></div>
 <div class='price'><span v-if="pmoney">￥</span><input v-model="pmoney" type="text" id="price" placeholder="价格 输入商品的价格" @keyup="isnumber"></div>
 <div class="content">
    <div class='presentation'>
      <textarea v-model="pintro" id="presentation" placeholder="商品简介（40字以内）"></textarea>
    </div>
    <div class="upimg" @click="getimg">
      <img v-if="imgsrc" :src="imgsrc" alt="">
      <div class="logo" v-if="!imgsrc">
        <p><span>+</span></p>
        <p>添加</p>
      </div>
      <input id='img' type="file"  ref="aptitude" accept="image/*" @change="ImgBase64($event,'aptitude')">
    </div>
 </div>
 <button class="isok" @click="publishGood" :class="iscan">确定发布</button>
</div>
</template>

<script>
import {Indicator,Toast ,MessageBox} from 'mint-ui'
import axios from 'axios'
import qs from 'qs'
  export default{
    name: 'Publish',
    data() {
      return {
        imgsrc:'',
        token:'',
        pmoney:'',
        pname:'',
        pintro:""
      }
    },
    computed:{
      iscan:function(){
        var can = [false,false,false,false]
        var lase=''
        if(this.pname){
          can[0]=true
          if(can[0]&&can[1]&&can[2]&&can[3]){
            lase ='canok'
            return lase
          }
        }
        if(this.pintro){
          can[1]=true
          if(can[0]&&can[1]&&can[2]&&can[3]){
            lase ='canok'
            return lase
          }
        }
        if(this.imgsrc){
          can[2]=true
          if(can[0]&&can[1]&&can[2]&&can[3]){
            lase ='canok'
            return lase
          }
        }
        if(this.pmoney){
          can[3]=true
          if(can[0]&&can[1]&&can[2]&&can[3]){
            lase ='canok'
            return lase
          }
        }
      }
    },
    methods: {
      isnumber(){
        if(this.pmoney[0]==".") {
          this.pmoney = '0.'
        }
        if (!(/\d+(?:\.\d{0,4})?$/.test(this.pmoney))) {
          this.pmoney=this.pmoney.substr(0,this.pmoney.length-1)
        }
        if(this.pmoney.indexOf(".")!=-1){
          var str_=this.pmoney.substr(this.pmoney.indexOf(".")+1);
          //限制只能输入一个小数点
          if(str_.indexOf(".")!=-1){
            this.pmoney=this.pmoney.substr(0,this.pmoney.indexOf(".")+str_.indexOf(".")+1);
          }else{
            if(str_.length>2){
              this.pmoney=this.pmoney.substr(0,this.pmoney.indexOf(".")+3)
            }
          }
        }

      },
      getimg(){
        var img =this.$refs.aptitude
        img.click()
      },
      ImgBase64(e) {
        let tag = e.target;
        let fileList = tag.files;
        let imgNum = fileList.length;
        let _this = this;
        if(!fileList.length){
            return
        }
        Indicator.open('图片上传中')
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
            // if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
            //   expectWidth = 800;
            //   expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
            // } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
            //   expectHeight = 1200;
            //   expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
            // }
            expectWidth=800;
            expectHeight=800;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = expectWidth;
            canvas.height = expectHeight;
            ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
            var base64 = null;
            // // 修复ios上传图片的时候 被旋转的问题
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
            // _this.idcardsrc=base64
            if(!base64){
              Toast('上传失败，请重新选择图片，或者更换图片')
              return
            }
            _this.upimg(base64,_this)
          }
        }
      },
    upimg(imgsrc, category,_this){
      var _this= this
        axios.post(BASE_URL + '/index.php?r=Common/UploadImg', qs.stringify({
          token:" 6fHdQpdyvCQGgokuQQ",
          fileImg: imgsrc,
        })).then(function (res) {
          Indicator.close()
          var a = Base64.decode(res.data)
          a = JSON.parse(a)
          if (a.code==10000) {
            if(a.data.err == "10000"){
              _this.imgsrc = a.data.data.imgUrl
            }
          } else {
            Toast(a.info)
          }
        }).catch(function (err) {
          Indicator.close()
        });
      },
      publishGood(){
         if(!this.pname){
          Toast('请输入商品名称')
          return
        }
        if(!this.pmoney){
          Toast('请输入商品金额')
          return
        }
        if (!(/\d+(?:\.\d{0,4})?$/.test(this.pmoney))) {
          Toast('请输入正确金额')
          return
        }

        if(!(/^[0-9]+(\.[0-9]{0,2})?$/g).test(this.pmoney)){
          Toast('请输入正确商品金额')
          return
        }
        if(!this.pintro){
          Toast('请输入商品简介')
          return
        }
        if(this.pintro.length>40){
          Toast('商品简介不能超过40字符')
          return
        }
         if(!this.imgsrc){
          Toast('请上传商品图片')
          return
        }
        Indicator.open()
        axios.post(BASE_URL+'/index.php?r=YinjiaStage/GoodsPush',qs.stringify({
          token:this.token,
          pmoney:this.pmoney,
          pname:this.pname,
          pintro:this.pintro,
          pdpicture:this.imgsrc
        })).then(function(res){
          Indicator.close()
          var data = JSON.parse(Base64.decode(res.data))
          if(data.code==10000){
             Toast('发布成功')
              window.location.href='#/travel/index'
          }else{
            Toast(data.info)
          }
        }).catch(function (err) {
          Indicator.close()
        });
      }
    },
    mounted() {
      this.token = localStorage.getItem('tenant')
      document.title='商品发布'
    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">
#publish{
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-flow: column;
  overflow: scroll;
  #img{
    display: none;
  }
  .name,.price{
     padding:0 0.75rem;
    height: 2.73rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input{
      font-size: 0.7rem;
      flex: 1;
      height: 1.5rem;
      border: none;
      color: #333;
    }
    input::placeholder{
      color: #999;

    }
    span{
      font-size: 0.7rem;
      color: #333;
      padding-right: 0.5rem;
    }
  }
  .content{
    padding:0 0.75rem;
    flex: 1;
    position: relative;
    .presentation{
      textarea{
        width: 100%;
        height: 15rem;
        font-size: 0.7rem;
        color: #333;
        border:none;
        padding-top:1rem;
      }
      textarea::placeholder{
        color: #999;
      }
    }
    .upimg{
      position: absolute;
      width: 4rem;
      height: 4rem;
      background: #f3f5f9;
      left: 0.75rem;
      bottom:1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 100%;
        height: 100%;
      }
      .logo{
        color: #999;
        font-size: 0.55rem;
        p{
          display: flex;
          justify-content: center;
          span{
            display: block;
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
            border: 1px solid #999;
            text-align: center;
            line-height: 0.7rem;
          }
        }
      }
    }
  }
  .isok{
    height: 2.5rem;
    background: #e9c1b6;
    border: none;
    font-size: 0.7rem;
    color: #fff;
  }
  .canok{
    background:#ff3737;
  }



}

</style>
