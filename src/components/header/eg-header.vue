<template>
    <div class="header">
        <div class="section1">
            <div class="leftWrap" v-if="$slots.left">
                <slot name="left"></slot>
            </div>
            <div class="title display-flex">
                <div class="line" v-if="lineShow"></div>
                <slot name="title">头部</slot>
            </div>
            <div class="rightWrap" v-if="$slots.right">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="section2" v-if="$slots.tab">
            <slot name="tab"></slot>
        </div>
        
        <div class="bottomBar"></div>
    </div>
</template>

<script>
export default {
    props:{
        lineShow:{
            default:false,
            type: Boolean
        }
    },
}
</script>


<style scoped lang="less">
@import '../../style/common.less';
// @media only screen and (width: 375px) and (height: 729px){
//   .header{
//       padding-top: calc(20px + var(--safe-area-inset--top));
//   }
// }
@media only screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (height: 584px) {
  .header{
    padding-top: 16px;
  }
}
@media only screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (height: 687px) {
  .header{
    padding-top: 20px;
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (height: 729px) {
      .header{
      padding-top: 34px;
  }
}
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (height: 813px) {
      .header{
      padding-top: 34px;
  }
}
.header{
    position: fixed;
    top:0;
    left: 0;
    right: 0;    
    color: #fff;
    background-color:#262626;
    z-index: 900;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.60);
    // padding-top: calc(1px + var(--safe-area-inset-top));
    // padding-top: var(--safe-area-inset-top);
    // padding-top: 20px;
    .section1{
        height: 44px;
        line-height: 44px;
        position: relative;
        .leftWrap{
            position: absolute;
            left: 8px;
            top: 0;
            height: 100%;
            padding-right: 30px;
        }
        .rightWrap{
            position: absolute;
            top: 0;
            right: 8px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .title{
            height: 100%;
            font-size: 18px;
            text-align: center;
            justify-content: center;
            align-items: center;
            .line{
                position: absolute;
                width: 60%;
                height: 1px;
                margin-top: 2px;
                background-color:#262626;
            }
        }
    }
    .bottomBar{
        position: absolute;
        bottom: -18.8px;
        left: 0;
        width: 100%;
        height: 24px;
        .bg-image('./../../assets/img/topbar');
        background-size: cover;        
    }
}
</style>
