import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router"
import Exchange from "../views/Exchange.vue"
import Markets from "../views/Markets.vue"
import Lock from "../views/Lock.vue"
import Login from "../views/Login.vue"
import NewsDetails from "../views/NewsDetails.vue"
import Notfound from "../views/Notfound.vue"
import OtpNumber from "../views/OtpNumber.vue"
import OtpVerify from "../views/OtpVerify.vue"
import Profile from "../views/Profile.vue"
import Reset from "../views/Reset.vue"
import Settings from "../views/Settings.vue"
import Signup from "../views/Signup.vue"
import TermsAndConditions from "../views/TermsAndConditions.vue"
import Wallet from "../views/Wallet.vue"
import store from "../store/index"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Exchange",
        component: Exchange,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/markets",
        name: "Markets",
        component: Markets,
    },
    {
        path: "/lock",
        name: "Lock",
        component: Lock,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            redirectsAuth: true
        }
    },
    {
        path: "/news-details",
        name: "NewsDetails",
        component: NewsDetails,
    },
    {
        path: "/404",
        name: "Notfound",
        component: Notfound,
    },
    {
        path: "/otp-number",
        name: "OtpNumber",
        component: OtpNumber,
    },
    {
        path: "/otp-verify",
        name: "OtpVerify",
        component: OtpVerify,
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/reset",
        name: "Reset",
        component: Reset,
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/sign-up",
        name: "Signup",
        component: Signup,
        meta: {
            redirectsAuth: true
        }
    },
    {
        path: "/terms-and-conditions",
        name: "TermsAndConditions",
        component: TermsAndConditions,
    },
    {
        path: "/wallet",
        name: "Wallet",
        component: Wallet,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/:pathMatch(.*)",
        redirect: "/404",
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters["auth/isAuthenticated"]) {
            next('/login')
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.redirectsAuth)) {
        if (store.getters["auth/isAuthenticated"]) {
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
