<template>
   <div class="concat">
      <div class="logo"></div>
      <div class="serviceBox">
         <div class="serviceBg"></div>
         <div class="text midum-white-txt">我们将为您提供7*24小时的服务，您可以通过联系客服的方式与我们取得联系，我们会尽快帮您解决所有问题。</div>
      </div>
      <div class="concat display-flex">
         <div class="img"></div>
         <div class="nets flex-1">
            <p><span>客服 QQ：</span><em>6708899</em></p>
            <p><span>客服邮箱：</span><em>6708899@qq.com</em></p>
         </div>
      </div>
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
.concat{
   .logo{
      width: 238px;
      height: 85px;
      margin: 20px auto 30px;
      background: url('../img/logo.png') no-repeat;
      background-size: cover;
   }
   .serviceBox{
      background-color: #262626;
      box-shadow:0px 0px 8px 10px rgba(0, 0, 0, 0.45);
      .serviceBg{
         width: 353px;
         height: 210px;
         background: url("../img/service.png") no-repeat;
         background-size: cover;
      }
      .text{
         padding: 14px;
         color: #fff;
         line-height: 18px;
      }
   }
   .concat{
      padding: 62px 24px;
      align-items: center;
      .img{
         width: 42px;
         height: 42px;
         background: url("../img/phone.png") no-repeat;
         background-size: cover;
      }
      .nets{
         padding-left: 8px;

         p{
            font-family:Adobe Heiti Std R;
            font-size: 20px;
            span{
               color:#fff;
            }
            em{
               color: #FFD200
            }
         }
      }
   }
}
</style>
