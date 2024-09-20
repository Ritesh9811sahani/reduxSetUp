const initialState = {
    userData: {},

};

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER_INFO':
            return { ...state, userData: action.payload }
            break;
        default:
            return state;
    }
};

export default UserReducer;