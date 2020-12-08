import { useEffect } from 'react'
import { workspaceRecoil } from '../store'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { getWorkspaceUserInfo } from '../api/workspace'

const useWorkspace = () => {
  const { workspaceId } = useParams()
  const [workspaceInfo, setWorkspaceInfo] = useRecoilState(workspaceRecoil)
  const updateWorkspaceInfo = async workspaceId => {
    if (workspaceId) {
      setWorkspaceInfo(await getWorkspaceUserInfo({ workspaceId }))
    }
  }

  useEffect(() => {
    updateWorkspaceInfo(workspaceId)
  }, [workspaceId])

  return [workspaceInfo, updateWorkspaceInfo]
}

export default useWorkspace
