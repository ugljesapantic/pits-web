import React, { useState } from 'react'
import { Input, Label, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import ColorPicker from '../shared/ColorPicker';

const EditLabelWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

const LabelInputWrapper = styled.div`
  background-color: lightgray;
  padding: 0.3em;
  border-radius: 0.3em;
  line-height: normal;

  input {
    height: 2.4em;
  }
`;

function EditLabel({submit}) {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('black');
  const [saving, setSaving] = useState(false);
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
  
  return (
    <EditLabelWrapper>
     {editing ?
        <LabelInputWrapper>
          <ColorPicker color={color} colorPicked={(c) => setColor(c)} trigger={<Icon inverted bordered link circular name="paint brush"/>}/>
          <Input disabled={saving}  onKeyDown={handleKeyPress} autoFocus value={title} onChange={(e) => setTitle(e.target.value)}/>
        </LabelInputWrapper> : 
     <Icon circular link name="add" onClick={() => setEditing(true)} />
     }
    </EditLabelWrapper>
  )
}

export default EditLabel
