import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components';
import { handleKeyPress } from './../../utils/keyboard-handler';

const inputStyle = css`
    padding: 0 1rem;
    margin: 0.5rem 1rem;
    height: 2.5rem;
    border-radius: 3px;
    width: ${props => props.inline ? 'auto' : 'calc(100% - 2rem)'};
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

// TODO proper placeholder color
const InputPlaceholder = styled.div`
    cursor: pointer;
    display: inline-block;
    line-height: 2.5rem;
    background: ${props => props.plain ? 'transparet' : '#eff0f1'};
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
    <React.Fragment>
        {active ? <InputWrapper
        value={value}
        // onBlur={save}
        disabled={updating}
        inline={props.inline}
        autoFocus
        onKeyDown={e => handleKeyPress(e, save, cancel)}
        onChange={e => setValue(e.target.value)}
        /> : 
        <InputPlaceholder
        plain={props.plain}
        inline={props.inline}
        placeholder={Boolean(props.placeholder)}
        onClick={() => setActive(true)}>
            {props.value || props.placeholder}
        </InputPlaceholder>}
    </React.Fragment>
  )
}

export default Input
