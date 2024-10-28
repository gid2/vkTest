import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    registerByUsername,
} from 'features/RegisterByUsername/model/services/registerByUsername/registerByUsername';

interface RegisterSchema {
    isLoading: boolean;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    error?: string;
}

const initialState: RegisterSchema = {
    isLoading: false,
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerByUsername.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerByUsername.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;

export default registerSlice.reducer;
