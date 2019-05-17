<template>
    <div class="charge-wrapper">
        <div class="header-container">
          <eg-header>
            <div class="header-slot" slot="title">
              充值
            </div>
            <a href="https://e19.entrychat.com/chat/chatClient/chatbox.jsp?companyID=1146765&configID=2564&jid=6346431126&s=1" class="service" slot="right"></a>
          </eg-header>
        </div>
        <div class="payList-container ">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text=" " loosing-text=" ">
            <div class="payList-item" v-for="(v,k) in payList" :key="k">
              <div class="item-header display-flex align-center" :style="{backgroundColor: (pointers.payList == k ? v.model_color : '')}" @click="openItem(v, k, $event)">
                <div class="left-box display-flex flex-1 align-center">
                  <img class="icon-content" :src="v.gate_img"
                  />
                  <div class="txt-content flex-1">
                    <div>{{ v.gate_name }}</div>
                    <div class="small-txt" :class="{'txt-active':pointers.payList == k?true:false}">{{ v.englishName }}</div>
                  </div>
                </div>
                <div class="splice-header-line display-flex flex-center">
                  <img v-if="pointers.payList != k && v.pay_type == '1'" class="active-line"
                    src="./img/online-line.png"
                  />
                  <img v-if="pointers.payList != k && v.pay_type == '2'" class="active-line"
                    src="./img/offline-line.png"
                  />
                </div>
                <div class="right-box">
                  <div class="icon-content display-flex flex-center">
                    <img v-if="v.pay_type == '1'" src="./img/onlinePay.png" alt="">
                    <img v-if="v.pay_type == '2'" src="./img/offlinePay.png" alt="">
                  </div>
                </div>
              </div>
              <div class="item-body  display-flex" v-if="pointers.payList == k">
                <pay-item-1 v-if='v.model_type == 1' 
                  @openKeyBoard="openKeyBoard"
                  :itemVal="v"   
                  :activeColor ="activeColor"
                >
                </pay-item-1>
                <pay-item-2 :itemVal="v" v-if='v.model_type == 2' :activeColor ="activeColor"></pay-item-2>
                <pay-item-3 :itemVal="v" v-if='v.model_type == 3' :activeColor ="activeColor"></pay-item-3>
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
            <p class="isBot" v-if="isBot">已经到底了</p>
          </van-pull-refresh>
        </div>
        <!-- <div style="padding-bottom:50px;">
        </div> -->
        <div class="keyboard-box">
            <van-number-keyboard
            :show="switchs.keyBoardShow"
            extra-key="."
            close-button-text="完成"
            @close = "closeKeyBoard"
            @input="onKeyInput"
            @delete="onKeyDelete"
            />
        </div>
    </div>
</template>

<script>
import payItem_1 from './pay-item-1.vue'
import payItem_2 from './pay-item-2.vue'
import payItem_3 from './pay-item-3.vue'
import { mapGetters, mapMutations } from 'vuex'
import { setTimeout } from 'timers';

