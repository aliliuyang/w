<template>
	<div id="woman">
		<div class="title">
      <a class="as" @click="atitle1"></a>
      <a @click="atitle2" ></a>
      <a @click="atitle3"></a>
		</div>
    <div id="box1">
		  <div class="lovehome  default" :class="isacting(newtime,start1,endtime1)" id="title1"></div>
    </div>
		<div class="hometime love" v-if="(new Date(newtime)-new Date(endtime1))<0">
			<i class="_d1" id="_d1" :class="newtime>=start1&&newtime<endtime1 ?'pink':''">{{Tone.day}}</i>
			<span>天</span>
			<i class="_h1" :class="newtime>=start1&&newtime<endtime1 ?'pink':''">{{Tone.hour}}</i>
			<span>时</span>
			<i class="_m1" :class="newtime>=start1&&newtime<endtime1 ?'pink':''">{{Tone.minute}}</i>
			<span>分</span>
			<i class="_s1" :class="newtime>=start1&&newtime<endtime1 ?'pink':''">{{Tone.second}}</i>
			<span>秒</span>
		</div>
		<div class="lh_end defaultend" v-if="(new Date(newtime)-new Date(endtime1))>=0"></div>
		<div class="lovehomew defaults" >
      <a class="aw1" href="#/classify/1620"></a>
      <a class="aw2" href="#/goodslist/a3c95Lmd5rSy6bm$JmNhdGVpZD0xMzgxOQ=="></a>
      <a class="aw3" href="#/goodslist/a3c9IkhvbW15IiZjYXRlaWQ9MTYyMA=="></a>
      <a class="aw4" href="#/goodslist/a3c9Iui$jummqCImY2F0ZWlkPTE2MjA="></a><!--迎馨-->
      <a class="aw5" href="#/goodslist/a3c9IuS6keiVviImY2F0ZWlkPTE2MjA="></a>
      <a class="aw6" href="#/goodslist/a3c9IuWNl+aegeS6uiImY2F0ZWlkPTE2MjA="></a>
      <a class="aw7" href="#/goodslist/a3c95Y2X5p6B5Lq6JmNhdGVpZD0xNjIx"></a>
      <a class="aw8" href="#/goodslist/a3c9IumhuuiJuiImY2F0ZWlkPTE2MjA="></a>
      <a class="aw9" href="#/goodslist/a3c9IuWkqeWggiImY2F0ZWlkPTE2MjA="></a>
      <a class="aw10" href="#/goodslist/a3c95rqQ55Sf5rS7JmNhdGVpZD0xMzgxOA=="></a>
      <a class="aw11" href="#/goodslist/a3c9IumdkuiLhyImY2F0ZWlkPTE2MjA="></a>
      <a class="aw12" href="#/classify/1620"></a>
		</div>

    <div id="box2">
		  <div class="freaky default" :class="isacting(newtime,start2,endtime2)" id="title2">
		</div>
    </div>
		<div class="hometime fy" v-if="(new Date(newtime)-new Date(endtime2))<0">
			<i class="_d2" :class="newtime>=start2&&newtime<endtime2 ?'pink':''">{{Time2.day}}</i>
			<span>天</span>
			<i class="_h2" :class="newtime>=start2&&newtime<endtime2 ?'pink':''">{{Time2.hour}}</i>
			<span>时</span>
			<i class="_m2" :class="newtime>=start2&&newtime<endtime2 ?'pink':''">{{Time2.minute}}</i>
			<span>分</span>
			<i class="_s2" :class="newtime>=start2&&newtime<endtime2 ?'pink':''">{{Time2.second}}</i>
			<span>秒</span>
		</div>
		<div class="fy_end defaultend" v-if="(new Date(newtime)-new Date(endtime2))>=0">
		</div>
		<div class="freakyw  defaults" >
      <a class="aw1" href="#/classify/1319"></a>
      <a class="aw2" href="#/goodslist/a3c9IuWlveWlhyImY2F0ZWlkPTEzMTk="></a>
      <a class="aw3" href="#/goodslist/a3c9IuiKseeOiyImY2F0ZWlkPTEzMTk="></a>
      <a class="aw4" href="#/goodslist/a3c9Iue+jui1nuiHoyImY2F0ZWlkPTEzMTk="></a>
      <a class="aw5" href="#/goodslist/a3c9IuaDoOawjyImY2F0ZWlkPTEzMTk="></a>
      <a class="aw6" href="#/goodslist/a3c9IuS6qOawjyImY2F0ZWlkPTEzMTk="></a>
      <a class="aw7" href="#/goodslist/a3c9IuW4ruWunemAgiImY2F0ZWlkPTEzMTk="></a>
      <a class="aw8" href="#/goodslist/a3c9Im51ayImY2F0ZWlkPTEzMTk="></a>
      <a class="aw9" href="#/goodslist/a3c9IumbheWfuSImY2F0ZWlkPTEzMTk="></a>
      <a class="aw10" href="#/goodslist/a3c9IuWuieWEv+S5kCImY2F0ZWlkPTEzMTk="></a>
      <a class="aw11" href="#/goodslist/a3c9Iui0neS6siImY2F0ZWlkPTEzMTk="></a>
      <a class="aw12" href="#/classify/1319"></a>
		</div>

    <div id="box3">
      <div class="love_beauty  default" :class="isacting(newtime,start3,endtime3)" id="title3">
      </div>
    </div>
		<div class="hometime beauty" v-if="(new Date(newtime)-new Date(endtime3))<0">
			<i class="_d3" :class="newtime>=start3&&newtime<endtime3 ?'pink':''">{{Time3.day}}</i>
			<span>天</span>
			<i class="_h3" :class="newtime>=start3&&newtime<endtime3 ?'pink':''">{{Time3.hour}}</i>
			<span>时</span>
			<i class="_m3" :class="newtime>=start3&&newtime<endtime3 ?'pink':''">{{Time3.minute}}</i>
			<span>分</span>
			<i class="_s3" :class="newtime>=start3&&newtime<endtime3 ?'pink':''">{{Time3.second}}</i>
			<span>秒</span>
		</div>
		<div class="lb_end defaultend" v-if="(new Date(newtime)-new Date(endtime3))>=0">
		</div>
		<div class="love_beautyw defaults" >
      <a class="aw1" href="#/classify/1316"></a>
      <a class="aw2" href="#/goodslist/a3c9IuaWveWNjuiUuyImY2F0ZWlkPTEzMTY="></a>
      <a class="aw3" href="#/goodslist/a3c9IuiGnOazleS4luWutiImY2F0ZWlkPTEzMTY="></a>
      <a class="aw4" href="#/goodslist/a3c9IuiHqueEtuWggiImY2F0ZWlkPTEzMTY="></a>
      <a class="aw5" href="#/goodslist/a3c9IuebuOWunOacrOiNiSImY2F0ZWlkPTEzMTY="></a>
      <a class="aw6" href="#/goodslist/a3c9Iui0neiniOW+lyImY2F0ZWlkPTEzMTY="></a>
      <a class="aw7" href="#/goodslist/a3c9IueOieWFsOayuSImY2F0ZWlkPTEzMTY="></a>
      <a class="aw8" href="#/goodslist/a3c9Iuasp+iOsembhSImY2F0ZWlkPTEzMTY="></a>
      <a class="aw9" href="#/goodslist/a3c9Iue+juiCpOivrSImY2F0ZWlkPTEzMTY="></a>
      <a class="aw10" href="#/goodslist/a3c9IuS4gOWPtuWtkCImY2F0ZWlkPTEzMTY="></a>
      <a class="aw11" href="#/goodslist/a3c9ImFmdSImY2F0ZWlkPTEzMTY="></a>
      <a class="aw12" href="#/classify/1316"></a>
		</div>
		<a class="button" href="#/qustore">
			点击返回趣商城
		</a>
	</div>
