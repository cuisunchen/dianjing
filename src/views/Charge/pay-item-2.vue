<template>
    <div class="item-body display-flex">
      <div class="left-box flex-1" :style="{borderBottom: `3px solid ${activeColor}`}">
        <div class="body-box">
          <div class="body-item">
            <div class="body-title">
              收款人信息
            </div>
            <div class="body-content body-title" v-for="(v,k) in bankNameList" @click="chooseBank(v,k)" :key="k" :class="{active:k==pointers.bankNameList}">
              <div class="txt-content" >
                <div class="txt-content-item" >
                  <span>银行：</span>
                  <span>{{ v.typeName }}</span>
                </div>
                <div class="txt-content-item">
                  <span>名称：</span>
                  <span>{{ v.sk_people }}</span>
                </div>
                <div class="txt-content-item">
                  <span>账户：</span>
                  <span>{{ v.account_no }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="body-item">
            <div class="body-title">
              转存款方式
            </div>
            <div class="body-content body-title active" style="margin:0">
              <div class="select-list display-flex align-center "> 网银转账 </div>
            </div>
          </div>
          <div class="body-item" v-for="(v,k,index) in formItem" :key="index">
            <div class="body-title">{{ v.title }}</div>
            <div class="input-box-container">
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
        </div>
      </div>
      <div class="splice-body-line"></div>
      <div class="right-box display-flex flex-center" :style="{borderBottom: `3px solid ${activeColor}`}">
        <div class="body-right-txtContent" @click="gotoCharge" :class="{'on':btnActive}">
          确定
          <div class="txt-line" :class="{active:btnActive}"></div>
        </div>
      </div>
    </div>
</template>

<script>
import { Area } from 'vant';
import { resetObj } from "@/js/tools.js"
export default {
  data(){
    return{
      bankNameList: [],
      formItem: {
        money: {
          title: "充值金额",
          model: "",
          placeholder: "",
          type: "tel",
          status: "",
          valueType: "num",
          maxlength: 10
        },
        payUser: {
          title: "汇款姓名",
          model: "",
          placeholder: "请输入汇款人姓名" ,
          type: "text",
          status: "",
          valueType: "",
          maxlength: 8
        },
        payRemark: {
          title: "备注留言(选填)",
          model: "",
          placeholder: "可输入备注内容" ,
          type: "text",
          status: "",
          valueType: "",
          maxlength: 30
        }
      },
      btnActive:false,
      pointers: {
        bankNameList: 0
      }
    }
  },
  watch: {
    formItem: {
      handler (newVal, oldVal) {
          var allRight = true;
          for(let key in newVal){
              if(newVal[key].model && key!="payRemark"){
                  newVal[key].status="active";
              }else if(key!="payRemark"){
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
    this.bankNameList = this.itemVal.typeDetail;
    // this.formItem.money.placeholder = `金额范围 ￥${this.itemVal.min_money} - ￥${this.itemVal.max_money}`;
    this.formItem.money.placeholder = `金额范围 ￥${this.bankNameList[this.pointers.bankNameList].min_money} - ￥${this.bankNameList[this.pointers.bankNameList].max_money}`;
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
  methods: {
    checkCharge () {
      let obj = this.formItem;
      for (let key in obj) {
          if(key == 'money'){
              let intNum = parseInt(obj[key].model);
              // if(intNum < this.itemVal.min_money){
              if(intNum < this.bankNameList[this.pointers.bankNameList].min_money){
                  this.$toast(`最低充值金额${this.itemVal.min_money}元`);
                  return false;
              }
              // else if(intNum > parseInt(this.itemVal.max_money)){
                else if(intNum > this.bankNameList[this.pointers.bankNameList].max_money){
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
      param.payId = this.bankNameList[this.pointers.bankNameList].id;
      param.payRemark = this.formItem.payRemark.model;
      param.modelType = this.itemVal.model_type;
      this.$http.post(this.interfaces.comPaySubmit, param, {showLoading:true}).then(res => {
        if(res.code == "200"){
            this.$toast("成功提交充值信息！");
            this.formItem.money.model = "";
            this.formItem.payUser.model = "";
            this.formItem.payRemark.model = "";
            this.pointers.bankNameList = 0;
        }
      })
    },
    chooseBank(v,k){
      this.pointers.bankNameList = k;
      this.formItem.money.placeholder = `金额范围 ￥${this.bankNameList[this.pointers.bankNameList].min_money} - ￥${this.bankNameList[this.pointers.bankNameList].max_money}`;
    }
  }
}
</script>

<style lang="less" scoped>
.item-body{
  width: 100%;
  .left-box{
    padding: 0 14px;
    .title-box{

    }
    .body-title{
      font-family: 'PingFangHK-Medium';
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: -0.29px;
      padding-bottom: 11px;
    }
    .body-item{
      padding: 10px 0;
      .input-box-container{
        height: 40px;
      }
      .body-content{
        padding: 1px;
        background-color: #000000;
        border-radius: 3px;
        margin-top:10px;
        &.active {
          background-image: linear-gradient(-270deg, #24F7F8 0%, #8877FE 100%);
        }
        .txt-content{
          padding: 14px;
          border-radius: 2px;
          background: #202020;
          .txt-content-item{
            padding-bottom: 7px;
            &:last-child{
              padding-bottom: 0;
            }
          }
        }
        .select-list{
          height: 35px;
          background: #202020;
          border-radius: 2px;
          padding-left:15px;
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