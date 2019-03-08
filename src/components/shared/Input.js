import React, {useState} from 'react'
import styled from 'styled-components';
import { handleKeyPress } from './../../utils/keyboard-handler';

const InputWrapper = styled.input`
    background: #eff0f1;
    box-shadow: none;
    outline: 0;
    border: none;
    padding: 0 1rem;
    margin: 0.5rem 1rem;
    width: calc(100% - 2rem);
    height: 2.5rem;
    font-weight: 500;
    color: #505b67;
    border-radius: 3px;

    &:not(:focus) {
        cursor: pointer;
    }

    &:focus::placeholder {
        color: transparent;
    }

    ::placeholder {
        font-weight: 100;
    }
`;

function Input(props) {
    let ref;
    const [value, setValue] = useState('');

    const save = () => {
        if (value) {
            props.save(value);
        }
        reset();
    }

    const reset = () => {
        if (!value) ref.blur();
        setValue('');
    }

  return (
    <InputWrapper
    ref={(input) => { ref = input; }}
    value={value}
    onBlur={save}
    placeholder={props.placeholder}
    onKeyDown={e => handleKeyPress(e, save, reset)}
    onChange={e => setValue(e.target.value)}
    />
  )
}

export default Input
