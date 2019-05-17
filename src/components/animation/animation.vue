<template>
    <transition :name="modeName" tag="div" class="wrap" @after-appear="transitionAppear">
        <slot></slot>
    </transition>   
</template>

<script>
export default {
    props:{
        /** 
         * mode决定动画方向
         * toTop  为由下向上移动
         * toBot  为由上向下移动
        */
        mode:{
            default:'toTop',
            type:String
        },
        shade:{
            default:false,
            type:Boolean
        },
        hasShade:{
            default:false,
            type:Boolean
        }
    },
    data(){
        return{
            modeName:''
        }
    },
    created(){
        this.modeName = this.mode
    },
    methods:{
        transitionAppear(){
            this.$emit('disappear')
        }
    }
}
</script>

<style scoped lang="less">
.wrap{
    position: relative;
}
.toTop-enter-active, .toTop-leave-active{
    transition: all 0.3s;
}
.toTop-enter,.toTop-leave-to{
    transform: translate3d(0, 100%, 0);
    opacity: 0;
}

.toBot-enter-active, .toBot-leave-active{
    transition: all 0.2s;
}
.toBot-enter,.toBot-leave-to{
    transform: translate3d(0, -100%, 0);
    opacity: 0;
}

//  从右至左
.toLeft-enter-active, .toLeft-leave-active{
    transition: all 0.3s ease-in-out;
}
.toLeft-enter,.toLeft-leave-to{
    transform: translate3d(100%, 0, 0);
    opacity: 0;
}
//  从左至右
.toRight-enter-active, .toRight-leave-active{
    transition: all 0.3s ease-in-out;
}
.toRight-enter,.toRight-leave-to{
    transform: translate3d(-100%, 0, 0);
    opacity: 0;
}
//  淡隐淡入
.fade-enter-active, .fade-leave-active{
    transition: all 0.3s ease-in-out;
}
.fade-enter,.fade-leave-to{
    opacity: 0;
}
</style>
