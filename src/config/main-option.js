export default {
    vLazyOption: {
        // loading: require('@/assets/img/loading.png')
    },
    loadingIcon: require('@/assets/img/loading.png'),
    baseUrl: process.env.NODE_ENV == 'production' ? "/prod/api" : "/api"
}