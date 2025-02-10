import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProjects,
  searchProjects,
  createProjects,
  createCategory,
  createTags,
  fetchProjectById,
  deleteProject,
  inviteToProject,
  acceptInvitation,
  fetchCategories,
  fetchTags,
} from './Action';

const initialState = {
  projects: [],
  searchProjects: [],
  projectDetails: null,
  categories: [],
  tags: [],
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
      // Handle fetchProjects actions
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle searchProjects actions
      .addCase(searchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProjects = action.payload;
      })
      .addCase(searchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle createProjects actions
      .addCase(createProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload);
      })
      .addCase(createProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle fetchProjectById actions
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

      // Handle deleteProject actions
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

      // Handle inviteToProject actions
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

      // Handle acceptInvitation actions
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

      // Handle fetchCategories actions
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        console.error("Erro ao buscar categorias: ", action.payload);
      })

      // Handle fetchTags actions
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        console.error("Erro ao buscar tags: ", action.payload);
      })

      // Handle createCategory actions (only once)
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle createTags actions
      .addCase(createTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTags.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, add the created tag to state (similar to createCategory)
        state.tags.push(action.payload);
      })
      .addCase(createTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setError } = projectSlice.actions;

export const projectReducer = projectSlice.reducer;
