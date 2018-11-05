<template>
 	<div class="search" action="" method="post">
 		<form @submit="search()">
 			<input type="search" v-model="text" placeholder="搜索" @keyup="searchlist"/>
 		</form>
	    <ul class="search-list" v-if="isshow">
	      <li v-for=" item in list.data" @click="search(item.categoryid)">在<span>{{item.categoryName}}</span>中搜索<span>{{text}}</span></li>
	    </ul>
 	</div>
</template>

<script>

  import Vue from 'vue'
  import { Indicator } from 'mint-ui';
  import axios from 'axios';
  import qs from 'qs';
  export default{
	  	name: 'Search',
	  	data () {
	    	return {
				  text:'',
		          list:'',
		          isshow:false,
		          time:null
		        }
	  	},

	  	methods:{
	  		transform(str){
	  		  var url = Base64.encode(str)
          	  url= url.replace('/','$')
      			return url
      		},
       		search(id){
	  		    var cateid = id||''
            	this.isshow=false
			      var url ='#/goodslist/'+this.transform('kw='+this.text+'&cateid='+cateid)
	            if(url==window.location.href.split('?')[1]){
	                return false
	            }
        		Indicator.open()
       			document.activeElement.blur();
       			window.location.href=url;
       		},
          searchlist(){
            var that =this
            clearTimeout(this.timer)
            if(!that.text){
              that.list=''
              that.isshow=false
              return
            }
            this.timer = setTimeout(function(){
             axios.post(BASE_URL+'/index.php?r=jdproduct/recommand',qs.stringify({
               keywords:that.text
             })).then(function(res){
               var a=Base64.decode( res.data)
               a=JSON.parse(a)
               if(a.data.length){
                 that.isshow=true
                 that.list=a
               }else{
                 that.list=''
                 that.isshow=false
               }
             }).catch(function(err){

             })
            },800)

          }


	  	},
	  	mounted(){


      },
		updated(){

		},
		activated(){

		}
	}


</script>

<style scoped lang="scss">
	.search{
    position: relative;
    width:100%;
		input{
			width:100%;
			height: 1.65rem;
			border-radius: 0.9rem;
			background: url(../../assets/images/search.png) no-repeat #eee 0.25rem center;
			border: none;
			font-size: 0.7rem;
			padding-left: 1.25rem;
			background-size: 0.75rem;
			opacity: 0.8;
		}
    input::-webkit-search-cancel-button { display: none; }
    .search-list{
      position: absolute;
      background: #fff;
      top:1.8rem;
      width:92%;
      padding: 0.5rem 0 ;
      padding-left: 0.7rem;
      padding-right: 0.7rem;
      opacity: 0.95;
      border-radius: 1rem;
      z-index: 8888;
      li{
        font-size: 0.7rem;
        line-height: 1rem;
        span{
          color: #ff3737;
          padding:0 0.2rem;

        }
      }
    }
	}

</style>
