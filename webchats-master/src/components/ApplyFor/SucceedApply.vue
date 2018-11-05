<template>
	<div class="ok-apply">
		<div><img src="../../assets/images/sq.jpg" alt="" /></div>
		<h4>售后服务单申请成功</h4>
		<div>
			<p>申请时间：<span>{{nowData}}</span></p>
			<p>服务类型：<span>{{way}}</span></p>
		</div>
		<div class="leave">
			<a :href='"#/ApplyPlan"+applyforId'>进度查询</a>
			<a href="#/after">售后首页</a>
		</div>
	</div>
</template>

<script>
	export default{
	  	name: 'SucceedApply',
      props:['aftertype','applyforId'],
	  	data () {
	    	return {
            nowData:'',
            way:''
	    	}
	  	},
	  	methods:{

	  	},
	  	mounted(){
        this.isgologin()
			 document.title = '售后申请成功'
	        if(this.aftertype==10){
	          this.way="退货"
	        }
	        if(this.aftertype==20){
	          this.way="换货"
	        }
	        if(this.aftertype==30){
	          this.way="维修"
	        }
	        var date= new Date();
	        var seperator1 = "-";
	        var seperator2 = ":";
	        var month = date.getMonth() + 1;
	        var strDate = date.getDate();
	        if (month >= 1 && month <= 9) {
	          month = "0" + month;
	        }
	        if (strDate >= 0 && strDate <= 9) {
	          strDate = "0" + strDate;
	        }
	        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	          + " " + date.getHours() + seperator2 + date.getMinutes()
	          + seperator2 + date.getSeconds();
	        this.nowData =currentdate
		},
		updated(){

		},
		activated(){

		},
	    components:{

	    }
	}
</script>

<style scoped lang="scss">
.ok-apply{
	width: 100%;
	height:100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;
	background: #fff;
	img{
		margin-top: 3.15rem;
		width: 3.75rem;
		height: 3.75rem;
	}
	h4{
		line-height: 4rem;
		font-weight: normal;
		font-size: 0.75rem;
		color: #333;
	}
	p{
		color: #333;
		font-size: 0.65rem;
		padding-bottom: 1rem;
		span{
			color: #FF3737;
		}
	}
	.leave{
		padding-top: 0.5rem;
		a{
			display:inline-block;
			padding: 0.65rem 1.5rem;
			border:1px solid #999;
			color: #666;
			font-size: 0.7rem;
		}

	}
}

</style>
