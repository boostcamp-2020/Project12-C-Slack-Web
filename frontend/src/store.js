import { atom, selector } from 'recoil'
import { getChannelHeaderInfo } from './api/channel'

export const workspaceRecoil = atom({
  key: 'workspace',
  default: null,
})

export const forceUpdate = atom({
  key: 'forceUpdate',
  default: 0,
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
