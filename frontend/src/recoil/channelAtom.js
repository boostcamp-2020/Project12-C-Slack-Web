import { atom } from 'recoil'
import workspaceUserInfoAtom from './workspaceUserInfoAtom'

const channelAtom = atom({
  key: 'Channels',
  default: {},
})

export { workspaceUserInfoAtom }

export default channelAtom
