import React, {useState} from 'react'
import EditableText from './EditableText';
import styled from 'styled-components';

const Wrapper = styled.div`

  :hover {
    background-color: lightgray;
    cursor: pointer;
    border-radius: 0.2rem;
  }
`;

function ClickableEditableText(props) {
  let [editing, setEditing] = useState(false)
  let [value, setValue] = useState(props.value);
  let [dirty, setDirty] = useState(false)
  // loading state

  const submit = (value) => {
    if(dirty) {
      props.save(value).then(() => {
        setEditing(false);
        setDirty(false);
      })
    } else {
      setEditing(false);
    }
  }

  return (
    <Wrapper onClick={() => setEditing(true)}>
        <EditableText
        value={value}
        displayValue={props.value}
        onChange={(v) => {setDirty(true); setValue(v)}}
        cancel={() => setEditing(false)}
        submit={() => submit(value)}
        autoFocus
        // disabled={updating}
        editing={editing}/>
    </Wrapper>
  )
}

export default ClickableEditableText
