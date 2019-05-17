<template>
  <div id="app">
    <div class="main-wrapper">
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view> -->
      <transition :name="animationMode">
        <keep-alive :include="['home']">
            <router-view />
        </keep-alive>
      </transition>
    </div>
    <footer v-if="footer_status">
      <div class="foot-wrapper">
        <eg-footer></eg-footer>
      </div>
    </footer>
    <loading v-if="show_loading"></loading>
    <eg-dialog :txtcontent="txtcontent" contentFontSize='small-white-txt' btnText="好的" ref="dialog" v-if="home_dialogShow" @onConfirm="closeDialog"></eg-dialog>
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import { resetObj } from "@/js/tools.js"
import loading from './components/loadding/lodding'
import EgAnimation from '@/components/animation/animation'
import Fingerprint2 from 'fingerprintjs2'

export default {
  data(){
    return{
      animationMode:'',
      txtcontent:'帐号已在其它地方登录，您已被迫下线，如果不是您本人操作，请及时修改密码'
    }
  },
  watch: {
    '$route' (to, from) {
        if(['/login','/regist'].includes(to.path)){
          this.animationMode = 'toLeft'
        }else{
          this.animationMode = 'fade'
        }
    }
  },
  created () {
    document.documentElement.classList.add('bgImg');
    this.checkDevice();
    let U_TK = localStorage.getItem("U_TK");
    const ismjb = this.$route.query.ismjb;
    if(sessionStorage.getItem('ismjb')){
      this.setMjb(ismjb);
    }else{
      if(ismjb){
        sessionStorage.setItem('ismjb',ismjb);
        this.setMjb(ismjb);
      }
    }
    if(!sessionStorage.getItem('kefu_url')){
      this.net_getKefuUrl();
    }
    if(U_TK){
      this.setUserToken(U_TK);
      this.$api.getUserInfo();
    }else {
      this.setUserToken("");
    }
  },
  computed: {
    ...mapGetters([
      'user_token', 
      'footer_status',
      'kefu_url',
      'show_loading',
      'home_dialogShow'
    ])
  },
  methods: {
    ...mapMutations({
        setUserToken: 'SET_USER_TOKEN',
        setKefuUrl: 'SET_KEFU_URL',
        setLoading: 'SET_SHOW_LOADING',
        setMjb: 'SET_MJB',
        setPlatformFlag: 'SET_PLATFORM_FLAG',
        setHomeDialogShow:'SET_HOME_DIALOG_STATUS'
    }),
    ...mapActions([
      'asynSetAccount'
    ]),
    net_getKefuUrl(){
      this.$http.post("/home/getServiceUrl", {}).then( res => {
        this.setKefuUrl(res.data.serviceUrl)
        sessionStorage.setItem('kefu_url',res.data.serviceUrl)
      })
    },
    closeDialog(){
      this.setHomeDialogShow(false)
      this.$router.push({path:'/login',query:{showLogin:true}})
    },
    checkDevice () {
      let options = {
        excludes: {
          "screenResolution": true,
          "availableScreenResolution": true,
          "userAgent": true,
          "audio": true,
          "hasLiedBrowser": true,
          "enumerateDevices": true,
          "pixelRatio": true
        }
      }
      let _this = this;
      if (window.requestIdleCallback) {
          requestIdleCallback(function () {
              Fingerprint2.getV18(options, function (result, components) {
                _this.setPlatformFlag(result);
              })
          })
      } else {
          setTimeout(function () {
              Fingerprint2.getV18(options, function (result, components) {
                _this.setPlatformFlag(result);
              })  
          }, 500)
      }
    }
  },
  components: {
    loading,
    EgAnimation
  }
}
</script>

<style lang="less">
@import './style/index.less';
#app {
  display: flex;
  flex-direction: column;
  font-family:PingFang-SC-Medium;
  min-height: 100%;
  //  从右至左
  .toLeft-enter-active{
      transition: all 0.3s ease-in-out;
      // opacity: 0;
  }
  .toLeft-enter{
      transform: translate3d(100%, 0, 0);
      // opacity: 0;
  }
  //  淡隐淡入
  .fade-enter-active, .fade-leave-active{
      transition: all 0.2s ease-in-out;
  }
  .fade-enter,.fade-leave-to{
      opacity: 0;
  }
  .main-wrapper{
    flex: 1;
  }
  footer{
    height: 65px;
    .foot-wrapper{
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      height: 54px;
      background-color: @base_color;
      box-shadow: 0 -3px 5px 0 rgba(0,0,0,0.50);
    }
  }
}
html{
  background-color: rgba(17,17,17,1);
  overflow: auto;
  overscroll-behavior:none;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  font-family: "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei";
  height: 100%;
}
body{
  // min-height: 100%;
  // padding-top: constant(safe-area-inset-top);              
  // padding-left: constant(safe-area-inset-left);                  
  // padding-right: constant(safe-area-inset-right);               
  // padding-bottom: constant(safe-area-inset-bottom);
}
html::before {
  content: ' ';
  position: fixed;
  z-index: -1;
  top: -80px;
  right: 0;
  bottom: -80px;
  left: 0;
  background: url('./assets/img/app-bg.jpg');
  background-size: 100% auto;
}
.loading-slot{
  .loading-img{
    height: 34px;
    width: 34px;
    margin-top: 6px;
  }
}
</style>
