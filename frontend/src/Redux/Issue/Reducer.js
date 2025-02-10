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

      .addCase(fetchIssueById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssueById.fulfilled, (state, action) => {
        state.loading = false;
        state.issues = action.payload;
      })
      .addCase(fetchIssueById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateIssueStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIssueStatus.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("state data",state);
        
        //console.log("updateIssueStatus",action.payload);
        
        action.payload.issues = action.payload.issues.map((issue) =>
          issue.id === action.payload.id ? action.payload : issue
        );
      })
      .addCase(updateIssueStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        //console.log("From action.payload",action.payload);
        
        state.loading = false;
        state.issues = state.issues.filter(
          (issue) => issue.id !== action.payload
        );
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(assignIssueToUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignIssueToUser.fulfilled, (state, action) => {
        state.loading = false;
        //console.log("From assign issue to user reducer",action.payload.assignee.fullName);
        
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
