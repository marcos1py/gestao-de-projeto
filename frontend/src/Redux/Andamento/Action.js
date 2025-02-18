import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/Config/api";

export const createAndamento = createAsyncThunk(
  "andamentos/createAndamento",
  async (andamentoData, { rejectWithValue }) => {
    try {
      const response = await api("/api/andamentos", {
        method: "POST",
        body: JSON.stringify(andamentoData),
      });
      //console.log("Andamento Created", response);
      return response;
    } catch (error) {
      //console.log("error ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAndamento = createAsyncThunk(
  "andamentos/deleteAndamento",
  async (andamentoId, { rejectWithValue }) => {
    try {
      await api(`/api/andamentos/${andamentoId}`, { method: "DELETE" });
      //console.log("Andamento deleted with andamentoId",andamentoId);
      
      return andamentoId;
    } catch (error) {
      //console.log("error ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAndamentos = createAsyncThunk(
  "andamentos/fetchAndamentos",
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await api(`/api/andamentos/${issueId}`);
      //console.log("fetched andamentos", response);
      return response;
    } catch (error) {
      //console.log("error ", error);
      return rejectWithValue(error.message);
    }
  }
);
