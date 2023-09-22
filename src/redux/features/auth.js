import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.services";

export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password }) => {
        try {
            const data = await AuthService.login(username, password);
            return { user: data };
        } catch (error) {
            return error.message;
        }
    }
);

export const logout = createAsyncThunk("auth/logout",
    async () => {
        await AuthService.logout();
    });

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        errorMessage: "",
        user: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null,
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.errorMessage = action.payload.error_message;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.error_message;
        });

        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.errorMessage = "";
        });
    },
});

const { reducer } = authSlice;
export default reducer;