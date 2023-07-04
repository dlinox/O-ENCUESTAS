import Cookies from "js-cookie"

const authGuard = (to, from) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (Cookies.get('token') === undefined && to.path !== '/login') {
            return { path: '/login', query: { redirectTo: to.fullPath } };
        } 
    }
}

export default authGuard;