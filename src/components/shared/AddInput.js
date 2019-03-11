import React, {useState} from 'react'
import styled from 'styled-components';

import Input from '../shared/Input';

import { FaPlus } from 'react-icons/fa';

const Wrapper = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;  
  display: flex;
  align-items: center;
  height: 3rem;

  i {
      cursor: pointer;
  }
`;

const Toggler = styled(FaPlus)`
  transition: transform 0.3s;

  &.active {
    transform: rotate(45deg);
  }

  cursor: pointer;
  border-radius: 50%;
`;

export default function AddInput(props) {
    let [active, setActive] = useState(false)
 
  return (
    <Wrapper>
        {active && <Input 
        save={props.submit}
        saved={() => setActive(false)}
        inline bordered/>}
        <Toggler className={active && 'active'} size="32" onClick={() => setActive(!active)} />
    </Wrapper>
  )
}
