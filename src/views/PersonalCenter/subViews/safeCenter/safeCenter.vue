<template>
    <div class="balance-wrapper">
        <div class="head-container">
            <eg-header>
                <div class="icon-back" @click="$router.go(-1)" slot="left"></div>
                <div class="large-white-txt" slot="title">安全中心</div>
            </eg-header>
        </div>
        <div class="main-container">
            <div class="bank-box display-flex flex-center">
                <!-- <van-swipe class="van-swipe" :autoplay="3000">
                    <van-swipe-item class="swipe-item" v-for="(v,k) in swipeList" :key="k">
                        <img v-lazy="v.homeImageUrl" />
                    </van-swipe-item>
                </van-swipe> -->
                <div class="bank-content display-flex align-center" :class="account.bankNumber?'has-card':'no-card'">
                    <div class="bank-border-box fanzhuan"></div>
                    <div class="bank-body flex-1 display-flex justify-between has-card-body flex-column" v-if="account.bankNumber">
                            <div class="title-box">
                                <div class="large-white-txt"><b>{{ account.bankName }}</b></div>
                                <div class="small-white-txt">储蓄卡</div>
                            </div>
                            <div class="chip-box"></div>
                            <div class="bottom-box">
                                <div class="small-white-txt">卡号</div>
                                <div class="super-white-txt"><b class="card-content">{{ account.bankNumber | spliceCardNum }}</b></div>
                            </div>    
                    </div>
                    <div class="bank-body flex-1 display-flex justify-center no-card-body" v-else>
                        <img src="./img/bank-empty.png" alt="" @click="gotoPage(-1)">
                    </div>
                    <div class="bank-border-box"></div>
                </div>
            </div>
            <div class="pwd-box">
                <gun-bar>
                    <div class="bar-slot">
                        <div class="slot-item midum-white-txt display-flex align-center" @click="gotoPage(k)" v-for="(v,k) in mainList" :key="k">
                            <div class="left-content display-flex flex-center">
                                <span class="icon-bg" :class="v.className"></span>
                            </div>
                            <b class="flex-1">{{ v.title }}</b>
                            <span class="right-content">
                                <eg-gngle :startColor='"#23F8F8"' :stopColor='"#8A75FF"' :id="v.iconName"></eg-gngle>
                            </span>
                        </div>
                        <!-- <div class="slot-item midum-white-txt display-flex align-center">
                            <div class="left-content display-flex flex-center">
                                <span class="icon-bg icon-bg__pay"></span>
                            </div>
                            <b class="flex-1">支付密码</b>
                            <span class="right-content"></span>
                        </div> -->
                    </div>
                </gun-bar>
            </div>
            <div class="quit-box">
                <gun-bar>
                    <div class="slot-item midum-white-txt display-flex align-center" @click="quit">
                        <span class="left-content display-flex flex-center">
                            <span class="icon-bg icon-bg__quit"></span>
                        </span>
                        <b class="flex-1">退出登录</b>
                        <span class="right-content">
                            <eg-gngle :startColor='"#23F8F8"' :stopColor='"#8A75FF"' :id='"quit"'></eg-gngle>
                        </span>
                    </div>
                </gun-bar>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import EgGngle from "../../../../components/angle/angle"

export default {
    data () {
        return {
            swipeList: [{
                imageUrl: ''
            }],
            mainList:[{
                title: "登录密码",
                className: "icon-bg__login",
                iconName:'loginPwd'
            },{
                title: "提款密码",
                className: "icon-bg__pay",
                iconName:'drawPwd'
            }]
        }
    },
    computed: {
        ...mapGetters([
            'user_token',
            'account'
        ])
    },
    components: {
        EgGngle
    },
    filters: {
        spliceCardNum (value) {
            if (!value) return ''
            let newVal = [];
            let length = value.length;
            for(let i = 0; i<length; i+=4){
                newVal += `${value.substring(i,i+4)} `
            }
            return newVal
        }
    },
    methods: {
        ...mapMutations({
            setUserToken:'SET_USER_TOKEN',
            setAccount:'SET_ACCOUNT'
        }),
        quit () {
            // localStorage.removeItem('U_TK');
            // this.setUserToken("");
            // this.setAccount("");
            // this.$toast("成功退出登录！");
            // this.$router.push('/PersonalCenter')
            this.$api.quitAccount();
        },
        gotoPage (k) {
            switch (k) {
                case -1:
                    this.$router.push({path:"/personalcenter/setPassword?type=4"})
                    break;
                case 0:
                    this.$router.push({path:"/personalcenter/setPassword?type=1"})
                    break;
                case 1:
                    this.$router.push({path:"/personalcenter/setPassword?type=2"})
                    break;
                    
                default:
                    break;
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../../../style/index.less";
.balance-wrapper{
    .head-container{
        height: 44px;
    }
    .main-container{
        .bank-box{
            height: 220px;
            .bank-content{
                width: 300px;
                height: 170px;
                box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.6);
                border-radius:10px;
                &.has-card{
                    background:linear-gradient(-90deg,rgba(138,117,255,0.7) 0%,rgba(35,248,248,0.7) 100%);
                }
                &.no-card{
                    background-color: rgba(49,49,49,0.7);
                }
                .bank-body{
                    img{
                        width: 133px;
                        height: 94px;
                    }
                }
                .has-card-body{
                    padding: 30px;
                    box-sizing:border-box;
                    height:100%;
                    position: relative;
                    .chip-box{
                        width:38px;
                        height:35px;
                        background: url('./img/chip.png') no-repeat;
                        background-size:100% 100%;
                        position: absolute;
                        right: 38px;
                        top:25%;
                    }
                    .bottom-box{
                        .card-content{
                            white-space:nowrap;
                            overflow: auto;
                        }
                    }
                }
                .no-card-body{

                }
                .bank-border-box{
                    height: 64px;
                    width: 7px;
                    background: url('./img/bank-border.png') no-repeat;
                    background-size: 100% 100%;
                    &.fanzhuan{
                        transform:scaleX(-1);
                    }
                }
            }
        }
        .pwd-box{
            padding: 0 11px;
            .bar-slot{
            }
        }
        .quit-box{
            padding: 0 11px;
            margin-top: 50px;
        }
        .slot-item{
            height: 69px;
            background-color: @bg_dark_black;
            border-top:1px solid @border_dark_black;
            &:first-child{
                border-top: none;
            }
            .left-content{
                width: 100px;
                .icon-bg{
                    width: 30px;
                    height: 30px;
                }
                .icon-bg__login{
                    background: url('./img/ico_login_pwd.png') no-repeat;
                    background-size: cover;
                }
                .icon-bg__pay{
                    background: url('./img/ico_pay_pwd.png') no-repeat;
                    background-size: cover;
                }
                .icon-bg__quit{
                    background: url('./img/ico_quit.png.png') no-repeat;
                    background-size: cover;
                }
            }
            .right-content{
                width: 40px;
            }
        }
    }
}
</style>