</template>



<script>
  import axios from 'axios';
  import qs from 'qs';
  export default{
  name:'Activitytheme',
  data(){
    return{
      newtime:'',
      endtime1:'2018/03/07 00:00:00',
      endtime2:'2018/03/08 00:00:00',
      endtime3:'2018/03/09 00:00:00',
      start1:'2018/03/06 00:00:00',
      start2:'2018/03/07 00:00:00',
      start3:'2018/03/08 00:00:00',
      Tone:{day:'00',hour:'00',minute:'00',second:'00'},
      Time2:{day:'00',hour:'00',minute:'00',second:'00'},
      Time3:{day:'00',hour:'00',minute:'00',second:'00'},
    }
  },
  computed:{

  },
	methods: {
    isacting(newtime,start,endtime){
        var classing =''
        var NT=new Date(newtime)
        var ST=new Date(start)
        var ET =new Date(endtime)
        if(NT>=ST&&NT<ET){
          classing = "bofc_conduct"
        }
        if(NT>=ET){
          classing = "bofc_end"
        }
        return classing
    },
    countdown(){
      var today = new Date(this.newtime);
      var a1 = new Date(this.endtime1);
      var a2 = new Date(this.endtime2);
      var a3 = new Date(this.endtime3);
      var s1 = new Date(this.start1);
      var s2 = new Date(this.start2);
      var s3 = new Date(this.start3);
      var time1 = today>=s1? a1 - today:s1-today;
      var time2 = today>=s2? a2 - today:s2-today;
      var time3 = today>=s3? a3 - today:s3-today;
      var that =this
      this.Tone=that.my(time1)
      this.Time2=that.my(time2)
      this.Time3=that.my(time3)

       setInterval(() =>{
        if( that.Tone.second==0){
            if(that.Tone.minute==0){
              if(that.Tone.hour==0){
                if(that.Tone.day==0){
                  clearInterval();
                  that.getnowtime()
                }else{
                  that.Tone.day--
                  if(  that.Tone.day<10){
                    that.Tone.day ='0'+ that.Tone.day
                  }
                  that.Tone.hour=23
                  that.Tone.minute=59
                  that.Tone.second=59
                }
              }else{
                that.Tone.hour--
                if(  that.Tone.hour<10){
                  that.Tone.hour ='0'+ that.Tone.hour
                }
                that.Tone.minute=59
                that.Tone.second=59
              }
            }else{
              that.Tone.minute--
              if(  that.Tone.minute<10){
                that.Tone.minute ='0'+ that.Tone.minute
              }
              that.Tone.second=59
            }
        }else{
          that.Tone.second--
          if( that.Tone.second<10){
            that.Tone.second='0'+that.Tone.second
          }
        }
        // console.log( that.Tone.second +'_______'+n++)
        if( that.Time2.second==0){
          if(that.Time2.minute==0){
            if(that.Time2.hour==0){
              if(that.Time2.day==0){
                clearInterval();
                that.getnowtime()
              }else{
                that.Time2.day--
                if(  that.Time2.day<10){
                  that.Time2.day ='0'+ that.Time2.day
                }
                that.Time2.hour=23
                that.Time2.minute=59
                that.Time2.second=59
              }
            }else{
              that.Time2.hour--
              if(  that.Time2.hour<10){
                that.Time2.hour ='0'+ that.Time2.hour
              }
              that.Time2.minute=59
              that.Time2.second=59
            }
          }else{
            that.Time2.minute--
            if(  that.Time2.minute<10){
              that.Time2.minute ='0'+ that.Time2.minute
            }
            that.Time2.second=59
          }
        }else{
          that.Time2.second--
          if( that.Time2.second<10){
            that.Time2.second='0'+that.Time2.second
          }
        }
  //活动三
        if( that.Time3.second==0){
          if(that.Time3.minute==0){
            if(that.Time3.hour==0){
              if(that.Time3.day==0){
                clearInterval();
                that.getnowtime()
              }else{
                that.Time3.day--
                if(  that.Time3.day<10){
                  that.Time3.day ='0'+ that.Time3.day
                }
                that.Time3.hour=23
                that.Time3.minute=59
                that.Time3.second=59
              }
            }else{
              that.Time3.hour--
              if(  that.Time3.hour<10){
                that.Time3.hour ='0'+ that.Time3.hour
              }
              that.Time3.minute=59
              that.Time3.second=59
            }
          }else{
            that.Time3.minute--
            if(  that.Time3.minute<10){
              that.Time3.minute ='0'+ that.Time3.minute
            }
            that.Time3.second=59
          }
        }else{
          that.Time3.second--
          if( that.Time3.second<10){
            that.Time3.second='0'+that.Time3.second
          }
        }

        //   if(time1>0){
        //     if(time1==0){
        //       clearInterval;
        //       that.getnowtime()
        //     }
        //     time1 = time1 -1000
        //     that.Tone=that.my(time1)
        //   }
        //   if(time2>0){
        //     if(time2==0){
        //       clearInterval;
        //       that.getnowtime()
        //     }
        //     time2 = time2 -1000
        //     that.Time2=that.my(time2)
        //   }
        //   if(time3>0){
        //     if(time3==0){
        //       clearInterval;
        //       that.getnowtime()
        //     }
        //     time3 = time3 -1000
        //     that.Time3=that.my(time3)
        //   }
        //   if (time1<0&&time2<0&&time3<0){
        //     clearInterval;
        //   }
        }, 1000);
    },
    my(time){
      var downtime1={day:0,hour:0,minute:0,second:0}
      downtime1.day = Math.floor(time / 3600000/24);
      downtime1.hour = Math.floor((time/3600000/24 - Math.floor(time / 3600000/24))*24);
      downtime1.minute = Math.floor((time / 3600000 - Math.floor(time / 3600000)) * 60);
      downtime1.second = Math.floor((time / 60000 - Math.floor(time / 60000)) * 60);
      downtime1.day= downtime1.day<10?"0" + downtime1.day:downtime1.day
      downtime1.hour= downtime1.hour<10?"0" + downtime1.hour:downtime1.hour
      downtime1.minute= downtime1.minute<10?"0" + downtime1.minute:downtime1.minute
      downtime1.second= downtime1.second< 10? "0" + downtime1.second: downtime1.second
      return downtime1
    },
    getnowtime(){
      var that =this
      axios.post(BASE_URL + '/index.php?r=site/gettime')
        .then(function(res) {
          that.newtime=res.data
          that.countdown()
        })
        .catch(function(err) {

        });
    },
  atitle1() {
    var title1 = document.getElementById("title1").offsetTop
    document.body.scrollTop = title1;
    document.documentElement.scrollTop = title1;
  },
  atitle2() {
    var title2 = document.getElementById("title2").offsetTop
    document.body.scrollTop = title2;
    document.documentElement.scrollTop = title2;
  },
  atitle3() {
    var title3 = document.getElementById("title3").offsetTop
    document.body.scrollTop = title3;
    document.documentElement.scrollTop = title3;
  }
  },
  mounted() {
    this.getnowtime()

  },
  updated() {

  },
}
</script>

