import React from 'react'
import ViewThreadButton from './ViewThreadButton'

export default {
  title: 'Presenter/Button/ViewThreadButton',
  component: ViewThreadButton,
}

const Template = args => <ViewThreadButton {...args} />

export const Default = Template.bind({})
Default.args = {
  reply: [
    {
      createdAt: '2020-12-15T04:08:39.960Z',
      creator: '5fcf09b2bc3a524ae4db6035',
      isDelete: false,
      updatedAt: '2020-12-15T04:08:39.960Z',
      userInfo: {
        _id: '5fcf09b2bc3a524ae4db6035',
        displayName: 'solo95',
        profileUrl:
          'https://avatars0.githubusercontent.com/u/26921508?…00&u=3bd5e08ac086212ee3219297d4e02e10a5e275a5&v=4',
      },
      __v: 0,
      _id: '5fd836c752de571e30405e09',
    },
  ],
}
