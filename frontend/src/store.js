import { atom } from 'recoil'

export const workspaceRecoil = atom({
  key: 'workspace',
  default: null,
})

export const currentChannelInfoRecoil = atom({
  key: 'currentChannel',
  default: '',
})

export const channelsRecoil = atom({
  key: 'Channels',
  default: {},
})

export const modalRecoil = atom({
  key: 'Modal',
  default: null,
})
