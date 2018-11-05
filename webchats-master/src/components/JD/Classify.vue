<template>
      <div class="classify">
          <div class="classify-top">
            <search></search>
            <a class="iconfont icon-fenlei" href="#/qustore"></a>
          </div>
          <div class="classify-content" >
              <div class="classify-nav"  >
                    <ul>
                      <li v-for="item in menu" :class="classifyid==item.catId?'active':''" @click='getMenu(item.catId)'>{{item.name}}</li>
                    </ul>
              </div>
              <div  class="classify-menu">
                  <div class="alltow" ref="myscroll">
                      <div class="tow-tit" v-for="a in classify" >
                        <p class="two" ><b v-text="a.name"></b></p>
                        <ul class="clear">
                          <li v-for="b in a.child">
                            <a :href="'#/goodslist/'+transform('kw=&cateid='+b.catId)">
                              <img :src="'http://image.yifuka.com/'+b.imgurl" alt=""/>
                              <p>{{b.name}}</p>
                            </a>
                          </li>
                        </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
  import Search from './Search'
  import axios from 'axios';
	import qs from 'qs';
	import { Indicator } from 'mint-ui';
  export default {
	  	name: 'Classify',
	  	data () {
	    	return {
          classify:[],
          classifyid:'',
          menu:[],
	    	}
	  	},
	  	methods:{
     		getMenu(id) {
          Indicator.open({spinnerType: 'triple-bounce'})
          this.$refs.myscroll.scrollTop=0
	        	var that =this
	      		var goodid=id||'';
	        	this.classifyid=id
	        	axios.post(BASE_URL+'/index.php?r=jdproduct/Testc',qs.stringify({
								catid:goodid
		        })).then(function(res){
              Indicator.close();
	        			that.classify=res.data.data.catgory.cattwo;
	          }).catch(function(err){
              Indicator.close();
	          })
      	},
      	transform(str){
          var url = Base64.encode(str)
          url= url.replace('/','$')
          return url
      	}
	  	},
	  	computed:{

	  	},
	  	mounted(){
        Indicator.open()
        document.title = '分类'
        var that =this
       // 1316
        var mycatid = this.$route.params.catid
        if(mycatid=='no'){
          mycatid=''
        }

        axios.post(BASE_URL+'/index.php?r=jdproduct/Testc',qs.stringify({
          catid:mycatid
        })).then(function(res){
          Indicator.close();
           that.menu=res.data.data.catgory.catone;
          that.classify=res.data.data.catgory.cattwo;
          if(mycatid){
            that.classifyid = mycatid
          }else{
            that.classifyid = that.menu[0].catId
          }
        }).catch(function(err){

        })
      },
      updated(){

      },
      activated(){

      },
      components:{
        "search":Search
      }
	}

</script>

<style scoped lang="scss">
    .classify{
        height: 100%;
        width: 100%;
        background: #F5F5F5;
        .classify-top{
            height: 2.25rem;
            display: flex;
          width: 100%;
            justify-content: space-between;
            border-bottom: 1px solid #f3f2f8;
            align-items: center;
            padding: 0 0.75rem;
            background:#fff;
            position: fixed;
            top:0rem;
            left:0;
             z-index: 100;
            a{
              margin-left: 0.8rem;
                display: block;
                width: 1.5rem;
                height: 1.5rem;
                border: none;
                border-radius: 50%;
                background: #F5F5F5;
                color:#999;
                text-align: center;
				line-height: 1.4rem;
				color: #999;
				font-size: 0.75rem;
				font-weight: bold;
            }
        }
        .classify-content{
            background:#f3f2f8;
            height: 100%;
          display: flex;
            justify-content: space-between;
            background: #F5F5F5;
            position: relative;
            .classify-nav{
                width: 4rem;
                height: 100%;
                margin-right: 0.6rem;
                overflow: scroll;
              ul{
                margin-top: 2.25rem;
                width: 4rem;
              }
                li{
                    width: 4rem;
                    height:2.2rem;
                    background: #fff;
                    text-align: center;
                    border-bottom: 1px solid #f3f2f8;
                    line-height: 2.2rem;
                    font-size:0.6rem;
                }
                .active{
                    background: #F5F5F5;
                    color: #ff3b3b;
                }

            }
          .classify-nav::-webkit-scrollbar{display:none;}
            .classify-menu{
                background:#f5f5f5;
                margin-right: 0.8rem;
                display: flex;
                flex: 1;
                height: 100%;
                box-sizing: border-box;
                position: relative;
              .alltow{
                padding-top: 2.25rem;
                height:100%;
                overflow: scroll;
                width: 100%;
              }
              .two{

                  color: #333;
                  font-size: 0.7rem;
                  background: #f5f5f5;
                 line-height: 1.8rem;
              }
              ul{
                  padding:0 0.75rem;
                 background: #fff;
                  padding-bottom: 0.5rem;
               }
                li{
                    width: 33.33%;
                    height: 6.25rem;
                    float: left;
                    text-align: center;
                    img{
                        width: 2.8rem;
                        vertical-align: middle;
                        margin: 1rem 0;
                    }
                    p{
                      padding: 0 0.2rem;
                        font-size: 0.6rem;
                    }
                }
            }
            .alltow::-webkit-scrollbar{display:none;}
        }
    }

</style>
