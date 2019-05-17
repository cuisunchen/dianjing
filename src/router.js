import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import $api from './js/api.js'

import Home from './views/Home/Home.vue'
import SubHome from './views/Home/subHome.vue'
import Activity from './views/Activity/Activity.vue'
import Charge from './views/Charge/Charge.vue'
import Jc from './views/jc/Jc.vue'
import { jc_router } from './js/routers'


import PersonalCenter from './views/PersonalCenter/PersonalCenter.vue'
import Login from './views/Login-regist/login.vue'
import Regist from './views/Login-regist/regist.vue'
import MiddlePage from './components/middlePage/middlePage.vue'
import egIframe from './components/eg-iframe/eg-iframe.vue'

import personalHome from './views/PersonalCenter/subViews/PersonalHome.vue'
import ZjDetail from './views/PersonalCenter/subViews/zijin-detail/zj-detail.vue'
import TzDetail from './views/PersonalCenter/subViews/tz-detail/tz-detail.vue'
import Edu from './views/PersonalCenter/subViews/edu/edu.vue'
import Balance from './views/PersonalCenter/subViews/balance/balance.vue'
import SafeCenter from './views/PersonalCenter/subViews/safeCenter/safeCenter.vue'
import SetPassword from './views/PersonalCenter/subViews/setPassword/setPassword.vue'
import PersonInfo from './views/PersonalCenter/subViews/personInfo/personInfo.vue'
import PersonImg from './views/PersonalCenter/subViews/personImg/personImg.vue'
import BalanceRecord from './views/PersonalCenter/subViews/balanceRecord/balanceRecord.vue'
import xy from './views/PersonalCenter/subViews/xy/xy.vue'
import Test from './views/test.vue'

Vue.use(Router)


const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        keepAlive: true
      }     
    },{
      path: '/subHome',
      name: 'subHome',
      component: SubHome,
      meta:{
        footShow:false,
        keepAlive: true
      }
    },{
      path: '/activity',
      name: 'activity',
      component: Activity,
      meta:{
        keepAlive: true
      }
    },{
      path: '/charge',
      name: 'charge',
      component: Charge
    },{
      path: '/jc',
      name: 'jc',
      component: Jc,
      children:jc_router
    },{
      path: '/personalcenter',
      component: PersonalCenter,
      children: [ 
        {
          path: '/',
          name: 'personalHome',
          component: personalHome,
          meta: {
            getUserInfo: false
          }
        },
        {
          path: '/personalcenter/zj',
          name: 'zj',
          component: ZjDetail,
          meta:{
            footShow:false
          }
        },
        {
          path: '/personalcenter/tz',
          name: 'tz',
          component: TzDetail,
          meta:{
            footShow:false
          }
        },
        {
          path: '/personalcenter/ed',
          name: 'ed',
          component: Edu,
          meta:{
            footShow:false
          }
        },
        {
          path: '/personalcenter/balance',
          name: 'balance',
          component: Balance,
          meta:{
            footShow:false
          }
        },
        {
          path: '/personalcenter/balanceRecord',
          name: 'balanceRecord',
          component: BalanceRecord,
          meta:{
            footShow:false
          }
        },
        {
          path: '/personalcenter/safeCenter',
          name: 'safeCenter',
          component: SafeCenter,
          meta:{
            footShow:false
          }
        },
        {
          path: '/personalcenter/setPassword',
          name: 'setPassword',
          component: SetPassword,
          meta:{
            footShow:false
          }
        },
        {
          path: '/personalcenter/personInfo',
          name: 'personInfo',
          component: PersonInfo,
          meta:{
            footShow:false
          }
        },
        {
          path: '/personalcenter/personImg',
          name: 'personImg',
          component: PersonImg,
          meta:{
            footShow:false
          }
        },
        {
          path: '/personalcenter/kefu',
          name: 'kefu',
          component: egIframe,
          meta:{
            footShow:false
          }
        }
      ]
    },{
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        footShow:false
      }
    },{
      path: '/regist',
      name: 'regist',
      component: Regist,
      meta:{
        footShow:false
      }
    },{
      path: '/xy',
      name: 'xy',
      component: xy,
      meta:{
        footShow:false
      }
    },{
      path: '/mpage',
      name: 'mpage',
      component: MiddlePage
    },{
      path: '/test',
      name: 'test',
      component: Test
    }
  ]
})


//记得当所有程序执行完毕后要进行next()，不然是无法继续进行的;
router.beforeEach(function (to, from, next) {
  let user_token = store.getters.user_token;
  if(to.path != "/" && from.path == "/"){
    document.getElementById('loadding').style.display="none";
  }
  if (to.meta.getUserInfo) {
    if(user_token){
      if(to.path == "/personalCenter"){
        if(!store.getters.queryThird){
            if(store.getters.user_status.freeGetMoney != '1'){
              $api.getUserInfo("", $api.getUserStatus);
            }else{
              $api.getUserInfo();
            }
        }else{
          let param = {};
          param.transferOut = "1";
          if(store.getters.user_status.freeGetMoney != '1'){
            $api.getUserInfo(param, $api.getUserStatus);
          }else{
            $api.getUserInfo(param);
          }
        }
        next();
      }
    }else{
      next();
    }
  }else{
    next();
  } 
  if (to.meta.footShow != undefined && to.meta.footShow == false) {
    store.commit('SET_FOOTER_STATUS', false);
    next();
  } else {
    store.commit('SET_FOOTER_STATUS', true);
    next();
  }
})
export default router