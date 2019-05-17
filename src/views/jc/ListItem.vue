<template>
   <div class="listWrap">
       <div class="item display-flex" v-for="(item,index) in listData" :key="index" @click="clickItem(item.routerPath)">
           <div class="icon"><img :src="item.iconUrl" alt="" srcset=""></div>
           <div class="con flex-1 display-flex"><span class="midum-white-txt">{{item.tit}}</span><em>{{item.desc}}</em></div>
           <div class="angle display-flex"><EgGngle :startColor='"#23F8F8"' :stopColor='"#8A75FF"' :id="item.id"></EgGngle></div>
       </div>
   </div>
</template>

<script>
import EgGngle from "../../components/angle/angle"
export default {
    data() {
       return {

       }
    },
    props:{
        listData:{
            type:Array,
            default:[]
        }
    },
    created() {

    },
    methods: {
        clickItem(url){
            if(url){
                this.$router.push(url)
            }            
        }
    },
    components: {
        EgGngle
    }
}
</script>

<style scoped lang="less">
.listWrap{
    .item{
        padding: 20px 36px;
        margin-bottom: 14px;
        background-color: #262626;
        box-shadow:0px 3px 7px 0px rgba(0, 0, 0, 0.55);
        &:last-child{
            margin-bottom: 0;
        }
        .icon{
            width: 24px;
            height: 24px;  
            img{
                width: 100%;
                height: 100%;
            }          
        }
        .con{
            color: #fff;
            align-items: center;
            span{
                color: #fff;
                margin: 0 12px 0 17px;
            }
            em{
                color: #6C6C6C
            }
        }
        .angle{
            align-items: center;
        }
    }
}
</style>
