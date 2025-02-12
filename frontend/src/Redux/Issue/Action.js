import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "@/Config/api";

export const createIssue = createAsyncThunk(
  "issues/createIssue",
  async (issueData, { rejectWithValue }) => {
    //console.log("Issue data --",issueData);
    
    try {

      const data = await api("/api/issues", {
        method: "POST",
        body: JSON.stringify(issueData),
      });
      //console.log("Issue created success  ", data);
      return data;
    } catch (error) { 
      return rejectWithValue(error.message);
    }
  }
);

  export const fetchIssues = createAsyncThunk(
    "issues/fetchIssues",
    async (id, { rejectWithValue }) => {
      try {
        const data = await api(`/api/issues/project/${id}`);
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

export const fetchIssueById = createAsyncThunk(
  "issues/fetchIssueById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api(`/api/issues/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateIssueStatus = createAsyncThunk(
  "issues/updateIssueStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const data = await api(`/api/issues/${id}/status/${status}`, {
        method: "PUT",
      });
      //console.log("update issue data",data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteIssue = createAsyncThunk("issues/deleteIssue",
  async (id,{rejectWithValue}) => {
    //console.log("Action id",id);
    
    try{
      const data = await api(`/api/issues/${id}`,{
        method: "DELETE",
      });
      //console.log("Response data",data);
      //console.log("response id",id);
      return id;
    }
    catch(error){
      return rejectWithValue(error.message);
    }
  }
);

export const assignIssueToUser = createAsyncThunk(
  "issues/assignedUserToIssue",
  async ({ issueId, userId }, { rejectWithValue }) => {
    try {
      const data = await api(`/api/issues/${issueId}/assignee/${userId}`, {
        method: "PUT",
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchIssuesForUser = createAsyncThunk(
  "issues/fetchIssuesForUser",
  async ({ minDate = "", maxDate = "" } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (minDate) queryParams.append("minDate", minDate);
      if (maxDate) queryParams.append("maxDate", maxDate);
      // O endpoint /api/issues/user deve estar implementado no back-end para retornar as issues do usuário logado
      const data = await api(`/api/issues/user?${queryParams.toString()}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Se desejar implementar uma pesquisa de issues, crie também o searchIssues.
export const searchIssues = createAsyncThunk(
  "issues/searchIssues",
  async (keyword, { rejectWithValue }) => {
    try {
      // Implemente seu endpoint de pesquisa para issues, se houver
      const data = await api(`/api/issues/search?keyword=${encodeURIComponent(keyword)}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);