import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'

import ChannelCard from '../../atom/ChannelCard'
import DirectMessageCard from '../../atom/DirectMessageCard'

function SectionLabel(props) {
  const [IsOpen, setIsOpen] = useState(true)
  const { sectionName, lists } = props

  const openSection = () => {
    setIsOpen(!IsOpen)
  }

  const renderChannelCards =
    lists !== undefined ? (
      lists.map((list, idx) => {
        if (list.channelType === 2) {
          return (
            <DirectMessageCard
              key={idx}
              directMessage={list}
            ></DirectMessageCard>
          )
        }
        return <ChannelCard key={idx} channel={list}></ChannelCard>
      })
    ) : (
      <div></div>
    )

  return (
    <SectionLabelStyle>
      <TitleArea onClick={openSection}>
        <IconArea>
          <TriangleIcon IsOpen={IsOpen}>▶</TriangleIcon>
        </IconArea>
        <SectionTitle>{sectionName}</SectionTitle>
      </TitleArea>
      <ListArea IsOpen={IsOpen}>{renderChannelCards}</ListArea>
    </SectionLabelStyle>
  )
}

const SectionLabelStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: baseline;
  padding: 4px 0;
`

const TitleArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  margin-left: 5px;
  user-select: none;
  cursor: pointer;
`
const openSection = keyframes`
  0% {
    transform: rotate( 0deg);
  }
  100% {
    transform: rotate( 90deg);
  }`

const closeSection = keyframes`
0% {
  transform: rotate( 90deg);
}
100% {
  transform: rotate( 0deg);
}`

const IconArea = styled.div`
  width: 18px;
  height: 18px;
  text-align: center;
  padding: 4px;

  color: #f0f0f0;
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
  }
`
const TriangleIcon = styled.div`
  width: 18px;
  height: 18px;
  width: 18px;
  height: 18px;
  text-align: center;
  transform: rotate(90deg);
  ${props =>
    props.IsOpen
      ? css`
          animation: 0.1s linear ${openSection};
          animation-direction: alternate;
          animation-fill-mode: forwards;
        `
      : css`
          animation: 0.1s linear ${closeSection};
          animation-direction: alternate;
          animation-fill-mode: forwards;
        `}
`
const SectionTitle = styled.div`
  padding-left: 10px;
  color: #f0f0f0;
  word-break: break-all;
  display: inline-block;
`
const ListArea = styled.div`
  display: ${props => (props.IsOpen ? 'flex' : 'none')};
  width: 100%;
  padding-left: 10px;
  flex-direction: column;
`
export default SectionLabel