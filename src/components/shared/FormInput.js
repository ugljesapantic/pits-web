import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.input`
    line-height: 2rem;
    border-radius: 3px;
    width: 100%;
    padding: 0.5rem 1rem;
    box-shadow: none;
    outline: 0;
    border: none;
    color: #505b67;
    border: 1px solid transparent;
    color: #000;
    letter-spacing: 0.05rem;
    
    &::placeholder {
        opacity: 0.5;
    }

    ${props => props.error && `
        color: #db6265;
        border-color: #d2928c;
        box-shadow: 0 0 0 2px #f0d1ce;
        box-sizing: border-box;
    `}
`;

export default function FormInput(props) {
  return (
    <Wrapper {...props} />
  )
}
