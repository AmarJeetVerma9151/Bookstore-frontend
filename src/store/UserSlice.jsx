import { createSlice } from "@reduxjs/toolkit";

let details = JSON.parse(localStorage.getItem('user'))
const initialState = {
    login: details ? details.login : false, 
    user: details ? details.user : null,
    book:null,
  };
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetState: (state, action) => {
        state.login = true; 
        state.user = action.payload;

        const updatedUserData = { login: true, user: action.payload };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      },
    SignupState:(state,action)=>{
     localStorage.setItem("user", JSON.stringify(action.payload))
     state.value=action.payload;
        console.log("state",state.value)
        console.log("action",action.payload)
    },

    logoutState:(state,action)=>{
      state.login = false;
      state.user = null;
      const updatedUserData = { login: false, user:null };
      localStorage.removeItem("user",updatedUserData)
         console.log("state",state.value)
         console.log("action",action.payload)
     },
     bookstate:(state,action)=>{
      state.book=action.payload
     }

  }
});

export const { SetState,logoutState,bookstate} = UserSlice.actions;
export default UserSlice.reducer;
