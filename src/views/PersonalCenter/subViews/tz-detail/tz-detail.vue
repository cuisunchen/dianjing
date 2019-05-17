<template>
    <div class="tzDetail">
        <div class="headBox">
            <eg-header>
                <div class="back" slot="left" @click="goBack"></div>
                <div class="title" slot="title">投注明细</div>
                <div class="date" slot="right" @click = "showPopup"></div>
            </eg-header>
        </div>
        <div class="title">
            <div class="bg"></div>
            <div class="flexBox display-flex">
                <div class="left flex-1 display-flex">
                    <div class="name flex-1">名称</div>
                    <div class="time flex-1">时间</div>
                </div>
                <div class="right flex-1 display-flex">
                    <div class="tz flex-1">投注金额</div>
                    <div class="profit flex-1">盈亏</div>
                </div>
            </div>
        </div>
        <div class="main" v-if="details.length > 0">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text=" " loosing-text=" ">
                <van-list v-model="Listloading" :finished="finished" finished-text="没有更多了" @load="loadMore">
                    <div class="itemWrap">
                        <div class="listItem display-flex" v-for="(item,index) in details" :key="index">
                            <div class="left flex-1  display-flex">
                                <div class="cp_type flex-1">
                                    <p>{{ item.platform }}</p>
                                    <p style="font-size:12px;">{{ item.gameName }}</p>
                                </div>
                                <div class="datebox flex-1">
                                    <p v-if="item.betTime">{{item.betTime.split(' ')[0]}}</p>
                                    <p v-if="item.betTime">{{item.betTime.split(' ')[1]}}</p>
                                </div>
                            </div>
                            <div class="right flex-1 display-flex">
                                <div class="status flex-1 display-flex">{{item.betNumber}}</div>
                                <div class="money flex-1 display-flex" :style="{color: item.netNumber >= 0 ? '#FFD200' : '#E60012'}">{{item.netNumber >= 0?'+':''}}{{item.netNumber}}</div>
                            </div>
                        </div>
                    </div>
                </van-list>                

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
                <p @click="searchData()">全部</p>
                <p @click="isDateShow = false">取消</p>
            </div>
        </popup>
        
   </div>
</template>

<script>
import { Popup } from 'vant';
import NoData from "../../../../components/noData/noData"
export default {
    data() {
        return {
            details:[],
            isDateShow:false,
            date_type_now: '',              // 当前所显示数据的日期范围
            datePopup:[                  //  日期选择框
                {date_text:'最近三天',data_type:'2'},      
                {date_text:'最近一周',data_type:'3'},      
                {date_text:'最近一月',data_type:'4'},      
            ],
            isLoading: false,        //  下拉刷新loadding
            Listloading:false,       //  上拉加载loadding
            finished: false,
            pageData:{
                page_no: '1',
                page_size: '20',
                data_type: '5'
            },
            important:'!important'
        }
    },
    created() {
        document.documentElement.scrollTop = 0
        this.net_getData(0,this.pageData)
    },
    methods: {
        searchData(item){
            if(item == undefined){
                this.pageData.data_type = '5'
            }else{
                this.pageData.data_type = item.data_type;
            }
            document.documentElement.scrollTop = 0
            this.isDateShow = false;                //  关闭日期popup
            this.Listloading = false;                //  
            this.finished = false; 
            
            this.pageData.page_no = '1'
            this.net_getData(0,this.pageData)
        },
        //  上拉加载
        loadMore(){
            this.pageData.page_no ++
            this.net_getData(2,this.pageData)
        },
        //  下拉刷新
        onRefresh () {   
            this.pageData.page_no = '1';
            this.finished = false;   
            this.net_getData(1,this.pageData)
        },
        showPopup(){
            this.isDateShow = true;
        },
        net_getData(type,param){
            /** 
             * type 控制初始化，下拉刷新   上拉加载三种状态
             * type : 0   //  初始化， 下拉加载
             * type : 1   //  下拉刷新
             * type : 2   //  上拉加载
            */
            return this.$http.post('/gameRecord/findUserRecord',param).then(res => {
                if( res.code == '200'){       
                    if( type == 0 ){
                        //  初始化数据不够20条时  不显示底部的‘没有更多了’的提示
                        if ( res.data.data.length < this.pageData.page_size ) {
                            this.Listloading = false;
                            this.finished = true;
                            this.finishedText = ''
                        } 
                    }else if( type == 1 ){
                        this.isLoading = false;
                    }else if( type == 2 ){
                        for (const item of res.data.data) {
                            this.details.push(item)
                        }
                        this.Listloading = false;
                        if( res.data.data.length < this.pageData.page_size ){
                            this.finished = true;   //  控制没有更多数据了的状态
                        }
                        return
                    }
                    this.details = res.data.data;
                }else{
                    this.$toast(res.msg)
                }
            })
        },
        goBack(){
            this.$router.go(-1)
        }
    },
    components: {
        Popup,NoData
    }
}
</script>

<style scoped lang="less">
.tzDetail{
    overflow: hidden;
    .headBox{
        height: 44px;
        padding: 0 12px;
        .back{
            width: 18px;
            height: 18px;
            margin-top: 13px;
            background:url("../../img/btn_back.png") no-repeat;
            background-size: cover;
        }
        .title{
            font-family: PingFangHK-Medium;
            font-size: 18px;
        }
        .date{
            width:28px;
            height:28px;
            background:url('../../img/date.png') no-repeat;
            background-size:cover;
        }
    }
    >.title{
        position: fixed;
        top: 44px;
        left: 0;
        right: 0;
        z-index: 899;
        height: 60px;
        color: #6c6c6c;
        line-height: 30px;
        text-align: left;        
        
        background:rgba(32,32,32,1);
        box-shadow:0px 4px 8px 0px rgba(0, 0, 0, 0.6);
        .bg{
            height: 30px;
            background: url("../../../../assets/img/app-bg.jpg") no-repeat top;
            background-size: cover
        }
        .flexBox{
            padding: 0 12px;
            border-top: 1px solid #0f0f0f;
            .tz, .profit{
                text-indent: 20px;
            }
        }
        
    }
    .main{
        padding-top: 64px;
        background-color: #262626;
        
        .itemWrap{
            .listItem{
                color: #fff;
                font-size: 14px;
                padding: 20px 12px;
                border-bottom: 1px solid #0F0F0F;
                .left{
                    align-items: center;
                    .datebox{
                        text-align: left;
                        font-size: 12px;
                    }
                }
                
                .right{
                    align-items: center;
                    .status{
                        text-indent: 20px;
                    }
                    .money{
                        text-indent: 20px;
                    }
                }
            }
        }
        .loading-slot{
            .loading-img{
                height: 34px;
                width: 34px;
                margin-top: 6px;
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
