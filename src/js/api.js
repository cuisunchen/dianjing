import store from './../store.js';
import router from './../router'
import Vue from 'vue';
// const $toast = Vue.prototype.$toast || window.alert;
import CryptoJS from 'crypto-js/crypto-js'
import interfaces  from "./../config/url.js"
import { toast } from'./toast.js'
// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse("1234567890123456");
const IV = CryptoJS.enc.Utf8.parse('1234567890123456');

const $toast = toast || window.alert;
export default {
    /*获取用户信息接口，根据返回结果判断用户的token是否失效*/
    getUserInfo (param, successCallback) {
        let newParam = {};
        if(param){
            newParam = Object.assign({}, param);
        }else{
            newParam.transferOut = "0";
        }
        Vue.prototype.$http.post("/user/userInfo", newParam).then(res => {
            store.commit('SET_Query_Third', false);
            if(res.code == "200"){
                store.commit('SET_ACCOUNT', res.data);
                if(successCallback){
                    successCallback();
                }
            }
            else{
                localStorage.removeItem('U_TK');
                store.commit('SET_USER_TOKEN', '');
            }
        }).catch(err => {
            $toast("获取用户信息失败！");
            store.commit('SET_Query_Third', false);
            localStorage.removeItem('U_TK');
            store.commit('SET_USER_TOKEN', '');
        });
    },
    quitAccount () {
        Vue.prototype.$http.post(interfaces.signOut, {}, {showLoading:true}).then(res => {
            if(res.code == "200"){
                this.clearLocal ();
                $toast("成功退出登录！");
            }else{
            }
        }).catch(err => {
        });
    },
    clearLocal () {
        localStorage.removeItem('U_TK');
        store.commit('SET_USER_TOKEN', '');
        store.commit('SET_ACCOUNT', '');
        store.commit('SET_Query_Third', false);
        router.replace('/personalCenter');
    },
    getUserStatus () {
        if(store.getters.user_status.freeGetMoney != '1'){
            store.dispatch("getMoneyStatus");
        }
    },
    /**
     * AES加密 ：字符串 key iv  返回base64 
     */
    Encry(word, keyStr, ivStr) {
        let key = KEY;
        let iv = IV;
        if (keyStr) {
            key = CryptoJS.enc.Utf8.parse(keyStr);
            iv = CryptoJS.enc.Utf8.parse(ivStr);
        }
        let srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
    },
    /**
     * AES 解密 ：字符串 key iv  返回base64 
     *
     */
    Decry(word, keyStr, ivStr) {
        let key  = KEY;
        let iv = IV;
        if (keyStr) {
            key = CryptoJS.enc.Utf8.parse(keyStr);
            iv = CryptoJS.enc.Utf8.parse(ivStr);
        }
        let base64 = CryptoJS.enc.Base64.parse(word);
        let src = CryptoJS.enc.Base64.stringify(base64);
        var decrypt = CryptoJS.AES.decrypt(src, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
}

