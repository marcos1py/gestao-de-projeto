import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProjects,
  searchProjects,
  createProjects,
  fetchProjectById,
  deleteProject,
  inviteToProject,
  acceptInvitation,
  fetchCategories,
  fetchTags 
} from './Action' 

const initialState = {
  projects: [],
  searchProjects: [],
  projectDetails: null,
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetched projects",action.payload);
        
        state.projects = action.payload;
        console.log("Current -----",state.projects);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProjects = action.payload;
        console.log("Searched project",state.searchProjects);
        
      })
      .addCase(searchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProjects.fulfilled, (state, action) => {
        state.loading = false;
        console.log("To be pushed ---- ",action.payload);
        state.projects.push(action.payload);
        
        console.log("current projects", state.projects);
      })
      .addCase(createProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.projectDetails = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(project => project.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(inviteToProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(inviteToProject.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(inviteToProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(acceptInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptInvitation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(acceptInvitation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload; 
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.error("Erro ao buscar categorias: ", action.payload);
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload; 
      })
      .addCase(fetchTags.rejected, (state, action) => {
        console.error("Erro ao buscar tags: ", action.payload);
      });
  },
});

export const { setError } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
