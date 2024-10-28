import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { memo } from 'react';

interface ThemeSwitherProps {
    className?: string;
}

export const ThemeSwither = memo(({ className }: ThemeSwitherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK
                ? <DarkIcon />
                : <LightIcon />}
        </Button>
    );
});
