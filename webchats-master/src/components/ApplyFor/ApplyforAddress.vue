<template>
  <div id="ApplyforAddress">
      <div><span>所在地区：</span><p><i v-for="item in city">{{item.name}}</i></p><b @click="allhidden" class="iconfont icon-jiantou-copy"></b></div>
      <div><span>详细地址:</span><p><input v-model="detailAdress" type="text"></p><b></b></div>
     	<p> <button @click="getAddress(city,detailAdress)">保存地址</button></p>
     	<city v-if="showcity" :allhidden=allhidden :setaddress=setaddress></city>
     	<div v-if="showcity" class="zhezhao"></div>
  </div>
</template>
<script>

import City from '../Address/City';
  export default {
	  	name: 'ApplyforAddress',
	  	props:['getAddress'],
	  	data () {
	    	return {
            detailAdress:'',
            city:[],
            showcity:true
	    	}
	  	},
	  	methods:{
				allhidden(){
					this.showcity=!this.showcity
				},
				setaddress(value){
					this.city=value
				}
	  	},
	  	mounted(){

		},
		updated(){

		},
		activated(){

		},
	    components:{
				"city":City
	    }
	}

</script>

<style scoped lang="scss">
#ApplyforAddress{
  background: #fff;
  width: 100%;
  height:100%;
  position: relative;
  .zhezhao{
  	position: absolute;
  	width: 100%;
  	height: 100%;
  }
  div{
    padding: 0 0.75rem;
    display: flex;
    justify-content: space-between;
    height: 2.75rem;
    align-items: center;
    border-bottom: 1px solid #eee;
    span{
      font-size: 0.65rem;
      color: #666;
    }
    p{
      flex: 1;
      color: #333;
      display: flex;
      align-items: center;
      i{
      	font-size: 0.65rem;
      }
      input{
        border: none;
        padding-left: 0.5rem;
        font-size: 0.65rem;
        width: 100%;
      }
    }
    b{
      color: #666;
      font-size: 0.65rem;
    }
  }
  p{
  	padding: 0.75rem ;
  	height: 2.25rem;
  	button{
  		background: #FF3737;
  		border: none;
  		width: 100%;
  		height: 2.25rem;
  		color: #fff;
  		font-size: 0.75rem;
  		
  	}
  }
}

</style>
