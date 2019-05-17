<template>
    <div class="loading-bg display-flex flex-center" :class="{pos_abs:absolute == 'true'}">
        <div class="loading-image display-flex flex-center flex-column">
            <div class="loading-icon animation-xuanzhuan"></div>
            <div class="loading-text midum-white-txt"> <b>{{loadingTip}}</b> </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        loadingTip: {
            type: String,
            default: 'Loading...'
        },
        fixed:{
            type: Boolean,
            default: null
        },
        absolute:{
            type: String,
            default: null
        }
    }   
}
</script>
<style scoped lang="less">
.loading-bg{
    top:0;
    left:0;
    position: fixed;
    width: 100%;
    height:100%;
    z-index: 10001;
    display: flex;
    justify-content: center;
    align-items: center;
    &.pos_abs{
        position: absolute;
    }
    .loading-image{
        min-height: 78px;
        min-width: 80px;
        border-radius: 4px;
        padding: 4px;           
        .loading-icon{
            height: 50px;
            width: 50px;
            margin: 0 auto;
            background-image: url('loading22.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }
}
</style>
