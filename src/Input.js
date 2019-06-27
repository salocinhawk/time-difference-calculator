import React, { useRef } from 'react'
import shortid from 'shortid'
import styled from '@emotion/styled'

const Input = ({label, placeholder, value, onChange}) => {
  const id = useRef(shortid.generate())
  return (
    <InputWrapper>
      <Label htmlFor={id.current}>{label}</Label>
      <StyledInput type='text' placeholder={placeholder} id={id.current} value={value} onChange={onChange} />
    </InputWrapper>
  )
}

const InputWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0vw .5vw;
`

const Label = styled('label')`
  font-size: 1vw;
`

const StyledInput = styled('input')`
  font-size: 2vw;
  width: 6.4vw;
  height: 3vw;
  background: none;
  border: none;
  border-radius: .3vw;
  padding-left: .5vw;
  margin-left: -.5vw;
  &:focus{
    background: rgba(255,255,255,.3);
    outline: none;
  }
`

export default Input;
