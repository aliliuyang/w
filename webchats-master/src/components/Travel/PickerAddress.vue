<template>
  <div class="pickerAddress">
    <div class="list">
        <h5 class="title"><span @click="selectCity"></span>请选择城市<span @click="selectCity">取消</span></h5>
         <ul>
           <li v-for="attr in addresslist" @click='getTow(attr)' >{{attr.cat}} </li>
         </ul>
     </div>
    <div class="background">

    </div>
  </div>

</template>

<script>
import { Picker } from 'mint-ui';
import axios from "axios";
import qs from "qs";
  export default{
    name: 'PickerAddress',
    props:['selectCity','sureCity',],
    data() {
      return {
        show:false,
        myaddress:[],
        addresslist:[],
        city:[]
      }
    },
    methods: {
      getTow(attr){
        this.myaddress.push(attr)
        if(this.myaddress.length>=2){
          this.sureCity(this.myaddress)
          return
        }
        var that =this
        axios.post(BASE_URL+"/index.php?r=YinjiaStage/GetRegion",qs.stringify({
          catid:attr.catid,
          level:2,
        })).then(function(res){
          var a= JSON.parse(Base64.decode(res.data))
          that.addresslist=a.data.data
        }).catch(function(err){

        })
      }

    },
    mounted() {
      var that =this
       axios.post(BASE_URL+"/index.php?r=YinjiaStage/GetRegion",qs.stringify({
          catid:'',
        })).then(function(res){
          var a= JSON.parse(Base64.decode(res.data))
          that.addresslist=a.data.data
        }).catch(function(err){

        })
    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style  lang="scss">
.pickerAddress{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  /*background: #eee;*/
  .background{
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: #eee;
    }
  .list{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 20rem;
    background: #fff;
    z-index: 100;
  }
  h5{
    text-align: center;
    font-size: 0.8rem;
    line-height: 2rem;
    display: flex;
    justify-content:space-between;
    color:#333;
    border-bottom: 1px solid #eee;
    span{
      color: #333;
      font-size: 0.65rem;
      padding:0 0.75rem;;
    }
  }
  ul{
    height:18rem;
    overflow: scroll;
    z-index: 999;
    li{
      font-size: 0.8rem;
      padding-left: 0.75rem;
      line-height: 2rem;
    }
  }
  .picker-item{
    font-size: 0.65rem;
  }
}

</style>
