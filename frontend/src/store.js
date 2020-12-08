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

export const currentChannelIdRecoil = atom({
  key: 'currentChannelId',
  default: '',
})

export const currentChannelInfoRecoil = selector({
  key: 'currentChannel',
  get: async ({ get }) => {
    get(forceUpdate)
    const channelId = get(currentChannelIdRecoil)
    const workspaceUserInfoId = get(workspaceRecoil)._id
    if (channelId && workspaceUserInfoId) {
      const { result } = await getChannelHeaderInfo({
        channelId,
        workspaceUserInfoId,
      })
      return result
    }
    return {}
  },
})

export const channelsRecoil = atom({
  key: 'Channels',
  default: {},
})

export const modalRecoil = atom({
  key: 'Modal',
  default: null,
})
