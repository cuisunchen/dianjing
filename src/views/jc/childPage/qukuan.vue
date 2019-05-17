<template>
   <div class="qukuan">
      <div class="title title1"></div>
      <div class="bg bg1"></div>
      <div class="title title2"></div>
      <div class="bg bg3"></div>
      <div class="title title3"></div>
      <div class="bg bg2"></div>
      <div class="title title4"></div>
      <div class="bg bg4"></div>
   </div>
</template>

<script>
export default {
    data() {
       return {

       }
    },
    created() {

    },
    methods: {

    },
    components: {

    }
}
</script>

<style scoped lang="less">
.qukuan{
   padding: 14px 0;
   .title{      
      height: 31px;  
      margin: 10px auto 0;  
      &.title1{
         width: 126px;
         background: url("../img/title1.png") no-repeat;
         background-size: cover;
      }  
      &.title2{
         width: 250px;
         background: url("../img/title2.png") no-repeat;
         background-size: cover;
      }  
      &.title3{
         width: 147px;
         background: url("../img/title3.png") no-repeat;
         background-size: cover;
      }  
      &.title4{
         width: 120px;
         height: 44px;
         background: url("../img/title4.png") no-repeat;
         background-size: 100% 100%;
      }  
   }
   .bg{
      width: 290px;
      height: 450px;
      margin: 0 auto;
      &.bg1{
         background: url("../img/qukuan1.png") no-repeat;
         background-size: cover;
      }
      &.bg2{
         background: url("../img/qukuan2.png") no-repeat;
         background-size: cover;
      }
      &.bg3{
         background: url("../img/qukuan3.png") no-repeat;
         background-size: cover;
      }
      &.bg4{
         width: 298px;
         height: 81px;
         margin-top: 20px;
         background: url("../img/qukuan4.png") no-repeat;
         background-size: cover;
      }
   }
   
}
</style>
