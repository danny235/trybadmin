import { createSlice } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
const initialState = {
    userProfile: {},
    token: "",
    userFetching: false,
    refreshToken: "",
    depositHistory: [],
    withdrawalHistory: [],
    userList: [],
    betStatsList: {},
    balance: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.userProfile = action.payload;
          },
          updateToken: (state, action) => {
            state.token = action.payload;
          },
          updateUserFetching: (state, action) => {
            state.userFetching = action.payload;
          },
          updateRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
          },
          updateDepositHistory: (state, action)=>{
            state.depositHistory = action.payload
          },
          updateWithdrawalHistory: (state, action)=>{
            state.withdrawalHistory = action.payload
          },
          updateUsersList: (state, action)=>{
            state.userList = action.payload
          },
          updateBetStatsList: (state, action)=>{
            state.betStatsList = action.payload
          },
          updateBalance: (state, action)=>{
            state.balance = action.payload
          },
          logOutUser: (state) => {
            state.refreshToken = ""
            state.token = ""
            state.userProfile = {}
            state.depositHistory = []
            state.withdrawalHistory = []
            state.balance = ""
            storage.removeItem("persist:root")
            
          }
    }
})

export const {updateUser, updateToken, updateUserFetching, logOutUser, updateRefreshToken, updateDepositHistory, updateWithdrawalHistory, updateUsersList, updateBetStatsList, updateBalance} =
  userSlice.actions;

export default userSlice.reducer;