import HandleToken from '@/utils/auth'
import { setStorage, getStorage } from '@/utils/handleStorage'
const handleToken = new HandleToken()

const user = {
  state: {
    token: '',
    userInfo: getStorage('userInfo') || {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      handleToken.setToken(token)
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo
        setStorage('userInfo',JSON.stringify(userInfo) )
    }
  },

  actions: {
    // 前端 退出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        handleToken.removeToken()
        resolve()
      })
    }
  }
}

export default user
