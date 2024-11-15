import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from "@/Config/api"; 

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (messageData, { rejectWithValue }) => {
        try {
            const data = await api("/api/messages/send", {
                method: "POST",
                body: JSON.stringify(messageData),
            });
            console.log("Chat created..",data);
            
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchChatByProjectId = createAsyncThunk(
    'chat/fetchChatByProject',
    async (projectId, { rejectWithValue }) => {
        try {
            const data = await api(`/api/projects/${projectId}/chat`);
            console.log("Fetching chat by project id",data);
            
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchChatMessages = createAsyncThunk(
    'chat/fetchChatMessages',
    async (chatId, { rejectWithValue }) => {
        try {
            const data = await api(`/api/messages/chat/${chatId}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
