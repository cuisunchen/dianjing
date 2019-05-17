
<template>
    <div class="personal-home">
        <div class="headBox">
            <eg-header>
                <div class="title" slot="title">我的</div>
                <a href="https://e19.entrychat.com/chat/chatClient/chatbox.jsp?companyID=1146765&configID=2564&jid=6346431126&s=1" class="service" slot="right"></a>
            </eg-header>
        </div>
        <div class="top-wrapper display-flex flex-center flex-column">
            <div class="user-icon-box" :class="{'not-login':!user_token,'has-login':user_token}">
                <div class="user-icon-content" @click="goPage('/personalcenter/personInfo')">
                <em>
                    <img :src='user_token?account.headPortrait:defaultAccountImg' alt="" srcset="">
                </em>
                </div>
            </div>
            <div class="user-base-info" v-if="user_token">
                <p class="tit">账户余额</p>
                <p class="money" v-if="account.userMoney">￥ <span>{{account.userMoney.split('.')[0]}}</span> 
                    <i>.</i>
                    <em>{{account.userMoney.split('.')[1]}}</em> 
                    <span class="refresh" @click="freshMoney"><span class="icon" :class="{'on': refreshMoney}"></span></span>
                </p>
            </div>
            <div class="login-btn" v-else @click="showLogin">登 录</div>            
        </div>
        <div class="main-wrapper">
            <div class="main">
                <div class="topGunBar"></div>
                <div class="item" v-for="item in centerList" :key="item.iconName" @click="goPage(item.url)">
                    <div class="title">
                        <div class="icon" :class="user_token?'icon-'+item.activeIcon:'icon-'+item.iconName"></div>
                        <div class="tit" :class="{'on':user_token}">{{item.title}}</div>
                    </div>
                    <div class="angle">
                        <EgGngle :startColor='user_token?"#23F8F8":"#515151"' :stopColor='user_token?"#8A75FF":"#272727"' :id="item.iconName"></EgGngle>
                    </div>
                </div>
                <div class="botGunBar"></div>
            </div>
        </div>

        <transition name="fade" v-if="pointers.loginReg>0">
            <div class="dialog-wrapper display-flex flex-center">
                <div class="shade" @click="hideDialog" @touchstart.prevent=""></div>
                <!-- 登入区域 -->
                <div class="main-box">
                    <div class="login-content" v-if="pointers.loginReg==1">
                        <gun-bar>
                            <div class="close-header display-flex justify-end">
                                <div class="display-flex">
                                    <span class="close-icon-box" @click.stop="closeLogin"></span>
                                </div>
                            </div>
                            <div class="login-body display-flex flex-column">
                                <div class="item-body">
                                    <eg-input 
                                        :valueType="'lowLetterNum'" 
                                        :maxlength="11" 
                                        v-model="loginParam.userId.model" 
                                        :status="loginParam.userId.status"
                                        placeholder='请输入账号'
                                        @onFocus="onFocusFun(loginParam, 'userId')"
                                    >
                                    </eg-input>
                                    <div style="color:red;">{{ loginParam.userId.wrongTip }}</div>
                                </div>
                                <div class="item-body">
                                    <eg-input 
                                    :type="'password'"
                                    :maxlength="16"  
                                    :status="loginParam.pwd.status" 
                                    :valueType="'lowLetterNum'" 
                                    v-model="loginParam.pwd.model" 
                                    placeholder='请输入密码'
                                    @onFocus="onFocusFun(loginParam, 'pwd')"
                                    ></eg-input>
                                    <div style="color:red;">{{ loginParam.pwd.wrongTip }}</div>
                                </div>
                                <div class="item-body codeWrap display-flex">
                                    <div class="inputBox flex-1">
                                        <eg-input 
                                        :maxlength="4" 
                                        :status="loginParam.code.status" 
                                        :valueType="'num'" 
                                        v-model="loginParam.code.model" 
                                        placeholder='请输入验证码'
                                        @onFocus="onFocusFun(loginParam, 'code')"
                                        ></eg-input>
                                        <div style="color:red;">{{ loginParam.code.wrongTip }}</div>
                                    </div>
                                    <div class="codeBox" @click="setCode">
                                        <img :src="codeSrc" alt="">
                                    </div>
                                </div>
                                <div class="botBox clearFloat">
                                    <div class="left" @click="goKefu">忘了密码</div>
                                    <div class="right" @click.stop="showRegist">注册</div>
                                </div>
                                <div class="btn  eg-button" :class="{'gradient-border':btnLogActive}" @click="login">登 录</div>
                            </div>
                        </gun-bar>
                    </div>
                    <!-- 注册区域 -->
                    <div class="regist-content" v-if="pointers.loginReg==2">
                        <gun-bar>
                            <div class="close-header display-flex justify-end">
                                <span class="close-icon-box" @click="hideDialog"></span>
                            </div>
                            <div class="registForm">
                                <div class="item-body">
                                    <eg-input 
                                    v-model="regParam.userId.model" 
                                    :maxlength="11"  
                                    :status="regParam.userId.status" 
                                    :valueType="'lowLetterNum'"  
                                    placeholder='6-11位字母或数字的用户名'
                                    ></eg-input>
                                    <div style="color:red;">{{ regParam.userId.wrongTip }}</div>
                                </div>
                                <div class="item-body">
                                    <eg-input 
                                    v-model="regParam.pwd.model"
                                    :type="'password'"
                                    :maxlength="16"  
                                    :status="regParam.pwd.status" 
                                    :valueType="'lowLetterNum'"  
                                    placeholder='6-16位字母或数字密码'
                                    ></eg-input>
                                    <div style="color:red;">{{ regParam.pwd.wrongTip }}</div>
                                </div>
                                <div class="item-body">
                                    <eg-input 
                                    :type="'password'"
                                    v-model="regParam.verifyPwd.model" 
                                    :maxlength="16"  
                                    :status="regParam.verifyPwd.status" 
                                    :valueType="'lowLetterNum'" 
                                    placeholder='确认密码'
                                    ></eg-input>
                                    <div style="color:red;">{{ regParam.verifyPwd.wrongTip }}</div>
                                </div>
                                <div class="item-body">
                                    <eg-input 
                                    v-model="regParam.inviteCode.model" 
                                    :maxlength="8"  
                                    :status="regParam.inviteCode.status" 
                                    :valueType="'lowLetterNum'"
                                    placeholder='邀请码(选填)'></eg-input>
                                    <div style="color:red;">{{ regParam.inviteCode.wrongTip }}</div>
                                </div>
                                <div class="item-body codeWrap display-flex">
                                    <div class="inputBox flex-1">
                                        <eg-input 
                                        v-model="regParam.code.model" 
                                        :maxlength="4"  
                                        :status="regParam.code.status" 
                                        :valueType="'lowLetterNum'" 
                                        placeholder='请输入验证码'></eg-input>
                                        <div style="color:red;">{{ regParam.code.wrongTip }}</div>
                                    </div>
                                    <div class="codeBox" @click="setCode">
                                        <img :src="codeSrc" alt="">
                                    </div>
                                </div>
                                <div class="btn  eg-button" :class="{'gradient-border':btnRegActive}" @click="register">注 册</div>
                                <div class="bottom-tip display-flex flex-center">
                                    已有账户？去&nbsp;<span style="color:#8A76FF" @click="closeRegist">登录</span>
                                </div>
                            </div>
                        </gun-bar>
                        
                    </div>
                </div>
            </div>
        </transition>
        <eg-dialog v-if="user_token && user_status.freeGetMoney == '0'">
            <div class="gift-slot">
                <div v-if="pointers.giftStep == 0" class="gift-container-0">
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
                </div>
                <div v-if="pointers.giftStep == 1" class="gift-container-1 display-flex flex-column">
                    <div class="top-container display-flex align-end justify-center">
                        <div class="top-button"> </div>
                    </div>
                    <div class="gift-bg-1 flex-1 display-flex justify-center">
                        <div class="gift-btn" @click="goGiftStep(2)"></div>
                    </div>
                </div>
                <div v-if="pointers.giftStep == 2" class="gift-container-2 display-flex flex-column">
                    <div class="top-container flex-1 display-flex align-end justify-center">
                        <div class="gift-bg-2"></div>
                    </div>
                    <div class="bottom-container">
                        <div class="bottom-btn" @click="goGiftStep(3)"></div>
                    </div>
                </div>
            </div>
        </eg-dialog>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import EgGngle from "../../../components/angle/angle"
