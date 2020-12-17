import React, { useState } from 'react'
import styled from 'styled-components'
import CreateWorkspacecName from '../../container/CreateWorkspaceName'
import CreateWorkspaceInitChannel from '../../container/CreateWorkspaceInitChannel'

const CreateWorkspace = () => {
  const [workspaceName, setWorkspaceName] = useState('')
  const [isInputName, setIsInputName] = useState(false)
  return (
    <>
      <StyledMain>
        <MainSection>
          {!isInputName ? (
            <CreateWorkspacecName
              workspaceName={workspaceName}
              setWorkspaceName={setWorkspaceName}
              setIsInputName={setIsInputName}
            />
          ) : (
            <CreateWorkspaceInitChannel workspaceName={workspaceName} />
          )}
        </MainSection>
      </StyledMain>
    </>
  )
}

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  padding: 0px 120px;
`

const MainSection = styled.section`
  display: inline-block;
  width: 100%;
  max-width: 600px;
`

export default CreateWorkspace
