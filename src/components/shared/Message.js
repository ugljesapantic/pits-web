import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
  border-radius: 3px;
  ${props =>
    props.negative &&
    `
        box-shadow: 0 0 0 1px #e0b4b4 inset, 0 0 0 0 transparent;
        background-color: #fff6f6;
        color: #9f3a38;
    `}
`;

export default function Message(props) {
  const { children } = props;
  return <Wrapper {...props}>{children}</Wrapper>;
}
