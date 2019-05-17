<template>
   <div class="eg-select" :class="{'noColor':!borderStatus}" @click="noClick && select()">
       <div class="inner display-flex">
           <div class="content flex-1">
               <slot></slot>
           </div>
           <div class="iconBox" v-if="iconShow">
               <div class="icon"></div>
           </div>
       </div>
   </div>
</template>

<script>
export default {
    props:{
        //  是否显示右边icon   true为显示   false为不显示
        iconShow:{
            default: true,
            type: Boolean
        },
        //  是否为高亮边框   true为高亮   false为不高亮
        borderStatus:{
            default: true,
            type: Boolean
        },
        //  是否添加点击事件   true为添加  false为不添加
        noClick:{
            default:true,
            type: Boolean
        }
    },
    methods: {
        select(){
            this.$emit('select')
        }
    }
}
</script>

<style scoped lang="less">
.eg-select{
    height: 40px;
    padding: 1px;
    border-radius: 5px;
    background: linear-gradient(to right, #23F8F8 0%, #8A75FF 100%);
    &.noColor{
        background: #000;
    }
    
    .inner{
        height: 100%;
        background: #202020;
        border-radius: 4px;
        display: flex;
        
        .iconBox{
            width: 30px;
            height: 100%;
            display: flex;
            align-items: center;
            .icon{
                width: 16px;
                height: 16px;
                background:url("../../assets/img/btn_back.png") no-repeat;
                background-size: cover;
                transform: rotate(180deg)
            }
        }
    }
}
</style>
