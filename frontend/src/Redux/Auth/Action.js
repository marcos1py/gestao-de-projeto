import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_BASE_URL } from "@/Config/api";


export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      //console.log("register success", data);
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      }
      return rejectWithValue("JWT not found");
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);


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
      //console.log("login success", data);
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        return data;
      }
      return rejectWithValue("JWT not found");
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);


export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const data = await response.json();
      //console.log("getUser success", data);
      return data;
    } catch (error) {
      //console.log(error);
      return rejectWithValue(error.message);
    }
  }
);


export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.clear();
    //console.log("logout success");
    
  }
);