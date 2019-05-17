<template>
    <div class="login-wrapper display-flex flex-column">
        <div class="headBox">
            <div class="header-box" v-if="!switchs.showLoginBox">
                <div class="iconWrap" @click="goBack(1)"><span class="icon-back"></span></div>
            </div>
            <eg-header v-if="switchs.showLoginBox">
                <div class="icon-back"  slot="left" @click="goBack(2)"></div>
                <div class="large-white-txt" slot="title">登录</div>
            </eg-header>
        </div>
        <div class="main-container flex-1 ">
            <transition name="slide-out">
                <div class="not-login-body display-flex flex-column  align-center" v-if="!switchs.showLoginBox">
                    <div class="not-login-bgContent" ></div>
                    <div class="not-login-box" >
                        <div class="not-login-btn item-btn small-white-txt display-flex" v-for="(v,k) in mainLoginList" :key="k" @click="showLogin(v)">
                            <span class="btn-left__box display-flex flex-center">
                                <span class="content-icon" :class="v.iconClass"></span>
                            </span>
                            <span class="btn-middle__box flex-1 display-flex align-center">{{ v.name }}</span>
                        </div>
                        <span class="splice-line-box display-flex flex-center">
                            <span class="splice-line-border flex-1"></span>
                            <span class="splice-line-txt small-white-txt">或</span>
                            <span class="splice-line-border flex-1"></span>
                        </span>
                        <div class="not-login-btn item-btn display-flex no-spport" v-for="v in otherLoginList" :key="v.name">
                            <span class="btn-left__box display-flex flex-center">
                                <span class="content-icon" :class="v.iconClass"></span>
                            </span>
                            <span class="btn-middle__box  display-flex align-center">{{ v.name }} </span>
                            <span class="btn-right__box flex-1 display-flex align-center">（暂不支持）</span>
                        </div>
                    </div>                     
                </div>
            </transition>
            <transition name="slide-in" @after-enter="afterEnter">
                <div class="login-box display-flex flex-column align-center" v-if="switchs.showLoginBox">
                    <!-- <input type="text" name="" id="inputEl"> -->
                    <div class="login-input-box display-flex" v-for="(v, k, index) in loginParam" :key="index">
                        <div class="mian-content flex-1">
                            <eg-input 
                            :type="v.type" 
                            v-model="v.model"  
                            :placeholder='v.placeholder'
                            :status="v.status" 
                            :valueType="v.valueType" 
                            :maxlength="v.maxlength"
                            :leftIcon = "v.leftIcon.haveIcon"
                            :styleObj="{paddingLeft: '54px'}"
                            >
                            <img class="input-left-icon" slot="leftIcon" :src="v.leftIcon.iconUrl" alt="">
                            <!-- 如果需要右边的图标 -->
                            <!-- <img class="input-left-icon" slot="rightIcon" :src="v.leftIcon.iconUrl" alt=""> -->
                            </eg-input>
                        </div>
                        <div class="extra-content" v-if="v.extra">
                            <img :src="codeSrc" alt=""  @click="setCode">
                        </div>
                    </div>
                    <div class="login-btn-box  eg-button" :class="{'gradient-border':btnActive}" @click="login">登 录</div>
                    <div class="handle display-flex justify-between">
                        <span @click="gotoReg">立即注册</span>
                        <a href="https://e19.entrychat.com/chat/chatClient/chatbox.jsp?companyID=1146765&configID=2564&jid=6346431126&s=1">忘记密码?</a>
                    </div>
                    
                    <button id="focusBtn" style="opacity:0">聚焦</button>
                </div>
            </transition>
        </div>
        <div class="footer-wrapper display-flex flex-column" v-if="!switchs.showLoginBox">
            <div class="bottom-bar display-flex flex-center">
                <div class="bar-line"></div>
            </div>            
            <div class="main-box flex-1 display-flex flex-center midum-white-txt">新用户？<span style="color:#8A76FF" @click="gotoReg">立即注册</span></div>
        </div>
    </div>
</template>

<script>
import egHeader from "../../components/header/eg-header";
import { Field,Button,CellGroup  } from 'vant';
import { mapGetters, mapMutations } from 'vuex';
import VerifyCode from './../../js/verifyCode.js';
import { randomWord, resetObj } from "@/js/tools.js"

