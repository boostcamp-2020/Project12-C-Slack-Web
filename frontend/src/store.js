import { atom, selector, selectorFamily } from 'recoil'
import { getChannelHeaderInfo } from './api/channel'

export const workspace = atom({
  key: 'workspace',
  default: {},
})

export const currentChannelId = atom({
  key: 'currentChannelId',
  default: '',
})

export const currentChannelInfo = selectorFamily({
  key: 'currentChannel',
  get: channelId => async ({ get }) => {
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

export const currentChannelInfoQuery = selector({
  key: 'currentChannelInfoQuery',
  get: async ({ get }) => get(currentChannelInfo(get(currentChannelId))),
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
