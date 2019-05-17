<template>
   <div class="footNav display-flex">
        <tabbar class="tabbar" v-model="currentIndex" active-color="#ffffff">
            <tabbar-item v-for="item in items" :key="item.name" @click="goPage(item.route)">
                <span class="tabTxt">{{item.name}}</span>
                <img class="icon" slot="icon" slot-scope="props" :src="props.active ? item.activeImg : item.defaultImg">
            </tabbar-item>            
        </tabbar>
        <div class="moveTop" :style="{transform: 'translateX(' + moveBarPos + ')', width:screenWidth/items.length + 'px'}">
            <div class="moveBar"></div>
        </div>
        <!-- <div>
          <van-number-keyboard
            extra-key="."
            close-button-text="完成"
            :show="true"
          /> 
        </div>       -->
   </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
       return {
           currentIndex: 0,
           screenWidth:null,
           items:[
               {name:'首页',defaultImg:require('./img/home@2x.png'),activeImg:require('./img/home_active@2x.png'),route:'/'},
               {name:'活动',defaultImg:require('./img/activity@2x.png'),activeImg:require('./img/activity-active@2x.png'),route:'/activity'},
               {name:'教程',defaultImg:require('./img/jc.png'),activeImg:require('./img/jc-active.png'),route:'/jc'},
               {name:'充值',defaultImg:require('./img/charge@2x.png'),activeImg:require('./img/charge-active@2x.png'),route:'/charge'},               
               {name:'我的',defaultImg:require('./img/mine@2x.png'),activeImg:require('./img/mine-active@2x.png'),route:'/personalCenter'},
           ],
           router: [
                {url: '/home' , index:0},
                {url: '/activity' , index:1},
                {url: '/charge' , index:3},
                {url: '/jc' , index:2},
                {url: '/personalCenter' , index:4},
                {url: '/login' , index:4},
                {url: '/regist' , index:4},
            ]
       }
    },
    computed:{
        moveBarPos(){
            return this.screenWidth/this.items.length * this.currentIndex + 'px'
        }
    },
    created() { 
        for (const item of this.router) {
            if( this.$route.path.includes(item.url) ){this.currentIndex = item.index}
        }       
        this.screenWidth = document.documentElement.clientWidth || document.body.clientWidth
    },
    methods: {
        ...mapMutations({
            setQueryThird:'SET_Query_Third'
        }),
        goPage(path){
            if(path == "/personalCenter"){
                this.setQueryThird(true);
            }else{
                this.setQueryThird(false);
            }
            this.$router.push(path);
        },
        changeItem(i, v){
            this.currentIndex = i;
            this.$router.push(v.url);
        }
    },
    components: {
        Tabbar, TabbarItem 
    },
    watch:{
        $route(to){
            for (const item of this.router) {
                if(to.path == '/'){this.currentIndex = 0}
                if( to.path.indexOf(item.url) >= 0){this.currentIndex = item.index}
            }
        }
    }
}
</script>

<style scoped lang="less">
@import '../../style/common.less';
.footNav{
    height: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    .tabbar{
        padding: 4px 0 0;
        background-color: #202020;
        &::after{
            border: none
        }
        .tabTxt{
            position: relative;
            top: -7px;
            font-size: 10px;
        }
        .icon{
            width: 35px;
            height: 37px;
        }
    }
    .item{
        text-align: center;
        .imgBg{
            display: inline-block;
            width: 35px;
            height: 37px;
            img{
                width: 100%;
                height: 100%
            }
        }
        p{
            font-size: 12px;
            line-height: 1;
            position: relative;
            top: -4px;
            color: #676767;
        }
    }
    .moveTop{
        position: absolute;
        left: 0;
        top: -14px;
        width: 25%;
        height: 20px;
        text-align: center;
        transition: all .2s ease-in-out;        
        .moveBar{
            display: inline-block;
            width: 64px;
            height: 100%;
            vertical-align: top;
            .bg-image('./img/bar');
            background-size: cover;      
        }
    }
}
</style>
