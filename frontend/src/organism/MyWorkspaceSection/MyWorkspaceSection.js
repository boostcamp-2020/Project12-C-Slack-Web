import React, { useEffect, useState } from 'react'
import MainDescription from '../../atom/MainDescription/MainDescription'
import MyWorkspace from '../MyWorkspace'
import request from '../../util/request'

const MyWorkspaceSection = () => {
  const [workspaceData, setWorkspaceData] = useState([])
  useEffect(() => {
    ;(async () => {
      const workspaces = await request.GET('/api/workspace')
      setWorkspaceData(workspaces.data.data)
    })()
  }, [])

  const createMyWorkspace = () => {
    return workspaceData.map((data, index) => {
      return (
        <MyWorkspace
          key={'MyWorkspace' + index}
          workspaceName={data.name}
          path={'/workspace/' + data._id}
        />
      )
    })
  }

  return (
    <>
      <section>
        <MainDescription marginLeft="0px">내 워크스페이스</MainDescription>
        {createMyWorkspace()}
      </section>
    </>
  )
}

export default MyWorkspaceSection
