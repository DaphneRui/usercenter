import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",
    redirect: "/login"

  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/login.vue")
  },
  {
    path: "/regist",
    name: "regist",
    component: () =>
      import("../views/regist.vue")
  },
  {
    path: "/user",
    name: "user",
    redirect: "/user/message",
    component: () =>
      import("../views/user.vue"),
    children: [
      {
        path: "message",
        name: "message",
        component: () =>
          import("../views/message.vue")
      },
      {
        path: "shop",
        name: "shop",
        component: () =>
          import("../views/shop.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if((to.name !== 'login') && (to.name !== 'regist') ){
    const isLogin = localStorage.getItem("userid") || ""
    if(!isLogin){
      next({
        name: "login"
      })
    }else{
      next()
    }
  }
  else{
    next()
  }
})

export default router;
