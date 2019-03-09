import React, { useState } from 'react'
import { Input, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import ColorPicker from '../shared/ColorPicker';

const EditLabelWrapper = styled.div`
    position: relative;
    display: ${(props) => props.editing ? 'block' : 'inline-block'} ;
    ${(props) => props.editing && 'width: 16.2em'}
`;

const LabelInputWrapper = styled.div`
  background-color: lightgray;
  padding: 0.3rem;
  border-radius: 0.3rem;
  line-height: normal;

  input {
    height: 2.4rem;
  }
`;

function EditLabel({submit}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('black');
  const [saving, setSaving] = useState(false);
  let wrapper = React.createRef();
  // add saving state

  const save = () => {
    if (title) {
      setSaving(true);
      submit({color, title}).then(() => {
        setEditing(false);
        setTitle('');
        setColor('black');
        setSaving(false);
      });
    } else {
      setTitle('');
      setEditing(false);
    }
  }

  // todo extract to something reusable, like a method with enter, and esc callback
  const handleKeyPress = (e) => {
    switch(e.keyCode) {
      case 13:
        save();
        break;
      case 27:
        setTitle('');
        setEditing(false);
        break;
      default:
        break;
    }  
  }

  // todo could be reusable
  const onBlur = () =>  {

    setTimeout(() => {
      if (!wrapper.current.contains(document.activeElement)) {
          save();
      }
    }, 0);
  }
  
  // todo pattern with tabindex ref and onblur timeout
  return (
    <EditLabelWrapper tabIndex={1} editing={editing} ref={wrapper}>
     {editing ?
        <LabelInputWrapper>
          <ColorPicker color={color} colorPicked={(c) => setColor(c)} trigger={<Icon inverted bordered link circular name="paint brush"/>}/>
          <Input onBlur={onBlur} disabled={saving}  onKeyDown={handleKeyPress} autoFocus value={title} onChange={(e) => setTitle(e.target.value)}/>
        </LabelInputWrapper> : 
     <Icon circular link name="add" onClick={() => setEditing(true)} />
     }
    </EditLabelWrapper>
  )
}

export default EditLabel
