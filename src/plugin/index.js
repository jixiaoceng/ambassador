import * as lingoAceUI from '../lingoAceUI'
import * as filters from '@/filters'

const Plugin = {}
Plugin.install = Vue => {
    // 遍历注入所有的lingoAceUI
    Object.keys(lingoAceUI).forEach(key => {
        Vue.component(key, lingoAceUI[key])
    })
    // 遍历注入所有的filter
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
}


export default Plugin
