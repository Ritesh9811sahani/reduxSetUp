import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    userDetails: any,
}

const initialState: UserState = {
    userDetails: {},
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action: PayloadAction<any>) => {
            state.userDetails = action.payload;
        },


    },
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;