import { randomWord, resetObj } from "@/js/tools.js"

import { Popup,Area } from 'vant';
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            defaultAccountImg: require("./../img/userIco.png"),
            centerList:[
                {iconName:'tixian',activeIcon:'tixian-light', title:'余额提现',url:'/personalcenter/balance'},
                // {iconName:'daili',activeIcon:'tixian-light', title:'我的代理',url:''},
                // {iconName:'level',activeIcon:'tixian-light', title:'我的等级',url:''},
                {iconName:'zijin',activeIcon:'zijin-light', title:'资金明细',url:'/personalcenter/zj'},
                {iconName:'edu',activeIcon:'edu-light', title:'额度转换',url:'/personalcenter/ed'},
                {iconName:'touzhu',activeIcon:'touzhu-light', title:'投注明细',url:'/personalcenter/tz'},
                {iconName:'safety',activeIcon:'safety-light', title:'安全中心',url:'/personalcenter/safeCenter'},
            ],
            switchs:{
                firstDialog: true,
                secondDialog: false,
            },  
            dialogList: [{
                txtcontent: "您有38元的彩金待领取",
                btnText: "立即领取"
            },{
                txtcontent: "彩金已发放到您的账户！赠送彩金只能用于电竞投注。",
                btnText: "知道了"
            }],
            pointers:{
                loginReg:0,
                dialogList: 0,
                giftStep: 0
            },
            loginParam: {
                userId: {
                    model:"",
                    wrongTip:"",
                    status:""
                },
                pwd:{
                    model:"",
                    wrongTip:"",
                    status:""
                },
                code:{
                    model:"",
                    wrongTip:"",
                    status:""
                }
            },   
            codeSrc:"",    
            code_id: "",  
            isRegist:false,                 //  表单验证完后设置为true    控制button高亮
            regParam: {
                userId:{
                    model:"",
                    wrongTip:"",
                    status:""
                },
                pwd:{
                    model:"",
                    wrongTip:"",
                    status:""
                },
                verifyPwd:{
                    model:"",
                    wrongTip:"",
                    status:""
                },
                inviteCode:{
                    model:"",
                    wrongTip:"",
                    status:""
                },
                code:{
                    model:"",
                    wrongTip:"",
                    status:""
                }
            },
            refreshMoney:false,
            timer_1: {},
            timer_1_num: 5
        }
    },
    created() {
        if(this.user_token){
            if(this.queryThird){
                let param = {};
                param.transferOut = "1";
                console.log("zdzc");
                this.$api.getUserInfo(param, this.getUserStatus);
            }else{
                this.$api.getUserInfo("", this.getUserStatus);
            }
        }
    },
    mounted () {
    },
    watch: {
        loginParam: {
            handler (newVal) {
                for(let key in newVal){
                    if(newVal[key].model){
                        newVal[key].status="active";
                    }else{
                        newVal[key].status="";
                    }
                }
            },
            deep: true
        },
        regParam: {
            handler (newVal) {
                for(let key in newVal){
                    if(newVal[key].model){
                        newVal[key].status="active";
                    }else{
                        newVal[key].status="";
                    }
                }
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters([
            'user_token',
            'account',
            'isReg',
            'net_btn_click',
            'queryThird',
            'user_status'
        ]),
        btnLogActive () {
            if(this.loginParam.userId.status=="active" && this.loginParam.pwd.status=="active" && this.loginParam.code.status=="active"){
                return true
            }
        },
        btnRegActive () {
            if(this.regParam.userId.status=="active" && this.regParam.pwd.status=="active" && this.regParam.verifyPwd.status=="active" && this.regParam.code.status=="active"){
                return true
            }
        }
    },
    components: {
        EgGngle,Popup,        
        'eg-area':Area
    },
    methods: {
        ...mapMutations({
            setUserToken:'SET_USER_TOKEN',
            setAccount:'SET_ACCOUNT',
            setIsReg: 'SET_ISREG',
            setNetBtnClick: 'SET_NET_BTNCLICK',
            setUserStatus: 'SET_USER_STATUS'
        }),
        ...mapActions([
            'getMoneyStatus'
        ]),
        getUserStatus () {
            if(this.user_status.freeGetMoney != '1'){
                this.getMoneyStatus();
            }
        },
        goGiftStep (step) {
            if(step == 1){
                this.$http.post(this.interfaces.freeGetMoney, {showLoading: true}).then( res => {
                    if(res.code == "200"){
                        let param = {};
                        param.transferOut = "0";
                        this.$api.getUserInfo();
                        setTimeout(() => {
                            this.pointers.giftStep = step;
                        },500)
                        
                    }
                })
            }
            else if(step<3){
                this.pointers.giftStep = step;
            }
            else{
                this.setIsReg(true);
                this.$router.push("/");
            }
        },
        freshMoney(){
            if(!this.net_btn_click) return;
            this.refreshMoney = true;
            let param = {};
            param.transferOut = "1";
            this.setNetBtnClick(false);
            this.$http.post("/user/userInfo", param).then(res => {
                this.refreshMoney = false
                if(res.code == "200"){
                    this.setAccount(res.data)
                }else{
                    localStorage.removeItem('U_TK');
                    this.setUserToken('')
                }
            }).catch(err => {
                this.$toast("获取用户信息失败！");
                localStorage.removeItem('U_TK');
                this.setUserToken('')
            });
        },
        goKefu(){
            this.$router.push({path:'/personalcenter/kefu?url=' + sessionStorage.getItem('kefu_url')})
        },
        goPage(url){
            if(this.user_token){
                this.$router.push({path:url,query:{}});
            }else{
                this.$toast('暂未登录，请先登录')
                setTimeout(() => {
                    this.$router.push({path:'/login'})
                }, 1000);
                return
            }
        },
        closeRegist(){
            this.pointers.loginReg = 1;
        },
        showRegist(){
            this.$router.push({path:'/regist'})
            // this.setCode();
            // this.pointers.loginReg = 2;
        },
        hideDialog(){
            this.pointers.loginReg = 0;
        },
        closeLogin(){
            this.pointers.loginReg = 0;
        },
        showLogin(){
            // this.setCode();
            // this.pointers.loginReg = 1;
            // document.body.style.overflow = 'hidden';
            // document.body.style.height = '100%';
            this.$router.push("/login")
        },
        net_login (param) {
            return this.$http.post("/user/login", param, {showLoading: true});
        },
        handle_login (res) {
            if(res.code == "200"){
                this.$toast("登录成功");
                this.setUserToken(res.data.token);
                localStorage.setItem("U_TK", res.data.token);
                this.hideDialog();
                this.$api.getUserInfo();
                resetObj(this.loginParam);
            }else{
                this.setCode();
            }
        },
        checkLogin (param) {
            for (let key in param) {
                if(!param[key]){
                    this.$toast("参数名不能为空");
                    return false;
                }
            }
            return true;
        },
        login () {
            if(!this.btnLogActive) return;
            let param = {};
            param.userId = this.loginParam.userId.model;
            param.pwd = this.loginParam.pwd.model;
            param.code = this.loginParam.code.model;
            param.codeId = this.code_id;
            if(this.checkFormData(this.loginParam)){
                this.net_login(param).then(res => {
                    this.handle_login(res);
                });
            }
        },
        quit () {
            localStorage.removeItem('U_TK');
            this.setUserToken("");
            this.setAccount("");
        },
        setCode(){     
            this.code_id = 'H' + randomWord(false,8,10);
            this.codeSrc=`${this.interfaces.generatorCode}?code_id=${this.code_id}`;
        },
        net_register (param) {
            return this.$http.post("/user/register", param, {showLoading: true});
        },
        handle_register (res) {
            if(res.code == "200"){
                this.$toast("注册成功");
                this.pointers.loginReg = 1;
                resetObj(this.regParam);
                this.setCode();
            }else{
                this.setCode();
            }
        },
        register () {
            if(!this.btnRegActive) return;
            let param = {};
            param.userId = this.regParam.userId.model;
            param.pwd = this.regParam.pwd.model;
            param.code = this.regParam.code.model;
            param.inviteCode = this.regParam.inviteCode.model;
            param.codeId = this.code_id;
            if(this.checkFormData(this.regParam, "register")){
                this.net_register(param).then(res => {
                    this.handle_register(res);
                }).catch(err => {
                    this.handle_catch(err);
                })
            }else {
                
            }
        },
        onFocusFun (obj, key) {
            obj[key].wrongTip = "";
        },
        onBlurFun (obj, key) {
        },
        checkRegData (obj) { 
        },
        checkFormData (obj) {
            for (let key in obj) {
                if(key == 'userId'){
                    if(obj[key].model.length < 6){
                        // obj[key].wrongTip = "用户名长度不能小于6位";
                        this.$toast("用户名长度不能小于6位");
                        return false;
                    }else{
                        obj[key].wrongTip = "";
                    }
                }else if(key == 'pwd'){
                    if(obj[key].model.length < 6){
                        // obj[key].wrongTip = "密码长度不能小于6位";
                        this.$toast("密码长度不能小于6位");
                        return false;
                    }else{
                        obj[key].wrongTip = "";
                    }
                }
                
                if(key == 'verifyPwd'){
                    if(obj[key].model.length < 6){
                        // obj[key].wrongTip = "密码长度不能小于6位";
                        this.$toast("密码长度不能小于6位");
                        return false;
                    }
                    else if(obj[key].model != obj['pwd'].model){
                        // obj[key].wrongTip = "密码不一致，请重新输入";
                        this.$toast("密码不一致，请重新输入");
                        return false;
                    }
                    else{
                        obj[key].wrongTip = "";
                    }
                }
                else if(key == 'code'){
                    if(obj[key].model.length != 4){
                        // obj[key].wrongTip = "请重新输入验证码";
                        this.$toast("请重新输入验证码");
                        return false;
                    }else{
                        obj[key].wrongTip = "";
                    }
                }
                
            }
            return true;
        },
        goKefu(){
            this.$router.push({path:'/personalcenter/kefu',query:{url:sessionStorage.getItem('kefu_url')}});
        },
    }
}
</script>

<style scoped lang="less">
@import "../../../style/common.less";
.personal-home{
    .headBox{
        height: 44px;
        .title{
            font-family: PingFangHK-Medium;
            font-size: 18px;
            // height: 30px;
        }
        .service{
            width: 32px;
            height: 28px;
            margin-top: 6px;
            .bg-image("./../../../assets/img/service");
            background-size:cover
        }
        .userBox{
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 10px;
            .userCon{
                position: relative;
                .userImg{
                    width: 82px;
                    height: 82px;
                    margin: 0 auto;
                    border-radius: 50%;
                    overflow: hidden;  
                    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.80),;                  
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }                
                .userBar{
                    position: absolute;
                    top: 62px;
                    left: 50%;
                    margin-left: -35px;
                    width: 70px;
                    height: 26px;
                    line-height: 30px;
                    font-family: PingFangHK-Regular;
                    font-size: 12px;
                    color: #FFFFFF;
                    text-align: center;
                    .bg-image('./../img/loginBar');
                    background-size: cover;
                }
                .userInfoWrap{
                    .username{
                        margin-top: 6px;
                    }
                    >p{
                        text-align: center;
                        line-height: 20px;
                    }
                }
                
            }
        }
    }
    .top-wrapper{
        background: url('./../img/top-bg.png') no-repeat;
        background-size: 100%;
        background-position: 0% 100%;
        height: 252px;
        .not-login{
            background: url('./../img/user-border.png') no-repeat;
            background-size: 100% 100%;
            background-position: 50% 55%;
        }
        .has-login{
            background: url('./../img/user-border-active.png') no-repeat;
            background-size: 100% 100%;
            background-position: 50% 55%;
        }
        .user-icon-box{            
            width: 179px;
            height: 153px;
            .user-icon-content{
                width: 100px;
                height: 100px;
                overflow: hidden;
                border-radius: 50%;
                margin: 15px auto 0;
                background: url('./../../../assets/img/loading-logo.png') no-repeat;
                background-size: auto 70%;
                background-position: center;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .login-btn{
            width: 150px;
            height: 35px;
            color: #fff;
            text-align: center;
            line-height: 35px;
            background: #202020;
            box-shadow:0px 4px 8px 0px rgba(47,234,249,0.8);
            border: 1px solid;
            border-image: linear-gradient(to right, #23F8F8, #8A75FF) 10 20;
        }
        .user-base-info{
            >p{
                text-align: center;
                &.tit{
                    color: #6C6C6C;
                }
                &.money{
                    font-size: 24px;
                    font-weight: bold;
                    color: #FFD200;
                    position: relative;
                    >span{
                        font-size:35px;
                    }
                    i{
                        padding: 0 2px;
                    }
                    .refresh{
                        position: absolute;
                        top: 0;                                
                        right: -50px;
                        padding: 0 20px 0 10px;
                        height: 100%;
                    .icon{
                        display: inline-block;
                        width: 18px;
                        height: 18px;
                        background: url("../../../assets/img/refresh.png") no-repeat;
                        background-size: cover;
                        &.on{
                            transform: rotate(360deg);
                            animation: rotation 1s linear infinite;
                        }
                    }

                    @keyframes rotation {
                        from {-webkit-transform: rotate(0deg);}
                        to {-webkit-transform: rotate(360deg);}
                    }
                }
                }
            }
        }
    }
    .main-wrapper{
        padding: 0 11px;        
        .main{
            position: relative;
            background-color: #262626;
            .item{
                display: flex;
                padding: 19px 35px;
                border-bottom: 1px solid #0F0F0F;                
                .title{
                    flex: 1;
                    display: flex;;
                    .icon{
                        width: 28px;
                        height: 28px;
                        &.icon-tixian{
                            background: url('../img/tixian.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-tixian-light{
                            background: url('../img/tixian-light.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-safety{
                            background: url('../img/safety.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-safety-light{
                            background: url('../img/safety-light.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-daili{
                            background: url('../img/daili.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-daili-light{
                            background: url('../img/daili-light.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-level{
                            background: url('../img/level.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-level-light{
                            background: url('../img/level-light.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-zijin{
                            background: url('../img/zijin.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-zijin-light{
                            background: url('../img/zijin-light.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-touzhu{
                            background: url('../img/touzhu.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-touzhu-light{
                            background: url('../img/touzhu-light.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-edu{
                            background: url('../img/edu.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-edu-light{
                            background: url('../img/edu-light.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-kefu{
                            background: url('../img/kefu.png') no-repeat;
                            background-size: cover;
                        }
                        &.icon-kefu-light{
                            background: url('../img/kefu-light.png') no-repeat;
                            background-size: cover;
                        }
                    }
                    .tit{
                        color: #6C6C6C;
                        font-size:15px;
                        // font-weight:bold;
                        line-height: 28px;
                        padding-left: 28px;
                        &.on{
                            color: #fff;
                        }
                    }
                }
                .angle{
                    width: 16px;
                    // height: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                &:last-child{
                    border-bottom: none
                }
            }
            .topGunBar{
                position: absolute;
                top: 0;
                width: 100%;
                height: 12px;
                background: url('../img/gunBar.png') no-repeat;
                background-size:cover;
            }
            .botGunBar{
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 12px;
                background: url('../img/gunBar.png') no-repeat;
                background-size:cover;
                transform: scale(-1,-1);
            }
        }
    }
    .dialog-wrapper{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 901;
        .shade{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,0.68);
        }
        .main-box{
            // position: absolute;
            // top: 0;
            // left: 0;
            // right: 0;
            // padding: 0 30px;  
            .title{
                font-size:12px;
                font-family:PingFangSC-Medium;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:40px;
                margin-top: 10px;
            }
            .codeWrap{
                .inputBox{              
                    padding-right: 10px;
                }
                .codeBox{
                    width: 98px;
                    padding: 1px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }                    
            }
            .btn{
                height: 40px;
                text-align: center;
                line-height: 40px;
                margin-bottom: 20px;
                margin-top: 20px;
            }
            .item-body{
                height: 40px;
                margin-top: 20px;
            }
            .botBox{
                color: #fff;
                line-height: 40px;
                .right{
                    padding-left: 30px;
                }
            }
            .close-header{
                    background-color: @bg_dark_black;
                    height: 15px;
                    font-size: 15px;
                    padding: 9px 6px 0 0;
                    .close-icon-box{
                        width: 13px;
                        height: 13px;
                        background: url('./../img/cha.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            .login-content{
                // padding-top: 53px;
                
                .login-body{
                    padding: 0 20px 20px 20px;
                    overflow: hidden;
                    background:@bg_dark_black;
                }                
            }          
            
            .regist-content{                
                .top{
                    height: 53px;
                    .back{
                        display: inline-block;
                        height: 100%;
                        width: 60px;
                        .icon{
                            display: inline-block;
                            width: 18px;
                            height: 18px;
                            margin-top: 13px;
                            background: url("../img/btn_back.png") no-repeat;
                            background-size: cover;
                        }
                    }
                }
                // padding-top: 53px;
                .registForm{
                    overflow: hidden;
                    padding: 0 20px 20px 20px;
                    background-color: #262626;
                    .bottom-tip{
                        color:@color_txt_lightBlack;
                    }
                }
            }
        }
    }
    .gift-slot{
        width: 100%;
        height: 100%;
        .gift-container-0{
            width: 100%;
            height: 100%;
            .main-box{
                margin: 130px auto; 
                height: 250px;
                .get-gift-bg{
                    width: 330px;
                    height: 200px;
                    background: url("./../../../assets/img/caijin.jpg") no-repeat;
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
        .gift-container-1{
            width: 100%;
            height: 100%;
            .top-container{
                height: 282px;
                .top-button{
                    width: 200px;
                    height: 50px;
                    border-radius: 60px;
                    background-color: rgba(255,255,255,0.5);
                }
            }
            .gift-bg-1{
                width: 100%;
                background: url("./../img/reg-gift.png") no-repeat;
                background-size: 65% 70%;
                background-position: top center;
                .gift-btn{
                    width: 200px;
                    height: 100px;
                    margin-top: 200px;
                }
            }
        }
        .gift-container-2{
            width: 100%;
            height: 100%;
            .top-container{
                .gift-bg-2{
                    width: 100%;
                    height: 300px;
                    background: url("./../img/gift-gohome.png") no-repeat;
                    background-size: 85% 100%;
                    background-position: bottom center;
                }
            }
            .bottom-container{
                width: 100%;
                height: 60px;
                .bottom-btn{
                    border-radius: 50%;
                    background-color: rgba(255,255,255,0.2);
                    width: 60px;
                    height: 60px;
                    margin-left: 7px;
                }
            }

        }
    }
}
</style>