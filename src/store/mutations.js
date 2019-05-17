export default {
    SET_USER_TOKEN(state, param) {
        state.user_token = param;
    },
    SET_NET_BTNCLICK(state, param) {
        state.net_btn_click = param;
    },
    SET_FOOTER_STATUS(state, param) {
        state.footer_status = param;
    },
    SET_ACCOUNT(state, param) {
        state.account = param;
    },
    SET_KEFU_URL(state, param) {
        state.kefu_url = param;
    },
    SET_SHOW_LOADING(state, param) {
        state.show_loading = param;
    },
    SET_MJB(state, param) {
        state.ismjb = param;
    },
    SET_ISREG(state, param) {
        state.isReg = param;
    },
    SET_Query_Third(state, param) {
        state.queryThird = param;
    },
    SET_PLATFORM_FLAG(state, param) {
        state.platformFlag = param;
    },
    SET_USER_STATUS(state, param) {
        state.user_status = param;
    },
    SET_HOME_DIALOG_STATUS(state, param) {
        state.isDialogShow = param;
    }
}