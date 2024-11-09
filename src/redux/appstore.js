import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import courseReducer from "./courseSlice"

const appStore = configureStore({
   
        reducer: {
          user: userReducer,
          incompleteCourses:  courseReducer
        },
      });
      
      
export default appStore;