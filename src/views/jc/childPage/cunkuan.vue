<template>
   <div class="cunkuan display-flex flex-column">
      <div class="header-container">
         <eg-header class="headerWrap">
               <div class="backWrap" slot="left" @click="goBack">
                  <div class="back"></div>
               </div>
               <div class="header-slot" slot="title">存款教程</div>

               <div class="tabs" slot="tab">
                  <tabs v-model="active" animated swipeable background='transparent' :line-height="lineHeight">
                     <tab class="tabItem" v-for="(item,index) in tabList" :key="index">               
                        <div class="imgBox" :class="{'gradient-text test':tabIndex == index}" slot="title" @click="tabChange(item,index)">{{item.con}}</div>                  
                     </tab>
                  </tabs>
                  <div class="trapezoid"></div>
               </div>
         </eg-header>
      </div>

      <div class="main flex-1" v-if="images.length > 0">
         <swipe class="swipe" :initial-swipe="swipeIndex" :show-indicators='false' @change="onChange">
            <swipe-item v-for="(image, index) in images" :key="index">
               <img v-lazy="image" />
            </swipe-item>            
         </swipe>
         <div class="indicators">
            <div class="num" :class="{'active': swipeIndex == index}" v-for="(item,index) in images.length" :key="index">
               <div class="grayBg display-flex align-center justify-center">{{item}}</div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { Tab, Tabs, Swipe, SwipeItem } from 'vant';
export default {
   data() {
      return {
         active: 0,
         lineHeight:2,
         tabIndex:0,
         tabList:[
            {id:'jdzf',con:'京东支付'},
            {id:'wyzf',con:'网银支付'},
            {id:'wyzz',con:'网银转账'},
            {id:'wxPay',con:'微信支付'},
            {id:'ylkj',con:'银联快捷'},
            {id:'ylsm',con:'银联扫码'},
            {id:'zfbzf',con:'支付宝支付'},
         ],
         swipeIndex:0,
         images:[],
         jdzf:[
            require('../img/cunkuanImg/jd1.png'),
            require('../img/cunkuanImg/jd2.png'),
            require('../img/cunkuanImg/jd3.png'),
            require('../img/cunkuanImg/jd4.png'),
         ],
         wyzf:[
            require('../img/cunkuanImg/wy_pay1.png'),
            require('../img/cunkuanImg/wy_pay2.png'),
            require('../img/cunkuanImg/wy_pay3.png'),
            require('../img/cunkuanImg/wy_pay4.png')
         ],
         wyzz:[
            require('../img/cunkuanImg/wy1.png'),
            require('../img/cunkuanImg/wy2.png'),
            require('../img/cunkuanImg/wy3.png'),
            require('../img/cunkuanImg/wy4.png'),
            require('../img/cunkuanImg/wy5.png'),
            require('../img/cunkuanImg/wy6.png')
         ],
         wxPay:[
            require('../img/cunkuanImg/wx1.png'),
            require('../img/cunkuanImg/wx2.png'),
            require('../img/cunkuanImg/wx3.png'),
            require('../img/cunkuanImg/wx4.png')
         ],
         ylkj:[
            require('../img/cunkuanImg/yl1.png'),
            require('../img/cunkuanImg/yl2.png'),
            require('../img/cunkuanImg/yl3.png'),
            // require('../img/cunkuanImg/yl4.png'),
         ],
         ylsm:[
            require('../img/cunkuanImg/yl_code1.png'),
            require('../img/cunkuanImg/yl_code2.png'),
            require('../img/cunkuanImg/yl_code3.png'),
            require('../img/cunkuanImg/yl_code4.png'),
         ],
         zfbzf:[
            require('../img/cunkuanImg/zfb1.png'),
            require('../img/cunkuanImg/zfb2.png'),
            require('../img/cunkuanImg/zfb3.png'),
         ]
      }
   },
   created() {
      this.images = this[this.tabList[this.tabIndex].id]
   },
   methods: {
      onTabClick(id){
         this.images = this[id]
      },
      onChange(index){
         this.swipeIndex = index;
      },
      tabChange(item,index){
         this.tabIndex = index;
         this.swipeIndex = 0;
         this.images = this[item.id]
      },
      goBack(){
         this.$router.go(-1)
      }
   },
   components: {
      Tab, Tabs, Swipe, SwipeItem
   }
}
</script>

<style scoped lang="less">
.cunkuan{
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
   .main{
      .swipe{
         height: 100%;
         .van-swipe-item{
            text-align: center;
            img{
               width: 228px;
               height: 385px;
               margin-left: 45px;
            }
         }         
      }
      .indicators{
         font-size: 0;
         margin: 10px 0;
         text-align: center;
         .num{
            display: inline-block;
            width: 20px;
            height: 20px;
            font-size: 12px;
            color: #BEBEBE;
            margin: 0 10px;
            padding: 1px;            
            text-align: center;
            border-radius: 50%;
            background: linear-gradient(left,#BEBEBE 0%, #BEBEBE 100%);
            &.active{
               background: linear-gradient(left,#23F7F8 0%, #8877FF 100%);
            }
            .grayBg{
               width: 100%;
               height: 100%;
               line-height: 19px;
               border-radius: 50%;
               background-color: #131212;
            }
         }
      }
   }
}
</style>
<style lang="less">
.cunkuan{
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
        .van-tabs__nav {
           padding-right: 4px;
        }
        .van-tab{
           &:last-child{
              flex-basis:24%!important
           }
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

