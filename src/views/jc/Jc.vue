<template>
    <div class="jcWrap">
        <div class="header-container" v-if="headStatus">
            <eg-header class="headerWrap">
                <div class="backWrap" slot="left" @click="goBack" v-if="isBackShow">
                    <div class="back"></div>
                </div>
                <div class="header-slot" slot="title">{{title}}</div>
            </eg-header>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>        
    </div>    
</template>

<script>
import { Tab, Tabs } from 'vant';
export default {
    data(){
        return{
            title:'教程',
            isBackShow:false,
            headStatus:true,
            isiOS: Boolean,
        }
    },
    created(){
        let token = this.user_token;
        var u = navigator.userAgent;
        this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
        this.title = this.$route.meta.title
        this.isBackShow = this.$route.meta.backShow  
        this.headStatus = this.$route.meta.headShow != undefined && !this.$route.meta.headShow ? false : true
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    },
    watch:{
        $route(to){
            this.title = to.meta.title
            this.isBackShow = to.meta.backShow
            this.headStatus = to.meta.headShow != undefined && !to.meta.headShow ? false : true
            if(this.isiOS){
                document.body.scrollTop = 0;
            }else{
                document.documentElement.scrollTop = 0
            }
        }
    },
    components:{
    }
}
</script>

<style lang="less" scoped>
.jcWrap{
    font-family:PingFangSC-Regular;
    .header-container{
        height: 55px;
        padding: 0 11px;
        .headerWrap{
            padding-bottom: 8px;
        }
        .backWrap{
            height: 100%;
            padding-right: 30px;
            overflow: hidden;
            .back{
                width: 18px;
                height: 18px;
                margin-top: 13px;
                background:url("../../assets/img/btn_back.png") no-repeat;
                background-size: cover;
            }
        }
        .header-slot{
            height: 45px;
            background-color: #262626;
            font-family: 'PingFangHK-Regular';            
            color: #FFFFFF;
            letter-spacing: 0;
        }
    }
}
</style>

