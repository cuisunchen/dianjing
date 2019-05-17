<template>
   <div class="newerJC">
      <div class="headBox">
         <eg-header>
            <div class="back" slot="left" @click="goBack"></div>
            <div class="title" slot="title">新手教程</div>
            <div class="tab" slot="tab">
               <div class="leftItem" :class="{'active': tabIndex == 0}" @click="tabChange(0)">额度转换</div>
               <div class="rightItem" :class="{'active': tabIndex == 1}" @click="tabChange(1)">活动申请</div>
            </div>
         </eg-header>
      </div>
      <div class="con">
         <div class="edu" v-if="tabIndex == 0">
            <p class="tit">账号余额有100元，玩游戏后，账号余额为0，为什么？ <br>
                           当您再次刷新余额，还是为0，请点击用户中心的额度转换功能。
                        </p>
            <div class="bg eduBg1"></div>
            <p class="tit">查看您当前是否有开启自动转换功能，如未开启。</p>
            <div class="bg eduBg2"></div>
            <p class="tit">第一：请先将您的游戏余额、转出账号，转入到。YG平台“现金余额”</p>
            <div class="bg eduBg3"></div>
            <p class="tit">第二：点击开启额度自动转换</p>
            <div class="bg eduBg4"></div>
            <p class="tit">开启自动转换功能后，您再次游戏，返回后将会展示您当前最新的余额数。</p>
         </div>
         <div class="apply" v-else>
            <p class="tit">用户点击申请按钮，平台进行审核您是否达到了参与活动的条件。</p>
            <div class="bg1"></div>
            <p class="tit tit2">如审核您已达到申请的条件，奖励则会在24小时内进行发放，如审核您未达到申请条件，您将接收不到该活动奖励，一般活动都到什么时候下线呢？活动时间平台都会标注在活动细则条例里，如没有下线日期，活动下线前会提前通知到所有用户。</p>
            <div class="bg2"></div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
    data() {
       return {
          tabIndex:0
       }
    },
    created() {

    },
    methods: {
       tabChange(index){
         this.tabIndex = index;
         document.documentElement.scrollTop = 0;                       // tab切换后滚动条滚到
      },
      goBack(){
         this.$router.go(-1)
      }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
@import '../../../style/common.less';
.newerJC{   
   .headBox{
      height: 105px;
      padding: 0 12px;
      .back{
         width: 18px;
         height: 18px;
         margin-top: 13px;
         background:url("../../../assets/img/btn_back.png") no-repeat;
         background-size: cover;
      }
      .title{
         font-family: 'PingFangHK-Medium';
         font-size: 18px;
      }
      .tab{
         display: flex;
         padding: 6px 12px;
         >div{
               flex: 1;
               height: 40px;
               color:#6C6C6C;
               text-align: center;
               line-height: 38px;
               font-size:15px;
               font-family:PingFang-SC-Bold;
               font-weight:bold;
               &.leftItem{
                  .bg-image('../../PersonalCenter/subViews/zijin-detail/img/tab_rt');
                  background-size: 100% 100%;
                  &.active{
                     color: #fff;
                     .bg-image('../../PersonalCenter/subViews/zijin-detail/img/tab_rt_active');
                     background-size: 100% 100%;
                  }
               }
               &.rightItem{
                  .bg-image('../../PersonalCenter/subViews/zijin-detail/img/tab_left');
                  background-size: 100% 100%;
                  &.active{
                     color: #fff;
                     .bg-image('../../PersonalCenter/subViews/zijin-detail/img/tab_left_active');
                     background-size: 100% 100%;
                  }
               }
         }
      }
    }
   
   .con{
      padding: 14px 12px;
      .edu{
         .bg{
            width: 271px;
            height: 430px;
            margin: 0 auto;
         }
         .eduBg1{
            background: url("../img/q1.png") no-repeat;
            background-size: cover;
         }
         .eduBg2{
            background: url("../img/q2.png") no-repeat;
            background-size: cover;
         }
         .eduBg3{
            background: url("../img/q3.png") no-repeat;
            background-size: cover;
         }
         .eduBg4{
            background: url("../img/q4.png") no-repeat;
            background-size: cover;
         }
      }
      
      .tit{
         color: #fff;
         margin: 16px 0;
         &.tit2{
            margin: 14px 0 18px;
         }
      }
      .bg1{
         width: 230px;
         height: 458px;
         margin: 0 auto;
         background: url("../img/newer.png") no-repeat;
         background-size: 100% 100%
      }
      .bg2{
         width: 288px;
         height: 447px;
         margin: 0 auto;
      }
      .bg2{         
         background: url("../img/w1.png") no-repeat;
         background-size: 100% 100%
      }
   }
   
}
</style>
