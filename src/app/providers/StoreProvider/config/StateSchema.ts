import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import {
    CombinedState, EnhancedStore, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AnyAction, Reducer } from 'redux';
import { AxiosInstance } from 'axios';
import { AddCommentFormSchema } from 'features/addCommentForm';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { ArticleDetailsSchema } from 'entities/Article';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { UISchema } from 'features/UI';
import { RegisterSchema } from 'features/RegisterByUsername';
import { rtkApi } from 'shared/api/rtkApi';
import { ProfileSchema } from 'features/editableProfileCard';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    ui: UISchema;
    loginForm?: LoginSchema;
    profile?: ProfileSchema
    articleDetails?: ArticleDetailsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    articleDetailsPage?: ArticleDetailsPageSchema;
    registerForm?: RegisterSchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
}
export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>,
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
    add: (key: StateSchemaKey, reducer: Reducer) => void
    remove:(key: StateSchemaKey) => void
    getMountedReducers: () => MountedReducers
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema>{
    reducerManager: ReducerManager
}

export interface ThunkExtraArg {
    api: AxiosInstance,
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
