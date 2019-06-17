/*
 * @Author: 季芳莉 
 * @Date: 2019-06-04 20:17:30 
 * @Last Modified by: 季芳莉
 * @Last Modified time: 2019-06-05 12:29:00
 */

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    try {
        return JSON.parse(window.sessionStorage.getItem(name));
    } catch (error) {
        return window.sessionStorage.getItem(name);
    }

}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.sessionStorage.removeItem(name);
}