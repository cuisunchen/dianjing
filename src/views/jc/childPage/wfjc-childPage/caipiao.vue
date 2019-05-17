<template>
    <div class="caipiao">
        <div class="item">
            <div class="title display-flex midum-white-txt align-center">
                <em class="dot"></em>
                <span class="gradient-text">什么是快乐彩?</span>
            </div>               
            <p><em>快乐彩传统玩法是玩家从号码01到80任意选择1到10个不等的号码,快乐彩系统会从80个号码中随机抽出20个开奖号码。然后玩家挑选的数字与系统官方开奖结果号码比对是否获奖。</em></p>         
        </div>

        <div class="item hastitle">
            <div class="title display-flex midum-white-txt align-center"><em class="dot"></em><span class="gradient-text">快乐彩有哪些常见的投注类型?</span></div>
            <p><span>1.大小/总数810: </span><em>开奖结果20个号码总和大于810的数值(大), 开奖结果20个号码总和小于810的数值(小) 或等于810 (总和810)。</em></p>
            <p><span>2.单双: </span><em>开奖结果20个号码总和的最后一个数字是奇数还是偶数</em></p>
            <p><span>3.奇,偶,和: </span>
                <em>开奖结果20个号码中, 如果有超过10个单数则为奇数, 投注奇为赢; 如果开奖结果20个号码中, 有超过10个双数则为偶数, 投注偶为赢。
                    如果开奖结果的20个号码中, 刚好有10个单数及10个偶数, 投注和为赢。</em></p>
            <p><span>4.大小和单双连串: </span><em>例如, 大/单是指开奖结果20个号码的总额大于810同时总和的最后一个数字是单数. 其他组合您可以投注大/双、小/单、小/双。</em></p>        
            <p><span>5.上,下,和: </span><em>开奖结果的20个号码,其中有超过10个数字范围落在01到40(上) 或41到80(下), 刚好有10个数字范围落在01到40以及10个数字范围落在41到80(和)。</em></p>        
            <p><span>6.五行: </span><em>预测开奖结果20个号码的总和范围在指定的范围名称。一共有5个不同的范围名称可以投注: 210-695 (金), 696-763 (木),764-855 (水), 856-923 (火) 和 924-1410 (土)。</em></p>        
            <p><span>7.珠仔: </span><em>玩家可以从01到80个号码中选择1到5个号码. 快乐彩官方系统会从01到80个号码中开出20个号码. 派彩方式是按照玩家选择的号码跟开奖结果符合个数计算, 号码顺序排列并无限制。</em></p>        
        </div>

        <div class="item">
            <div class="title display-flex midum-white-txt align-center">
                <em class="dot"></em>
                <span class="gradient-text">六合彩的开奖时间?</span>
            </div>               
            <p><em>六合彩的开奖时间为：</em><span>每周2，周4，周6，21:30进行开奖。</span></p>         
        </div>
    </div>
</template>

<style scoped lang="less">
.caipiao{
    .item{
        padding: 10px;
        margin-bottom: 14px;
        background-color: rgba(38,38,38,1);
        box-shadow:0px 0px 8px 10px rgba(0, 0, 0, 0.45);
        .title{
            margin-bottom: 10px;
        }
        p{
            span{
                color: #fff;
            }
            em{
                color: #6C6C6C
            }
        }
        &.hastitle{
            p{
                margin-top: 10px;
            }
        }
    }
}
</style>