<style scoped>
div{ background-repeat: no-repeat; background-size: cover; }
#woman{width: 100%; /*height: 100%;  */background-image: url(../assets/images/Activitytheme/woman.jpg);  padding:11.75rem 0 1.87rem 0;}
#woman .title{width:17.45rem; height:6.02rem; margin:0 auto; background-image: url(../assets/images/Activitytheme/title.png);}
.title a{ width:4.6rem; height: 3.59rem; display: inline-block; margin-top: 1.3rem ; margin-right: 0.09rem; border: }
.title a.as{ margin-left:1.4rem;}
/*公用*/

#woman .default{width:15.8rem; height: 2.4rem; margin: 0 auto;}
#woman .defaults:after{content: ""; display: block; height: 0; clear: both;}
#woman .defaults a{ display: block;float: left;}
#woman .defaults a.aw1{ width:14.87rem; height: 5.47rem; margin-top: 1.17rem;margin-left: 1.25rem;}
#woman .defaults a.aw2{ width:7.75rem; height: 3.2rem; margin-top: 0.55rem;margin-left:0.8rem;}
#woman .defaults a.aw3{ width:7.9rem; height: 3.2rem; margin-top: 0.55rem;margin-left:0.1rem;}
#woman .defaults a.aw4{ width:7.75rem; height: 3.2rem; margin-top: 0.1rem;margin-left:0.8rem;}
#woman .defaults a.aw5{ width:7.9rem; height: 3.2rem; margin-top: 0.1rem;margin-left:0.1rem;}
#woman .defaults a.aw6{ width:5.2rem; height: 4.35rem; margin-top: 0.02rem;margin-left: 0.8rem;}
#woman .defaults a.aw7{ width:5.17rem; height: 4.35rem; margin-top: 0.02rem;margin-left: 0.07rem;}
#woman .defaults a.aw8{ width:5.24rem; height: 4.35rem; margin-top: 0.02rem;margin-left:0.1rem;}
#woman .defaults a.aw9{ width:5.2rem; height: 4.55rem; margin-top: 0.02rem;margin-left: 0.8rem;border-radius: 0 0 0 0.6rem;}
#woman .defaults a.aw10{ width:5.17rem; height: 4.55rem; margin-top: 0.02rem;margin-left: 0.07rem;}
#woman .defaults a.aw11{ width:5.24rem; height: 4.55rem;margin-top: 0.02rem; margin-left: 0.1rem;border-radius: 0 0 0.6rem 0;}
#woman .defaults a.aw12{display: block; width:4rem; height: 1rem;margin: 0.8rem 0 0 6.75rem; border-radius: 0.87rem;}
#woman .defaultend{width:12.72rem; height:2.3rem; margin: 0 auto; background-image: url(../assets/images/Activitytheme/end.png);}
#woman .hometime{width:15.5rem; height: 1.67rem; margin: 0 auto 0 2rem;/* margin: 0 auto;*/}
#woman .hometime i{ display: inline-block; background-image: url(../assets/images/Activitytheme/time_black.png); width:2.37rem; height: 1.6rem;font-size: 0.82rem;color: #fff;line-height: 1.6rem; text-indent:0.37rem; letter-spacing:0.7rem;  background-repeat: no-repeat; background-size: cover;}
#woman .hometime i.pink{background-image: url(../assets/images/Activitytheme/time_pink.png);}
#woman .hometime span{width:0.9rem; height: 1.62rem; display:inline-block; font-size: 0.53rem; color: #fff; line-height: 1.62rem; text-align: center;}

