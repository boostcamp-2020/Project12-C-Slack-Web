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
  key: 'channels',
  default: [],
})

export const modalRecoil = atom({
  key: 'modal',
  default: null,
})

export const socketRecoil = atom({
  key: 'socket',
  default: null,
  dangerouslyAllowMutability: true,
})
