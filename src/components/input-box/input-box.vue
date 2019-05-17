<template>
    <div class="input-box " 
        :class="{'input-box-danger': status=='danger','input-box-active': status=='active'}">
        <slot></slot>
        <slot name="button"></slot>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    props:{
        status: {
            type: String,
            default: "normal"
        }
    }
}
</script>
<style lang="less" scoped>
    .input-box{
        height: 40px;
    }
</style>
