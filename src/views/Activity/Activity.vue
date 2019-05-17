<template>
    <div class="activity">
        <div class="header-container">
          <eg-header>
            <div class="header-slot" slot="title">活动</div>
            <a href="https://e19.entrychat.com/chat/chatClient/chatbox.jsp?companyID=1146765&configID=2564&jid=6346431126&s=1" class="service" slot="right"></a>
            <div class="tabBar" slot="tab">
              <tabs v-model="active" animated swipeable background='transparent' :line-height="lineHeight">
                <tab>                  
                  <div class="imgBox" slot="title" @click="tabChange(0)">
                    <p class="tit">全部</p>
                    <img src="./img/total.png" alt="" srcset="">
                  </div>                  
                </tab>
                <tab v-for="(item,index) in tabs" :key="index">                  
                  <div class="imgBox" slot="title" @click="tabChange(item)">
                    <p class="tit">{{item.gameTitleCn}}</p>
                    <img :src="item.typeImageUrl" alt="" srcset="">
                  </div>                  
                </tab>
              </tabs>
            </div>
          </eg-header>
        </div>
        <div class="main" ref="main">
          <van-pull-refresh  v-if="lists.length > 0" v-model="isLoading" @refresh="onRefresh" loading-text=" " loosing-text=" ">
            <van-list v-model="Listloading" :finished="finished" :finished-text="finishedText" @load="loadMore">
              <div class="activeItem" ref="item" v-for="(item,index) in lists" :key="index" @click.stop="showDetail(item,index,$event)">
                <div class="imgBox">
                  <div class="boxShadow"></div>
                  <img v-lazy="item.imageUrl">
                  </div>
                <div class="activityInfo">
                  <p class="title">{{item.title}}</p>
                  <p class="time">{{item.createTime}}</p>
                  <transition name="fade" >
                    <div class="infoBox" v-if="openDetailIndex == index">
                      <div class="detailBox">
                        <loadding absolute="true" v-if="imgLoadEnd && openDetailIndex == index"></loadding>
                        <img class="" @load="imgLoad($event)" v-lazy="item.jumpUrl" :data-srcset="item.jumpUrl"/>
                      </div>
                      <div class="btn">
                        <button :class="{'gradient-border-btn': (item.id == 31 && user_status.freeGetMoney == '1')? false : true}" @click.stop="applyIn(item.id)">
                          {{ (item.id == 31 && user_status.freeGetMoney == '1') ?  '已领取':'申请'}}
                        </button>
                      </div>
                    </div>
                  </transition>
                  <div class="bar">
                    <div class="angleBox display-flex">
                      <div class="botAngle" :class="{'on':openDetailIndex == index}"></div>                        
                    </div>
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

          <div class="noData" v-if="isNodata">
            <div class="icon"></div>
            <p>暂无活动</p>
          </div>
          <!-- <loadding absolute="true" v-if="!isNodata"></loadding> -->
        </div>
        <eg-dialog :txtcontent="txtcontent" btnText="知道了" ref="dialog" v-if="dialogShow" @onConfirm="closeDialog"></eg-dialog>
    </div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import loadding from '../../components/loadding/lodding'
