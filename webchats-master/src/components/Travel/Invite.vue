<template>
<div id="invite" v-if="codesrc">
  <div class="outside">
      <p>扫一扫 </p>
      <p>分店快捷入驻</p>
      <div class="code_box">
        <img :src="codesrc" alt="">
      </div>
      <div class="hint">
                   该链接24小时内有效
      </div>
  </div>
</div>
</template>

<script>
	import axios from 'axios'
  import qs from 'qs'
  import {Toast, MessageBox, Indicator, Spinner} from 'mint-ui'

  export default{
    name: 'Invite',
    data() {
      return {
        codesrc:'',
        token: '',
      }
    },
    methods: {},



    mounted() {
    	this.token = localStorage.getItem('tenant')
    	var that = this
	  	axios.post(BASE_URL + '/index.php?r=YinjiaStage/MerStore', qs.stringify({
    		token: this.token,
  		})).then(function (res) {
    		var a = JSON.parse(Base64.decode(res.data))

    	if (a.code == 10000) {

    		that.codesrc = a.data.data.codeUrl
    		Toast(a.data.msg)
      }
  		}).catch(function (err) {
				Toast(a.data.msg)
  		})

    },
    updated() {

    },
    activated() {

    },
    components: {}
  }
</script>

<style scoped lang="scss">
#invite{
  background: -webkit-linear-gradient(#ecbf71, #e6b559); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#ecbf71, #e6b559); /* Opera 11.1 - 12.0 */
	background: -moz-linear-gradient(#ecbf71, #e6b559); /* Firefox 3.6 - 15 */
	background: linear-gradient(#ecbf71, #e6b559); /* 标准的语法 */
	padding: 1rem 1rem;
	height: 100%;
	.outside{
		width: 16.75rem;
    margin: 0 auto 3.12rem auto;
    background-color: #fff;
    padding: 2rem 0;
    border-radius: 0.15rem;
    p{
    	font-size: 0.8rem;
    	color: #333333;
    	text-align: center;
    	line-height: 1.5rem;
    }
    .code_box{
    	width: 12rem;
    	height: 12rem;
    	margin: 0.75rem auto 0.75rem auto;
  	}
    .code_box img {
	    width: 100%;
	    height: 100%;
	  }

    .hint{
    	font-size: 0.9rem;
    	color: #333333;
    	text-align: center;
    	line-height: 1.5rem;
    }
	}
}
</style>
