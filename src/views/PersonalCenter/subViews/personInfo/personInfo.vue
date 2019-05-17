<template>
    <div class="info-wrapper">
        <div class="header-container">
            <eg-header>
                <div class="icon-back" @click="$router.go(-1)" slot="left"></div>
                <div class="large-white-txt" slot="title">个人信息</div>
            </eg-header>
        </div>
        <div class="mian-container">
            <div class="id-box">
                <gun-bar>
                    <div class="item-content midum-white-txt display-flex align-center">ID：{{ account.userId }}</div>
                </gun-bar>
            </div>
            <div class="info-box">
                <gun-bar>
                    <div class="item-content midum-white-txt display-flex align-center" @click="goPage('/personalcenter/personImg')">
                        <span>头像</span>
                        <span class="flex-1 display-flex justify-end img-content">
                            <img :src="user_token?account.headPortrait:defaultAccountImg" alt="">
                        </span>
                        <span class="right-icon">
                            <eg-gngle :startColor='"#23F8F8"' :stopColor='"#8A75FF"' :id='"img"'></eg-gngle>
                        </span>
                    </div>
                    <div class="item-content midum-white-txt display-flex align-center" @click="goPage('/personalcenter/setPassword?type=3')">
                        <span>昵称</span>
                        <span class="flex-1 display-flex justify-end txt-content">
                            {{ account.userName ? account.userName : "起个好名字更容易让人记住"}}
                        </span>
                        <span class="right-icon">
                            <eg-gngle :startColor='"#23F8F8"' :stopColor='"#8A75FF"' :id='"nickName"'></eg-gngle>
                        </span>
                    </div>
                </gun-bar>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import EgGngle from "../../../../components/angle/angle"

export default {
    data () {
        return {
            defaultAccountImg: require("./../../img/userIco.png"),
        }
    },
    computed: {
        ...mapGetters([
            'account',
            'user_token'
        ])
    },
    components: {
        EgGngle
    },
    methods: {
        goPage(url){
            this.$router.push({path:url})
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../style/index.less";
.info-wrapper{
    .header-container{
        height: 44px;
    }
    .mian-container{
        overflow: hidden;
        padding: 0 11px;
        .id-box{
            margin-top: 30px;
        }
        .info-box{
            margin-top: 50px;
        } 
        .item-content{
            height: 70px;
            padding: 0 30px;
            background-color: @bg_dark_black;
            border-bottom: 1px solid @border_dark_black;
            .txt-content{
                color: @color_txt_lightBlack;
            }
            .img-content{
                img{
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                }
            }
            .right-icon{
                margin-left: 10px;
            }
        }  
    }
}
</style>