import { setTimeout, setInterval } from 'timers';
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: "activity",
  data(){
    return{
      active: 0,
      lineHeight:2,
      tabs:[
        {title:'电竞',imgUrl: require('./img/tab2@3x.png')},
        {title:'体育',imgUrl: require('./img/tab3@3x.png')},
        {title:'棋牌',imgUrl: require('./img/tab4@3x.png')},
        {title:'真人娱乐',imgUrl: require('./img/tab4@3x.png')}
      ],
      isLoading: false,
      Listloading:false,
      finished:false,
      finishedText:'',
      lists:[],
      tableData: [
          {"normal":"0.10%","vip1":"0.15%","vip2":"0.22%","vip3":"0.31%","vip4":'0.40%'},
          {"normal":"0.15%","vip1":"0.15%","vip2":"0.22%","vip3":"0.31%","vip4":'0.40%'},
          {"normal":"0.22%","vip1":"0.15%","vip2":"0.22%","vip3":"0.31%","vip4":'0.40%'},
          {"normal":"0.31%","vip1":"0.15%","vip2":"0.22%","vip3":"0.31%","vip4":'0.40%'},
          {"normal":"0.40%","vip1":"0.15%","vip2":"0.22%","vip3":"0.31%","vip4":'0.40%'}
      ],
      columns: ['Normal','VIP 1','VIP 2','VIP 3','VIP 4'],
      openDetailIndex:'-1',
      canvasWidth:16,
      canvasHeight:12,
      param: {
          "page_no": "1",
          "page_size": "10",
          "hd_type":""
      },
      isNodata:false,    //  显示无数据页面
      pos_id:null,      //  轮播跳过来的活动id
      imgLoadEnd:false,
      imgLoadTime:0,
      handleShow:false,
      txtcontent:"",        //  弹窗提示内容
      dialogShow:false,
      timer:null,
      isiOS: Boolean
    }
  },
  computed: {
    ...mapGetters([
        'user_token',
        'user_status'
    ])
  },
  created(){    
    var u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    this.pos_id = this.$route.query.id;
    this.getTabList()
    this.net_getLists(0,'init')
  },
  mounted(){
    this.$nextTick( ()=>{
      // this.searchSwiperItem(this.lists)
    })
  },
  activated(){
    var u = navigator.userAgent;
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    this.pos_id = this.$route.query.id;
    this.openDetailIndex = '-1';
    if(this.isiOS){
      document.body.scrollTop = 0;
    }else{
      document.documentElement.scrollTop = 0; 
    }
    this.findSwipe(this.lists)
  },
  deactivated(){
    this.openDetailIndex = '-1';
    if(this.isiOS){
      document.body.scrollTop = 0
    }else{
      document.documentElement.scrollTop = 0
    }
  },
  methods:{
    closeDialog(){
      this.dialogShow = false
    },
    imgLoad(e){
      e.preventDefault()
      this.imgLoadTime ++ 
      if(this.imgLoadTime == 2){
        this.imgLoadEnd = false;
        this.imgLoadTime = 0
        return
      }
    },
    searchSwiperItem(data){      
      for (const item in data) {
        if(data[item].id == this.pos_id){
          this.imgLoadEnd = true;
          this.openDetailIndex = item;
          let offsetTop = this.$refs['item'+item][0].offsetTop;
          if(this.isiOS){
            document.body.scrollTop = offsetTop;
          }else{
            document.documentElement.scrollTop = offsetTop; 
          }
          break
        }
      }     
    },
    loadMore(){
      this.param.page_no ++;
      this.net_getLists(2)      
    },
    applyIn(id){
      // this.$router.push({path:'/personalcenter/kefu',query:{url:sessionStorage.getItem('kefu_url')}});
      // return
      if(id == 31 && this.user_status.freeGetMoney == '1'){
        return;
      }
      this.$http.post('/gameActivity/apply/'+id,{}).then( res => {
        if(res.code == 200){
          this.dialogShow = true
          this.txtcontent = '您已申请成功，请耐心等候！'
        }else {
          this.dialogShow = true
          this.txtcontent = res.msg
        }
      })
    },
    tabChange(item){
      this.openDetailIndex = '-1';           // 每次切换tab   关闭列表中已打开的详情
      this.param.page_no = '1'
      if(this.isiOS){
        document.body.scrollTop = 0;
      }else{
        document.documentElement.scrollTop = 0;                       // tab切换后滚动条滚到
      }
      if(item == 0){
        this.param.hd_type = '';
      }else{
        this.param.hd_type = item.id;
      }      
      this.net_getLists(0)
    },
    net_getLists(type,isInit){
      this.$http.get('/gameActivity/list',this.param).then( res=> {
        if(res.code == 200){             
          if( type == 1 ){
            this.$toast('刷新成功');
            this.isLoading = false;
          }else if( type == 2 ){
            for (const item of res.data.data) {
                this.lists.push(item)
            }
            this.Listloading = false;
            if( res.data.data.length < this.param.page_size ){
                this.finished = true;   //  控制没有更多数据了的状态
            }
            return
          }
          if ( res.data.data.length < this.param.page_size ) {
              this.Listloading = false;
              this.finished = true;
              this.finishedText = ''
          } else{
            this.finished = false;
          }
          this.lists = res.data.data;
          this.isNodata = this.lists.length > 0 ? false : true
          if( isInit != undefined ){
            this.$nextTick(()=>{
              this.findSwipe(this.lists)
            })
          }
        }
      })
    },
    findSwipe(data){  
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const item = data[key];
          if(item.id == this.pos_id){
            this.openDetailIndex = key 
            let topVal = this.$refs.item[key].offsetTop
            setTimeout(() => {
                if(this.isiOS){
                  document.body.scrollTop = topVal;
                }else{
                  document.documentElement.scrollTop = topVal;
                }
            }, 300);
            return
          }
        }
      }
    },
    getTabList(){
      this.$http.post('/home/getGameList',{}).then( res => {
        if( res.code == 200 ){
          this.tabs = res.data.tabList
        }
      })
    },
    showDetail(item,i,e){   
      this.imgLoadEnd = true;
      this.imgLoadTime = 0;
      this.handleShow = true;     
      this.openDetailIndex == i ? this.openDetailIndex = '-1' : this.openDetailIndex = i;      
      let currentEl = e.currentTarget   
      setTimeout(() => {
        if(this.isiOS){
          document.body.scrollTop = currentEl.offsetTop
        }else{
          document.documentElement.scrollTop = currentEl.offsetTop
        }
      }, 200);
    },
    onRefresh () {
      this.param.page_no = '1'
      this.openDetailIndex = '-1'; 
      this.net_getLists(1)
    },
    goKefu(){
      this.$router.push({path:'/personalcenter/kefu',query:{url:sessionStorage.getItem('kefu_url')}});
    },
  },
  destroyed(){
    this.openDetailIndex = '-1';
    if(this.isiOS){
      document.body.scrollTop = 0
    }else{
      document.documentElement.scrollTop = 0
    }
  },
  components:{
    Tab, Tabs, loadding
  }
}
</script>

