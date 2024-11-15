import { createSlice } from '@reduxjs/toolkit';
import { getUserSubscription, upgradeSubscription } from './Action'; // Make sure the path to the action file is correct

const initialState = {
  userSubscription: null,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(getUserSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.userSubscription = action.payload;
        state.error = null;
      })
      .addCase(getUserSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(upgradeSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upgradeSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.userSubscription = action.payload;
        state.error = null;
      })
      .addCase(upgradeSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const subscriptionReducer = subscriptionSlice.reducer;
