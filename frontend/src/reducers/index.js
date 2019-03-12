import {combineReducers} from "redux";
import Users from './load-campaigns'



const allReducers = combineReducers({
    users: Users,
})

export default allReducers