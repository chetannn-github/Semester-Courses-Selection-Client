
import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
  name: 'Incomplete courses',
  initialState: null,
  reducers: {
   addIncompleteCourses:(state,action) =>{
    return action.payload;
   }
  },
});

export const {addIncompleteCourses } = courseSlice.actions;
export default courseSlice.reducer;