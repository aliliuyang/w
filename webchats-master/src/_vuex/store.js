import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import qs from 'qs';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
Vue.use(Vuex)
const state={
	cargoods:[
      {"shopstore":"京东","carlist":[]},
      {"shopstore":"电子卡","carlist":[]},
      {"shopstore":"实体卡","carlist":[]}
    ],
  useaddress:0

}

const  mutations={
  changeuseadr(){
    this.state.useaddress=1
  },
  addCar(cargoods,addgoods){
    var storename=null
    if(addgoods[0].store=='京东') {
      storename=0
    }
    if(addgoods[0].store=='电子卡') {
      storename=1
    }
    if(addgoods[0].store=='实体卡') {
      storename=2
    }
    	//购物车已有
    for (var a = 0; a < state.cargoods[storename].carlist.length; a++) {
      if (addgoods[0].sku == state.cargoods[storename].carlist[a].sku) {
          // state.cargoods[0].carlist[a].number = state.cargoods[0].carlist[a].number + addgoods[0].number
          state.cargoods[storename].carlist[a].number++
          mutations.gocar(state.cargoods[storename].carlist[a])
          MessageBox({
              title: '提示',
              message: '已成功添加到购物车',
          })
        return
      }
    }
		    // 第一次添加
    state.cargoods[storename].carlist.unshift(addgoods[0])
    mutations.gocar(addgoods[0])
    MessageBox({
          title: '提示',
          message: '已成功添加到购物车',
    })
    // console.log(state.cargoods)
    //	}else{
//    for (var a = 0; a < car[0].carlist.lenght; a++) {
//      if (sku == car[1].carlist[a].goodsid) {
//        state.cargoods[1].carlist[a].num = addnum + car[1].carlist[a].num
//      } else {
//        state.cargoods[1].carlist.unshift({"goodsid":sku,"num":addnum,"price":price})
//      }
//    }
//  }
  },
  addNumber(cargoods,x) {
    state.cargoods[x[0]].carlist[x[1]].number++;
    mutations.gocar(state.cargoods[x[0]].carlist[x[1]])
  },
  reduceNumber(car,x){
  	if(state.cargoods[x[0]].carlist[x[1]].number=='1'){
      state.cargoods[x[0]].carlist[x[1]].number=1
      mutations.gocar(state.cargoods[x[0]].carlist[x[1]])
    }else{
      state.cargoods[x[0]].carlist[x[1]].number--;
      mutations.gocar(state.cargoods[x[0]].carlist[x[1]])
    }
  },
   oba(cargoods,x){
      state.cargoods[x[0]].carlist[x[1]].number  = parseInt(state.cargoods[x[0]].carlist[x[1]].number)
      if(state.cargoods[x[0]].carlist[x[1]].number <= 0 ){
        state.cargoods[x[0]].carlist[x[1]].number =1
        Toast('请输入正确数量')
        return
      }
      mutations.gocar(state.cargoods[x[0]].carlist[x[1]])
   },
  //删除购物车
  delCar(cargoods,x){
    for(var i=0;i<x.length;i++){
      var storename=null
      if(x[i].store=='京东') {
        storename=0
      }
      if(x[i].store=='电子卡') {
        storename=1
      }
      if(x[i].store=='实体卡') {
        storename=2
      }
      for(var j=0 ; j<state.cargoods[storename].carlist.length;j++){
        if(x[i].sku==state.cargoods[storename].carlist[j].sku){
          state.cargoods[storename].carlist.splice(j,1)
        }
      }
    }
  },
  gocar(obj){
  	var token = localStorage.getItem("token");
  	axios.post(BASE_URL+'/index.php?r=shop/Joincart',qs.stringify({
      param:"["+JSON.stringify(obj)+"]",
      token:token
	  })).then(function(res){
      if(res.data.data.err==10002){

      }
    }).catch(function(err){

    });
  },
  getcar(car,obj){
    if(obj){
      if(obj.电子卡!=undefined && obj.电子卡.length!=0){
        state.cargoods[1].carlist=obj.电子卡.reverse()
      }
      if(obj.实体卡!=undefined && obj.实体卡.length!=0){
        state.cargoods[2].carlist=obj.实体卡.reverse()
      }
      if(obj.京东!=undefined && obj.京东.length!=0){
        state.cargoods[0].carlist=obj.京东.reverse()
      }
    }
  },
}
const actions={
  changeuseadr({commit}){
    commit('changeuseadr')
  },
  addCar({commit},addgoods){
    if(addgoods[0].frontPrice==null){
      Toast('该商品已下架');
    }else{
      commit('addCar',addgoods)
    }
  },
  removeCar({commit},x){
    commit('removeCar',x)
  },
  addNumber({commit},x){
    commit('addNumber',x)
  },
  oba({commit},x){
    commit('oba',x)
  },
  reduceNumber({commit},x){
    commit('reduceNumber',x)
  },
  delCar({commit},x){
    if(x.length){
      commit('delCar',x)
      var token = localStorage.getItem("token");
      axios.post(BASE_URL+'/index.php?r=shop/Delshop',qs.stringify({
        skuIds:JSON.stringify(x),
        token:token
      })).then(function(res){
        Toast('删除成功');
      }).catch(function(err){

      });
    }else{
      Toast('未选中商品');
    }

  },
  quer({commit},x){

  },
  getcar({commit}){
  	var token = localStorage.getItem("token");
  	axios.post(BASE_URL+'/index.php?r=shop/cartlist',qs.stringify({
  		token:token
	})).then(function(res){
		commit('getcar',res.data.data)
	}).catch(function(err){

   	});
  },
}
const store=new Vuex.Store({
  state,
  mutations,
  actions

})
export default store
