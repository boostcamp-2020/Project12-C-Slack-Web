import React from 'react'
import styled from 'styled-components'
import NewWorkspaceSection from '../../organism/NewWorkspaceSection'
import MyWorkspaceSection from '../../organism/MyWorkspaceSection'

const WorkspaceSelect = () => {
  return (
    <>
      <StyledMain>
        <MainSection>
          <MyWorkspaceSection />
          <NewWorkspaceSection />
        </MainSection>
      </StyledMain>
    </>
  )
}

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
`

const MainSection = styled.section`
  display: inline-block;
`

export default WorkspaceSelect
