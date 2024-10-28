import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getRegisterUsername,
} from '../../model/selectors/getRegisterUsername/getRegisterUsername';
import {
    getRegisterPassword,
} from '../../model/selectors/getRegisterPassword/getRegisterPassword';
import {
    getRegisterError,
} from '../../model/selectors/getRegisterError/getLoginError';
import {
    getRegisterEmail,
} from '../../model/selectors/getRegisterEmail/getRegisterEmail';
import {
    registerActions,
    registerReducer,
} from '../../model/slice/registerSlice';
import cls from './RegisterForm.module.scss';
import { registerByUsername } from '../../model/services/registerByUsername/registerByUsername';

export interface RegisterFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    registerForm: registerReducer,
};

const RegisterForm = memo(({ className, onSuccess }: RegisterFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const username = useSelector(getRegisterUsername);
    const email = useSelector(getRegisterEmail);
    const password = useSelector(getRegisterPassword);
    const error = useSelector(getRegisterError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(registerActions.setUsername(value));
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(registerActions.setEmail(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(registerActions.setPassword(value));
    }, [dispatch]);

    const onRegisterClick = useCallback(async () => {
        const result = await dispatch(registerByUsername({ username, email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, username, email, password, onSuccess]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <div className={classNames(cls.RegisterForm, {}, [className])}>
                <Text title={t('Форма регистрации')} />
                {error && <Text text={error} theme={TextTheme.ERROR} />}
                <Input
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder={t('Введите имя пользователя')}
                    onChange={onChangeUsername}
                    value={username}
                />
                <Input
                    type="email"
                    className={cls.input}
                    placeholder={t('Введите email')}
                    onChange={onChangeEmail}
                    value={email}
                />
                <Input
                    type="password"
                    className={cls.input}
                    placeholder={t('Введите пароль')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.registerBtn}
                    onClick={onRegisterClick}
                >
                    {t('Зарегистрироваться')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default RegisterForm;