/*公用END*/
#woman  #box1 .lovehome{background-image: url(../assets/images/Activitytheme/love_home_start.png);}
#woman  #box1 .bofc_conduct{background-image: url(../assets/images/Activitytheme/love_home_conduct.png);}
#woman  #box1 .bofc_end{background-image: url(../assets/images/Activitytheme/love_home_end.png);}
#woman .lovehomew{width:17.42rem; height: 25.42rem; margin: 0 auto; background-image: url(../assets/images/Activitytheme/lovehomew.png);  }

#woman  #box2 .freaky{background-image: url(../assets/images/Activitytheme/freaky_start.png);}
#woman  #box2 .bofc_conduct{background-image: url(../assets/images/Activitytheme/freaky_conduct.png);}
#woman  #box2 .bofc_end{background-image: url(../assets/images/Activitytheme/freaky_end.png);}
#woman .freakyw{width:17.42rem; height: 25.42rem; margin: 0 auto; background-image: url(../assets/images/Activitytheme/freakyw.png);  }

#woman  #box3 .love_beauty{background-image: url(../assets/images/Activitytheme/love_beauty_start.png);}
#woman  #box3 .bofc_conduct{background-image: url(../assets/images/Activitytheme/love_beauty_conduct.png);}
#woman  #box3 .bofc_end{background-image: url(../assets/images/Activitytheme/love_beauty_end.png);}
#woman .love_beautyw{width:17.42rem; height: 25.42rem; margin: 0 auto; background-image: url(../assets/images/Activitytheme/love_beautyw.png);  }

.button{ height:1.5rem; width: 6.25rem; line-height: 1.5rem; background-color: #fe6883; color: #fff; font-size:0.6rem; text-align: center; border:none; border-radius: 0.87rem; display: block; margin: 2.5rem auto 0 auto;}
</style>
