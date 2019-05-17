<template>
   <div class="regist">
      <div class="bg"></div>
      <div class="headWrap">
         <eg-header>
               <div class="back" slot="left" @click="goBack"><div class="icon-back"></div></div>
               <div class="title" slot="title">注册</div>
         </eg-header>
      </div>
      <div class="form">
         <gun-bar class="registForm">
            <div class="formWrap">
               <div class="login-input-box display-flex" v-for="(v, index) in registList" :key="index">
                  <div class="mian-content flex-1">
                     <eg-input 
                        :type="v.type" 
                        v-model="v.model"  
                        :class="v.model ? 'black' : 'white'"
                        :placeholder='v.placeholder'
                        :status="v.status" 
                        :valueType="v.valueType" 
                        :maxlength="v.maxlength"
                        @onBlur="checkBlur(v,index)"
                        @input="checkInput(v)"
                        :leftIcon = "v.leftIcon.haveIcon"
                        :styleObj="{paddingLeft: '50px'}">                        
                        <img class="input-left-icon" slot="leftIcon" :src="v.leftIcon.iconUrl" alt="">
                        <!-- 如果需要右边的图标 -->
                        <span slot="errMsg" class="errMsg" v-if="v.rightIcon.msg">{{v.rightIcon.msg}}</span>
                        <img class="input-right-icon" slot="rightIcon" v-if="v.rightIcon.haveIcon" :src="v.rightIcon.iconUrl" alt="">
                     </eg-input>
                  </div>
                  <div class="extra-content" v-if="v.extra">
                     <img :src="codeSrc" alt=""  @click="setCode">
                  </div>
               </div>
            </div>
         </gun-bar>
         <div class="login-btn-box eg-button" :class="{'gradient-border':btnActive}" @click="register">确认注册</div>
         <p class="xy" @click="goXY">注册即表示同意<span> 《用户协议》</span></p>
         <button id="focusBtn" style="opacity:0" @click="btnClick">聚焦</button>
      </div>
   </div>
</template>

<script>
import egHeader from "../../components/header/eg-header"
import VerifyCode from './../../js/verifyCode.js'
import { setTimeout } from 'timers';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import EgInput from "../../components/eg-input/eg-input"
import { randomWord, resetObj } from "@/js/tools.js"
import FormVerify from "@/js/formVerify.js"

