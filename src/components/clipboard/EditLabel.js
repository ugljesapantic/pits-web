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

  const handleKeyPress = (e) => {
    if(e.key === 'Enter') {
        submit({color, title});
    }
  }
  
  return (
    <EditLabelWrapper>
     {editing ?
     <React.Fragment>
         <Label>
            <ColorPicker color={color} colorPicked={(c) => setColor(c)} trigger={<Icon inverted bordered link circular name="paint brush"/>}/>
            <Input onKeyPress={handleKeyPress} autoFocus value={title} onChange={(e) => setTitle(e.target.value)}/>
         </Label>
     </React.Fragment> : 
     <Button onClick={() => setEditing(true)}>Add label</Button>
     }
    </EditLabelWrapper>
  )
}

export default EditLabel
