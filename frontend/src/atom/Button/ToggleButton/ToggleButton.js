import React from 'react'
import styled from 'styled-components'
import { COLOR } from '../../../constant/style'
const ToggleButton = ({ value, handleChange }) => {
  return (
    <StyledToggleWrapper>
      <StyledToggleInput
        type="checkbox"
        checked={value}
        onChange={handleChange}
      />
      <StyledSwitchVisual tabIndex="-1" />
    </StyledToggleWrapper>
  )
}
const StyledToggleWrapper = styled.div`
  position: relative;
  display: inline-block;
  line-height: 0;
`
const StyledSwitchVisual = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  input:checked + &:before {
    opacity: 1;
    position: absolute;
    color: ${COLOR.WHITE};
  }
  ::before {
    content: '✔';
    top: 5px;
    left: 8px;
    display: inline-block;
    font-size: 17px;
    font-style: normal;
    font-weight: 900;
    line-height: 1;
    opacity: 0;
    position: absolute;
    transition: opacity 0.1s ease-in;
  }
  input:checked + &:after {
    background-color: ${COLOR.WHITE};
    transform: translate3d(22px, 0, 0);
  }
  ::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 6px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    background-color: ${COLOR.GRAY};
    transform-origin: center;
    transform: translateZ(0);
    transition: transform 0.1s ease-in, background-color 0.1s ease-in;
  }
`
const StyledToggleInput = styled.input`
  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 1px rgba(18, 100, 163, 1),
      0 0 0 5px rgba(29, 155, 209, 0.3);
    border-radius: 18px;
    border-color: transparent;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  margin: 0;
  width: 54px;
  height: 30px;
  border: 1px solid ${COLOR.GRAY};
  border-radius: 18px;
  background-color: ${COLOR.WHITE};
  cursor: pointer;
  transition: background-color 0.1s ease-in;
  :checked {
    background-color: ${COLOR.GREEN};
    border: none;
  }
`
export default ToggleButton
