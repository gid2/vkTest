import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Country } from '../model/types/counter';
import { ListBox } from 'shared/ui/ListBox/ListBox';

interface CountrySelectProps{
    className?: string;
    value?: Country;
    onChange?: (value?: Country) => void;
    readOnly?: boolean;
}

const options = [
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Ukraine, content: Country.Ukraine },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className,
        value,
        onChange,
        readOnly,
    } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <ListBox
            className={classNames('', {}, [className])}
            items={options}
            value={value}
            onChange={onChangeHandler}
            readOnly={readOnly}
            defaultValue={t('Укажите страну')}
            label={t('Укажите страну')}
            direction="top right"
        />
    );
});
