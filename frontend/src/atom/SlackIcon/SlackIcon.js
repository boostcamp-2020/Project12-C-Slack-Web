import React from 'react'
import styled from 'styled-components'

function SlackIcon({ onClick }) {
  return (
    <>
      <ImgDiv>
        <img
          alt="Slack"
          src="https://a.slack-edge.com/bv1-8/slack_logo-ebd02d1.svg"
          height="34"
          title="Slack"
          onClick={onClick}
        ></img>
      </ImgDiv>
    </>
  )
}

const ImgDiv = styled.div`
  cursor: pointer;
`

export default SlackIcon
