import React, {useState} from 'react'
import { Icon, Sticky, Input } from 'semantic-ui-react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;  
  display: flex;
  align-items: center;
  height: 3rem;

  i {
      cursor: pointer;
  }
`;

export default function AddInput(props) {
    let [active, setActive] = useState(false)
    let [value, setValue] = useState('');
    let [saving, setSaving] = useState(false);

    const save = () => {
      if (value) {
        setSaving(true);
        props.submit(value).then(() => {
          setActive(false);
          setValue('');
          setSaving(false);
        })
      } else {
        setActive(false);
        setValue('');
      }
    }

    const onKeyDown = (e) => {
        switch(e.keyCode) {
          case 13:
            save()
            break;
          case 27:
            setActive(false);
            setValue('');
            break;
          default:
            break;
        }
      }

    //   todo press enter to save popup
  return (
    <Wrapper>
        {active && <Input 
        onBlur={save}
        disabled={saving}
        onChange={(_, data) => setValue(data.value)}
        onKeyDown={(e) => onKeyDown(e)}
        value={value}
        autoFocus/>}
        {!active && <Icon  size="big" name="add circle" onClick={() => setActive(true)} />}
        {active && <Icon size="big" name="times circle" onClick={() => {
            setActive(false);
            setValue('');
        }} />}
    </Wrapper>
  )
}
