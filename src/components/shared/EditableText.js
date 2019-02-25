import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import styled  from 'styled-components';

const ClickableInputWrapper = styled.div`
    display: inline-flex;
    min-width: 15rem;
    align-items: center;
    width: 100%;
`

const TextInput = styled(Input)`
    width: 100%;

    &&& input {
        height: 2.4rem;
    }
`

const TextValue = styled.div`
    width: 100%;
    height: 2.4rem;
    line-height: 2.4rem;
    border-radius: 0.3rem;
    padding: 0 0.5rem;

    &:hover {
      /* TODO make this light gray something else */
        background-color: 'lightgray';
        cursor: pointer;
    }
`


export default function EditableText(props) {
  const onKeyPress = (e) => {
    switch(e.keyCode) {
      case 13:
        props.submit();
        break;
      case 27:
        props.cancel();
        break;
      default:
        break;
    }
  }

  return (
    <ClickableInputWrapper>
        {!props.editing  && <TextValue>{props.displayValue}</TextValue>}
        {props.editing && <TextInput 
        autoFocus={props.autoFocus} 
        disabled={props.disabled}
        value={props.value}
        onKeyDown={(e) => onKeyPress(e)}
        onChange={(_, data) => props.onChange(data.value)} />}
      </ClickableInputWrapper>
  )
}

EditableText.propTypes = {
  value: PropTypes.string,
  displayValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  submit: PropTypes.func.isRequired,
}

