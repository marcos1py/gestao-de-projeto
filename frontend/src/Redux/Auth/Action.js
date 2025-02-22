import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from "@/Config/api";

/**
 * Registro de usuário
 */
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Verifica se todos os campos foram preenchidos
      const { fullName, email, password } = userData;
      if (!fullName || !email || !password) {
        return rejectWithValue("Todos os campos são obrigatórios.");
      }
      // Envia os dados para o backend
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        return rejectWithValue(data.message || "Erro ao registrar usuário.");
      } else {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.message || "Erro desconhecido.");
    }
  }
);

/**
 * Login de usuário
 */
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Credenciais inválidas.");
      }
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      }
      return rejectWithValue("JWT não encontrado.");
    } catch (error) {
      return rejectWithValue(error.message || "Erro desconhecido.");
    }
  }
);

/**
 * Obtém informações do usuário autenticado
 */
export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        return rejectWithValue("Usuário não autenticado.");
      }
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Erro ao obter dados do usuário.");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Erro desconhecido.");
    }
  }
);

/**
 * Obtém todos os usuários
 */
export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        return rejectWithValue("Usuário não autenticado.");
      }
      const response = await fetch(`${API_BASE_URL}/api/users/all`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Erro ao obter os usuários.");
      }
      console.log("Usuários", data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Erro desconhecido.");
    }
  }
);

/**
 * Logout do usuário
 */
export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem("jwt");
    return { success: true, message: "Logout realizado com sucesso." };
  }
);
