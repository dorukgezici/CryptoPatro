import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Exchange from "../views/Exchange.vue";
import Markets from "../views/Markets.vue";
import Lock from "../views/Lock.vue";
import Login from "../views/Login.vue";
import NewsDetails from "../views/NewsDetails.vue";
import Notfound from "../views/Notfound.vue";
import OtpNumber from "../views/OtpNumber.vue";
import OtpVerify from "../views/OtpVerify.vue";
import Profile from "../views/Profile.vue";
import Reset from "../views/Reset.vue";
import Settings from "../views/Settings.vue";
import Signup from "../views/Signup.vue";
import TermsAndConditions from "../views/TermsAndConditions.vue";
import Wallet from "../views/Wallet.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Exchange",
    component: Exchange,
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
  },
  {
    path: "/sign-up",
    name: "Signup",
    component: Signup,
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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
