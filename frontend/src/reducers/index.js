import {combineReducers} from "redux";
import Users from './load-user';



const allReducers = combineReducers({
    users: Users,
})

export default allReducers