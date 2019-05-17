<template>
    <div class="item-body display-flex">
      <div class="left-box flex-1" :style="{borderBottom: `3px solid ${activeColor}`}">
        <div class="title-box display-flex align-center justify-between">
          <span>1.扫码支付</span>
          <span class="step-bg"></span>
          <span>2.填写信息</span>
          <span class="step-bg"></span>
          <span>3.点击确定提交</span>
        </div>
        <div class="body-box">
          <div class="body-item" v-for="(v,k) in formItem" :key="k">
            <div class="body-title">{{ v.title }}</div>
            <div class="input-box-container">
              <!-- <input :readonly='v.title == "订单编号"'  v-model="v.model" class="eg-input" :placeholder="v.placeholder" type="text"> -->
              <eg-input 
                :type="v.type" 
                :readonly="v.readonly" 
                v-model="v.model" 
                :status="v.status"
                :valueType="v.valueType" 
                :maxlength="v.maxlength"
                :placeholder="v.placeholder"
              ></eg-input>
            </div>
          </div>
          <div class="body-item flex-column display-flex flex-center">
            <div class="body-title">扫码支付</div>
            <div class="img-box display-flex">
              <img :src="payAccountList[pointers.payAccountList].qrcode" alt="">
            </div>
            <!-- <div class="body-bottom display-flex flex-center">刷新二维码</div> -->
          </div>
        </div>
      </div>
      <div class="splice-body-line"></div>
      <div class="right-box display-flex flex-center" :style="{borderBottom: `3px solid ${activeColor}`}">
        <div class="body-right-txtContent" :class="{'on':btnActive}" @click="gotoCharge">
          确定
          <div class="txt-line" :class="{active:btnActive}"></div>
        </div>
      </div> 
    </div>
</template>

<script>
import { resetObj } from "@/js/tools.js"

export default {
  data(){
    return{
      payAccountList: [],
      pointers: {
        payAccountList: 0
      },
      formItem: {
        qrCodeOrderNumber:{
          title: "订单编号",
          model: "",
          placeholder: "请输入付款的订单编号",
          type: "text",
          status: "",
          valueType: "letterNum",
          maxlength: 30
        },
        money:{
          title: "充值金额",
          model: "",
          placeholder: "",
          type: "tel",
          status: "",
          valueType: "num",
          maxlength: 10
        },
        payUser:{
          title: "支付宝昵称",
          model: "",
          placeholder: "请输入付款支付宝昵称",
          type: "text",
          status: "",
          valueType: "",
          maxlength: 10
        }
      },
      btnActive: false
    }
  },
  props:{
    activeColor: {
      type:String,
      default: ""
    },
    itemVal:{
      type:Object,
      default: {}
    }
  },
  watch: {
    formItem: {
      handler (newVal, oldVal) {
          var allRight = true;
          for(let key in newVal){
              if(newVal[key].model){
                  newVal[key].status="active";
              }else{
                  newVal[key].status="";
                  allRight = false;
              }
          }
          this.btnActive = allRight;
      },
      deep: true
    }
  },
  created () {
    this.payAccountList = this.itemVal.typeDetail;
    this.formItem.money.placeholder = `金额范围 ￥${this.itemVal.min_money} - ￥${this.itemVal.max_money}`;
  },
  methods:{
    checkCharge () {
      let obj = this.formItem;
      for (let key in obj) {
          if(key == 'money'){
              let intNum = parseInt(obj[key].model);
              if(intNum < this.itemVal.min_money){
                  this.$toast(`最低充值金额${this.itemVal.min_money}元`);
                  return false;
              }
              else if(intNum > this.itemVal.max_money){
                this.$toast(`最高充值金额${this.itemVal.max_money}元`);
                return false;
              };
          }
          else{
              obj[key].wrongTip = "";
          }
        }
      return true;
    },
    gotoCharge () {
      if(!this.btnActive) return;
      if(!this.checkCharge()) return;
      let param = {};
      param.money = this.formItem.money.model;
      param.payUser = this.formItem.payUser.model;
      param.qrCodeOrderNumber = this.formItem.qrCodeOrderNumber.model;
      param.modelType = this.itemVal.model_type;
      // param.payId = this.itemVal.id;
      param.payId = this.payAccountList[this.pointers.payAccountList].id;
      param.payRemark = "";
      this.$http.post(this.interfaces.comPaySubmit, param, {showLoading:true}).then(res => {
        if(res.code == "200"){
          this.$toast("成功提交充值信息！");
          this.formItem.money.model = "";
          this.formItem.payUser.model = "";
          this.formItem.qrCodeOrderNumber.model = "";
          this.pointers.payAccountList = 0;
        }
      });
    }
  }
}
</script>

<style lang="less" scoped>
.item-body{
  width: 100%;
  .left-box{
    .title-box{
      background: #313131;
      height: 50px;
      font-family: 'PingFangHK-Medium';
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: -0.29px;
      padding: 0 15px;
      .step-bg{
        width: 6px;
        height: 8px;
        background: url('./img/step.png') no-repeat;
        background-size: 100%;
      }
    }
    .body-title{
      font-family: 'PingFangHK-Medium';
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: -0.29px;
      padding-bottom: 11px;
    }
    .body-bottom{
      font-family: 'PingFangHK-Medium';
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: -0.29px;
      padding-top: 20px;
    }
    .body-box{
      padding: 0 14px 20px 14px;
      .body-item{
        padding-top: 16px;
        .input-box-container{
          height: 40px;
        }
        .img-box{
          padding: 1px;
          border-radius: 5px;
          background-image: linear-gradient(-270deg, #24F7F8 0%, #8877FE 100%);
          img{
            border-radius: 5px;
            width: 115px;
            height: 118px;
          }
        }
      }
    }
  }
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
    &.on{
      color: #fff;
    }
    .txt-line{
      height: 2.1px;
      margin-top: 2px;
      background-image: linear-gradient(-90deg, #272727 0%, #515151 100%);
      &.active{
        background-image: linear-gradient(-90deg, #24F7F8 0%, #8877FE 100%);
      }
    }
  }
  .right-box{
    width: 70px;
    flex-shrink: 0;
  }
}
</style>