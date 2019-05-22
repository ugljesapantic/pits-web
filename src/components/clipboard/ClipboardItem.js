import React, { useState } from 'react';

import styled from 'styled-components';
import { FaCopy, FaTrash } from 'react-icons/fa';
import AsyncInput from '../shared/AsyncInput';
import Swipeable from '../shared/Swipeable';
import { HoverActions } from '../../styles/layout';

const AsyncInputWrapper = styled(AsyncInput)`
  z-index: 3;
  border-radius: 3px;
  background-color: white;
`;

//  props.updateItem(props.Clipboard._id, {title})
export default function ClipboardItem({ item, remove, clipboardId, update }) {
  const [updating, setUpdating] = useState(false);

  const copy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(item.title);
    } else {
      const el = document.createElement('textarea');
      el.value = item.title;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
  };

  const removeItem = () => {
    setUpdating(true);
    remove(clipboardId, item._id);
  };

  const swipeOptions = () => ({
    actionText: { left: 'delete', right: 'copy' },
    actions: { left: removeItem, right: copy },
    updating
  });

  return (
    <Swipeable {...swipeOptions()}>
      <AsyncInputWrapper
        small
        plain
        blur
        init={item.title}
        save={title => update(clipboardId, item._id, { title })}
      />
      <HoverActions className="hover-actions">
        <FaCopy onClick={copy} />
        <FaTrash onClick={removeItem} />
      </HoverActions>
    </Swipeable>
  );
}
