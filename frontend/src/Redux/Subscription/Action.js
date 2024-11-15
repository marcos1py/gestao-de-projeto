import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/Config/api";

export const getUserSubscription = createAsyncThunk(
  'subscription/getUserSubscription',
  async (_, { rejectWithValue }) => {  
    try {
      const data = await api('/api/subscriptions/user');
      console.log('user subscription', data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const upgradeSubscription = createAsyncThunk(
  'subscription/upgradeSubscription',
  async ({ planType }, { rejectWithValue }) => {
    try {
      const data = await api(`/api/subscriptions/upgrade?planType=${planType}`, {
        method: 'PATCH',
      });
      console.log('upgrade subscription', data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
