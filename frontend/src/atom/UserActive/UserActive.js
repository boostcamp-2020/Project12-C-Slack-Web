import React from 'react'
import styled from 'styled-components'

function UserActive(props) {
  const isActive = props.isActive
  return <UserActiveCircle isActive={isActive} />
}

const UserActiveCircle = styled.div`
  position: absolute;
  right: 2px;
  bottom: -3px;
  width: 8px;
  height: 8px;
  background: ${props => (props.isActive ? '#2AAD75' : 'white')};
  border: 1px solid black;
  border-radius: 5px;
`

export default UserActive
