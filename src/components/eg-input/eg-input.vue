<template>
    <div class="input-box" 
        :class="{ 
          'input-box-danger': status=='danger',
          'input-box-active': status=='active',
          'input-box-before': leftIcon
        }">
        <div class="left-icon-content icon-content">
          <slot name="leftIcon"></slot>
        </div>
        <input 
            ref="egInput"
            class="eg-input" 
            :class="{focus: focusClass}"
            :type="$attrs.type || 'text'"
            :value="value" 
            :placeholder="placeholder"
            @input="onInput"
            @blur="onBlurFun"
            @focus="onFocusFun"
            :readonly="$attrs.readonly"
            :maxlength='$attrs.maxlength'
            :style="styleObj"
        />
        <div class="right-icon-content ">
          <slot name='errMsg'></slot>
          <slot name="rightIcon"></slot>
        </div>
    </div>
</template>


<script>
import { StringDecoder } from 'string_decoder';
export default {
    data() {
       return {
           inputVal:'',
           focusClass: false
       }
    },
    computed: {
    },
    props: {
      placeholder:{
        default:'请输入',
        type:String
      },
      value:{
        default:'',
        type:String
      },
      status: {
        type: String,
        default: ""
      },
      valueType:{
        type: String,
        default: ""
      },
      styleObj:{
        type: Object,
        default: () => {
          return {}
        }
      },
      leftIcon:{
        type: Boolean,
        default: false
      },
      defaultFocus:{
        type: Boolean,
        default: false
      }
    },
    // watch:{
    //   defaultFocus:{
    //     handler(nval,oval){
    //       this.$nextTick( ()=>{
    //         if( nval ){
    //           this.$refs.egInput.focus()
    //         }
    //       })
    //     },
    //     deep:true
    //   }
    // },
    // created () {
    //   this.$nextTick( ()=>{
    //     if( this.defaultFocus ){
    //       this.$refs.egInput.focus()
    //     }
    //   })
    // },
    methods: {
        onInput(e){
            if(this.valueType=="lowLetterNum"){
              e.target.value = e.target.value.replace(/[^a-z0-9]/g,'');
            }else if(this.valueType=="num"){
              e.target.value = e.target.value.replace(/\D/g,'');  
            }else if(this.valueType=="letterNum"){
              e.target.value = e.target.value.replace(/[^\w_]/g,'');
            }
            this.inputVal = e.target.value ;  
            if(this.inputVal){
              this.focusClass = false;
            }else{
              this.focusClass = true;
            }          
            this.$emit('input', e.target.value);
        },
        onBlurFun () {
          this.focusClass = false;
          this.$emit('onBlur');
        },
        onFocusFun () {
          if(!this.inputVal){
            this.focusClass = true;
          }
          this.$emit('onFocus');
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
.icon-content{
  width: 20px;
  height: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
}
.left-icon-content{
  position:absolute;
  left: 18px;
}
.focus{
  color: #202020;
}
.right-icon-content{
  position:absolute;
  top: 0;
  right: 12px;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>

