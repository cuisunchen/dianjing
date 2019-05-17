<template>
    <div class="personImg-wrapper">
        <div class="head-container">
            <eg-header>
                <div class="icon-back" @click="$router.go(-1)" slot="left"></div>
                <div class="large-white-txt" slot="title">个人头像</div>
            </eg-header>
        </div>
        <div class="main-container">
            <div class="imgs-box display-flex justify-between">
                <div class="img-item" :class="{active:k==pointers.imgList}" v-for="(v,k) in imgList" :key="k" @click="chooseImg(k)">
                    <img v-lazy="v.imageUrl" alt="">
                </div>
            </div>
            <div class="btn-box">
                <div class="common-btn" @click="editUserImage">确定</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgList: [],
            pointers: {
                imgList:0
            }
        }
    },
    created () {
        this.getListPhoto();
    },
    methods: {
        chooseImg (k) {
            this.pointers.imgList = k;
        },  
        getListPhoto () {
            this.$http.post(this.interfaces.getListPhoto).then(res=>{
                if(res.code == "200"){
                    this.imgList = res.data;
                }
            });
        },
        editUserImage () {
            let param = {};
            param.imageId = this.imgList[this.pointers.imgList].id;
            this.$http.post(this.interfaces.editUserImage, param).then(res=>{
                if(res.code == "200"){
                    this.$api.getUserInfo();
                    this.$router.go(-1)
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
.head-container{
    height: 44px;
}
.personImg-wrapper{
    .main-container{
        padding: 0 11px;
        .imgs-box{
            flex-wrap: wrap;
            .img-item{
                width: 110px;
                height: 110px;
                margin-top: 20px;
                border-radius: 50%;
                overflow: hidden;
                box-shadow:0px 5px 10px 0px rgba(0, 0, 0, 0.6);
                box-sizing: border-box;
                background: url('./../../../../assets/img/loading-logo.png') no-repeat;
                background-size: auto 70%;
                background-position: center;
                img{
                    height: 100%;
                    width: 100%;
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