export default {
    data() {
       return {
           switchs: {
               header: false,
               showLoginBox: false
           },
           btnActive: false,
           mainLoginList:[{
               name: "账号密码登录",
               iconClass: {
                   'account-login-icon': true
               },
               active: true
           }],
           otherLoginList: [{
               name: "使用QQ登录",
               iconClass: {
                   'wechat-login-icon': true
               },
               active: true
           },{
               name: "使用微信登录",
               iconClass: {
                   'qq-login-icon': true
               },
               active: true
           }],
           code_id: "", 
           codeSrc: "",
           loginParam: {
                userId: {
                    model:"",
                    placeholder: "登录账号",
                    status: "",
                    maxlength: 11,
                    valueType: "letterNum",
                    type: "text",
                    defaultFocus:true,
                    extra: false,
                    leftIcon: {
                        haveIcon: true,
                        iconUrl: require("./img/input-user.png")
                    }
                },
                pwd:{
                    model:"",
                    placeholder: "登录密码",
                    status: "",
                    maxlength: 16,
                    valueType: "letterNum",
                    type: "password",
                    extra: false,
                    leftIcon: {
                        haveIcon: true,
                        iconUrl: require("./img/input-pwd.png")
                    }
                },
                code:{
                    model:"",
                    placeholder: "验证码",
                    status: "",
                    maxlength: 4,
                    valueType: "letterNum",
                    type: "tel",
                    extra: true,
                    leftIcon: {
                        haveIcon: true,
                        iconUrl: require("./img/input-code.png")
                    }
                }
            }
       }
    },
    computed: {
      ...mapGetters([
        'user_token',
        'account',
        'platformFlag'
      ])
    },
    watch: {
        loginParam: {
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
    created() {
        if(this.$route.query.showLogin != undefined && this.$route.query.showLogin){
            this.showLogin()
        }
        this.setCode();
    },
    mounted () {
        
    },
    methods: {
        ...mapMutations({
            setUserToken:'SET_USER_TOKEN',
            setAccount:'SET_ACCOUNT'
        }),
        afterEnter(){

        },
        net_login (param) {
            return this.$http.post("/user/login", param, {showLoading: true});
        },
        handle_login (res) {
            if(res.code == "200"){
                this.$toast("登录成功");
                this.setUserToken(res.data.token);
                localStorage.setItem("U_TK", res.data.token);
                resetObj(this.loginParam);
                this.$router.go(-1);
                // this.$router.replace("/personalCenter");
                // this.$api.getUserInfo();
            }else{
                this.setCode();
            }
        },
        goBack(type) {
            if(type == 1){
                this.$router.go(-1);
            }else{
                this.switchs.showLoginBox = false;
            }
        },
        gotoReg () {
            this.$router.push('/regist');
        },
        showLogin () {            
            this.switchs.showLoginBox = true;   
            this.$nextTick(()=>{
                let inputEl = document.getElementsByClassName('eg-input')[0];
                inputEl.focus()
                document.documentElement.scrollTop=0
                document.body.scrollTop=0
            })     
        },
        setCode(){
            this.code_id = 'H' + randomWord(false,8,10);
            this.codeSrc=`${this.interfaces.generatorCode}?code_id=${this.code_id}`;
        },
        login () {
            if(!this.btnActive) return;
            let param = {};
            param.userId = this.loginParam.userId.model.toLowerCase();
            param.pwd = this.loginParam.pwd.model;
            param.code = this.loginParam.code.model;
            param.codeId = this.code_id;
            param.platformFlag = this.platformFlag;
            if(this.checkFormData(this.loginParam)){
                this.net_login(param).then(res => {
                    this.handle_login(res);
                });
            }
        },
        checkFormData (obj, type) {
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
        }
    },
    components: {
    }
}
</script>

<style scoped lang="less">
@import '../../style/common.less';
@media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (height: 584px) {
  .headBox{
    padding-top: 16px;
  }
}
@media only screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (height: 687px) {
  .headBox{
    padding-top: 20px;
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (height: 729px) {
    .headBox{
    padding-top: 34px;
  }
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (height: 813px) {
    .headBox{
    padding-top: 34px;
  }
}
.login-wrapper{
    position:absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url('./img/login-bg.png') no-repeat;
    background-size: 100%;
    background-position: top;
    .headBox{
        // position: absolute;
        // top: 0;
        // left: 0;
        width: 100%;
        // height: 45px;
        .header-box{
            height: 45px;
            width: 100%;
            .iconWrap{
                height: 100%;
                width: 80px;
                display: flex;
                align-items: center;
                .icon-back{
                    display: inline-block;
                    margin: 0 0 0 8px;
                }
            }
        }
    }
    .main-container{
        .not-login-body{
            height: 100%;
            position: relative;
            .not-login-bgContent{
                background: url('./img/not-login-bg.png') no-repeat;
                background-size: 100%;
                height: 87px;
                width: 245px;
                margin: 0 auto;
                margin-top:110px;
            }
            .not-login-box{
                // margin-top:120px;
                position: absolute;
                bottom: 10px;
                .not-login-btn{
                    width:279px;
                    height:40px;
                    background:rgba(38,38,38,1);
                    border:1px solid rgba(0,0,0,1);
                    box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.6);
                    &.no-spport{
                        color:#6C6C6C;
                        border: 0;
                    }
                }
                .item-btn{
                    margin-bottom: 20px;
                    .btn-left__box{
                        width:60px;
                        height: 100%;
                        background:rgba(32,32,32,1); 
                        border-right: 1px solid rgba(0,0,0,1);
                        .content-icon{
                            width: 30px;
                            height: 100%;
                        }
                        .account-login-icon{
                            background: url('./img/login-icon-1.png') no-repeat;
                            background-size: 100%;
                            background-position: center;
                        }
                        .wechat-login-icon{
                            background: url('./img/login-icon-2.png') no-repeat;
                            background-size: 100%;
                            background-position: center;
                        }
                        .qq-login-icon{
                            background: url('./img/login-icon-3.png') no-repeat;
                            background-size: 100%;
                            background-position: center;
                        }
                    }
                    .btn-middle__box{
                        height: 100%;
                        padding-left: 30px;
                    }
                    .btn-right__box{
                        height: 100%;
                    }
                }
                .splice-line-box{
                    height: 16px;
                    .splice-line-border{
                        height: 1px ;
                        background-color: rgba(108,108,108,1);
                    }
                    .splice-line-txt{
                        width: 33px;
                        text-align: center;
                    }
                    margin-bottom: 20px;
                }
            }
        }
        .login-box{
            padding-top: 50px;
            .login-input-box{
                height: 42px;
                margin-top: 20px;
                width: 279px;
                position: relative;
                .mian-content{
                    .input-left-icon{
                        width: 100%;
                        height: 100%;
                    }
                }
                .extra-content{
                    width: 89px;
                    flex-shrink: 0;
                    margin-left: 10px;
                    background-color: #202020;
                    border-radius: 5px;
                    border:1px solid #000000;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            .login-btn-box{
                height: 40px;
                font-size: 15px;
                margin-top: 40px;
                width: 279px;
            }
            .login-tip-box{
                margin-top: 9px;
                text-align: right;
                width: 279px;
            }
            .handle{
                width: 279px;
                color: #fff;
                
                span{
                    flex:1;
                    padding: 14px 0;
                }
                a{
                    flex:1;
                    padding: 14px 0;
                    text-align: right;
                    color: #fff;
                }
            }
        }
    }
    .footer-wrapper{
        flex-shrink: 0;
        height: 60px;
        
        .main-box{
            background-color:#262626;
        }
        .bottom-bar{
            height: 24px;
            background-size: cover; 
            transform:scaleY(-1);
            .bg-image('./../../assets/img/topbar');
            .bar-line{
                width:63px;
                height:1px;
                background:linear-gradient(-90deg,rgba(138,117,255,1) 0%,rgba(35,248,248,1) 100%);
            }
        }
    }
}
</style>
<style lang="less" scoped>
.slide-in-enter-active{
 transition: all 0.7s ease;
}
.slide-in-enter{
  transform: translate3d(0, 100px, 0);
  opacity: 0;
}
 .slide-out-leave-active{                 //指就是html中fade名称
  transition: all 0.3s ease-in;                            
}
.slide-out-leave-to {           
  transform: translate3d(0, -150px, 0);
  opacity: 0.3;
}

</style>

