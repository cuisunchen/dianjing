import jcHome from '../views/jc/childPage/jcHome.vue'
import cunkuan from '../views/jc/childPage/cunkuan.vue'
import qukuan from '../views/jc/childPage/qukuan.vue'
import newerJC from '../views/jc/childPage/newerJC.vue'
import jszc from '../views/jc/childPage/jszc.vue'
import wfjc from '../views/jc/childPage/wfjc.vue'
import concat from '../views/jc/childPage/concat.vue'
import about from '../views/jc/childPage/about.vue'

export const jc_router = [
    {
        path: '/',
        name: 'jcHome',
        component: jcHome,
        meta: {
          footShow:true,
          title:"教程",
          backShow:false
        }
      },
      {
        path: '/jc/ck',
        name: 'cunkuan',
        component: cunkuan, 
        meta: {
          footShow:false,
          title:"存款教程",
          backShow:true,
          headShow:false
        }
      },
      {
        path: '/jc/qk',
        name: 'qukuan',
        component: qukuan,
        meta: {
          footShow:false,
          title:"取款教程",
          backShow:true
        }
      },
      {
        path: '/jc/njc',
        name: 'newerJC',
        component: newerJC,
        meta: {
          footShow:false,
          title:"新手教程",
          backShow:true,
          headShow:false
        }
      },
      {
        path: '/jc/jszc',
        name: 'jszc',
        component: jszc,
        meta: {
          footShow:false,
          title:"技术支持",
          backShow:true,          
        }
      },
      {
        path: '/jc/wfjc',
        name: 'wfjc',
        component: wfjc,
        meta: {
          footShow:false,
          title:"玩法教程",
          backShow:true,
          headShow:false
        }
      },
      {
        path: '/jc/concat',
        name: 'concat',
        component: concat,
        meta: {
          footShow:false,
          title:"联系我们",
          backShow:true
        }
      },
      {
        path: '/jc/about',
        name: 'about',
        component: about,
        meta: {
          footShow:false,
          title:"关于YG电竞",
          backShow:true
        }
      },
]