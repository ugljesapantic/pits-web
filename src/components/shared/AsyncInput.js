import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { handleKeyPress } from '../../utils/keyboard-handler';

// TODO inputs that can be edited should have different black color
const inputStyle = css`
  /* margin: 0.5rem 1rem; */
  line-height: 2rem;
  border-radius: 3px;
  width: 100%;
  padding: ${props => (props.small ? '0.2rem 0.3rem' : '0.5rem 1rem')};
`;

const Wrapper = styled.div`
    ${props =>
      props.bordered &&
      `
        box-shadow: 0px 0px 2px 2px darkgrey;
        border-radius: 3px;
    `}
    display: ${props => (props.inline ? 'inline-block' : 'block')};
`;

const InputWrapper = styled.textarea`
  ${inputStyle};
  resize: none;
  display: block;
  box-shadow: none;
  outline: 0;
  border: none;
  color: #505b67;
  background: #eff0f1;
  ${props => props.height && `height: ${props.height}px`}

  &:disabled {
    opacity: 0.5;
  }
`;

// TODO different color when in focus
// TODO proper placeholder color
const InputPlaceholder = styled.div`
  cursor: pointer;
  background: ${props => (props.plain ? 'transparent' : '#eff0f1')};
  ${inputStyle};

  ${props => props.placeholder && 'color: #AAA'};
`;

// TODO rename to async input
// TODO add possibility of automated input
function AsyncInput(props) {
  const [value, setValue] = useState(props.value || '');
  const [height, setHeight] = useState(null);
  const [active, setActive] = useState(!props.placeholder && !props.value);
  const [updating, setUpdating] = useState(false);
  const inputEl = useRef(null);

  const save = () => {
    if ((props.value && props.value !== value) || (!props.value && value)) {
      setUpdating(true);
      props.save(value).then(() => close());
    } else {
      close();
    }
  };

  const close = () => {
    if (!props.value) setValue('');
    setActive(false);
    setUpdating(false);
    // TODO darkness my old friend
    if (props.closed) props.closed();
  };

  const cancel = () => {
    setValue(props.value || '');
    close();
  };

  const onChange = e => {
    setHeight(inputEl.current.scrollHeight);
    setValue(e.target.value);
  };

  return (
    <Wrapper
      className={props.className}
      inline={props.inline}
      bordered={props.bordered}
      small={props.small}
    >
      {active ? (
        <InputWrapper
          height={height}
          ref={inputEl}
          value={value}
          onBlur={props.blur && save}
          disabled={updating}
          autoFocus
          small={props.small}
          onKeyDown={e => handleKeyPress(e, save, cancel)}
          onChange={onChange}
          rows={1}
        />
      ) : (
        <InputPlaceholder
          plain={props.plain}
          small={props.small}
          placeholder={props.placeholder}
          onClick={() => setActive(true)}
        >
          {props.value || props.placeholder}
        </InputPlaceholder>
      )}
    </Wrapper>
  );
}

export default AsyncInput;
