import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components';
import { handleKeyPress } from './../../utils/keyboard-handler';

// TODO inputs that can be edited should have different black color
const inputStyle = css`
    /* margin: 0.5rem 1rem; */
    line-height: 1.5;
    border-radius: 3px;
    width: 100%;
    padding:  ${props => props.small ? '0.2rem 0.3rem' : '0.5rem 1rem'};
`

const Wrapper = styled.div`
    display: ${props => props.inline ? 'inline-block' : 'block'};
`

const InputWrapper = styled.input`
    ${inputStyle};
    box-shadow: none;
    outline: 0;
    border: none;
    color: #505b67;
    background: #eff0f1;

    &:disabled {
        opacity: 0.5;
    }
`;

// TODO different color when in focus
// TODO proper placeholder color
const InputPlaceholder = styled.div`
    cursor: pointer;
    background: ${props => props.plain ? 'transparent' : '#eff0f1'};
    ${inputStyle};

    ${props => props.placeholder && 'color: #AAA'};
`;

// TODO rename to async input
// TODO add possibility of automated input
function Input(props) {
    const [value, setValue] = useState(props.value || '');
    const [active, setActive] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        setValue(props.value || '');
    }, [props.value])

    const save = () => {
        if (props.value !== value || !value) {
            setUpdating(true);
            props.save(value).then(() => close());
        } else {
            close();
        }
    }

    const close = () => {
        if (!props.value) setValue('');
        setActive(false);
        setUpdating(false);
    }

    const cancel = () => {
        setValue(props.value || '')
        close();
    }

  return (
    <Wrapper
    className={props.className}
    inline={props.inline}
    small={props.small}>
        {active ? <InputWrapper
        value={value}
        // onBlur={save}
        disabled={updating}
        autoFocus
        small={props.small}
        onKeyDown={e => handleKeyPress(e, save, cancel)}
        onChange={e => setValue(e.target.value)}
        /> : 
        <InputPlaceholder
        plain={props.plain}
        small={props.small}
        placeholder={props.placeholder}
        onClick={() => setActive(true)}>
            {props.value || props.placeholder}
        </InputPlaceholder>}
    </Wrapper>
  )
}

export default Input
