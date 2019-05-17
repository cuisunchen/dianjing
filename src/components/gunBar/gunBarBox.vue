<template>
   <div class="gunBar">
       <div class="topGunBar" v-if="topBar_status"></div>
       <slot></slot>
       <div class="botGunBar" v-if="botBar_status"></div>
   </div>
</template>

<script>
export default {
    props:{
        topBar_status:{
            default:true,
            type:Boolean
        },
        botBar_status:{
            default:true,
            type:Boolean
        }
    }
}
</script>

<style scoped lang="less">
.gunBar{
    width: 100%;
    height: 100%;
    position: relative;
    .topGunBar{
        position: absolute;
        top: 0;
        width: 100%;
        height: 12px;
        z-index: 9;
        background: url('./img/gunBar.png') no-repeat;
        background-size:cover;
    }
    .botGunBar{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 12px;
        background: url('./img/gunBar.png') no-repeat;
        background-size:cover;
        transform: scale(-1,-1);
    }
}
</style>
