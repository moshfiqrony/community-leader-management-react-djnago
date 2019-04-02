let inistate = {
    isLogin: false,
};


export default function (state = inistate, action) {

    switch (action.type) {
        case 'load_users':
            return action.payload;
        case 'logout_users':
            return action.payload
        default:
            let data = localStorage.getItem('users');
            console.log(data);
            if (data === null) {
                return state;
            } else {
                return data;
            }
    }
}