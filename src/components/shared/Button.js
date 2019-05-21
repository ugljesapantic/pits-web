import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  padding: 0 1.4rem;
  line-height: 3rem;
  border-radius: 3px;
  outline: none;
  border: none;
  font-weight: bold;
  cursor: pointer;

  ${props =>
    props.primary &&
    `
      background: #fff;
      color: #333333;
    `}
`;

export default function Button(props) {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
}
