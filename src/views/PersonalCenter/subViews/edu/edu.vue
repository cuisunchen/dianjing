<template>
   <div class="edu">
        <div class="headBox">
            <eg-header>
                <div class="back" slot="left" @click="goBack"></div>
                <div class="title" slot="title">额度转换</div>
            </eg-header>
        </div>

        <div class="main">
            <div class="eduSwitch">
                <gunBar class="zj_gun">
                    <div class="edu-change display-flex">
                        <div class="icon"></div>
                        <div class="txt flex-1">自动额度转换</div>
                        <div class="switchBox">
                            <eg-switch :type="checked" :disabl="isDisabled" @click='switchChange($event)' />
                        </div>
                    </div>
                </gunBar>
            </div>
            <p class="tip"><em class="dot"></em>切换到<span>自动额度转换</span>前，请先将额度转移到现金余额。</p>
            
            <div class="eduChange" v-if="!checked && isFormShow">
                <!-- 金额 -->
                <div class="jineBox">
                    <gunBar class="jine">
                        <div class="item display-flex">
                            <div>总余额</div>
                            <div>{{Number(yue.totalBalance).toFixed(2)}}</div>
                        </div>
                        <div class="item display-flex">
                            <div>现金金额</div>
                            <div>{{Number(yue.balance).toFixed(2)}}</div>
                        </div>
                        <div class="item display-flex" @click="showList">
                            <div>其他平台余额</div>
                            <div>
                                <EgGngle mode='horizontal' startColor='#23F8F8' stopColor='#8A75FF' id="balance" class="angleBox" :class="{'on':isPlatformShow}"></EgGngle>   
                            </div>
                        </div>

                        <div class="lists">
                            <eg-animation mode='toBot'>
                                <div class="platformList" v-if="isPlatformShow">
                                    <div class="item display-flex" v-for="item in yue.platformBalance" :key="item.pfmFlag">
                                        <div>{{item.pfmName}}</div>
                                        <div class="display-flex num">{{Number(item.pfmBalance).toFixed(2)}}
                                            <div class="refresh" @click="new_refreshMoney(item)"><div class="icon" :class="{'on': activeFlag == item.pfmFlag}"></div></div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </eg-animation>
                        </div>
                    </gunBar>
                </div>
                <!-- 账户 -->
                <div class="accountBox">
                    <gunBar class="account">
                        <p>转出账户</p>
                        <div class="out">
                            <eg-select @select="select('out')">
                                <div class="platform">{{choosed_outAccoundObj.game_title_cn}}</div>
                            </eg-select>
                        </div>
                        <p>转入账户</p>
                        <div class="into">
                            <eg-select @select="select('in')">
                                <div class="platform">{{choosed_inAccoundObj.game_title_cn}}</div>
                            </eg-select>
                        </div>
                        <p>金额</p>
                        <div class="jine">
                            <eg-select @select="select('in')" :iconShow='false' :border-status='money.length>0' :no-click='false'>
                                <eg-input v-model="money" type="tel" @input="inputLimit" class="inputBox" placeholder="请输入金额"></eg-input>
                            </eg-select>
                        </div>
                        <div class="submit" :class="[{'gradient-border on': disabled}]" @click="disabled && net_submit()">提交</div>
                    </gunBar>
                </div>
            </div>
        </div>

        <!-- 账户下拉框 -->
        <popup v-model="isSelectBoxShow" position="bottom" class="popup">
            <div class="main display-flex flex-coloum">
                <div class="top" @click='selectHide'>
                    <div class="botIcon"></div>
                </div>
                <div class="gunBox flex-1">
                    <gunBar class="selectBox" key="selectBox" :botBar_status='false'>
                        <div class="listWrap">
                            <div v-for="(item,index) in yue.accounts" :key="item.platform_iconic">
                                <div class="item display-flex justify-between" @click="accountChoose(item,index)">
                                    <div>{{item.game_title_cn}}</div>
                                    <div class="icon" :class="{'on':item.platform_iconic == choosedAccoundObj.platform_iconic}"></div>
                                </div>
                            </div>
                        </div>
                    </gunBar> 
                </div>                        
            </div> 
        </popup>

        <eg-dialog :txtcontent="txtcontent" v-if="dialogShow" @onConfirm="closeDialog"></eg-dialog>
   </div>
