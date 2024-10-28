import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface RegisterByUsernameProps {
    username: string;
    password: string;
    email: string;
}

export const registerByUsername = createAsyncThunk<
    User,
    RegisterByUsernameProps,
    ThunkConfig<string>
>(
    'register/registerByUsername',
    async (authData, thunkApi) => {
        const { extra, dispatch, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<User>('/register', authData);

            if (!response.data) {
                throw new Error('Failed to register.');
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));
            return response.data;
        } catch (e) {
            console.error(e);
            return rejectWithValue('Registration failed');
        }
    },
);
