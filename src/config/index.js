const baseUrl = "https://trybeapp.herokuapp.com"

const paths = {
    login: "auth/login/",
    register: "auth/register/",
    currentUser: "auth/users/me/",
    logout: "auth/logout/",
    invitedUsers: "auth/invites",
    depositList: "wallet/deposits",
    withdrawalList: "wallet/withdraws",
    update: "update/"
}

export {baseUrl, paths}