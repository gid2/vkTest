import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency, CurrencySelect } from 'entities/Currensy';
import { Country, CountrySelect } from 'entities/Country';
import { HStack, VStack } from 'shared/ui/Stack';
import { Profile } from '../../model/types/profil';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: string;
    isLoading?: boolean;
    readOnly?: boolean;
    onChangeFirstname?: (value?:string) => void;
    onChangeLastname?: (value?:string) => void;
    onChangeAge?: (value?:string) => void;
    onChangeCity?: (value?:string) => void;
    onChangeUsername?: (value?:string) => void;
    onChangeAvatar?: (value?:string) => void;
    onChangeCurrency?: (currency?: Currency) => void;
    onChangeCountry?: (country?: Country) => void;
}

export const ProfileCard = (props : ProfileCardProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        readOnly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;
    const { t } = useTranslation('Profile');

    if (isLoading) {
        return (
            <HStack justify="center" max className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Loader />
            </HStack>
        );
    }
    if (error) {
        return (
            <HStack justify="center" max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    const mods: Mods = {
        [cls.editing]: !readOnly,
    };

    return (
        <VStack gap="8" max className={classNames(cls.ProfileCard, mods, [className])}>
            {data?.avatar && (
                <HStack justify="center" max className={cls.avatarWrapper}>
                    <Avatar
                        src={data?.avatar}
                        alt={t('Изображение не найдено')}
                    />
                </HStack>
            )}
            <Input
                value={data?.first}
                placeholder={t('Ваше имя')}
                className={cls.input}
                onChange={onChangeFirstname}
                readOnly={readOnly}
                data-testid={'ProfileCard.firstname'}
            />
            <Input
                value={data?.lastname}
                placeholder={t('Ваша фамилия')}
                className={cls.input}
                onChange={onChangeLastname}
                readOnly={readOnly}
                data-testid={'ProfileCard.lastname'}

            />
            <Input
                value={data?.age}
                placeholder={t('Ваш возраст')}
                className={cls.input}
                onChange={onChangeAge}
                readOnly={readOnly}
                data-testid={'ProfileCard.Age'}
            />
            <Input
                value={data?.city}
                placeholder={t('Город')}
                className={cls.input}
                onChange={onChangeCity}
                readOnly={readOnly}
            />
            <Input
                value={data?.username}
                placeholder={t('Имя пользователя')}
                className={cls.input}
                onChange={onChangeUsername}
                readOnly={readOnly}
            />
            <Input
                value={data?.avatar}
                placeholder={t('Аватар')}
                className={cls.input}
                onChange={onChangeAvatar}
                readOnly={readOnly}
            />
            <CurrencySelect
                className={cls.input}
                value={data?.currency}
                onChange={onChangeCurrency}
                readOnly={readOnly}
            />
            <CountrySelect
                className={cls.input}
                value={data?.country}
                onChange={onChangeCountry}
                readOnly={readOnly}
            />
        </VStack>
    );
};
