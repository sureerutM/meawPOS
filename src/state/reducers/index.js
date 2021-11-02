import { combineReducers } from "redux";
import menuReducer from "./menuReducer"


const reducers = combineReducers({
    bank: menuReducer
})

export default reducers