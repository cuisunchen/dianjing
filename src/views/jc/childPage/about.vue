<template>
   <div class="about">
      <div class="logo"></div>
      <div class="content">
         <div class="item item1">
            <div class="bannar"></div>
            <p>北京时间4月30日2:00，美东时间4月29日14:00，万众瞩目的博彩业巨头YG电竞平台登上纽约时代广场纳斯达克大屏。</p>
            <p>纽约，世界重要金融经济中心；“时代广场”，纽约市中心，融汇文化与金融的世界级地标，至今已有100多年历史，其地点位于纽约市曼哈顿，因其世界位置与著名程度，
               又被称为“世界的十字路口”纳斯达克大屏幕，纽约时代广场的标志性建筑物，其屏幕面积之大及世界影响之广泛，被舆论评为“世界第一屏”。</p>
            <p class="title display-flex midum-white-txt"><em class="dot"></em><span class="gradient-text">何为纳斯达克</span></p>
            <p>纳斯达克 （英语： NASDAQ） 全称：美国全国证券交易商协会自动报价表，创立于1971年，迄今已成为全球第二大的证券交易市场，世界最大的股票市场之一。</p>
            <p>纳斯达克大屏于2000年1月揭幕启用，屏幕高达36.6米，该广告位花费纳斯达克每年至少200万美元，在广告市场纳斯达克大屏作为标杆和典范长期屹立在纽约时代广场。
               这块占地不到纽约市总面积0.1%的地方，创造了纽约10%的总产值，根据华尔街日报(wall street journal) 报道，时代广场的广告牌收入，甚至高出当地写字楼租金收入。</p>
         </div>
         <div class="item item2">
            <div class="title display-flex">
               <div class="year">
                  <p>2019</p>
                  <div class="botborder"></div>
               </div>
               <span class="gradient-text flex-1"> YG电竞 &ensp;目光所及 更显专业</span>
            </div>
            <p>YG电竞经过20年沉淀，现拥有一流在线博彩技术及经验丰富的运营团队，并在全球范围内信誉卓著。
            现YG电竞 致力于为亚洲用户提供更高品质的在线体育服务及真人娱乐平台，力求给不同地区的用户带来别样、缤纷的极致体验！</p>
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
.about{
   .logo{
      width: 238px;
      height: 85px;
      margin: 20px auto 30px;
      background: url('../img/logo.png') no-repeat;
      background-size: cover;
   }
   .content{
      padding-bottom: 20px;
      .item{
         padding: 10px 10px 16px;
         margin-bottom: 12px;
         background-color: #262626; 
         &:last-child{
            margin-bottom: 0;
         }
         .bannar{
            width: 100%;
            height: 214px;
            margin-bottom: 20px;
            background: url("../img/bannar.jpg") no-repeat;
            background-size: 100% 100%;
         }
         p:not(.title){
            letter-spacing: 1px;
            color: #6C6C6C;
            // font-weight:bold; 
            margin-bottom: 10px;
            &:last-child{
               margin-bottom: 0;
            }
         }
         .title{
            align-items: center;
            line-height: 40px;
         }
      }
      .item2{
         .title{
            .year{
               width: 36px;
               height: 24px;               
               line-height: 24px;
               background-color: #313131;
               position: relative;
               p{
                  letter-spacing: 0;
                  text-align: center;
                  color: #fff;
               }
               .botborder{
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 2px;
                  background:linear-gradient(-90deg,rgba(138,117,255,1) 0%,rgba(35,248,248,1) 100%);
               }
            }
            .gradient-text{
               font-family:PingFangSC-Medium;
               font-weight:500;
               font-size: 15px;
               padding-left: 10px;
            }
         }
      }
   }
}
</style>
