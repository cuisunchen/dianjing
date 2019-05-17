import Vue from 'vue';
import axios from 'axios';
import options from './../config/main-option.js'
import QS from 'qs';
import store from './../store.js';
import $api  from "./api.js"
import router from './../router'
import { toast } from'./toast.js'
// const $toast = Vue.prototype.$toast || window.alert;
const $toast = toast || window.alert;
/* 如果需要将对象序列化为URL形式的参数，可使用下面qs库 */
// import QS from 'qs';
// 默认超时设置
axios.defaults.timeout = 50000;
/* eslint-disable */
// 相对路径设置
axios.defaults.baseURL = options.baseUrl;
//http request 拦截器
axios.interceptors.request.use(
  config => {
    if(config.showLoading == true){
      store.commit('SET_SHOW_LOADING', true);
    }
    // 获取token
    // const user_token = store.getters.user_token;
    let user_token = store.getters.user_token;
    let aesKey = user_token.substring(user_token.length-16) || "";
    if (user_token) {
      config.headers.common['Authorization'] = "Bearer_" + user_token;
    }
    // 这里设置全局的参数格式，所有类型的请求都会走这个配置
    // 先对请求单独配置做判断，如果没有单独配置，就采用统一配置
    if(!config.headers['Content-Type']){
      config.headers = {
        'Content-Type':'application/json',
      };
    }else if(config.headers['Content-Type'] == "application/x-www-form-urlencoded"){
      if(config.data && Object.keys(config.data).length>0){
        if(aesKey){
          config.data = QS.stringify({params:$api.Encry(JSON.stringify(config.data), aesKey, aesKey)});
        }else{
          config.data = QS.stringify({params:$api.Encry(JSON.stringify(config.data))});
        }
      }else{
        config.data = null;
      }
    }
    // 鉴权参数设置
    if(config.method === 'get'){
       //get请求下 参数在params中，其他请求在data中
      config.params = config.params || {};
      //一些参数处理
    }else{
      // config.data = config.data || {};
      //一些参数处理
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
//http response 拦截器
axios.interceptors.response.use(
  response => {
    store.commit('SET_SHOW_LOADING', false);
    store.commit('SET_NET_BTNCLICK', true);
    if (response.status === 200) {
      /*这里的code是200成功拿到后台参数之后,后台返回的数据带的code状态码，如果后台没有返回这种code码，忽略此步骤*/
      switch(response.data.code){
        case "9002": case "9003":{
          $toast('登录信息失效,请重新登录');
          $api.clearLocal ();
        }
        break;
        case "1003":{
          $toast('您的账号异常已被冻结，如有疑问请联系客服');
          $api.clearLocal ();
        }
        break;
        case "10086":{
          //您的帐号在其它地方登录，您已被迫下线，如果不是您本人操作，请及时修改密码
          // $toast('您的帐号在其它地方登录，您已被迫下线，如果不是您本人操作，请及时修改密码');
          store.commit('SET_HOME_DIALOG_STATUS', true);
          $api.clearLocal ();
        }
        break;
        case "200":{
        }
        break;
        case "101": case "102": case "103": case "104": case "105":
        case "106": case "107": case "108": case "109": case "110":
        case "111": case "112": case "113": case "114": case "115": case "116":{
          break
        }
        default: $toast(response.data.msg)  
      }      
      return Promise.resolve(response);        
    } else {    
      /*这里的status是网络并没有以200状态成功返回数据，就会进入此分支并根据网络异常状态进行处理，会进入catch逻辑*/   
      return Promise.reject(response);        
    }
  },
  error => {
    store.commit('SET_SHOW_LOADING', false);
    store.commit('SET_NET_BTNCLICK', true);
    if (error.response) {
        /*这里的status是网络并没有以200状态成功返回数据，就会进入此分支并根据网络异常状态进行处理，会进入catch逻辑*/
        switch(error.response.status){
            case 404:{
              $toast("请求路径错误!")
            }
            break;
            case 500:{
              $toast("服务器开了小差！");
            }
            break;
        }
    } else {
        // 处理断网的情况
        $toast("网络连接错误！")
    }
    return Promise.reject(error);
  }
);
/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */

const $http = {
  //axios.get（url [,config]）
  get(url, params){
    return new Promise((resolve, reject) =>{        
      axios.get(url, { params })        
      .then(res => {            
          resolve(res.data);        
      })        
      .catch(err => {
          //如果有catch的话需要放开此命令
          // reject(err);
      })    
    });
  },
      
  /**
   * 封装post请求
   * @param url
   * @param params
   * @returns {Promise}
   */
      
post(url, params, postConfig){
    //这里单独针对post请求进行配置，可以定义header和transformRequest等配置
    //x-www-form-urlencoded
    let dafaultConfig = {
      headers : {
        'Content-Type':'application/x-www-form-urlencoded',
      }
    }
    let config;
    if(Object.prototype.toString.call(postConfig) === '[object Object]'){
      config = Object.assign(dafaultConfig, postConfig);
    }else{
      config = dafaultConfig;
    }
    return new Promise((resolve, reject) => {         
      axios.post(url, params, config)        
      .then(res => {            
        resolve(res.data);        
      })        
      .catch(err => {  
        // 如果有catch的话需要放开此命令
        reject(err);    
      })    
    });
  },
      
  /**
   * 封装patch请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  patch(url, params){
    return new Promise((resolve, reject) => {         
      axios.patch(url, { params })        
      .then(res => {            
          resolve(res.data);        
      })        
      .catch(err => {            
          reject(err);        
      })    
    });
  },  
      
  /**
   * 封装put请求
   * @param url
   * @param params
   * @returns {Promise}
   */
      
  put(url, params){
    return new Promise((resolve, reject) => {         
      axios.put(url, { params })        
      .then(res => {            
          resolve(res.data);        
      })        
      .catch(err => {            
          reject(err);       
      })    
    });
  },
  /**
   * 封装delete请求
   * @param url
   * @param params
   * @returns {Promise}
   */
  delete(url, params){
    return new Promise((resolve, reject) =>{        
      axios.delete(url, { params })        
      .then(res => {            
          resolve(res.data);        
      })        
      .catch(err => {            
          reject(err);        
      })    
    });
  }
}
export default $http