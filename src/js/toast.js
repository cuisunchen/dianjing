import { Toast } from 'vant'
import 'vant/lib/index.css'

export function toast( params ){
    let toastObj = {}
    let message,duration;
    if( typeof params == 'string' ){
        message = params;
        duration = 1500;
        toastObj = {
            message,duration
        }
    }else
    if( typeof params == 'object' ){
        toastObj = params
    }
    Toast(toastObj)
}