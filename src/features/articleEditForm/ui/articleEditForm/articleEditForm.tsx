import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './articleEditForm.module.scss';

interface articleEditFormProps {
    className?: string;
}

export const articleEditForm = memo((props: articleEditFormProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.articleEditForm, {}, [className])} />
    );
});
