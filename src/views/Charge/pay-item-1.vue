<template>
    <div class="item-body display-flex">
          <div class="left-box flex-1" :style="{borderBottom: `3px solid ${activeColor}`}">
            <div class="body-title">快捷金额</div>
            <div class="num-box display-flex flex-wrap justify-between">
              <!-- <div class="num-btn display-flex flex-center" v-for="(v,k) in numList" :key="k">
                ￥{{ v.num }}
              </div> -->
              <div class="num-btn display-flex flex-center" v-for="(v,k) in numList" :key="k" @click="chooseQuickNum(v,k)">
                <input-box :status="pointers.numList==k?'active':''">
                      <!-- /*disabled*/ -->
                      <button class="eg-button-box" slot="button">￥{{ v.num }}</button>
                </input-box>
              </div>
            </div>
            <div class="body-title">自定义金额</div>
            <div class="flex-1 input-box-container"  v-for="(v,k,index) in formItem" :key="index">
              <eg-input 
                :type="v.type" 
                :readonly="v.readonly" 
                v-model="v.model" 
                :status="v.status"
                :valueType="v.valueType" 
                :maxlength="v.maxlength"
                :placeholder="v.placeholder"
                @onFocus="onFocusFun"
              ></eg-input>
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
import QS from 'qs';
import { mapGetters, mapMutations } from 'vuex'

export default {
  data(){
    return{
      pointers:{
        numList: -1
      },
      numList: [{
        num: '100',
        active: "active"
      },{
        num: '500',
        active: "active"
      },{
        num: '1000',
        active: "active"
      },{
        num: '5000',
        active: "active"
      },],
      payNum: "",
      showBoxBorder: false,
      btnActive: true,
      customizeStatus: "",
      thirdPayurl: "",
      formItem: {
        money: {
          model: "",
          title: "汇款姓名",
          model: "",
          placeholder: "" ,
          type: "tel",
          status: "",
          valueType: "num",
          maxlength: 10
        }
      }
    }
  },
  watch:{
    formItem: {
      handler (newVal, oldVal) {
        var allRight = true;
        for(let key in newVal){
            if(newVal[key].model && this.pointers.numList<0){
              newVal[key].status="active";
            }
            if(!newVal[key].model){
              newVal[key].status="";
              allRight = false;
            }
            if(this.pointers.numList >= 0){
              newVal[key].status="";
              allRight = true;
            }
        }
        this.btnActive = allRight;
      },
      deep: true
    },
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
  created(){
    this.chooseQuickNum (this.numList[0],-1);
    this.formItem.money.placeholder = `金额范围 ￥${this.itemVal.min_money} - ￥${this.itemVal.max_money}`;
  },
  computed: {
    ...mapGetters([
      'ismjb'
    ])
  },
  methods: {
    checkCharge () {
      let obj = this.formItem;
      for (let key in obj) {
          if(key == 'money'){
              let intNum = parseInt(obj[key].model);
              if(intNum < this.itemVal.min_money){
                  this.$toast(`最低充值金额${this.itemVal.min_money}元`);
                  return false;
              }
              else if(intNum > parseInt(this.itemVal.max_money)){
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
    chooseQuickNum (v,k) {
      this.pointers.numList = k;
      if(k>=0){
        this.btnActive = true;
        this.formItem.money.model = v.num;
        this.formItem.money.status = "";
      }else{
        this.btnActive = false;
      }
      
    },
    onTouchStart (){
    },
    onFocusFun () {
      this.pointers.numList = -1;
      this.formItem.money.status = "active";
    },
    gotoCharge () {
      if(!this.btnActive) return;
      if(!this.checkCharge()) return;
      let param = {};
      param.money = this.formItem.money.model;
      param.payType = this.itemVal.pay_type;
      param.gateFlag = this.itemVal.gate_flag;
      param.tradeAccountId = this.itemVal.id;
      const ismjb = this.ismjb || sessionStorage.getItem('ismjb');
      if(ismjb == "ios"){
        this.$router.push(`/mpage?jumpLink=${this.interfaces.toChargeNew}&goto=pay&${QS.stringify(param)}`);
      }else{
        window.open(`/mpage?jumpLink=${this.interfaces.toChargeNew}&goto=pay&${QS.stringify(param)}`);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item-body{
  width: 100%;
  .left-box{
    padding: 22px 14px;
    .body-title{
      font-family: 'PingFangHK-Medium';
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: -0.29px;
      padding-bottom: 11px;
    }
    .input-box-container{
      height: 40px;
    }
    .num-box{
      width: 100%;
      .num-btn{
        flex-shrink: 0;
        width: 120px;
        height: 35px;
        box-sizing: border-box;
        margin-bottom: 15px;
        // background: #202020;
        // border: 0.5px solid #000000;
        // border-radius: 4px;
        // font-family: 'PingFangHK-Medium';
        // font-size: 15px;
        // color: #FFFFFF;
        // letter-spacing: -0.36px;
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