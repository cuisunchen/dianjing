<template>
    <div class="dialog-wrapper display-flex flex-coloum" ref="dialogBox">
        <div class="main-container" v-if="!isShow">
            <gun-bar>
                <div class="body-box">
                    <div :class="contentFontSize" >{{ txtcontent }}</div>                 
                </div>
                <div class="midum-white-txt submit-btn" @click="confirm">{{btnText}}</div>
            </gun-bar>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        txtcontent:{
            type: String,
            default: ""
        },
        btnText:{
            type: String,
            default: "好 的"
        },
        closeSelf:{
            type: Boolean,
            default: true
        },
        contentFontSize:{
            type: String,
            default: 'midum-white-txt'
        }
    },
    computed: {
        isShow () {
            return this.$slots.default
        }
    },
    methods:{
        confirm () {
            if(this.closeSelf){
                if(this.$refs.dialogBox){
                    this.$refs.dialogBox.style.display = 'none'
                }
            }
            this.$emit('onConfirm');
        },
        closeDialog () {
            if(this.$refs.dialogBox){
                this.$refs.dialogBox.style.display = 'none'
            }
            
            this.$emit('onClose');
        }
    }
}
</script>

<style lang="less" scoped>
@import "../../style/index.less";
.dialog-wrapper{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 901;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.68);
    padding: 0 11px;
    .main-container{
        width: 272px;
        background-color: @bg_dark_black;
        .body-box{
            line-height: 26px;
            text-align: center;
            padding: 40px 16px 30px;         
        }
        .submit-btn{
            color:#8A76FF;
            margin-bottom:4px;
            line-height: 50px;
            text-align: center;
            border-top: 1px solid #000;
        }
    }
}
</style>
