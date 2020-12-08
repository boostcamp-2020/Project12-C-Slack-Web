import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../constant/style'

function UserActive(props) {
  const isActive = props.isActive
  return <UserActiveCircle isActive={isActive} />
}

const UserActiveCircle = styled.div`
  width: 8px;
  height: 8px;
  background: ${props => (props.isActive ? COLOR.USER_ACTIVE : 'white')};
  border: 1px solid black;
  border-radius: 5px;
`

export default UserActive
