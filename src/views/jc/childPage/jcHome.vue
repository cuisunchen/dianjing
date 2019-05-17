<template>
    <div class="jcHome">
        <list-item :listData="listData"></list-item>
    </div>
</template>

<script>
import ListItem from "../ListItem"
export default {
    data() {
        return {
            listData:[
                {id:'cunkuan',iconUrl: require('../img/cunkuan.png'),tit:'存款教程',desc:'存款极速到账',routerPath:'/jc/ck'},
                {id:'qukuan',iconUrl: require('../img/qukuan.png'),tit:'取款教程',desc:'极速提款仅需30秒',routerPath:'/jc/qk'},
                {id:'jc',iconUrl: require('../img/jc.png'),tit:'新手教程',desc:'新手学习操作流程',routerPath:'/jc/njc'},
                {id:'js',iconUrl: require('../img/jishu.png'),tit:'技术支持',desc:'提供全面技术支持',routerPath:'/jc/jszc'},
                {id:'wfjc',iconUrl: require('../img/wfjc.png'),tit:'玩法教程',desc:'真人体育彩票玩法',routerPath:'/jc/wfjc'},
                {id:'concat',iconUrl: require('../img/concat.png'),tit:'联系我们',desc:'为您提供全天服务',routerPath:'/jc/concat'},
                {id:'about',iconUrl: require('../img/about.png'),tit:'关于YG电竞',desc:'博彩隐私策略',routerPath:'/jc/about'},
            ]
        }
    },
    components: {
        ListItem
    }
}
</script>

<style lang="less" scoped>
.jcHome{
    padding: 14px 0;
}
</style>

