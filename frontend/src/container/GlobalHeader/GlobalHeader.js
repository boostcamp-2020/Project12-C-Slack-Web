import React, { useRef } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'
import Button from '../../presenter/Button'
import { signOut } from '../../api/user'

function GlobalHeader() {
  const history = useHistory()
  const isSignout = useRef(false)

  const signOutHandle = async () => {
    if (!isSignout.current) {
      isSignout.current = true
      await signOut()
      history.push('/login')
    }
  }

  return (
    <StyledDiv>
      <ButtonDiv>
        <Button type="transparent" handleClick={signOutHandle}>
          Sign out
        </Button>
      </ButtonDiv>
    </StyledDiv>
  )
}

export default GlobalHeader

const StyledDiv = styled.div`
  width: 100%;
  height: 40px;
  background: ${COLOR.GLOBAL_HEADER_BACKGROUND};
`

const ButtonDiv = styled.div`
  float: right;
  margin-right: 20px;
`
