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
      //console.log("created project", data);
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
      //console.log("project", data);
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
      //console.log("deleted project", data);
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
      //console.log("invite to project", data);
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
      //console.log("accept invitation", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchCategories = createAsyncThunk(
  "projects/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api("/api/categories");
      //console.log("all categories", data);
      const uniqueCategories = data.map((categorie) => ({
        id: categorie.id,    // Certifique-se de que o campo 'id' existe
        nome: categorie.nome // Certifique-se de que o campo 'nome' existe
      }));
      //console.log("unique categories", uniqueCategories);
      return uniqueCategories; // Retorna as categorias únicas
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchTags = createAsyncThunk(
  "projects/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api("/api/tags");
      //console.log("all tags", data);
      const allTags = data.flatMap((tags) => tags.nome); 
      const uniqueTags = [...new Set(allTags)];

      return uniqueTags; // Retorna as tags únicas
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const createCategory = createAsyncThunk(
  "projects/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const data = await api("/api/categories", {
        method: "POST",
        body: JSON.stringify(categoryData),
      });
      console.log("created category", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTags = createAsyncThunk(
  "projects/createTags",
  async (categoryData, { rejectWithValue }) => {
    try {
      const data = await api("/api/tags", {
        method: "POST",
        body: JSON.stringify(categoryData),
      });
      console.log("created createTags", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);