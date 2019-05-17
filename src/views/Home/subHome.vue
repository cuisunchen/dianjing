<template>
    <div class="sub-home-wrapper">
        <div class="head-container">
            <eg-header>
                <div class="icon-back" @click="$router.go(-1)" slot="left"></div>
                <div class="large-white-txt" slot="title">{{ title }}</div>
            </eg-header>
        </div>
        <div class="main-container">
            <div class="imgs-box display-flex justify-between">
                <div class="img-item" :class="{active:k==pointers.PTList}" v-for="(v,k) in PTList" :key="k" @click="chooseGame(v,k)">
                    <div class="item-img-content">
                        <img v-lazy="v.gameImage" alt="">
                    </div>
                    
                    <div class="item-name small-white-txt display-flex justify-center align-end">{{ v.gameNameCn }}</div>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            PTList:[],
            pointers: {
                PTList: -1
            },
            title: ""
        }
    },
    props:{
    },
    created () {
        this.title = this.$route.query.title;
        this.getPtGamesList();
    },
    methods: {
        getPtGamesList () {
            let param = {};
            param.id = this.$route.query.id;
            this.$http.post(this.interfaces.getPtGamesList, param, {showLoading: true}).then(res => {
                if(res.code == "200"){
                    this.PTList = res.data.ptGamesList;
                }
            })
        },
        chooseGame(v,k) {
            if(this.PTList.length>0){
                window.open(`/mpage?jumpLink=${this.interfaces.forwardName}&goto=getThird&gameType=${v.gameUrl}`);
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../style/common.less';
.head-container{
    height: 44px;
}
.sub-home-wrapper{
    .main-container{
        padding: 0 11px;
        .imgs-box{
            flex-wrap: wrap;
            .img-item{
                width: 110px;
                height: 130px;
                margin-top: 13px;
                overflow: hidden;
                box-sizing: border-box;
                .item-img-content{
                    height: 80%;
                    width: 100%;
                    background: url('./../../assets/img/loading-logo.png') no-repeat;
                    background-size: auto 70%;
                    background-position: center;
                    box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.6);
                    background-color: @bg_dark_black;
                    img{
                        height: 100%;
                        width: 100%;
                    }
                }
                
                .item-name{
                    height: 19%;
                }
                &.active{
                    border:5px solid rgba(138,117,254,1);
                }
            }
        }
        .btn-box{
            margin: 20px 0;
        }
    }
}
</style>
