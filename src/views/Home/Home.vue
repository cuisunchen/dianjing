<template>
  <div class="home-wrapper">
    <div class="header-container">
      <eg-header :lineShow='false'>
        <div class="header-slot" :class="{'homeImg':noticeShow}" slot="title">
          <transition name="headNotice">
            <div class="notice-box display-flex align-center" v-if="!noticeShow" ref="noticeBox">
              <span class="notice-icon"></span>
              <div class="notice-txt-content flex-1 display-flex">
                  <div class="notice-txt marquee">{{notice}}</div>              
              </div>
            </div>
          </transition>
        </div>
        <!-- <div class="noticeIco" slot="left" v-if="!noticeShow"></div> -->
        <div class="serviceBox" slot="right">
          <a href="https://e19.entrychat.com/chat/chatClient/chatbox.jsp?companyID=1146765&configID=2564&jid=6346431126&s=1" class="service"></a>
        </div>
      </eg-header>
    </div>
    
    <div class="main-container">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text=" " loosing-text=" ">
        <div class="swipe-box"> 
          <van-swipe class="van-swipe" :autoplay="3000" @change="onSwipeChange">
            <div class="item-box">
              <van-swipe-item class="swipe-item needsclick" v-for="(v,k) in swipeList" :key="k" @click="goDetail(v,1)">
                <img v-lazy="v.homeImageUrl" :id="'swipe_'+k"  class="needsclick"/>
              </van-swipe-item>
            </div>
            <div slot="indicator" class="swipe-line display-flex">
              <div class="swipe-line-bar flex-1" :class="{ active: pointers.swipeList == k }" v-for="(v,k) in swipeList" :key="k"></div>
            </div>
          </van-swipe>
        </div>
        <transition name="noticeFade">
          <div class="noticeWrap">
            <div class="notice-box display-flex align-center" v-if="noticeShow" ref="noticeBox">
              <span class="notice-icon"></span>
              <div class="notice-txt-content flex-1 display-flex">
                  <div class="notice-txt marquee">{{notice}}</div>              
              </div>
            </div>
          </div>
        </transition>
        <div class="bottom-bar"></div>
        <div class="task-box">
          <div class="main-task-content" @click="goGamePage(mainObj)">
            <img v-lazy="mainObj.gameImageUrl" alt="">
            <div class="main-task-bottom display-flex align-end">
              <div class="item-bottom-txt display-flex flex-center flex-column">                  
                  <p class="item-bottom-title">{{mainObj.gameTitleCn}}</p>
                  <p class="item-bottom-tips">{{mainObj.gameTitleEn}}</p>
                </div>
            </div>
          </div>

          <div class="task-list-content display-flex flex-wrap justify-between">
            <div class="task-item" 
                 :class="{ active: switchs.taskItem }"
                 v-for="(v,k) in taskList" :key="k" >
              <div class="imgBox"><img class="" v-lazy="v.gameImageUrl" @click="goGamePage(v)"/></div>
              <div class="item-bottom display-flex align-end">
                <div class="item-bottom-txt display-flex flex-center flex-column">                  
                  <p class="item-bottom-title">{{v.gameTitleCn}}</p>
                  <p class="item-bottom-tips">{{v.gameTitleEn}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="loading" class="loading-slot display-flex justify-center">
          <img class="loading-img animation-xuanzhuan" :src="mainOptions.loadingIcon"/>
        </div>
        <div slot="pulling" class="loading-slot display-flex justify-center">
          <img class="loading-img animation-xuanzhuan" :src="mainOptions.loadingIcon"/>
        </div>
        <div slot="loosing" class="loading-slot display-flex justify-center">
          <img class="loading-img animation-xuanzhuan" :src="mainOptions.loadingIcon"/>
        </div>
      </van-pull-refresh>
    </div>
    <eg-dialog v-if="user_token && isReg && user_status.freeGetMoney == '0' ">
      <div class="gift-slot">
        <div v-if="isReg || pointers.giftStep == 1" class="gift-wrapper display-flex flex-column">
            <div class="top-container display-flex align-end justify-center">
                <div class="gift-bg-btn" @click="closeDialog"></div>
            </div>
            <div class="bottom-container  flex-1">
                <div class="bottom-btn" @click="goGiftStep(2)"></div>
            </div>
        </div>
        <!-- <div v-if="!isReg" class="gift-wrapper display-flex flex-column">
          <div class="main-box display-flex flex-column justify-between align-center">
            <div class="get-gift-bg display-flex flex-column justify-end align-center">
                <div class="bg-btn">
                    恭喜您!<br>
                    获得38元彩金，赶快领取吧
                </div>
            </div>
            <div class="get-gift-btn display-flex flex-column flex-center" @click="goGiftStep(1)">
                <div class="up-btn display-flex flex-center">立即领取</div>
                <div class="down-btn"></div>
            </div>
          </div>
        </div> -->
      </div>
    </eg-dialog>
    <audio id="audio1" ref="audio">
        <source src="../../assets/button_tap.mp3" type="audio/mpeg" />
    </audio>
    <div id="d1" style="display:none"></div>
    <!-- <loadding v-if="showLoading"></loadding> -->
  </div>
</template>

<script>
import { setTimeout, setInterval, clearInterval } from 'timers';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import loadding from "../../components/loadding/lodding"
export default {
  name: "home",
  data () {
    return {
      taskList: [],
      swipeList: [{
        img: require('./img/swipeImg01.png'),
      },{
        img: require('./img/swipeImg01.png'),
      },{
        img: require('./img/mainTask.png'),
      }],
      isLoading: false,
      name: "",
      mainObj:{},
      pointers:{
        swipeList: 0,
        giftStep: 0
      },
      switchs: {
        taskItem: false
      },
      notice:'',
      noticeShow:true,
      isTestShow:false,
      marqueeWidth:null,
      translates:'',
      showLoading: true,
      timer:{
        activity:{}
      }
    }
  },
  computed: {
    ...mapGetters([
      'user_token', 
      'footer_status',
      'kefu_url',
      'ismjb',
      'isReg',
      'user_status'
    ]),
  },
  components: {
    loadding
  },
  //keep-alive会触发activated钩子函数
  activated () {
    window.removeEventListener('scroll',this.scrollDs,false)
    this.$nextTick( ()=>{
      const noticeBoxTop = this.$refs.noticeBox
      window.addEventListener('scroll', this.scrollDs)
      this.judgeLoad () ;
      document.body.onload = () => {
        this.loadActivity();
      }
    })
  },
  deactivated (){
    this.timer.activity = null;
    clearInterval(this.noticeTimer)
    window.removeEventListener('scroll',this.scrollDs,false)
  },
  beforeDestroy () {
    this.timer.activity = null;
    window.removeEventListener('scroll',this.scrollDs,false)
  },
  created () {
    this.init();
  },
  mounted() {  
    window.removeEventListener('scroll',this.scrollDs,false)
    this.$nextTick( ()=>{
      const noticeBoxTop = this.$refs.noticeBox
      window.addEventListener('scroll', this.scrollDs)
      this.judgeLoad () ;
      document.body.onload = () => {
        this.loadActivity();
      }
    })
  },
  methods: {
    ...mapMutations({
      setIsReg: 'SET_ISREG'
    }),
    ...mapActions([
      'getMoneyStatus'
    ]),
    async init () {
      await this.getSwipperList();
      await this.getData();
    },
    closeDialog (){
      this.getMoneyStatus();
      this.setIsReg(false);
    },
    goGiftStep (step) {
      if(step == 1){
        this.$http.post(this.interfaces.freeGetMoney, {showLoading: true}).then( res => {
          if(res.code == "200"){
              this.pointers.giftStep = step;
              this.setIsReg(false);
          }
        })
      }
      else {
        this.getMoneyStatus();
        this.goGamePage(this.mainObj);
      }
    },
    scrollDs() {
        this.scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        let elToTop = this.$refs.noticeBox ? this.$refs.noticeBox.offsetTop : 0
        if (this.scroll > (elToTop + 37)) {
          this.noticeShow = false
        } 
        if(this.scroll <= 150){
          this.noticeShow = true
        }
    },
    playPause(){
      let myAudio = this.$refs.audio;
      if(myAudio.paused){
          myAudio.play();
      }else{
          myAudio.pause();
      }
    },
    goKefu(){
      this.$router.push({path:'/personalcenter/kefu',query:{url:sessionStorage.getItem('kefu_url')}});
    },
    goDetail(v,type){
      // this.playPause();
      let token = this.user_token;
      if(type == undefined){
        if(!token){
          this.$toast('暂未登录，请先登录')
          setTimeout(() => {
            this.$router.push({path:'/login'})
          }, 1000);
          return
        }
      }
      
      //  轮播图点击跳转详情页
      if(v.homeJumpType == '0'){  //  如果homeJumpType为0   标识跳内部页面
        this.$router.push({path: '/activity',query:{id:v.activityId}})
      }else{
        window.open(`/mpage?jumpLink=${v.homeJumpUrl}`);
      }
    },
    goGamePage(v){
      // this.playPause();
      let token = this.user_token;
      let gameJumpUrl = v.gameJumpUrl;
      const ismjb = this.ismjb || sessionStorage.getItem('ismjb');
      if(!token){
        if(v.noLoginJumpUrl){
          gameJumpUrl = v.noLoginJumpUrl;
          if(ismjb == "ios"){
            this.$router.push(`/mpage?jumpLink=${gameJumpUrl}`);
          }
          else{
            window.open(`/mpage?jumpLink=${gameJumpUrl}`);
          }
        }else{
          this.$toast('暂未登录，请先登录')
          setTimeout(() => {
            this.$router.push({path:'/login'})
          }, 1000);
        }
        return
      }
      if(!gameJumpUrl){
        this.$router.push(`/subHome?title=${v.gameTitleCn}&id=${v.id}`);
      }else{
        if(ismjb == "ios"){
          this.$router.push(`/mpage?jumpLink=${gameJumpUrl}&goto=getThird`);
        }
        else{
          window.open(`/mpage?jumpLink=${gameJumpUrl}&goto=getThird`);
        }
      }      
    },
    valifyLogin(){
      let token = this.user_token;
      if(!token){
        this.$toast('暂未登录，请先登录')
        setTimeout(() => {
          this.$router.push({path:'/login'})
        }, 1000);
        return
      }
    },
    getSwipperList(){
      this.$http.post('/home/getHomeHeadData',{}).then(res => {
        if(res.code == 200){
          this.swipeList = res.data.image;
          if(res.data.notice.length>0){
            this.noticeArr = res.data.notice
            this.notice = res.data.notice[0].content;
          }
        }        
      })
    },
    getData(){
      this.$http.post('/home/getGameList',{}).then(res => {
        if(res.code == 200){
          this.taskList = res.data.gameList;
          this.mainObj = res.data.main;
        }        
      })
    },
    createImg(imgList){
      let list = imgList;
      var d1=document.getElementById("d1");
      list.map((v,k)=>{
        var img = document.createElement("img");
        img.src= v.imageUrl;
        d1.appendChild(img);
      })
    },
    async onRefresh () {
      await this.getData();
      await this.getSwipperList();
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.isLoading = false;
      }, 300);
    },
    openNewWindow () {
    },
    beginAnimate () {
      this.switchs.taskItem = true;
    },
    stopAnimate () {
      this.switchs.taskItem = false;
    },
    onSwipeChange (index) {
      this.pointers.swipeList = index;
    },
    //后台请求活动页面的图片
    loadActivity () {
      let param = {
        "page_no": "1",
        "page_size": "4",
        "hd_type":""
      };
      this.timer.activity = setTimeout(()=>{
        this.$http.get('/gameActivity/list',param).then( res=> {
          if(res.code == 200){  
            this.createImg(res.data.data);
          }
        })
      },100);
    },
    //判断首页图片加载进度
    judgeLoad () {
      let num = 0;
      let showLoading = false;
      this.$Lazyload.$on('loaded', ({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error })=>{
        num ++
        if(el.id == "swipe_0"){
          showLoading = true;
        }
        if( num >= 4 && showLoading ){
            document.getElementById('loadding').style.display="none";            
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../style/common.less';
img:not([src]){
  opacity: 0;
}
.home-wrapper{
  .scale-enter{
    animation: scale 0.3s;
  }
  .scale-leave-active {
    animation: hide 0.3s;
  }
 &.full-black{
   background-color: #202020;
 }
  .header-container{
    height: 45px;
    .header-slot{
      font-size: 18px;
      line-height: 48px;
      width: 100%;
      height: 100%;       
      position: relative;
      &.homeImg{
        width: 80px;
        background: url('./../../assets/img/logo-txt.png') no-repeat;
        background-size: 100%;
        background-position: center 70%;       
      }
      .notice-box{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        .notice-txt{
          line-height: 37px;
        }
      }
      .notice-txt-content{
        height: 37px;
      }
      .headNotice-enter-active, .headNotice-leave-active{
        transition: all 0.4s;
      }
      .headNotice-enter, .headNotice-leave-to{
        opacity: 0;
      }
    }
    .serviceBox{
      position: absolute;
      right: -12px;
      width: 56px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #262626;
    }
    .service{
      display: inline-block;
      width: 32px;
      height: 26px;
      margin-top: 6px;
      .bg-image("../../assets/img/service");
      background-size:cover
    }
  }
  .main-container{
    .swipe-box{
      color: #ffffff;
      .van-swipe{
        width: 100%;
        .item-box{
          height: 164px;
          .swipe-item{
            background: url('./../../assets/img/loading-logo.png') no-repeat;
            background-size: auto 90%;
            background-position: center;
            img{
              width: 100%;
              height: 100%;
            }
          }
        }
        .swipe-line{
          background: #262626;
          width: 100%;
          .swipe-line-bar{
            background-color: #313131;
            height: 2px;
            margin-left: 5px;
            &:first-child{
              margin-left: 0;
            }
            &.active{
              background-image: linear-gradient(-90deg, #24F7F8 0%, #8877FE 100%);
            }
          }
        }
      }
    }
    .noticeFade-enter-active, .noticeFade-leave-active{
      transition: opacity 0.4s;
    }
    .noticeFade-enter, .noticeFade-leave-to{
      opacity: 0;
    }
    .noticeWrap{
      height: 37px;
      background-color: #262626;
    }
    
    .bottom-bar{
      height: 22px;
      .bg-image('./../../assets/img/topbar');
      background-size: cover;
    }
    .task-box{
      padding: 11px;
      .main-task-content{
        height: 195px;
        background: url('./../../assets/img/loading-logo.png') no-repeat;
        background-size: auto 80%;
        background-position: center;
        border: 4px solid #202020;
        box-shadow: 0 10px 20px 0 rgba(0,0,0,0.60);
        box-sizing: content-box;
        position: relative;
        img{
            width: 100%;
            height: 100%;
          }
        .main-task-bottom{
          background: url('./img/main-bottom.png') no-repeat;
          background-size: 100% 100%;
          background-position: left bottom;
          height: 80px;
          width: 180px;
          position: absolute;
          bottom: -4px;
          left: -4px;
          .item-bottom-txt{
            width: 68%;
            height: 75%;
            font-family: 'PingFangSC-Regular';
          }
        }
      }
      .task-list-content{
        padding-top: 11px;
        .task-item{
          width: 160px;
          height: 190px;
          background-image: linear-gradient(0deg, #202020 0%, #212121 100%, rgba(38,38,38,0.00) 200%, rgba(32,32,32,0.00) 300%);
          background-size: auto 70%;
          background-position: center 10%;
          padding: 4px;
          margin-top: 11px;
          margin-bottom: 11px;
          position: relative;
          transition: all 0.3s ease-in-out;
          box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.6);
          .imgBox{
            width: 100%;
            height:100%;
            background: url(/img/loading-logo.7fccf6e6.png) no-repeat center center;
            background-size: 40%;
          }
          .item-bottom{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 66px;
            background: url('./img/item-bottom.png') no-repeat;
            background-size: 100% 100%;
            background-position: left bottom;
            .item-bottom-txt{
              width: 100%;
              height: 77%;
              font-family: 'PingFangSC-Regular';
            }
          }
          img{
            width: 100%;
            height: 100%;
          }
          .name{
            display: flex;
            width: 100%;
            font-size: 18px;
            color: #6C6C6C;
            font-weight: bold;
            justify-content: center;
            align-items: center;
            background-color: #262626;
          }
        }
      }
      .item-bottom-title{
        color: #ffffff;
        font-size: 16px;
      }
      .item-bottom-tips{
        font-size: 10px;
        color: #6C6C6C;
        letter-spacing: -0.24px;
      }
    }    
  }
  .gift-slot{
    width: 100%;
    height: 100%;
    .gift-wrapper{
      width: 100%;
      height: 100%;
      .top-container{
        height: 277px;
        background: url("./img/gift-IM.png") no-repeat;
        background-size: 90% 60%;
        background-position: bottom center;
        .gift-bg-btn{
          width: 160px;
          height: 60px;
          margin-left: 60px;
        }
      }
      .bottom-container{
        .bottom-btn{
          width: 100%;
          height: 210px;
          background-color: rgba(255,255,255,0.2);
        }
      }
      .main-box{
                margin: 130px auto; 
                height: 250px;
                .get-gift-bg{
                    width: 330px;
                    height: 200px;
                    background: url("./../../assets/img/caijin.jpg") no-repeat;
                    background-size: 100% 130%;
                    .bg-btn{
                        width: 200px;
                        padding-bottom: 35px;
                        color: #ffffff;
                        text-align: center;
                        font-size: 15px;
                    }
                }
                .get-gift-btn{
                    height: 43px;
                    width: 200px;
                    .up-btn{
                        width:100%;
                        background: #FFD200;
                        height: 32px;
                        font-size: 18px;
                    }
                    .down-btn{
                        width:70px;
                        height:0;
                        border-top: 10px solid #FFD200;
                        border-right: 10px solid transparent;
                        border-left: 10px solid transparent;
                    }
                    
                }
            }
      }
    }
    .notice-box{
    height: 37px;
    background-color: #262626;
    color: #ffffff;
    font-size: 12px;
    padding-top: 5px;
    box-sizing: border-box;
    .notice-icon{
      width: 16px;
      height: 12px;
      margin-left: 13px;
      margin-right: 13px;
      .bg-image('./img/laba'); 
      background-size: 100%;
    }
    .notice-txt-content{
      overflow: hidden;
      .notice-txt{
        flex-shrink: 0;
      }
    }
  }
}
</style>
