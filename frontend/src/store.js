import { atom } from 'recoil'

export const workspace = atom({
  key: 'workspace',
  default: {
    workspaceUseInfoId: '5fc4fe427b2d5f6ae44dc15d',
  },
})

export const channelAtom = atom({
  key: 'Channels',
  default: {},
})

export const channelInfoAtom = atom({
  key: 'ChannelInfo',
  default: {},
})

export const modalAtom = atom({
  key: 'Modal',
  default: null,
})

export const workspaceUserInfoAtom = atom({
  key: 'WorkspaceUserInfo',
  default: null,
})
