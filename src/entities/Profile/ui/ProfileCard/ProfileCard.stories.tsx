import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from 'entities/Country';
import avatar from 'shared/assets/tests/storybook.jpg';
import { Currency } from 'entities/Currensy';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    data: {
        username: 'admin',
        age: 21,
        country: Country.Kazakhstan,
        lastname: 'Гендугов',
        first: 'Гид',
        city: 'Moscow',
        currency: Currency.USD,
        avatar,
    },
};

export const withError = Template.bind({});
withError.args = {
    error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
