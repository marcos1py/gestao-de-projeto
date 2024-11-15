import { api } from "@/Config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async ({ category = "", tag = "" } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();
      if (category) queryParams.append("category", category);
      if (tag) queryParams.append("tag", tag);

      const data = await api(`/api/projects?${queryParams.toString()}`);
      console.log("all projects", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const searchProjects = createAsyncThunk(
  "projects/searchProjects",
  async (keyword, { rejectWithValue }) => {
    try {
      const data = await api(
        `/api/projects/search?keyword=${encodeURIComponent(keyword)}`
      );
      console.log("search projects", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProjects = createAsyncThunk(
  "projects/createProjects",
  async (projectData, { rejectWithValue }) => {
    try {
      const data = await api("/api/projects", {
        method: "POST",
        body: JSON.stringify(projectData),
      });
      console.log("created project", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProjectById = createAsyncThunk(
  "projects/fetchProjectById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api(`/api/projects/${id}`);
      console.log("project", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProjects",
  async (projectId, { rejectWithValue }) => {
    try {
      const data = await api(`/api/projects/${projectId}`, {
        method: "DELETE",
      });
      console.log("deleted project", data);
      return projectId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const inviteToProject = createAsyncThunk(
  "projects/inviteToProject",
  async ({ email, projectId }, { rejectWithValue }) => {
    try {
      const data = await api("/api/projects/invite", {
        method: "POST",
        body: JSON.stringify({ email, projectId }),
      });
      console.log("invite to project", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const acceptInvitation = createAsyncThunk(
  "projects/acceptInvitation",
  async ({ invitationToken, navigate }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        token: invitationToken,
      }).toString();
      const data = await api(`/api/projects/accept_invitation?${queryParams}`);
      navigate(`/project/${data.projectId}`);
      console.log("accept invitation", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
