import { FC, lazy } from 'react';
import { RegisterFormProps } from 'features/RegisterByUsername/ui/RegisterForm/RegisterForm.';

export const RegisterForm = lazy<FC<RegisterFormProps>>(() => import('./RegisterForm.'));
