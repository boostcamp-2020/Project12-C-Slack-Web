import { atom, selector } from 'recoil'
import { getChannelHeaderInfo } from './api/channel'

export const workspace = atom({
  key: 'workspace',
  default: {},
})

export const currentChannelId = atom({
  key: 'currentChannelId',
  default: '',
})

export const currentChannelInfo = selector({
  key: 'currentChannel',
  get: async ({ get }) => {
    const channelId = get(currentChannelId)
    const workspaceUserInfoId = get(workspace)._id
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
  default: {},
})
