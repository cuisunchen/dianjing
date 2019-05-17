<template>
    <div class="balance-wrapper">
        <div class="head-container">
            <eg-header>
                <div class="icon-back" @click="$router.go(-1)" slot="left"></div>
                <div class="large-white-txt" slot="title">提现记录</div>
            </eg-header>
        </div>
        <div class="main-container" v-if="records.length > 0">
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text=" " loosing-text=" ">
                
                <gunBar class="listsWrap">
                    <van-list v-model="Listloading" :finished="finished" :finished-text="finishedText" @load="loadMore">
                        <div class="item display-flex justify-between" v-for="(item,index) in records" :key="index">
                            <div class="left">
                                <p v-if="item.timeCreated">{{item.timeCreated.split(' ')[0]}}</p>
                                <p v-if="item.timeCreated">{{item.timeCreated.split(' ')[1]}}</p>
                            </div>
                            <div class="right">
                                <p class="money">{{item.changeCoin}}</p>
                                <p class="status" v-if="item.flag == '1'" style="color:#00e698">提现成功</p>
                                <p class="status" v-else-if="item.flag == '3'" style="color:#A076FF">审核中...</p>
                                <p class="status" v-else-if="item.flag == '2'" style="color:#e60012">提现失败</p>
                            </div>
                        </div>
                    </van-list>  
                </gunBar>                    
                              

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
            <!-- <div class="input-item">
                <input-box :status="inputStatus" >
                    <input  v-model="keyboardVal" disabled  @touchstart="onTouchStart" @blur="onBlurFun"  @focus="onFocusFun" class="eg-input" slot="input"/>
                </input-box>
            </div>
            <div class="input-item">
                <input-box :status="inputStatus" >
                    <input  v-model="keyboardVal"   @blur="onBlurFun"  @focus="onFocusFun" class="eg-input" slot="input"/>
                </input-box>
                <div v-if="this.inputStatus=='danger'">两次输入不一致</div>
            </div> -->
        </div>
        <!-- 无数据 -->
        <no-data v-else></no-data>
        <!-- <div class="keyboard-box">
            <van-number-keyboard
            :show="keyBoardShow"
            extra-key="."
            close-button-text="完成"
            @close = "closeKeyBoard"
            @input="onKeyInput"
            @delete="onKeyDelete"
            />
        </div> -->
    </div>
</template>
<script>
import gunBar from "../../../../components/gunBar/gunBarBox"
import NoData from "../../../../components/noData/noData"
export default {
    data () {
        return {
            inputStatus: '',
            keyboardVal: '',
            keyBoardShow: false,
            records:[],
            isLoading: false,        //  下拉刷新loadding
            Listloading:true,       //  上拉加载loadding
            finished: false,
            finishedText:'没有更多了',
            param: {
                "page_no": "1",
                "page_size": "20",
                "date_type": "5"
            },
        }
    },
    created(){
        this.net_getRecords(0);
    },
    methods: {
        onRefresh(){
            this.param = {
                "page_no": "1",
                "page_size": "20",
                "date_type": "5"
            }
            this.net_getRecords(1,this.param)
        },
        loadMore(){
            this.param.page_no ++
            this.net_getRecords(2,this.param)
        },
        net_getRecords(type,param=this.param){
            return this.$http.post('/withdrawCash/list',param).then( res => {
                this.handle_records(type,res)
            })
        },
        handle_records(type,res){
            if( type == 0 ){
                this.Listloading = false;
                this.records =  res.data
            }else if( type == 1 ){
                this.isLoading = false;
                this.finished = false;
            }else if(type == 2){
                for (let item of res.data) {
                    this.records.push(item);
                }
                if (res.data.length < this.param.page_size) {
                    this.Listloading = false;
                    this.finished = true;
                }
            }
        },


        onTouchStart () {
            this.keyBoardShow = true;
        },
        onFocusFun () {
            // document.activeElement.blur();
        },
        onBlurFun () {
            // this.keyBoardShow = false;
            if(this.keyboardVal.length<6){
                this.inputStatus="danger"
            }else{
                this.inputStatus="active"
            }
        },
        onKeyInput (value) {
            this.keyboardVal += value;
        },
        onKeyDelete (value) {
            
            this.keyboardVal = parseInt(this.keyboardVal) - value;
        },
        closeKeyBoard () {
            this.keyBoardShow=false;
            this.inputStatus="active"
        }
        
    },
    components:{
        gunBar,NoData
    }
}
</script>

<style lang="less" scoped>
.balance-wrapper{
    .head-container{
        height: 80px;
    }
    .main-container{
        padding: 0 12px;
        .input-item{
            width: 200px;
            height: 40px;
        }
        .listsWrap{
            // padding: 12px 0 0;
            background-color: #262626;
            .item{
                padding: 14px 25px;
                border-bottom: 1px solid #0F0F0F;
                >div{
                    p{
                        line-height: 18px;
                    }
                }
                .left{
                    color: #fff;
                }
                .right{
                    color: #FFD200;
                    text-align: right;
                    .money{
                        font-size: 16px;
                    }
                }
            }
        }
        
    }
}
</style>
