import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth_status: '',
    user: {},
    roles: {},
    snackbar: {
      visible: false,
      timeout: 6000,
      text: ''
    }
  },
  mutations: {
    auth_request(state) {
      state.auth_status = 'loading'
    },
    auth_success(state, {user, roles}) {
      state.auth_status = 'authenticated'
      state.user = user
      state.roles = roles
    },
    auth_error(state) {
      state.auth_status = 'error'
      state.token = ''
      state.user = {}
      state.roles = {}
    },
    logout(state) {
      state.auth_status = ''
      state.token = ''
      state.user = {}
      state.roles = {}
    },
    setCurrentEvent(state, {name, location, fee, image_url, desc, body, registration_link, date}){
      state.current_event = {
        name,
        location,
        fee,
        image_url,
        desc,
        body,
        registration_link,
        date
      }
    },
    showSnackbar(state, info){
      state.snackbar.text = info.text || ""
      state.snackbar.timeout = info.timeout || 6000
      state.snackbar.color = info.color || 'default'
      state.snackbar.visible = true
    },
    closeSnackbar(state){
      state.snackbar.visible = false
    }

  },
  actions: {
    login({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: '/api/login', data: user, method: 'POST'})
          .then((resp) => {
            if(!resp.data.member.member_no){
              // Wrong login
              reject(401)
            }
            const user = resp.data.member
            const roles = resp.data.roles

            commit('auth_success', {user, roles})

            resolve(resp.data)
          })
          .catch((err) => {
            commit('auth_error')
            axios({url: "/logout", method: 'POST', data: true})
            reject(err.response)
          })
      })
    },
    logout({commit}) {
      return new Promise((resolve) => {
        commit('logout')
        axios({url: "/logout", method: 'POST', data: true})
        resolve()
      })
    },
    gotoEvent({commit}, event) {
      return new Promise((resolve) => {
        commit('setCurrentEvent', event)
        resolve()
      })
    },
    showSnackbar({commit}, info){
      commit('showSnackbar', info)
    },
    closeSnackbar({commit}) {
      commit('closeSnackbar')
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.auth_status,
    roles: state => {
      let result = []
      for (const level in state.roles) {
        if (state.roles.hasOwnProperty(level)) {
          const roles_on_level = state.roles[level];
          if(Object.keys(roles_on_level).length){
            result.push({
              level,
              roles: roles_on_level
            })
          }
          
        }
      }
      return result
    },
    user: state => state.user,
    user_memberships: state => {
      let result = []
      for (const body in state.user.memberships) {
        if (state.user.memberships.hasOwnProperty(body)) {
          let groups = state.user.memberships[body]
          for (const group in groups) {
            if (groups.hasOwnProperty(group)) {
              const element = groups[group];
              result.push(element.group)
            }
          }
        }
      }
      return result
    },
    user_role_ids: state => {
      let result = []
      for (const level in state.roles) {
        if (state.roles.hasOwnProperty(level)) {
          const roles_on_level = state.roles[level];
          if(Object.keys(roles_on_level).length){
            for(const body_id in roles_on_level){
              let hurra = Object.assign({}, roles_on_level[body_id])
              for( const roleid in hurra) {
                result.push({body_id, roleid})
              }
            }
          }
          
        }
      }
      return result
    },
    current_event: state => state.current_event
  },
  plugins: [createPersistedState()]
})
