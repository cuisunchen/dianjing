
    import $api from "./../js/api.js"
    import $http from "./../js/http"
    import $interfaces  from "./../config/url.js"

    export default { 
        asynSetAccount ({commit, state})  {
            $api.getUserInfo();
        },
        getMoneyStatus ({commit, state}) {
            $http.post($interfaces.freeGetMoneyStatus).then((res) => {
                if(res.code == "200"){
                    let status = {
                        freeGetMoney: 0
                    }
                    status.freeGetMoney = res.data.status;
                    commit('SET_USER_STATUS', status);
                }
            });
        }
    }