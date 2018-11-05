<template>
  <div id="mylist" ><!--//:class="this.type=='line' ? 'line-list' : 'brick-list'"-->
    <!--<div :class="this.type=='line' ? 'line-list' : 'brick-list'" >-->
    <!--  <div class="line-list"  v-if="type=='line'">
	    <ul class="clear">
	      	<li v-for="item in goods" class="goods">
	      		<a  :href='"#/details/"+transform(item.sku)'>
			      	<div class="goodsImg">
			      		<img v-lazy=imgpath+item.imagePath alt="" />
			      	</div>
			      	<div class="goodstext">
			      		<p class="goodsName">{{item.name}}</p>
			      		<p class="goodsPrice"><span>¥&nbsp;{{item.frontPrice}}</span><i v-if="item.isPro==1">¥&nbsp;{{item.prejiage}}</i></p>
			      	</div>
		      	</a>
	      	</li>
	    </ul>
    </div> -->
      <div :class="this.type=='line' ? 'line-list' : 'brick-list'" >
      <ul class="clear">
        <li v-for="item in goods" class="goods">
          <a  :href='"#/details/"+transform(item.sku)'>
            <div class="goodsImg">
              <img v-lazy=imgpath+item.imagePath alt="" />
            </div>
            <div class="goodstext">
              <p class="goodsName">{{item.name}} <span class="economize" v-if="!(item.savem==0)"> <b>中欣通支付约省{{item.savem}} </b></span> </p>
              <p class="goodsPrice"><span>¥&nbsp;{{item.frontPrice}}</span><i v-if="item.isPro==1">¥&nbsp;{{item.prejiage}}</i></p>
            </div>
          </a>
        </li>
      </ul>
      </div>
  </div>
</template>
<script>
  import { Lazyload } from 'mint-ui';
    import {Indicator, Loadmore} from 'mint-ui';
	export default {
	  	name: 'List',
	  	props:['type','goods','imgpath','getmore'],
	  	data () {
	    	return {
				items:[]
	    	}
	  	},
	  	methods:{
	  		transform(str){
      			return Base64.encode(str)
        },
        // loadBottom() {
        //   this.getmore()
        // },
	  	},
	  	mounted(){
	  		this.item=this.goods
		},
		updated(){

		},
		activated(){

		}

	}
</script>

<style lang="scss" scoped >
#mylist{
   overflow:scroll;
   width:100%;
  .line-list{
    ul{
      width: 100%;
      li{
        width: 100%;
        height: 5.5rem;
        background: #fff;
        a{
          display: block;
          width: 100%;
          display:flex;
          justify-content: space-between;
          .goodsImg{
            padding-top: 0.25rem;
            width: 4.5rem;
            height: 5.5rem;
            margin: 0 0.5rem;
            display: flex;
            img{
              align-items: center;
              width: 100%;
            }
          }
          .goodstext{
            flex: 1;
            border-bottom: 1px solid #f3f2f8;
            padding:0.4rem 0.75rem 0.4rem 0.5rem;
            box-sizing: border-box;
            overflow: hidden;
            .goodsName{
              font-size: 0.65rem;
              color: #333;
              box-sizing: border-box;
              height: 4rem;
              overflow: hidden;
              .economize{
                display: block;
                padding-top: 2px;
                border: none;
                b{
                  width: auto;
                  font-weight: normal;
                  margin-top: 3px;
                  font-size: 0.5rem;
                  color: #29218e;
                  border:1px solid #29218e;
                  padding: 1px 3px;
                  -webkit-border-radius: 4px;
                  -moz-border-radius: 4px;
                  border-radius: 4px;
                }

              }
            }
            .goodsPrice{
              color: #ff3b3b;
              font-size:0.45rem;
              span{
                font-size: 0.6rem;
              }
              i{
                margin-left: 1rem;
                font-size: 0.5rem;
                color: #666;
                text-decoration: line-through;
              }
            }
          }
        }
      }
    }
  }
  .brick-list{
    width: 100%;
    overflow: hidden;
    ul{
      width: 100%;
      background: #fff;
      /*display: flex;*/
      /*justify-content: start;*/
      /*flex-wrap:wrap;*/
      /*flex: 1;*/
      /*overflow: scroll;*/
      .goods{
        width: 48%;
        margin-top: 0.25rem;
        background: #fff;
        margin-right: 0.25rem;
        float: left;
        a{
          display: block;
          width: 100%;
          .goodsImg{
            width: 100%;
            img{
              width: 100%;
              align-items: center;
            }
          }
          .goodstext{
            width: 100%;
            padding: 0.5rem;
            font-size:0.65rem;
            .goodsName{
              width: 100%;
              overflow: hidden; /*自动隐藏文字*/
              text-overflow: ellipsis;/*文字隐藏后添加省略号*/
              white-space: nowrap;
              line-height: 1rem;
            }
            .economize{
              display: block;
              border: none;
              background: #fff;
              b{
                font-size: 0.5rem;
                color: #29218e;
                padding: 1px 3px;
                font-weight: normal;
                border:1px solid #29218e;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
              }

            }
            .goodsPrice{
              margin-top: 0.6rem;
              font-size: 0.5rem;
              color:#ff3b3b;
              span{
                font-size: 0.65rem;
              }
              i{
                font-size: 0.5rem;
                margin-left: 0.6rem;
                color: #666;
                text-decoration: line-through;
              }
            }
          }

        }
      }
    }
  }
}

</style>
