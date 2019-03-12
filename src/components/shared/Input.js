import React, {useState} from 'react'
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
    ${props => props.bordered && `
        border: 1px solid black;
        border-radius: 3px;
    `}
    display: ${props => props.inline ? 'inline-block' : 'block'};
    ${props => props.inline && 'width: 12rem'};
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
    const [active, setActive] = useState(!props.placeholder && !props.value);
    const [updating, setUpdating] = useState(false);

    const save = () => {
        if ((props.value && (props.value !== value)) || (!props.value && value)) {
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
        // TODO darkness my old friend
        if (props.closed) setTimeout(() => props.closed());
    }

    const cancel = () => {
        setValue(props.value || '')
        close();
    }

  return (
    <Wrapper
    className={props.className}
    inline={props.inline}
    bordered={props.bordered}
    small={props.small}>
        {active ? <InputWrapper
        value={value}
        onBlur={save}
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