<style lang="less" scoped>
@import '../../style/common.less';
.activity{
  height: 100%;
  display: flex;
  flex-direction: column;
  .header-container{
    height: 108px;    
    .header-slot{
      height: 45px;
      font-family: 'PingFangHK-Regular';
      font-size: 18px;
      color: #FFFFFF;
      letter-spacing: 0;
    }
    .service{
      width: 32px;
      height: 28px;
      margin-top: 6px;
      .bg-image("../../assets/img/service");
      background-size:cover
    }
    .tabBar{
      margin-bottom: 12px;
      .imgBox{
        height: 100%;
        position: relative;   
        background: url('../../assets/img/loading-logo.png') no-repeat center center;
        background-size: 40% 60%;
        img{
          width: 114px;
          height: 40px;
          box-shadow: 0 2px 8px #020202;
        }
        .tit{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          font-family: PingFangHK-Medium;
          font-size: 15px;
          line-height: 40px;
          text-align: center;
          color:#fff;
        }
      }
    }
  }
  .main{
    flex: 1;
    padding: 0 10px;
    height: 100%;
    transition: all 0.2s ease;
    position: relative;
    .activeItem{
      width: 100%;      
      margin-top: 15px;
      background-color: #262626;
      .imgBox{
        width: 100%;
        height: 100%;
        height: 100px;
        background: url('./../../assets/img/loading-logo.png') no-repeat;
        background-size: auto 80%;
        background-position: center;
        position: relative;
        .boxShadow{
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 100%;
          z-index: 9;
          -moz-box-shadow: 0 -6px 14px #020202 inset; /* 老的 Firefox */
          box-shadow: 0 -6px 14px #020202 inset;
        }
        img{
          width: 100%;
          height: 100%;          
        }
        
      }
      .activityInfo{
        min-height: 60px;
        background-color: #262626;
        position: relative;
        >p{
          padding: 0 12px;
        }
        >.title{
          display: inline-block;
          color: #fff;
          font-size: 15px;
          line-height: 24px;
          margin-top: 10px;
        }
        .time{
          font-family: PingFangHK-Medium;
          font-size: 10px;
          color: #6C6C6C;
        }
        .infoBox{          
          padding: 0 12px;
          overflow: hidden;
          .detailBox{
            min-height: 100px;
            background: #fff;
            background: url(/img/loading-logo.7fccf6e6.png) no-repeat center center;
            background-size: 20%;
            position: relative;
            >img{
              width: 100%;
              margin-top: 10px;
            }
          }
          
          >div{
            .title{
              font-family: PingFangHK-Regular;
              font-size: 12px;
              line-height: 30px;
              margin-top: 15px;
              color: #FFFFFF;
            }
          }
          .btn{
            text-align: center;
            padding: 25px 0;
            button{
              color: #6C6C6C;
              background: #202020;
              box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.6);
              width: 130px;
              height: 24px;
              &.gradient-border-btn{
                 border: 1px solid;
                border-image: linear-gradient(to right, #23F8F8, #8A75FF) 10 20;
                box-shadow:0px 4px 8px 0px rgba(47,234,249,0.8);
                color:#ffffff;
              }
            }
          }
        }
        .bar{
          width: 100%;
          height: 14px;
          .bg-image('./img/combined'); 
          background-size: 100%;
          position: relative;
          .angleBox{
            position: absolute;
            right: 0;
            top: 2px;
            width: 50px;
            height: 12px;
            justify-content: center;
            .botAngle{
              position: relative;
              top: -2px;
              width: 16px;
              height: 16px;
              .bg-image('./img/ico_top'); 
              background-size: 100% 100%;
              transform: rotate(180deg);
              transition: all 0.2s ease-in-out;
              &.on{
                transform: rotate(0deg)
              }
            }
          }
        }
        .fade-enter-active, .fade-leave-active {
          transition: all 0.3s ease-in-out;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
          height: 0;
          opacity: 0;
        }
      }
    }
    .noData{
      position: fixed;
      top: 50%;
      margin-top: -65px;
      width: 100%;
      .icon{
        width: 113px;
        height: 108px;
        margin: 0 auto;
        .bg-image("../../assets/img/noData");
        background-size: cover;
      }
      p{
        text-align: center;
        color: #fff;
        position: relative;
        top: -15px;
        font-size: 16px;
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
}

</style>
<style lang="less">
.activity{
  .van-hairline--top-bottom::after{
    border: none;
  }
  .van-tabs__line{
    bottom: 34px;
    border-radius: 0!important;
    background-image: linear-gradient(90deg, #8A75FF 0%, #23F8F8 100%);
  }
  .van-tabs--line{
    .van-tabs__wrap{
      height: 55px;
    }    
  }
  .van-tabs__wrap--scrollable .van-tab{
    flex: 0 0 33.3333%;
    flex-basis: 33.3333%!important;
  }
  .van-tab{
    width: 120px;
    height: 40px;
    >div{
      height: 100%;
    }
  }
}
</style>

