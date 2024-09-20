import { combineReducers } from 'redux';
import UserReducer from './reducer/UserReducer';
const RootReducer = combineReducers({
    userInfo: UserReducer,
});

export default RootReducer;