import { createSlice } from "@reduxjs/toolkit";
import { createAndamento, deleteAndamento, fetchAndamentos } from "./Action";

const initialState = {
  andamentos: [],
  loading: false,
  error: null,
};

const andamentoSlice = createSlice({
  name: "andamentos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAndamento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAndamento.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("from action.payload", action.payload);
        state.andamentos.push(action.payload);
        //console.log("From state andamentos", state.andamentos);
      })
      .addCase(createAndamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAndamentos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAndamentos.fulfilled, (state, action) => {
        state.loading = false;
        state.andamentos = action.payload;
      })
      .addCase(fetchAndamentos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAndamento.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAndamento.fulfilled, (state, action) => {
        state.loading = false;
        state.andamentos = state.andamentos.filter(
          (andamento) => andamento.id !== action.payload
        );
      })
      .addCase(deleteAndamento.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const andamentoReducer = andamentoSlice.reducer;