</template>

<script>
import gunBar from "../../../../components/gunBar/gunBarBox"
import EgSwitch from '../../../../components/switch/eg-switch'
import EgGngle from '../../../../components/angle/angle'
import EgAnimation from '../../../../components/animation/animation'
import { Popup } from 'vant';
import { mapMutations } from 'vuex';
import { setTimeout } from 'timers';
export default {
    data() {
       return {
           checked: false,
           isDisabled:false,
           isFormShow:false,
           platformType:'xjye',
           isPlatformShow:false,            //  平台余额选项框
           isSelectBoxShow:false,           //  控制下拉框是否显示
           yue:{
               balance:'',
               totalBalance:'',
               platformBalance:[],
               accounts:[]
           },
           accoundType:'',                  //  账户类型，  判断是转入还是转出账户
           outAccoundName:'',
           choosedAccoundObj:{},                       //  下拉框列表选中的对象
           choosed_outAccoundObj:{},             //  选中的转出账户对象，包括账户名，账户id，和选中的账户下标
           choosed_inAccoundObj:{},              //  选中的转入账户对象，包括账户名，账户id，和选中的账户下标
           datas:{},                             //  初始化时获得的全部数据，用于转入转出时切换功能
           money:'',                             //  需要转换的金额
           txtcontent:'切换到自动额度转换前，请先通过手动转换把额度转移到现金余额。',
           dialogShow:false,
           activeFlag:'',
           maxLength:4
       }
    },
    computed:{
        disabled(){
            return this.money.length > 0 ? true : false
        },
    },
    created() {
        this.net_rollAccount()

    },
    methods: {
        ...mapMutations({
            setLoadding:'SET_SHOW_LOADING'
        }),
        inputLimit(){
            if(this.money.length > 10){
                this.money = this.money.slice(0,10)
            }
        },
        new_refreshMoney(item){
            this.activeFlag = item.pfmFlag
            return this.$http.post('/thirdGames/refreshAmount',{platformFlag:item.pfmFlag}).then( res => {
                this.handle_refreshMoney(res,item)
            })
        },
        handle_refreshMoney(res,item){
            this.activeFlag = ''
            if(res.code == 200){
                this.yue.balance = res.data.balance
                this.yue.totalBalance = res.data.totalBalance
                for(const it of this.yue.platformBalance){
                    if(item.pfmFlag == it.pfmFlag){
                        it.pfmBalance = res.data.platformBalance;
                    }
                }
            }
        },
        closeDialog(){
            this.dialogShow = false
        },
        //  转入转出账户下拉框列表选择事件
        accountChoose(item,index){
            let obj = {
                game_title_cn: item.game_title_cn,
                platform_iconic: item.platform_iconic,
                index: index
            };
            if( this.accoundType == 'in' ){
                this.choosed_inAccoundObj = obj
                if(item.platform_iconic == 'xjye'){
                    this.choosed_outAccoundObj = this.datas.platformIconic[0]
                }else{
                     this.choosed_outAccoundObj = this.datas.platformIconic[this.datas.platformIconic.length - 1]
                }
            }else{
                this.choosed_outAccoundObj = obj
                if(item.platform_iconic == 'xjye'){
                    this.choosed_inAccoundObj = this.datas.platformIconic[0]
                }else{
                    this.choosed_inAccoundObj = this.datas.platformIconic[this.datas.platformIconic.length - 1]
                }
            }
            this.selectHide()
        },
        //  转入转出账户下拉框列表隐藏事件
        selectHide(){
            this.isSelectBoxShow = false
        },
        //  转入转出账户下拉框列表显示事件
        select(id){
            this.accoundType = id;
            if(id == 'out'){
                this.choosedAccoundObj = this.choosed_outAccoundObj;
            }else{
                this.choosedAccoundObj = this.choosed_inAccoundObj;
            }
            this.isSelectBoxShow = true;
        },
        //  平台余额列表显示事件
        showList(){
            this.isPlatformShow = !this.isPlatformShow;
        },
        //  提交请求api
        net_submit(){
            let param = {
                platformIN: this.choosed_inAccoundObj.platform_iconic,
                platformOUT: this.choosed_outAccoundObj.platform_iconic,
                money: this.money
            }
            return this.$http.post('/thirdGames/manualTransferPayment',param).then( res => {
                if( res.code == 200 ){
                    this.$toast('提交成功！')
                    this.money = ''
                    this.choosed_outAccoundObj = this.datas.platformIconic[this.datas.platformIconic.length-1]
                    this.choosed_inAccoundObj = this.datas.platformIconic[0];
                    this.net_rollAccount()
                }else{
                    this.$toast(res.msg)
                }                
            })
        },
        //  获取页面初始化数据
        net_rollAccount(){
            return this.$http.post('/thirdGames/getPlatformIconic',{}).then(res => {
                this.handle_rollAccount(res)
            })
        },
        //  处理页面初始化数据
        handle_rollAccount(res){
            if( res.code == '200' ){
                this.checked = res.data.creditSwitch == '1' ? true : false;
                if( res.data.creditSwitch == '1' ){  //  creditSwitch == 1 为自动转换   不需要一下数据
                    this.isFormShow = false
                    return;
                }else{
                    this.isFormShow = true
                }
                this.datas = res.data;
                this.yue.balance = res.data.userBalance.balance;
                this.yue.totalBalance = res.data.userBalance.totalBalance;
                this.yue.platformBalance = res.data.userPlatFormBalance;
                this.yue.accounts = res.data.platformIconic;
                this.choosed_outAccoundObj = res.data.platformIconic[res.data.platformIconic.length-1]
                this.choosed_outAccoundObj.index = res.data.platformIconic.length-1
                this.choosed_inAccoundObj = res.data.platformIconic[0]
                this.choosed_inAccoundObj.index = 0
            }else{
                this.$toast(res.msg)
            }
        },
        //  自动转换按钮点击事件
        switchChange(e){ 
            if(this.isDisabled){
                this.isDisabled = false;
                return
            }
            this.checked = e;
            this.isDisabled = true
            this.isFormShow = !e
            this.setLoadding(true)
            this.$http.post('/thirdGames/updateAutoChange',{automaticSwitch: e ? '1' : '0'})
            .then(res => {
                setTimeout(()=>{
                    this.isDisabled = false
                }, 1000)
                if( res.code == 200 ){                    
                    //  e为假时为开关关闭状态，需要初始化数据
                    if(!e){
                        this.net_rollAccount()
                    }else{
                        setTimeout(()=>{
                            this.isDisabled = false
                        }, 1000)
                        this.dialogShow = true
                    }                  
                }
            })
        },
        goBack(){
            this.$router.go(-1)
        }
    },
    watch:{
        //  处理ios滚动穿透问题
        isSelectBoxShow(newVal) {
            if (newVal == true) {
                let cssStr = "overflow-y: hidden; height: 100%;";
                document.getElementsByTagName('html')[0].style.cssText = cssStr;
                document.body.style.cssText = cssStr;
            } else {
                let cssStr = "overflow-y: auto; height: auto;";
                document.getElementsByTagName('html')[0].style.cssText = cssStr;
                document.body.style.cssText = cssStr;
            }

            // 下面需要这两行代码，兼容不同浏览器
            document.body.scrollTop = this.pageScrollYoffset;
            window.scroll(0, this.pageScrollYoffset);
        }
    },
    components: {
        gunBar,
        EgSwitch,
        EgGngle,
        EgAnimation,
        Popup
    }
}
</script>

