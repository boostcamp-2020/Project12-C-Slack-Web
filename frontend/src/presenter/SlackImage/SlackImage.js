import React from 'react'
import styled from 'styled-components'

function SlackImage({ onClick }) {
  return (
    <StyledImg
      alt="Slack"
      src="https://a.slack-edge.com/bv1-8/slack_logo-ebd02d1.svg"
      height="34"
      title="Slack"
      onClick={onClick}
    />
  )
}

const StyledImg = styled.img`
  cursor: pointer;
`

export default SlackImage
