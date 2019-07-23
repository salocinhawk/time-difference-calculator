import React, { useRef } from "react";
import shortid from 'shortid'
import styled from '@emotion/styled'

const Checkbox = ({ label, checked, onChange }) => {
    const id = useRef(shortid.generate());
    return (
    <CheckBoxWrapper>
        <Label htmlFor={id.current}>{label}</Label>
        <Box
            checked={checked}
            onClick={() => {
            onChange(!checked);
            }}
        />
    </CheckBoxWrapper>
    )
}

const CheckBoxWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 0vw .5vw;
`

const Label = styled('label')`
  font-size: 1vw;
`

const Box = styled("div")({
  flex: "0 0 auto",
  width: 30,
  height: 30,
  padding: 3,
  borderRadius: 3,
  background: "#ffffff",
  marginRight: 15,
  position: 'relative'
}, ({checked}) => (
  checked === true ? {
    '&::before': {
      position: 'absolute',
      left: 4,
      top: 4,
      content: '" "',
      width: 22,
      height: 22,
      borderRadius: 2,
      background: 'rgb(27, 148, 247)'
    }
  } : undefined
));

export default Checkbox;