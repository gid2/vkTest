import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

export default function MainPage() {
    const { t } = useTranslation();
    return (
        <Page>
            {t('Главная страница')}
        </Page>
    );
}