export default {
   data() {
      return {
         registList:{
            userId: {
               name:'userId',
               model:"",
               placeholder: "用户名  英文+数字最多11个字符",
               status: "",
               checked:false,
               maxlength: 11,
               minlength:6,
               valueType: "letterNum",
               type: "text",
               extra: false,
               leftIcon: {
                  haveIcon: true,
                  iconUrl: require("./img/input-user.png")
               },
               rightIcon: {
                  haveIcon: false,
                  iconUrl: require("./img/ico_right.png")
               }
            },
            pwd:{
               name:'pwd',
               model:"",
               placeholder: "密码  英文+数字最多16个字符",
               status: "",
               checked:false,
               maxlength: 16,
               minlength:6,
               valueType: "letterNum",
               type: "password",
               extra: false,
               leftIcon: {
                  haveIcon: true,
                  iconUrl: require("./img/input-pwd.png")
               },
               rightIcon: {
                  haveIcon: false,
                  iconUrl: require("./img/ico_right.png")
               }
            },
            verifyPwd:{
               name:'verifyPwd',
               model:"",
               placeholder: "确认密码",
               status: "",
               checked:false,
               maxlength: 16,
               minlength:6,
               valueType: "letterNum",
               type: "password",
               extra: false,
               leftIcon: {
                  haveIcon: true,
                  iconUrl: require("./img/input-pwd.png")
               },
               rightIcon: {
                  haveIcon: false,
                  iconUrl: require("./img/ico_right.png")
               }
            },
            code:{
               name:'code',
               model:"",
               placeholder: "验证码",
               status: "",
               checked:false,
               maxlength: 4,
               minlength:4,
               valueType: "num",
               type: "tel",
               extra: true,
               leftIcon: {
                  haveIcon: true,
                  iconUrl: require("./img/input-code.png")
               },
               rightIcon: {
                  haveIcon: false,
                  iconUrl: require("./img/ico_right.png")
               }
            },
            inviteCode:{
               name:'inviteCode',
               model:"",
               placeholder: "邀请码（选填）",
               status: "",
               checked:true,
               maxlength: 4,
               minlength:4,
               valueType: "letterNum",
               type: "text",
               extra: false,
               leftIcon: {
                  haveIcon: true,
                  iconUrl: require("./img/ico_iviteCode_gray.png")
               },
               rightIcon: {
                  haveIcon: false,
                  iconUrl: require("./img/ico_right.png")
               }
            },
         },
         regParam: {
            userId:'',
            pwd:'',
            verifyPwd:'',
            inviteCode:'',
            code:'',
         },
         result: '',
         switchs: {
            btn: false
         },
         code_id: "", 
         codeSrc: "",
         btnActive: false,
         resultItem:{},
         regType:true
      }
   },
   watch: {
        registList: {
            handler (newVal, oldVal) {
               var allRight = true;           
               for(let key in newVal){   
                  this.regParam[newVal[key].name] = newVal[key].model  
                  if(newVal[key].model){
                     newVal[key].status="active";
                  }else if(key != 'inviteCode'){
                     newVal[key].status="";
                     allRight = false;
                  }
               }
                this.btnActive = allRight;
            },
            deep: true
        }
    },
   computed: {
      ...mapGetters([
         'net_btn_click',
         'user_token',
         'account',
         'platformFlag'
      ])
   },
   created () {
      this.setCode();      
   },
   mounted(){
      this.$nextTick(()=>{
         setTimeout(() => {
            // let btn = document.getElementById('focusBtn'),
            //    inputEl = document.getElementsByClassName('eg-input')[0];
               this.btnClick()
               // inputEl.focus()
               // document.documentElement.scrollTop=0
               // document.body.scrollTop=0
            
         }, 0);
      })
   },
   methods: {
      ...mapMutations({
         setUserToken:'SET_USER_TOKEN',
         setAccount:'SET_ACCOUNT',
         setIsReg: 'SET_ISREG'
      }),
      ...mapActions([
         'getMoneyStatus'
      ]),
      btnClick(){
         let btn = document.getElementById('focusBtn'),
               inputEl = document.getElementsByClassName('eg-input')[0];
            inputEl.focus()
            document.documentElement.scrollTop=0
            document.body.scrollTop=0
      },
      checkInput(v){
         if(!v.model){
            v.rightIcon.haveIcon=false
            v.rightIcon.msg=''
         }
      },
      checkBlur(v,checkType){        
         if(checkType == 'verifyPwd'){
            let result = new FormVerify(v,this.registList)['check_'+checkType](this.registList.pwd);
            this.$forceUpdate()        //  更新页面状态
            return
         }else if(checkType == 'pwd'){  
            let result = new FormVerify(v,this.registList)['check_'+checkType](this.registList.verifyPwd);
            this.$forceUpdate()
            return
         }
          let result = new FormVerify(v,this.registList)['check_'+checkType]();
          this.$forceUpdate()
      },
      setCode(){
         this.code_id = 'H' + randomWord(false,8,10);
         this.codeSrc=`${this.interfaces.generatorCode}?code_id=${this.code_id}`;
      },
      goBack(){
         this.$router.go(-1)
      },
      delaySwitch (obj, key, val) {
         setTimeout(()=>{
            obj[key] = val;
         }, 222)
      },
      handle_catch (err) {
         this.delaySwitch(this.switchs, "btn", false);
      },
      net_register (param) {
         return this.$http.post("/user/register", param);
      },
      handle_register (res) {
         if(res.code == "200"){
            this.$toast({
               message:'注册成功',
               duration:1500
            });
            if(res.data.token){
               this.setUserToken(res.data.token);
               localStorage.setItem("U_TK", res.data.token);
               setTimeout(()=>{
                  // this.getMoneyStatus();
                  // this.setIsReg(true);
                  this.$router.replace("/personalCenter?from=register");
                  // this.$api.getUserInfo();
                },1300);
               resetObj(this.regParam);
            }
         }else{
            this.setCode()
         }
         this.delaySwitch(this.switchs, "btn", false);
      },
      checkReg(param){
         let keys =  Object.keys(param),
         result = false
         for (const item of keys) {
            if(!param[item].checked){
               result = false
               return false
            }else{
               result = true
            }
         }
         return result
      },
      register () {
         let result = this.checkReg(this.registList)  
         if(!result){return}
         this.switchs.btn = true;
         let param = this.regParam;
         param.codeId = this.code_id;
         param.userId = param.userId.toLowerCase();
         param.platformFlag = this.platformFlag;
         param.agentUrl = location.host;
         this.net_register(param).then(res => {
            this.handle_register(res);
         }).catch(err => {
            this.handle_catch(err);
         })
      },
      goXY(){
         this.$router.push({path:'/xy'})
      },
   },
   destroyed(){
      // Toast.clear();
   },
   components: {
      egHeader,EgInput
   }
}
</script>

<style scoped lang="less">
.regist{
   position: relative;
   .bg{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 221px;
      background: url("./img/regist.png") no-repeat;
      background-size: cover
   }
   .headWrap{
      height: 45px;
      .title{
         font-size:17px;
         font-family:PingFang-SC-Bold;
      }
      .icon-back{
         width: 20px;
         height: 20px;
         background: url("../../assets/img/btn_back.png") no-repeat;
         background-size: cover;
      }
    }
   .form{
      margin-top: 105px;
      padding: 0 22px;
      .registForm{
         padding: 32px 0;
         background:rgba(38,38,38,1);
         box-shadow:0px 10px 20px 0px rgba(0, 0, 0, 0.6);
         .formWrap{
            padding: 0 25px;
            .login-input-box{
                height: 42px;
                margin-top: 25px;
                width: 279px;
                position: relative;
                &:first-child{
                   margin-top: 0;
                }
                .mian-content{
                   .errMsg{
                      color: #DB3434
                   }
                  .input-left-icon{
                     width: 100%;
                     height: 100%;
                  }
                  .input-right-icon{
                     width: 20px;
                     height: 20px;
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
         }
      }
      .login-btn-box{
         width: 100%;
         height: 40px;
         font-size: 15px;
         margin: 30px 0 20px;
      }
      .xy{
         font-size: 12px;
         color: #fff;
         margin-bottom: 20px;
         text-align: center;
         >span{
            color: #FFD200;
            text-decoration: underline
         }
      }
   }
}
</style>
<style lang="less">
.regist{
   .white{
      input{
         caret-color: #202020;
         &::placeholder{
            font-size: 12px;
            // line-height: 2em;
         }
         &::-webkit-input-placeholder{
            line-height: 2em;
         }
      }
   }
   .black{
      caret-color: #fff;
   }   
}
</style>

