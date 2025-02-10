import { api } from '@/Config/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async ({ planType }, { rejectWithValue }) => {
    try {
      const data = await api(`/api/payments/${planType}`, {
        method: 'POST',
      });
      
      if (data.payment_link_url) {
        window.location.href = data.payment_link_url;
      }
      
      return data; 
    } catch (error) {
      //console.log('payment error', error);
      return rejectWithValue(error.message); 
    }
  }
);
