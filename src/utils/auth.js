/*
 * @Author: 季芳莉 
 * @Date: 2019-06-04 20:17:13 
 * @Last Modified by:   季芳莉 
 * @Last Modified time: 2019-06-04 20:17:13 
 */

export default class HandleToken {
  constructor (token) {
    this.TokenKey = 'Partner-Token'
    this.storage = window.localStorage
  }

  getToken () {
    return this.storage.getItem(this.TokenKey)
  }

  setToken (token) {
    return this.storage.setItem(this.TokenKey, token)
  }

  removeToken () {
    return this.storage.removeItem(this.TokenKey)
  }
}
