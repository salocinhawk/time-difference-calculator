import React, { useRef } from 'react'
import shortid from 'shortid'
import styled from '@emotion/styled'

const Select = ({ placeholder, value, onChange, options}) => {
  const id = useRef(shortid.generate())
  return (
    <SelectWrapper>
      {/* <Label htmlFor={id.current}>{label}</Label> */}
      <StyledSelect type='text' id={id.current} value={value} onChange={onChange}>
        {options.map(opt => (
          <option value={opt.value} key={opt.value}>{opt.label}</option>
        ))}
      </StyledSelect>
    </SelectWrapper>
  )
}

const SelectWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0vw .5vw;
  height: 100%;
  justify-content: flex-end;
  padding-top: 1vw;
  margin-right: 4vw;
  &:last-of-type{
    margin-right: 0px;
  }
`

// const Label = styled('label')`
//   font-size: 1vw;
// `

const StyledSelect = styled('select')`
  font-size: 1.5vw;
  width: 5vw;
  height: 3vw;
  background: none;
  border: none;
  &:focus{
    background: rgba(255,255,255,.3);
    outline: none;
  }
`

export default Select;
