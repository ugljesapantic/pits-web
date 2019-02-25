import React, { useState } from 'react'
import { Input, Button, Label, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import ColorPicker from '../shared/ColorPicker';

const EditLabelWrapper = styled.div`
    position: relative;
`;

// const 


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
     <React.Fragment>
         <Label>
            <ColorPicker color={color} colorPicked={(c) => setColor(c)} trigger={<Icon inverted bordered link circular name="paint brush"/>}/>
            <Input disabled={saving} onBlur={save} onKeyDown={handleKeyPress} autoFocus value={title} onChange={(e) => setTitle(e.target.value)}/>
         </Label>
     </React.Fragment> : 
     <Button onClick={() => setEditing(true)}>Add label</Button>
     }
    </EditLabelWrapper>
  )
}

export default EditLabel
