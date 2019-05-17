<template>
    <div class="zj-detal">
        <div class="headBox">
            <eg-header>
                <div class="back" slot="left" @click="goBack"></div>
                <div class="title" slot="title">资金明细</div>
                <div class="date" slot="right" @click = "showPopup"></div>
                <div class="tab" slot="tab">
                    <div class="leftItem" :class="{'active': tabIndex == 0}" @click="tabChange(0)">支出</div>
                    <div class="rightItem" :class="{'active': tabIndex == 1}" @click="tabChange(1)">收入</div>
                </div>
            </eg-header>
        </div>
        <div class="main" v-if="details.length > 0">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text=" " loosing-text=" ">
                <div class="moneyShow">
                    <p>{{tabIndex == 0?'总支出':'总收入'}}</p>
                    <p :class="{'yellowFont': tabIndex == 1}"><span>￥</span><em>{{totalMoney.split('.')[0]}}</em>.<span>{{totalMoney.split('.')[1]}}</span></p>
                </div>

                <div class="lists">
                    <gunBar class="zj_gun">
                        <van-list v-model="Listloading" :finished="finished" :finished-text="finishedText" @load="loadMore">                            
                            <div class="itemWrap" :class="{'hasBotBorder':details.length > param.page_size}">
                                <div class="listItem display-flex"  v-for="(item,index) in details" :key="index">
                                    <div class="type flex-1">
                                        <div>{{item.type}}</div>
                                        <div class="source">{{item.source}}</div>
                                    </div>
                                    <div class="center flex-1">
                                        <p class="date" v-if="item.time">{{item.time.split(' ')[0]}}</p>
                                        <p class="time" v-if="item.time">{{item.time.split(' ')[1]}}</p>
                                    </div>
                                    <div class="flex-1" :class="{'yellowFont': tabIndex == 1}">{{tabIndex==0 ? '-' : '+'}}{{item.money}}</div>
                                </div>
                            </div>
                        </van-list> 
                    </gunBar>                
                </div>
                <div slot="loading" class="loading-slot display-flex justify-center">
                    <img class="loading-img animation-xuanzhuan" :src="mainOptions.loadingIcon"/>
                </div>
                <div slot="pulling" class="loading-slot display-flex justify-center">
                    <img class="loading-img animation-xuanzhuan" :src="mainOptions.loadingIcon"/>
                </div>
                <div slot="loosing" class="loading-slot display-flex justify-center">
                    <img class="loading-img animation-xuanzhuan" :src="mainOptions.loadingIcon"/>
                </div>
            </van-pull-refresh>
        </div>

        <!-- 无数据 -->
        <no-data v-else></no-data>
        <!-- 日期 popup -->
        <popup v-model="isDateShow" position="bottom" class="popup">
            <div class="dateWrap">
                <p :class="{'on': item.data_type == date_type_now}" v-for="item in datePopup" :key="item.data_type" @click="searchData(item)">{{item.date_text}}</p>
                <p :class="{'on': date_type_now == '5'}" @click="searchData()">全部</p>
                <p @click="isDateShow = false">取消</p>
            </div>
        </popup>
    </div>
</template>

