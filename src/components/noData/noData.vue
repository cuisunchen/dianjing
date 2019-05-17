<template>
   <div class="noData">
       <div class="icon"></div>
       <p class="large-white-txt">暂无数据</p>
   </div>
</template>

<style scoped lang="less">
.noData{
    width: 128px;
    height: 128px;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin:  auto;
    .icon{
        width: 98px;
        height: 106px;
        margin: 0 auto;
        background: url("./img/noData.png") no-repeat;
        background-size: cover;
    }
    p{
        text-align: center;
    }
}
</style>
