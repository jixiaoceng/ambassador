/*
 * @Author: 季芳莉 
 * @Date: 2019-06-04 20:17:04 
 * @Last Modified by: 季芳莉
 * @Last Modified time: 2019-06-12 23:51:33
 */


import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import HandleToken from '@/utils/auth'
const handleToken = new HandleToken()

/**
 * 处理请求头数据和处理结果
 */
class HandleParamAndResult {
    constructor () {
        // 域名
        // this.api = 'https://www.dev.pplingo.com'
        // this.api = 'http://0.0.0.0:8888'
        // this.api = 'https://member.stage.pplingo.com'
        this.api = 'https://member.lingoace.com'
    }

      // 添加请求头
    _addHeaders () {
        // 自定义headers
        const headers = {
            'Content-Type': 'application/json'
        }
        //动态添加token
        if (handleToken.getToken()) {
            headers.Authorization = `Token ${handleToken.getToken()}`
            // headers.Authorization = 'Token 489d524a54989746082b2e1d12cc9318650f37e6'
        }
        return headers
    }
    _addHeadersPost () {
        // 自定义headers Post请求
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        //动态添加token
        if (handleToken.getToken()) {
            headers.Authorization = `Token ${handleToken.getToken()}`
            // headers.Authorization = 'Token 489d524a54989746082b2e1d12cc9318650f37e6'
        }
        return headers
    }

    // 处理请求
    dealAxios (url, options) {
        const _this = this
        if(options.method == 'post' || options.type == 'formData' || options.method == 'put'){
            options.headers = this._addHeadersPost()
        }else{
            options.headers = this._addHeaders()
        }
        
        // do something before request
        return new Promise((resolve, reject) => {
            axios(_this.api + url, options).then(res => {
                // do something after success
                resolve(res)
            }).catch(error => {
                if(error.response.status == 401) {
                    handleToken.removeToken()
                    router.push({ path: '/login' })
                    return
                }
                reject(error)
            })
        })
    }
}
/**
 * 封装请求方法
 * @param { Number | String } 平台传递的版本号
 */
class RequestMethod {
    constructor () {
        this.$get = this.$get.bind(this)
        this.$post = this.$post.bind(this)
        this.$put = this.$put.bind(this)
        this.$delete = this.$delete.bind(this)
        this.$upload = this.$upload.bind(this)
        this._method = this._method.bind(this)
    }

    /**
     * 整合请求方法
     * @param { String } url 接口路由
     * @param { Object } axios配置 请求参数
     */
    _method (url, options) {
        return new HandleParamAndResult().dealAxios(url, options)
    }

    /**
     * get方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
    $get (url, data) {
        return this._method(url, {
            params: data,
            method: 'get'
        })
    }

    /**
     * post方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
    $post (url, data) {
        return this._method(url, {
            data: qs.stringify(data),
            method: 'post',
            type:'formData'
        })
    }

    /**
     * put方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
    $put (url, data) {
        return this._method(url, {
            data: qs.stringify(data),
            method: 'put',
            type: 'formData'
        })
    }

    /**
     * delete方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
    $delete (url, data) {
        return this._method(url, {
            params: data,
            method: 'delete'
        })
    }

    /**
     * 上传方法
     * @param { String } url 接口路由
     * @param { Object } data 请求参数
     */
    $upload (url, data) {
        return this._method(url, {
            body: data,
            method: 'post',
            type: 'formData'
        })
    }
}
export default RequestMethod