import React, { useState } from 'react';
import styled from 'styled-components';

import { FaPlus } from 'react-icons/fa';
import AsyncInput from './AsyncInput';

import { bottomAction } from '../../styles/layout';

const Wrapper = styled.div`
  ${bottomAction}
`;

const Toggler = styled(FaPlus)`
  transition: transform 0.3s;

  &.active {
    transform: rotate(45deg);
  }

  cursor: pointer;
  border-radius: 50%;
`;

export default function AddInput({ submit }) {
  const [active, setActive] = useState(false);

  const toggle = () => {
    setActive(!active);
  };

  return (
    <Wrapper>
      {active && (
        <AsyncInput
          save={submit}
          closed={() => {
            setActive(false);
          }}
          inline
          bordered
        />
      )}
      <Toggler
        className={active ? 'active' : null}
        size="32"
        onClick={toggle}
      />
    </Wrapper>
  );
}
