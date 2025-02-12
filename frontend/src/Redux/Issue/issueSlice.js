// src/Redux/Issue/issueSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  assignIssueToUser,
  createIssue,
  deleteIssue,
  fetchIssueById,
  fetchIssues,
  updateIssueStatus,
} from "./Action";

const initialState = {
  issues: [],
  loading: false,
  error: null,
};

const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Issue
      .addCase(createIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.issues.push(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Issues
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Issue By Id
      .addCase(fetchIssueById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssueById.fulfilled, (state, action) => {
        state.loading = false;
        // Se fetchIssueById retorna uma issue única, você pode decidir
        // se deseja substituir o array ou atualizar um item específico.
        // Aqui, por simplicidade, vamos atualizar o array.
        state.issues = state.issues.map((issue) =>
          issue.id === action.payload.id ? action.payload : issue
        );
      })
      .addCase(fetchIssueById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Issue Status
      .addCase(updateIssueStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIssueStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = state.issues.map((issue) =>
          issue.id === action.payload.id ? action.payload : issue
        );
      })
      .addCase(updateIssueStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Issue
      .addCase(deleteIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = state.issues.filter(
          (issue) => issue.id !== action.payload
        );
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Assign Issue To User
      .addCase(assignIssueToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignIssueToUser.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = state.issues.map((issue) =>
          issue.id === action.payload.id ? action.payload : issue
        );
      })
      .addCase(assignIssueToUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const issueReducer = issueSlice.reducer;
