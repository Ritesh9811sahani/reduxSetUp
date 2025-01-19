const initialState = {
    chatData: [],

};

function UserReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CHAT_INFO':
            return { ...state, chatData: action.payload }
            break;
        default:
            return state;
    }
};

export default UserReducer;