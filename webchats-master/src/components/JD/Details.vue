<template>
    <div id="goods-details">
      <goods-data v-if=titshow v-show=!isshowtext :selectGoods=selectGoods :canAdd=canAdd  :tit.sync=tit  :showtext=showtext  :carnumber=carnumber  :detaildsinit="detaildsinit"></goods-data>
			<pic-details v-if=isshowtext :param=param :introduction=introduction :hiddentext=hiddentext :selectGoods=selectGoods></pic-details>
		  <car-tab :nice=nice></car-tab>
    </div>
</template>

<script>
	import Vue from 'vue'
	import CarTab from './CarTab'
	import GoodsData from './Details/GoodsData'
	import PicDetails from './Details/PicDetails'
	import { Indicator } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	import axios from 'axios';
	import qs from 'qs';
	import {mapActions} from 'vuex'
	import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';
	export default{
	  	name: 'Detailss',
	  	data () {
	    	return {
	          isshowtext:false,
	          titshow:false,
	          tit:{},
	          id:'',
	          param:'',
	          introduction:'',
	          selectGoods:[{img:'',frontPrice:'',sku:'',name:'',number:1 ,options:'',store:'京东',wxgoodshref:'',zxtprejiage:'',savem:''}],
	          addcar:true
	    	}
	  	},
	  	methods:{
        ...mapActions({
          addCar:'addCar',
        }),
        canAdd(str){
        	if(str=='无货'){
        		this.addcar=false
        	}else{
        	  if(str=='该商品已下架'){
              this.addcar=false
            }else{
               this.addcar=true
            }
          }

        },
        showtext(){
          this.isshowtext=true
        },
        hiddentext(){
          this.isshowtext=false
        },
			  detaildsinit(sku,str){
				  var that = this
		  		axios.post(BASE_URL+'/index.php?r=jdproduct/view',qs.stringify({
		  			id:Base64.encode(sku),
		  		})).then(function(res){
		  			Indicator.close()
		  			var a =Base64.decode(res.data)
            a=JSON.parse(a)
            if(a.data.err==10002){
              that.tit=a.data
              that.titshow=true
              that.param=that.tit.product.product.param
              that.introduction=that.tit.product.product.introduction
              that.selectGoods[0].sku=that.tit.product.product.sku;
              that.selectGoods[0].name=that.tit.product.product.name;
              that.selectGoods[0].img=that.tit.imgpath+that.tit.product.product.imagePath;
              that.selectGoods[0].frontPrice=that.tit.product.product.frontPrice;
              that.selectGoods[0].wxgoodshref='#/details/'+Base64.encode(that.tit.product.product.sku);
              that.selectGoods[0].options=str.substring(0,str.length-1);
              that.selectGoods[0]. zxtprejiage=that.tit.product.product.zxtprejiage
              that.selectGoods[0].savem=that.tit.product.product.savem
            }else{
              Toast('获取商品信息失败');
            }
		  		}).catch(function(err){
            Indicator.close()
            	Toast('获取商品信息失败');
          });
			  },
        carnumber(n){
        
          this.selectGoods[0].number = n
          
        },

	    nice(){
				console.log(1)
	    	 if(this.selectGoods[0].number>2){
	    	 	alert(1)
	    	 }
	    	if(this.addcar){
	    		if(this.selectGoods[0].sku){
	    			this.addCar(this.selectGoods)
	    			console.log(1)
		    	}else{
		    		return
		    	}
	    	}else{
	    		Toast('该商品此地区无货或已下架');
	    	}
	    },
        getoptions(sku){
		    var that=this
          	var options = ''
          	axios.post(BASE_URL+'/index.php?r=jdproduct/Chonggou',qs.stringify({
            	sku:Base64.encode(sku)
          	})).then(function(res){
           		 var a=JSON.parse(Base64.decode(res.data)).data.product;
	            if(JSON.parse(Base64.decode(res.data)).data.err==10005) {
	              MessageBox({
	                title: '提示',
	                message: '该商品以下架',
	              })
	              return
	            }
	            if(JSON.parse(Base64.decode(res.data)).data.err==10003){
	              options=''
	            }
	            if(JSON.parse(Base64.decode(res.data)).data.err==10002){
	              for(var i=0;i<a.length;i++){
	                for(var j=0;j<a[i].salevalue.length;j++){
	                  if(a[i].salevalue[j].isshow=='1'){
	                    options += a[i].salevalue[j].saleValue+','
	                  }
	                }
	              }
							}
	            that.detaildsinit(sku,options)
	          }).catch(function(err){

	          });
        }
	  	},
      mounted(){
         document.title = '商品详情'
        Indicator.open()
        var id=Base64.decode(this.$route.params.id);
        this.getoptions(id)
      },
      // deactivated(){
      //   // this.$destroy()
      // },
      updated(){

      },
      activated(){

      },
      components:{
        'car-tab':CarTab,
        "pic-details":PicDetails,
        'goods-data':GoodsData,
        }
	    }

</script>

<style scoped lang="scss">
#goods-details{
	background: #f5f5f5;
	height: 100%;
	width: 100%;
}


</style>
