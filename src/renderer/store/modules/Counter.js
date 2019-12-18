import { setLocalStorageItem, getLocalStorageItem } from '../../utils';

export default {
  state: {
    iconfont: getLocalStorageItem('iconfont') || {},
    bilibili: getLocalStorageItem('bilibili') || {}
  },
  mutations: {
    SET_ICONFONT(state, data) {
      state.iconfont = data;
      setLocalStorageItem('iconfont', data);
    },
    SET_BILIBILI(state) {
      state.bilibili = data;
      setLocalStorageItem('bilibili', data);
    },
  },
  actions: {
    setIconfont({ commit, state }, data) {
      commit('SET_ICONFONT', data);
    },
    setBilibili({ commit, state }) {
      commit('SET_BILIBILI', data);
    },
  },
  getters: {
    iconfont: state => state.iconfont,
    bilibili: state => state.bilibili,
  }
}
