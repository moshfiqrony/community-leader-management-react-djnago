import {combineReducers} from "redux";
import Users from './laod-user'



const allReducers = combineReducers({
    users: Users
})

export default allReducers