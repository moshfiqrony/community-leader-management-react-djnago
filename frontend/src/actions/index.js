import axios from 'axios'

export function loadUsers(data, role, history) {
    return(dispatch) => {
        return dispatch(getData(data, role, history));
    }
}

export function getData(data, role, history) {
    let activeUser = {
        ...data[0],
        role: role,
        isLogin: true
    }
    console.log(activeUser, history);
    return{
        type: 'load_users',
        payload: activeUser
    }

}