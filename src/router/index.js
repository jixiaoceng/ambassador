/*
 * @Author: 季芳莉 
 * @Date: 2019-06-04 20:56:49 
 * @Last Modified by: 季芳莉
 * @Last Modified time: 2019-06-10 10:55:47
 */

import Vue from 'vue'
import Router from 'vue-router'
import baseRouterMap from './base/'
import baseRouterMapMobile from './baseMobile/'
Vue.use(Router);


// 屏幕自适应后期优化
function _isMobile () {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
	var flag = isPhone ||  isAndroid
    return flag;
}
var router = new Router({
    //router采用history的模式
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: _isMobile()? baseRouterMapMobile : baseRouterMap
})



export default router;