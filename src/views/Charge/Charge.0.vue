<template>
    <div class="charge-wrapper">
        <div class="header-container">
          <eg-header>
            <div class="header-slot" slot="title">
              充值
            </div>
          </eg-header>
        </div>
        <div class="payList-container ">
          <div class="payList-item" v-for="(v,k) in payList" :key="k">
            <div class="item-header display-flex align-center" :style=" pointers.payList == k ? v.styleObj : ''" @click="openItem(v, k)">
              <div class="left-box display-flex flex-1 align-center">
                <img class="icon-content" :src="v.iconSrc"
                />
                <div class="txt-content flex-1">
                  <div style="font-size:15px">{{ v.name }}</div>
                  <div style="font-size:12px">{{ v.englishName }}</div>
                </div>
              </div>
              <div class="splice-header-line display-flex flex-center">
                <img v-if="pointers.payList != k && v.type == 'online'" class="active-line"
                  src="./img/online-line.png"
                />
                <img v-if="pointers.payList != k && v.type == 'offline'" class="active-line"
                  src="./img/offline-line.png"
                />
              </div>
              <div class="right-box">
                <div class="icon-content display-flex flex-center">
                  <img v-if="v.type == 'online'" src="./img/onlinePay.png" alt="">
                  <img v-if="v.type == 'offline'" src="./img/offlinePay.png" alt="">
                </div>
              </div>
            </div>
            <div class="item-body  display-flex" v-if="pointers.payList == k">
              <div class="left-box flex-1" :style="v.bodyStyle">
                <pay-item-0 v-if='v.payId == 0'></pay-item-0>
                <pay-item-1 v-if='v.payId == 1'></pay-item-1>
                <pay-item-2 v-if='v.payId == 2'></pay-item-2>
              </div>
              <div class="splice-body-line"></div>
              <div class="right-box display-flex flex-center" :style="v.bodyStyle">
                <div class="body-right-txtContent">
                  确定
                  <div class="txt-line"></div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div style="padding-bottom:50px;">
        </div>
    </div>
</template>

<script>
import payItem_0 from './pay-item-0.vue'
import payItem_1 from './pay-item-1.vue'
import payItem_2 from './pay-item-2.vue'

export default {
  data(){
    return{
      payList: [{
        name: "支付宝在线",
        englishName: "Alipay Online",
        payId: 0,
        type: "online",
        iconSrc: require("./img/ico_ali_pay.png"),
        styleObj:{
          'background-color': "#007DB0"
        },
        bodyStyle:{
          'border-bottom': "3px solid #007DB0"
        }
      },{
        name: "微信在线",
        englishName: "Wechat Pay Online",
        type: "online",
        payId: 0,
        iconSrc: require("./img/ico_wechat_pay.png"),
        styleObj:{
          'background-color': "#00820F"
        },
        bodyStyle:{
          'border-bottom': "3px solid #00820F"
        }
      },{
        name: "银联在线",
        englishName: "Wechat Pay Online",
        type: "online",
        payId: 0,
        iconSrc: require("./img/ico_bank_pay.png"),
        styleObj:{
          'background-color': "#8B0012"
        },
        bodyStyle:{
          'border-bottom': "3px solid #8B0012"
        }
      },{
        name: "线下支付宝转账",
        englishName: "Wechat Pay Online",
        payId: 1,
        type: "offline",
        iconSrc: require("./img/ico_ali_pay.png"),
        styleObj:{
          'background-color': "#007DB0"
        },
        bodyStyle:{
          'border-bottom': "3px solid #007DB0"
        }
      },{
        name: "线下微信转账",
        englishName: "Wechat Pay Offline",
        payId: 1,
        type: "offline",
        iconSrc: require("./img/ico_wechat_pay.png"),
        styleObj:{
          'background-color': "#00820F"
        },
        bodyStyle:{
          'border-bottom': "3px solid #00820F"
        }
      },{
        name: "线下银行转账",
        englishName: "Wechat Pay Offline",
        payId: 2,
        type: "offline",
        iconSrc: require("./img/ico_offline_pay.png"),
        styleObj:{
          'background-color': "#59493F"
        },
        bodyStyle:{
          'border-bottom': "3px solid #59493F"
        }
      }],
      component03: [{
        title: "收款人信息(长按复制内容)",
        content: {
          bankName: "中国民生银行",
          accountName: "厦门市新昕电子商务有限公司",
          accountNum: "157417220"
        }
      },],
      pointers: {
        payList: 0
      }
    }
  },
  components: {
    payItem0: payItem_0,
    payItem1: payItem_1,
    payItem2: payItem_2
  },
  created () {
    this.$http.post(this.interfaces.getPayType,{}).then(res => {
        if(res.code == 200){
          
        }        
      })
  },
  methods: {
    openItem (v, k) {
      if(this.pointers.payList >= 0 && this.pointers.payList==k){
        this.pointers.payList = -1;
      }else{
        this.pointers.payList = k;
      }
    }
  },
  onInput(value) {
    this.$toast(value);
  },
  onDelete() {
    this.$toast('delete');
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
  }
  .payList-container{
    width: 353px;
    margin: 22px auto;
    .payList-item{
      margin-bottom: 22px;
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
  }
}
</style>