<script>
import gunBar from "../../../../components/gunBar/gunBarBox"
import { Popup } from 'vant';
import NoData from "../../../../components/noData/noData"
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            tabIndex:0,
            isDateShow:false,
            date_type_now: '',              // 当前所显示数据的日期范围
            datePopup:[                  //  日期选择框
                {date_text:'最近三天',data_type:'2'},      
                {date_text:'最近一周',data_type:'3'},      
                {date_text:'最近一月',data_type:'4'},      
            ],
            Listloading:true,       //  上拉加载loadding
            finishedText:'没有更多了',
            finished: false,
            param: {
                "page_no": "1",
                "page_size": "20",
                "date_type": "5"   //  5：全部数据    4：月数据   3：周数据   2：当前3天数据
            },
            details:[],
            totalMoney:'',
            isLoading:false
        }
    },
    created() {
        this.init();
    },   
    methods: {
        init(){
            this.net_get_out_data(0)
        },
        onRefresh(){
            this.param.page_no = '1'
            this.finished = false;   
            if( this.tabIndex == 0 ){
                this.net_get_out_data(2)
            }else if( this.tabIndex == 1 ){
                this.net_get_in_data(2)
            } 
        },
        loadMore(){
            this.param.page_no ++ ;
            if( this.tabIndex == 0 ){
                this.net_get_out_data(1)
            }else if( this.tabIndex == 1 ){
                this.net_get_in_data(1)
            }            
        },
        showPopup(){
            this.isDateShow = true;
        },
        searchData(item){
            document.documentElement.scrollTop = 0
            this.isDateShow = false;                //  关闭日期popup
            this.Listloading = true;                //              
            if(!item){
                this.param.date_type = this.date_type_now = '5';
            }else{
                this.param.date_type = this.date_type_now = item.data_type;
            }            
            this.param.page_no = '1'
            if( this.tabIndex == 0 ){
                this.net_get_out_data(0)
            }else{
                this.net_get_in_data(0)
            }
        },
        //  获取收入资金明细
        net_get_in_data(type){
            return this.$http.post('/detailsFunds/income/list',this.param).then( res => {
                this.handle_get_data(type,res)
            })
        },

        //  获取支出资金明细
        net_get_out_data(type){                     
            return this.$http.post('/detailsFunds/pay/list',this.param).then( res => {
                this.handle_get_data(type,res)
            })
        },
        //  处理支出资金明细数据
        handle_get_data( type,res ){            
            this.Listloading = false;
            if( res.code == 200 ){
                if( res.data.totalMoney ){
                    this.totalMoney = res.data.totalMoney 
                }
                if(type == 1){
                    for (const item of res.data.data) {
                        this.details.push(item)
                    }                    
                    // 加载状态结束
                    this.Listloading = false;
                    // 数据全部加载完成
                    if ( res.data.data.length < this.param.page_size ) {
                        this.Listloading = false;                 
                        this.finished = true;
                        this.finishedText = '没有更多了'
                    }
                    return
                }else if( type == 2){
                    this.isLoading = false
                }
                             
                this.details = res.data.data;
                this.Listloading = false;        
                //  初始化数据不够20条时  不显示底部的‘没有更多了’的提示
                if ( res.data.data.length < this.param.page_size ) {
                    this.Listloading = false;
                    this.finished = true;
                    this.finishedText = ''
                } 
            }
        },
        tabChange(index){
            this.tabIndex = index;
            this.finished = false;
            document.documentElement.scrollTop = 0;                       // tab切换后滚动条滚到
            this.param.page_no = '1';   
            if( index == 0 ){
                this.net_get_out_data(0)
            }else{
                this.net_get_in_data(0)
            }
        },
        goBack(){
            this.$router.go(-1)
        },
    },
    components: {
        gunBar,Popup,NoData
    }
}
</script>

<style scoped lang="less">
@import '../../../../style/common.less';
.zj-detal{
    .headBox{
        height: 98px;
        padding: 0 12px;
        .back{
            width: 18px;
            height: 18px;
            margin-top: 13px;
            background:url("../../img/btn_back.png") no-repeat;
            background-size: cover;
        }
        .title{
            font-family: 'PingFangHK-Medium';
            font-size: 18px;
        }
        .date{
            width:28px;
            height:28px;
            background:url('../../img/date.png') no-repeat;
            background-size:cover;
        }
        .tab{
            display: flex;
            padding: 6px 12px;
            >div{
                flex: 1;
                height: 40px;
                text-align: center;
                line-height: 38px;
                font-size:15px;
                font-family:PingFang-SC-Bold;
                font-weight:bold;
                &.leftItem{
                    .bg-image('./img/tab_rt');
                    background-size: 100% 100%;
                    &.active{
                        .bg-image('./img/tab_rt_active');
                        background-size: 100% 100%;
                    }
                }
                &.rightItem{
                    .bg-image('./img/tab_left');
                    background-size: 100% 100%;
                    &.active{
                        .bg-image('./img/tab_left_active');
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
    .main{
        .yellowFont{
            color: #FFD200!important;
        }
        .moneyShow{
            >p{
                text-align: center;
                &:first-child{
                    font-size:12px;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                    margin-top: 10px;
                    color:rgba(255,255,255,1);
                    line-height:25px;
                    text-shadow:0px 10px 20px rgba(0, 0, 0, 0.6);
                }
                &:last-child{
                    font-size: 24px;
                    color: #E60012;
                    font-weight:bold;
                    margin-bottom: 24px;
                    em{
                        font-size: 35px;
                    }
                }
            }
        }
        .lists{
            background-color: #262626;
            .zj_gun{
                padding: 12px 0;
                .itemWrap{
                    padding: 0 12px;
                    .listItem{
                        display: flex;
                        color: #fff;
                        justify-content: space-between;
                        align-items: center;
                        line-height: 20px;
                        padding: 15px 25px;
                        border-bottom: 1px solid #0F0F0F;
                        &:last-child{
                            border-bottom:none
                        }
                        &.lastBorderBottom{
                            border-bottom: 1px solid #0F0F0F;
                        }
                        >div:last-child{
                            text-align: right;
                            color: #E60012;
                        }
                        .type{
                            >div{
                                width: 75px;
                            }
                            .source{
                                overflow: hidden;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 2;
                            }
                        }
                        .center{   
                            text-align: center;  
                        }
                    }
                }
            }
            
        }
    }
    .dateWrap{
        height: 202px;
        background-color: #262626;
        >p{
            color: #6C6C6C;
            font-size:15px;
            text-align:center;
            line-height: 40px;
            border-bottom:1px solid #000;
            &.on{
                color: #fff;
            }
        }
    }
}
</style>
