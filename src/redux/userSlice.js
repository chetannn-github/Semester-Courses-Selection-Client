
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
   addUserInfo:(state,action) =>{
    return action.payload;
   }
  },
});

export const {addUserInfo } = userSlice.actions;
export default userSlice.reducer;