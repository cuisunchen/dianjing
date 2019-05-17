<template>
    <div class="switch display-flex" :style="{borderColor:this.borderColor,background:backgroundColor}" @click="switchChoose">
        <div class="ball" :class="{'on': isActive}" ></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isActive: false,
            styleObj:{},
            count:0,
            isDisabled:false
        }
    },
    props:{
        type:{
            default:false,
            type: Boolean
        },
        disabl:true,
        inactiveColor:{
            default: 'transparent',
            type: String
        },
        activeColor:{
            default: 'linear-gradient(0deg,rgba(138,117,255,1),rgba(35,248,248,1))',
            type: String
        },
        borderColor:{
            default: '#ddd',
            type: String
        }
    },
    computed:{
        backgroundColor(oldVal,newVal){
            return this.isActive?this.activeColor:this.inactiveColor
        }
    },
    created() {
        this.isActive = this.type
    },
    methods: {
        switchChoose(){   
            if(this.isDisabled){return}
            this.count ++         
            this.isActive = !this.isActive;
            this.$emit('click', this.isActive)
        }
    },
    watch:{
        type(v){
            this.isActive = v
        },
        disabl(v){
            this.isDisabled = v
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
.switch{    
    width: 100%;
    height: 100%;
    align-items: center;
    border-radius: 16px;
    border: 2px solid;
    transition: background-color 0.3s;
    .ball{
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background-color: #fff;
        transition: all 0.2s ease-in-out;
        &.on{
            transform: translateX(20px)
        }
    }
}
</style>
