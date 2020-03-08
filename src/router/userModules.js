export default {
    path: '/user',
    name: 'LoginModules',
    component: () => import('@/views/User'),
    redirect :'/user/login',
    children: [
        // 登录
        {
            path: '/user/login',
            alias: '/login',
            name: 'Login',
            component: () => import('@/views/user/Login'),
            beforeEnter: (to, from, next)=>{
                if(sessionStorage.getItem('mlh_token')){
                    next('/index')
                }else {
                    next()
                }
            }
        },
        // 注册
        {
            path: '/user/register',
            alias: '/register',
            name: 'Register',
            component: () => import('@/views/user/Register')
        },
        {
            // 购物车
            path: '/user/shopcar',
            alias: '/shopcar',
            name: 'shopcar',
            component: () => import('@/views/ShopCar'),
            beforeEnter: (to, from, next)=>{
                if(sessionStorage.getItem('mlh_token')){
                    next()
                }else {
                    next('/login')
                }
            }
        }
    ]
}