<style scoped lang="less">
.edu{
    padding: 0 12px;
    position: relative;
    .headBox{
        height: 54px;
        padding: 0 12px;
        .back{
            width: 18px;
            height: 18px;
            margin-top: 13px;
            background:url("../../img/btn_back.png") no-repeat;
            background-size: cover;
        }
        .title{
            font-family: PingFangHK-Medium;
            font-size: 18px;
        }
    }
    .main{
        .input{
            color:#000
        }
        .eduSwitch{
            margin-top: 20px;
            .edu-change{
                padding: 26px 38px; 
                background-color: #262626;
                .icon{
                    width: 28px;
                    height: 20px;
                    margin-top: 4px;
                    background: url("./img/edu.png") no-repeat;
                    background-size: cover;
                }
                .txt{
                    font-size:15px;
                    color: #fff;
                    line-height: 28px;
                    padding-left: 18px;
                    font-family:PingFang-SC-Bold;
                    font-weight:bold;
                }
                .switchBox{
                    width: 48px;
                    height: 28px;
                }
            }
        }
        .tip{
            color: #fff;
            display: flex;
            align-items: center;
            line-height: 30px;
            margin-bottom: 8px;
            .dot{
                display: inline-block;
                width: 4px;
                height: 4px;
                margin-right: 6px;
                background:linear-gradient(0deg,rgba(138,117,255,1) 0%,rgba(35,248,248,1) 100%);
            }
            span{
                color: #FFD200;
            }
        }
        .jineBox{
            background-color: #262626;            
            .jine{ 
                .item{
                    color: #fff;
                    font-size: 15px;
                    justify-content: space-between;
                    align-items: center;
                    padding: 24px 36px;
                    font-weight: bold;
                    border-bottom: 1px solid #0F0F0F;
                    position: relative;                    
                    &:last-child{
                        border: none;
                    }
                    >div:last-child{
                        color: #FFD200;
                    }                    
                    .angleBox{
                        transition: all 0.2s ease-in-out;
                        &.on{
                            transform: rotate(90deg)
                        }
                    }
                }
                .lists{
                    overflow: hidden;   
                    .item{
                        >div:first-child{
                            font-weight: 500;
                        }
                    }
                    .num{
                        padding-right: 26px;
                        .refresh{
                                position: absolute;
                                top: 0;                                
                                right: 16px;
                                padding: 0 20px 0 10px;
                                height: 100%;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            .icon{
                                width: 18px;
                                height: 18px;
                                background: url("./img/refresh.png") no-repeat;
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
        .account{
            margin-top: 20px;
            padding: 12px 0 24px;
            background-color: #262626;            
            >div, >p{
                color: #fff;
                padding: 0 39px;
            }
            >p{
                line-height: 30px;
            }
            >div{
                height: 40px;
                margin-bottom: 10px;
                .platform{
                    height: 100%;
                    display: flex;
                    font-size: 15px;
                    font-weight:bold;
                    font-family:PingFang-SC-Bold;
                    padding-left: 18px;
                    align-items: center;
                }
                .inputBox{
                    background: #202020;
                    border-radius: 4px
                }
            }
            .submit{
                padding: 0;
                width: 275px;
                color: #6C6C6C;
                line-height: 40px;
                text-align: center;
                font-size:15px;
                margin: 30px auto 20px;
                font-family:PingFang-SC-Bold;
                font-weight:bold;
                background-color: #202020;
                box-shadow:0px 10px 20px 0px rgba(0, 0, 0, 0.6);
                &.on{
                    color:#fff;
                }
            }
        }
    }
    .selectWrap{
        position: fixed;
        top: 0;
        left: 0;
        right:0;
        bottom: 0;
        z-index:99;
        .selectBox{
            height:auto;
            overflow-y: scroll;
            background-color:#fff;
            background-color:#262626;
        }
    }
    .popup{
        top:0;
        background-color:transparent;
        .main{
            height:100%;
            position:relative;
            .top{
                width:100%;
                display:flex;
                justify-content:center;
                align-items:center;
                height:50px;            
                color: #fff;
                .botIcon{
                    width:21px;
                    height:21px;
                    background:url("./img/bot_angle.png") no-repeat;
                    background-size:cover;
                }
            }
            .gunBox{
                position: absolute;
                top:50px;
                left: 0;
                right: 0;
                bottom: 0;
                background-color:#262626;
                .selectBox{
                    height: 100%;
                    overflow-y: hidden;
                    .listWrap{
                        height:100%;
                        padding: 0 12px;
                        overflow-y:scroll;
                        -webkit-overflow-scrolling: touch;
                        .item{
                            line-height:25px;
                            padding: 18px 12px;
                            border-bottom: 1px solid #0F0F0F;
                            >div:first-child{
                                color: #fff;
                                font-size: 15px;                            
                            }
                            .icon{
                                width: 25px;
                                height: 25px;
                                background: url('./img/unChoosed.png') no-repeat;
                                background-size: cover;
                                &.on{
                                    background: url('./img/choosed.png') no-repeat;
                                    background-size: cover;
                                }
                            }
                        }
                    }
                }
            }
        } 
    }
}
</style>

