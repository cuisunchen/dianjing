<template>
   <div class="personalCenter">
       <div class="headBox">
           <eg-header>
               <div class="title" slot="title">个人中心</div>
               <span slot="right" class="service"></span>
               <!-- <div slot="tab" class="userBox">
                   <div class="userCon">
                       <div class="userImg">
                            <img v-if="user_token" :src="account.headPortrait" alt="" srcset="">  
                            <img v-else :src="defaultAccountImg" alt="" srcset="">  
                       </div>
                       <div class="userBar" v-if="!user_token" @click="goLogin">登陆/注册</div>
                       <div class="userInfoWrap" v-else>
                           <p class="username">{{ account.userName }} <span class="icon-bankCard"></span></p>
                            <p class="money"><span class="gradient-text">余额：</span><em>{{ account.userMoney }}</em></p>
                       </div>
                   </div>
               </div> -->
           </eg-header>
       </div>
       <router-view></router-view>
   </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data() {
       return {
           defaultAccountImg: require("./img/userIco.png") 
       }
    },
    created() {
        if(this.user_token){
        }
    },
    computed: {
        ...mapGetters([
            'user_token',
            'account'
        ])
    },
    methods: {
        ...mapMutations({
            setUserToken:'SET_USER_TOKEN',
            setAccount:'SET_ACCOUNT'
        }),
        goLogin(){
            this.$router.push({path:'/login'})
        },
        quit () {
            localStorage.removeItem('U_TK');
            this.setUserToken("");
            this.setAccount("");
        }
    },
    components: {
        
    }
}
</script>

<style scoped lang="less">
@import "../../style/common.less";
.personalCenter{
    .headBox{
        height: 44px;
        .title{
            font-family: PingFangHK-Medium;
            font-size: 18px;
            height: 30px;
        }
        .service{
            display: inline-block;
            width: 32px;
            height: 28px;
            margin-top: 6px;
            .bg-image("./img/service");
            background-size: cover;
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
                    .bg-image('./img/loginBar');
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
}
</style>
