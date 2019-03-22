import React, {useState, useRef} from 'react'
import AsyncInput from '../shared/AsyncInput';

import styled, {css} from 'styled-components';
import { FaCopy, FaTrash } from 'react-icons/fa';
import Swipeable from './../shared/Swipeable';

const HoverActions = styled.div`
  visibility: hidden;
  position: absolute;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  top: 0;

  & > * {
    cursor: pointer;
    margin: 0 0.5rem;
  }
`;

const AsyncInputWrapper = styled(AsyncInput)`
  z-index: 3;
  border-radius: 3px;
  background-color: white;
`;

//  props.updateItem(props.Clipboard._id, {title})
export default function ClipboardItem(props) {
  const [updating, setUpdating] = useState(false);
  const el = useRef(null)

const copy = () => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(props.item.title)
    } else {
        const el = document.createElement('textarea');
        el.value = props.item.title;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    console.log(el)
    // e.target.classList.toggle('copied');
    // setTimeout((el) => el.classList.toggle('copied'), 200, e.target);
}

  const remove = () => {
    setUpdating(true);
    props.remove(props.clipboardId, props.item._id);
  }
  
  const swipeOptions = () => {
    return {
      actionText: {left: 'delete' , right: 'copy'},
      actions: {left: copy, right: remove},
      updating: updating
    }
  }



  return (
    <Swipeable {...swipeOptions()}>
       <AsyncInputWrapper
        small
        plain
        blur
        value={props.item.title}
        save={title => props.update(props.clipboardId, props.item._id, {title})}/>
      <HoverActions className="hover-actions">
        <FaCopy onClick={copy}/>
        <FaTrash onClick={remove}/>
      </HoverActions>
    </Swipeable>
  )
}
