import React from 'react'
import styled from 'styled-components'
import NewWorkspaceSection from '../../presenter/NewWorkspaceSection'
import MyWorkspaceSection from '../../container/MyWorkspaceSection'

const SelectWorkspace = () => {
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

export default SelectWorkspace
