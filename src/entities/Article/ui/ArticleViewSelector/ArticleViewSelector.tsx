import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import ListIcon from 'shared/assets/icons/list.svg';
import TiledIcon from 'shared/assets/icons/tiled.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string;
    view: ArticleView;
    onViewClick?: (view: ArticleView) => void;
}

const viewTypes = [
    {
        view: ArticleView.BIG,
        icon: TiledIcon,
    },
    {
        view: ArticleView.SMALL,
        icon: ListIcon,
    },
];

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const {
        className,
        view,
        onViewClick,
    } = props;

    const onClick = (newView: ArticleView) => () => {
        onViewClick?.(newView);
    };

    console.log(ArticleView.BIG);

    return (
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
            {viewTypes.map(({ view, icon }) => (
                <Button
                    theme={ButtonTheme.CLEAR}
                    onClick={onClick(view)}
                >
                    <Icon Svg={icon} />
                </Button>
            ))}
        </div>
    );
});
