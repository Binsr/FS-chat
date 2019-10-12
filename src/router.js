import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import api from './api';

import chatPage from './components/chatPage.vue';
import firstPage from './components/firstPage.vue';
import popup from './components/popup.vue'

Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: firstPage,
      name: 'firstPage',
      beforeEnter(to, from, next) {
        // var type = localStorage.getItem('whodat');
        // if (type !== null)
        //   switch (Number(type)) {
        //     case 0:
        //       next('/user');
        //       break;
        //     case 1:
        //       next('/taxi');
        //       break;
        //   }
        // else 
            next();
      }
    },
    {
      path: '/popup',
      component: popup,
      name: 'popup',
    },
    { //===================================user router begin==========================================
      path: '/chatpage',
      component: chatPage,
      name: 'chatPage',
    //   children: [{
    //       path: 'about',
    //       component: About,
    //       name: 'about',
    //       meta: {
    //         requiresLogin: true
    //       },
    //     },
    //     {
    //       path: 'login',
    //       component: UserLogin,
    //       name: 'userlogin',
    //       meta: {
    //         requiresLogin: false
    //       },
          beforeEnter(to, from, next) {
            if (store.state.user.name == null || store.state.user.name == null){
              
            }
            // var sid = sessionStorage.getItem('sid')
            // if (sid) {
            //   api.userloginsid(sid).then(response => {
            //     if (response.data.uId) {
            //       store.commit('CHANGE_LOGGED', true);
            //       next('/user/about');
            //     } else {
            //       sessionStorage.removeItem('sid');
            //       next('/user/login');
            //       store.commit("CHANGE_LOGGED", false);
            //     }
            //   });
            // } else 
                next();
          }
    //     },
    //     {
    //       path: 'register',
    //       component: UserRegister,
    //       name: 'userregister',
    //       meta: {
    //         requiresLogin: false,
    //       },
    //       beforeEnter(to, from, next) {
    //         if (!store.state.isLogged)
    //           next();
    //         else
    //           next('/user');
    //       }
    //     },
    //     {
    //       path: 'requestride',
    //       component: RequestRide,
    //       meta: {
    //         requiresLogin: true
    //       }
    //     }
    //   ],
    }, //==================================user router end===================================

    //============================================taxi router end========================================================
  ]
});
router.beforeEach((to, from, next) => {
//   if (to.meta.requiresLogin) {
//     if (store.state.isLogged)
//       next();
//     else {
//       if (store.state.whosUsing === null || store.state.whosUsing === undefined)
//         next('/');
//       else
//         next({
//           name: (store.state.whosUsing == 1 ? 'taxilogin' : 'userlogin')
//         })
//     }
//   } else {
    next();
//   }
});
export default router;