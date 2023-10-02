import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from 'src/utils/firebaseconf'

function checkAuthentication(to, from, next) {
  
  const user = auth.currentUser
  if (!user) {
    if (to.path !== '/') {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
}

export default route(function() {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  const auth = getAuth()
  onAuthStateChanged(auth, () => {
    Router.beforeEach(checkAuthentication)
  })

  return Router
})
