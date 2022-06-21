const baseUrl = "https://trybeapp.herokuapp.com"

const paths = {
    login: "auth/login/",
    register: "auth/register/",
    currentUser: "auth/users/me/",
    logout: "auth/logout/",
    invitedUsers: "auth/invites",
    depositList: "wallet/deposits",
    withdrawalList: "wallet/withdraws",
    update: "update/",
    users: "auth/users/", 
    betStats: "bet/stats",
    betList: "list/",
    betStatsUpdate: "update",
    betSession: "bet/1234/session/",
    createSession: "bet/1234/session/create/",
    balance: "wallet/balance/total/"
}

export {baseUrl, paths}