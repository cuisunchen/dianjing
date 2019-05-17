<template>
    <div class="balance-wrapper">
        <div class="head-container">
            <eg-header>
                <div class="icon-back" @click="$router.go(-1)" slot="left"></div>
                <div class="large-white-txt" slot="title">余额提现</div>
                <div class="small-white-txt" @click="goPage('/personalcenter/balanceRecord')" slot="right">提现记录</div>
            </eg-header>
        </div>
        <div class="main-container">
            <div class="title-box display-flex flex-center flex-column">
                <div class="small-white-txt">可提现金额</div>
                <div class="title-txt" v-if="account.userMoney"><em>￥</em><span>{{ account.userMoney.split(".")[0]}}</span> <i>.</i> <em>{{ account.userMoney.split(".")[1]}}</em></div>
            </div>
            <div class="balance-box">
                <gun-bar>
                    <div class="item-content" v-for="(v,k,index) in balanceObj" :key="index">
                        <div class="item-title small-white-txt">{{ v.title }}</div>
                        <div class="item-body" @click="v.canClick &&  goPage('/personalcenter/setPassword?type=4')">
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
                    <div class="tip-content small-lightBlack-txt">
                        <div style="color:#E60012">{{ balanceTip }}</div>
                        <div>提现金额最低100元</div>
                        <div>当前打码：{{ account.currentDml }}  出款需要打码量：{{ account.chukDml }}</div>
                    </div>
                    
                    <div class="loginBtn-box">
                        <div class="login-btn eg-button " :class="{'gradient-border':btnActive}" @click="gotoDraw"><b>确&nbsp;定</b></div>
                    </div>
                </gun-bar>
            </div>
        </div>
        <eg-dialog :txtcontent="txtcontent" v-if="dialogShow"  @onConfirm="goPage('/personalcenter/setPassword?type=2&from=balance')"></eg-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parse } from 'path';

export default {
    data () {
        return {
            txtcontent: "您还未设置提现密码，为了您的账户安全请前往密码设置",
            switchs: {
                dialog: true
            },
            btnActive: {},
            balanceTip: "",
            balanceObj:{
                drawNum: {
                    model:"",
                    title: "提现金额",
                    placeholder: "请输入提现金额",
                    readOnly: false,
                    status: "",
                    maxlength: 10,
                    valueType: "num",
                    type: "text"
                },
                bankNum: {
                    model:"",
                    title: "银行卡号",
                    placeholder: "",
                    readonly: true,
                    status: "",
                    maxlength: 6,
                    valueType: "num",
                    type: "text",
                    canClick: true
                },
                drawPwd: {
                    model:"",
                    title: "提款密码",
                    placeholder: "请输入您的提款密码",
                    status: "",
                    maxlength: 6,
                    valueType: "num",
                    type: "password"
                }
            }
        }
    },
    computed: {
        ...mapGetters([
            'user_token',
            'account'
        ]),
        dialogShow () {
            return this.account.bankPassword=="true" ? false : true;
        }
    },
    watch: {
        balanceObj: {
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
        },
        account: {
            handler (newVal, oldVal) {
                this.setBankNum();
            },
            deep: true
        }
    },
    created () {
        this.setBankNum();
    },
    methods: {
        goPage(url){
            this.$router.push({path:url});
        },
        setBankNum () {
            if(this.account.bankNumber){
                this.balanceObj.bankNum.model = this.account.bankNumber;
                this.balanceObj.bankNum.canClick = false;
            }else{
                this.balanceObj.bankNum.placeholder = "请添加银行卡";
                this.balanceObj.bankNum.model = this.account.bankNumber;
                this.balanceObj.bankNum.canClick = true;
            }
        },
        checkDraw  () {
            let obj = this.balanceObj;
            this.balanceTip = "";
            for (let key in obj) {
                if(key == 'drawNum'){
                    let intNum = parseInt(obj[key].model);
                    if(intNum < 100){
                        this.$toast("最低提现金额100元");
                        return false;
                    }
                    else if(intNum > parseInt(this.account.userMoney)){
                        this.$toast("提现金额不能大于账户余额");
                        return false;
                    }else if(parseFloat(this.account.chukDml) > parseFloat(this.account.currentDml)) {
                        this.$toast("当前打码量不足！");
                        return false;
                    }
                }
                else{
                    obj[key].wrongTip = "";
                }
             }
             return true;
        },
        gotoDraw () {
            if(!this.btnActive) return;
            if(!this.checkDraw()) return;
            let param = {}
            param.money= this.balanceObj.drawNum.model;
            param.bankPassword  = this.balanceObj.drawPwd.model;
            this.$http.post(this.interfaces.withdrawCash, param, {showLoading:true}).then(res=>{
                if(res.code == "200"){
                    this.$api.getUserInfo();
                }else if(res.code == "201"){
                    this.balanceTip = res.msg;
                }
            });
        }
    },
}
</script>

<style lang="less" scoped>
@import "../../../../style/index.less";
.balance-wrapper{
    .head-container{
        height: 44px;
    }
    .main-container{
        padding: 0 11px;
        .title-box{
            padding: 30px 0;
            .title-txt{
                color: @color_txt_yellow;
                font-size: 35px;
                line-height: 35px;
                font-weight: bold;
                margin-top: 14px;
                em{
                    font-size: 24px;
                }
            }
        }
        .balance-box{
            background-color: @bg_dark_black;
            .item-content{
                padding: 20px 20px 0 20px;
                .item-title{
                }
                .item-body{
                    height: 40px;
                    padding-top: 5px;
                }
            }
            
            .tip-content{
                padding-bottom: 30px;
                padding: 11px 20px 30px 20px;
            }
            .loginBtn-box{
                    padding: 0 20px 40px 20px;
                .login-btn{
                    height: 40px;
                }
            }
        }
    }
}
</style>

