<template>
   <div class="wfjc">
       <div class="header-container">
         <eg-header class="headerWrap">
               <div class="backWrap" slot="left" @click="goBack">
                  <div class="back"></div>
               </div>
               <div class="header-slot" slot="title">玩法教程</div>

               <div class="tabs" slot="tab">
                  <tabs v-model="active" animated swipeable background='transparent' :line-height="lineHeight">
                     <tab class="tabItem" v-for="(item,index) in tabList" :key="index">               
                           <div class="imgBox" :class="{'gradient-text test':tabIndex == index}" slot="title" @click="tabChange(index)">{{item}}</div>                  
                     </tab>
                  </tabs>
                  <div class="trapezoid"></div>
               </div>
         </eg-header>
      </div>
      <div class="pages">
         <tiyu v-if="tabIndex == 0"></tiyu>
         <truePeple v-if="tabIndex == 1"></truePeple>
         <caipiao v-if="tabIndex == 2"></caipiao>
         <dianzi v-if="tabIndex == 3"></dianzi>
         <others v-if="tabIndex == 4"></others>
      </div>
   </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import tiyu from './wfjc-childPage/tiyu'
import truePeple from './wfjc-childPage/truePeple'
import caipiao from './wfjc-childPage/caipiao'
import dianzi from './wfjc-childPage/dianzi'
import others from './wfjc-childPage/others'
export default {
    data() {
        return {
            active: 0,
            lineHeight:2,
            tabIndex:0,
            tabList:['体育问题','真人问题','彩票问题','电子竞技','其他问题'],
            isiOS: Boolean,
        }
    },
    created() {
        let token = this.user_token;
        var u = navigator.userAgent;
        this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端         
    },
    methods: {
        tabChange(index){
            this.tabIndex = index;
            if(this.isiOS){
                document.body.scrollTop = 0;
            }else{
                document.documentElement.scrollTop = 0
            }
        },
        goBack(){
            this.$router.go(-1)
        }
    },
    components: {
        Tab, Tabs, tiyu, truePeple, caipiao, dianzi, others
    }
}
</script>

<style scoped lang="less">
.wfjc{
    .header-container{
        height: 105px;
        padding: 0 11px;
        .headerWrap{
            padding-bottom: 8px;
        }
        .backWrap{
            height: 100%;
            padding-right: 30px;
            overflow: hidden;
            .back{
                width: 18px;
                height: 18px;
                margin-top: 13px;
                background:url("../../../assets/img/btn_back.png") no-repeat;
                background-size: cover;
            }
        }
        
        .header-slot{
            height: 45px;
            background-color: #262626;
            font-family: 'PingFangHK-Regular';            
            color: #FFFFFF;
            letter-spacing: 0;
        }

        .tabs{   
            height: 32px;  
            margin-top: 2px;       
            background:rgba(32,32,32,1);
            border:1px solid rgba(0,0,0,1);
            position: relative;
            .trapezoid{                
                position: absolute;
                left: 50%;
                bottom: -9px;
                width: 122px;
                height: 10px;
                margin-left: -61px;
                z-index: 9;
                background: red;
                background: url("../img/trapezoid.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
</style>
<style lang="less">
.wfjc{
    .section2{
        padding: 0 11px;
        .van-hairline--top-bottom::after{
            border: none;
        }
        .van-tabs--line{
            height: 100%;
            padding: 0;
            .van-tabs__wrap{
                height: 100%;
            }
        }
        .van-tab{
            >div{
                height: 100%;
                .imgBox{
                    line-height: 32px;
                }
            }
        }
        .van-tabs__line{
            top: 0;
            display: none
        }
        .van-tab--active{
            .imgBox{
                background-image:-webkit-linear-gradient(left,#23F7F8 0%, #8877FF 100%); 
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
        }
    }
}
</style>