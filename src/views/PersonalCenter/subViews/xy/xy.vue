<template>
   <div class="xy">
       <div class="headBox">
            <eg-header>
                <div class="back" slot="left" @click="goBack"></div>
                <div class="title" slot="title">用户协议</div>
            </eg-header>
        </div>
        <div class="main">
            <h5>协议标题文字</h5>
            <div class="content">
                <p>
                    立即开通本公司游戏账户，享受最优惠的各项红利！
                    本公司只接受年龄已满18岁的客户申请，同时我们保留客户提供其年龄证明的权利。
                    在公司进行注册时所提供的全部信息必须准确无误，在使用借记卡或信用卡时，持卡人的姓名必须与在网站上注册时的一致。
                    在开户后进行一次有效存款，即成为本公司永久有效会员！
                    成为本站有效会员后，客户可随时通过电邮、联系在线客服、或在本公司站点上留言、联系客服等方式，随时向本公司提供最新的个人资料。
                    本公司如发现个别会员有重复申请账号行为时，本公司有权将这些账户视为一个联合账户。本公司保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利。本公司系统严格要求玩家、住址、电邮、电话号码、支付卡/信用卡均为唯一性，任何共享计算机环境 (例如:网吧、其他公共用计算机等)只能够拥有一个会员账号，各项优惠只适用于每位客户在本公司站点唯一的账户。
                    本公司是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在本公司注册、投注，均为会员个人行为，本公司不负责、承担任何相关联带责任。
                    无论是个人或是团体，如有任何威胁、滥用本公司优惠的行为，本公司将保留权利取消、收回由优惠产生的红利，并保留权利追讨最高50%手续费。
                    所有本公司游戏娱乐站点的优惠是特别为玩家而设，在玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，本公司保留权利要求客户向我们提供充足有效的文件， 并以各种方式辨别客户是否符合资格享有我们的任何优惠。
                    客户一经注册开户，将被视为接受所有颁布在本以公司互联网投注网站上的规则与条例。
                    本公司是使用东方集团所提供的在线娱乐软件，如发现个别会员在同系统的多个娱乐城上开设多个会员账户，并进行套利下注,经核实后,本公司将冻结参与的会员账号并将所有下注盈利取消！
                </p>
            </div>
        </div>
   </div>
</template>

<script>
export default {
    methods: {
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped lang="less">
.xy{
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
    }
    .main{
        color: #fff;
        padding: 0 12px;
        font-size: 14px;
        line-height: 18px;
        h5{
            font-size: 26px;
            font-family:PingFang-SC-Heavy;
            font-weight:800;
            line-height: 26px;
            margin: 34px 0 22px;
        }
        .content{
            p{
                text-indent: 30px;
            }
        }
    }
}

</style>
