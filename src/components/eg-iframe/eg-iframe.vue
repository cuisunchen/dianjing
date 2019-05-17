<template>
   <div class="iframe-content">
       <loadding absolute="true" v-if="isLoadding"></loadding>
       <div class="headBox">
            <eg-header>
                <div class="back" slot="left" @click="goBack"></div>
                <div class="title" slot="title">我的</div>
            </eg-header>
        </div>
       <iframe :src="url" frameborder="0" class="iframe" :ref="iframeName" :id="iframeName" @load="load"></iframe>
   </div>
</template>

<script>
import { mapGetters } from "vuex"
import loadding from '../loadding/lodding'
export default {
    data(){
        return{
            url:'',
            isLoadding:true
        }
    },
    props:{  
        iframeName:{
            type:String,
            default: ''
        }
    },
    computed:{
        ...mapGetters([
            'account'
        ]),
    },
    created() {
        //  客服页面的地址
        this.url = decodeURIComponent(this.$route.fullPath.split('url=')[1])
    },
    methods: {
        load(){
            this.isLoadding = false
        },
        goBack(){
            this.$router.go(-1)
        },
    },
    components: {
        loadding
    }
}
</script>

<style scoped lang="less">
.iframe-content{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background-color: #fff;
    height:100%;
    -webkit-overflow-scrolling:touch;
    overflow-y:auto;
    overflow-x: hidden; 
    .headBox{
        height: 44px;
        .title{
            font-family: 'PingFangHK-Medium';
            font-size: 18px;
            height: 30px;
        }
        .back{
            width: 18px;
            height: 18px;
            margin-top: 13px;
            background:url("../../assets/img/btn_back.png") no-repeat;
            background-size: cover;
        }
    }       
    .iframe{
        width:100%;
        height:100%;
        overflow-y:auto;
    }
}
</style>
