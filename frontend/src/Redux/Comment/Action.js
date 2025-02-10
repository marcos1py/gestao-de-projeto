import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/Config/api";

export const createComment = createAsyncThunk(
  "comments/createComment",
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await api("/api/comments", {
        method: "POST",
        body: JSON.stringify(commentData),
      });
      //console.log("Comment Created", response);
      return response;
    } catch (error) {
      //console.log("error ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, { rejectWithValue }) => {
    try {
      await api(`/api/comments/${commentId}`, { method: "DELETE" });
      //console.log("Comment deleted with commentId",commentId);
      
      return commentId;
    } catch (error) {
      //console.log("error ", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await api(`/api/comments/${issueId}`);
      //console.log("fetched comments", response);
      return response;
    } catch (error) {
      //console.log("error ", error);
      return rejectWithValue(error.message);
    }
  }
);