export default {
  data(){
    return{
      /*
      model_type:渲染模板标识
      model_color：颜色
      payType：线上支付还是线下支付 1在线2线下
      gate_name：支付名字
      */ 
      payList: [],
      pointers: {
        payList: -1
      },
      switchs: {
        keyBoardShow: false
      },
      numVal: "",
      activeColor: "",
      isLoading: true,
      timer:null,
      isiOS: Boolean,
      isBot:false,          //  滚到底了
    }
  },
  watch:{
    isBot(val){
      console.log(val)
      if(!val){
        // document.addEventListener('scroll',this.isBotFun,false)
      }
    }
  },
  components: {
    payItem1: payItem_1,
    payItem2: payItem_2,
    payItem3: payItem_3
  },
  computed: {
        ...mapGetters([
            'user_token',
            'account'
        ]),
  },
  mounted(){
    this.$nextTick(()=>{
      document.addEventListener('scroll',this.isBotFun,false)
    })
  },
  created () {
    let token = this.user_token;
    var u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端    
    if(!token){
      this.$toast('暂未登录，请先登录');
      setTimeout(() => {
        this.$router.push({path:'/personalCenter'})
      }, 500);
      return
    }else{
      this.net_getPayType().then( res=> {
        this.handle_getPayType (res);
      });
    }
  },
  methods: {
    isBotFun(){
      console.log(111)
      let scrollTop = this.isiOS ? document.body.scrollTop : document.documentElement.scrollTop
      if( document.documentElement.scrollHeight - scrollTop == document.documentElement.clientHeight){
        this.isBot = true;
        setTimeout(() => {
          this.isBot = false;
        }, 2000);   
        document.removeEventListener('scroll',this.isBotFun,false)     
      }else{
        document.addEventListener('scroll',this.isBotFun,false)
      }
    },
    openItem (v, k, e) {
      if(this.pointers.payList >= 0 && this.pointers.payList==k){
        this.pointers.payList = -1;
      }else{
        this.pointers.payList = k;
        this.activeColor = v.model_color;

        let currentEl = e.currentTarget   
        setTimeout(() => {
          // document.documentElement.scrollTop = currentEl.offsetTop
          this.timeOutFun(currentEl.offsetTop)
        }, 100);
      }
    },
    timeOutFun(top){
      let scrollTop = 22;
      this.timer = setInterval( ()=> {
        if(scrollTop > top){ 
          clearInterval(this.timer);
          return
        }
        scrollTop += 20
        // document.documentElement.scrollTop = scrollTop
        if(this.isiOS){
          document.body.scrollTop = scrollTop;
        }else{
          document.documentElement.scrollTop = scrollTop; 
        }
      },1)
    },
    quickChoose(num) {
      this.numVal = num;
    },
    closeKeyBoard (value) {
      this.switchs.keyBoardShow = false;
    },
    openKeyBoard () {
      this.switchs.keyBoardShow = true;
    },
    net_getPayType () {
      return this.$http.post(this.interfaces.getPayType,{});
    },
    handle_getPayType (res, type) {
      if(res.code == "200"){
        this.payList = res.data.payList;
        // this.activeColor = this.payList[this.pointers.payList].model_color;
        if(type == 'refresh'){
          this.pointers.payList = -1;
          this.isLoading = false;
          this.$toast("刷新完成");
        }
      }
    },
    onKeyInput(value) {
      if(parseInt(this.numVal)>=10000){
        return;
      }else{
        this.numVal += value;
      }
      
    },
    onKeyDelete() {
      this.numVal = '';
    },
    onRefresh () {
      this.net_getPayType().then( res=> {
        this.handle_getPayType (res, "refresh");
      });
    },
    goKefu(){
      this.$router.push({path:'/personalcenter/kefu',query:{url:sessionStorage.getItem('kefu_url')}});
    },
  }
}
</script>

<style lang="less" scoped>
@import '../../style/common.less';
.charge-wrapper{
  .header-container{
    height: 55px;
    .header-slot{
      height: 45px;
      background-color: #262626;
      font-family: 'PingFangHK-Regular';
      font-size: 18px;
      color: #FFFFFF;
      letter-spacing: 0;
    }
    .service{
        width: 32px;
        height: 28px;
        margin-top: 6px;
        .bg-image("../../assets/img/service");
        background-size:cover
    }
  }
  .payList-container{
    width: 353px;
    margin: 10px auto 0;
    .payList-item{
      margin-bottom: 22px;
      &:last-child{
        margin-bottom: 0;
      }
      .item-header{
        height: 100px;
        box-shadow: 0 10px 20px 0 rgba(0,0,0,0.7);
        z-index: 10;
        color:#FFFFFF;
        padding-left: 16px;
        background-color: #262626;
        .splice-header-line{
          background: url('./img/splice-line.png') no-repeat;
          width: 7px;
          background-size: 100% 100%;
          height: 100%;
          flex-shrink: 0;
          .active-line{
            width: 2px;
            height: 40px;
          }
        }
        .left-box{
          .icon-content{
            width: 66px;
            height: 66px;
            margin-right: 7px;
          }
          .txt-content{
            text-shadow: black 0.5em 0.5em 0.5em;
            font-size:15px;
            .small-txt{
              color:rgb(101,101,101);
              font-size:12px;
              &.txt-active{
                color:#FFFFFF;
              }
            }
          }
        }
        .right-box{
          .icon-content{
            img{
              width: 33px;
              height: 18px;
            }
          }
        }
      }
      .item-body{
        background: #262626;
        box-shadow: 0 10px 20px 0 rgba(0,0,0,0.7);
        box-sizing: border-box;
        .splice-body-line{
          flex-shrink: 0;
          width: 2px;
          background-color: #0F0F0F;
        }
        .body-right-txtContent{
          font-family: PingFangHK-Medium;
          font-size: 15px;
          color: #6C6C6C;
          letter-spacing: -0.36px;
          .txt-line{
            height: 2.1px;
            margin-top: 2px;
            background-image: linear-gradient(-90deg, #272727 0%, #515151 100%);
          }
        }
      }
      .left-box{

      }
      .right-box{
        width: 70px;
        flex-shrink: 0;
      }
    }
    .isBot{
      color: rgb(155, 146, 146);
      text-align: center;
    }
  }
}
</style>