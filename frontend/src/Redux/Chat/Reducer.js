import { createSlice } from '@reduxjs/toolkit';
import { sendMessage, fetchChatByProjectId, fetchChatMessages } from './Action'

const initialState = {
  chat: null,
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatByProjectId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatByProjectId.fulfilled, (state, action) => {
        state.loading = false;
        state.chat = action.payload;
        state.error = null;
      })
      .addCase(fetchChatByProjectId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        state.error = null;
      })
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload); 
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const chatReducer = chatSlice.reducer;
