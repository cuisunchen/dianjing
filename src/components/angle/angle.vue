<template>
   <div class="angle display-flex">
       <canvas :id="id" :width="width" :height="height"></canvas>
   </div>
</template>

<script>
export default {
    data() {
       return {

       }
    },
    props:{
        /** 
         * mode:'horizontal'   默认左右渐变
         * mode: 'vertical'    默认上下渐变
        */
        mode:{
            default: 'vertical',
            type: String
        },
        id:{
            default: '',
            type: String
        },
        width:{
            default: 16,
            type: Number
        },
        height:{
            default: 16,
            type: Number
        },
        angleHeight:{
            default: 12,
            type: Number
        },
        startColor:{
            default: '#272727',
            type: String
        },
        stopColor:{
            default: '#515151',
            type: String
        }
    },
    created() {
        this.$nextTick(()=>{
            this.drawPic()            
        })
    },
    methods:{
        drawPic(){
            var bg = document.getElementById(this.id)
            var ctx = bg.getContext('2d');
            //填充三角形（等边）
            ctx.beginPath();
            ctx.moveTo(6,0); //从A（0,0）开始
            ctx.lineTo(this.angleHeight,this.height/2);//从A(0,0)开始，画到B (0,173)结束
            ctx.lineTo(6,this.height); //B(0,173)-C(200,173)
            var grd;
            if( this.mode == 'vertical' ){
                grd = ctx.createLinearGradient(0,0,0,16);//使用渐变颜色填充,从(0,0)到(0,16) （上到下）
            }else{
                grd = ctx.createLinearGradient(0,0,20,0);//使用渐变颜色填充,从(0,0)到(20,0) （左到右）
            }
            
            grd.addColorStop(0,this.startColor); //起始颜色
            grd.addColorStop(1,this.stopColor); //终点颜色
            ctx.fillStyle=grd; //以上面定义的渐变填充
            ctx.fill(); //闭合形状并且以填充方式绘制出来
        },
    },
    watch:{
        startColor(){
            this.drawPic()
        }
    }
}
</script>

<style scoped lang="less">
</style>
