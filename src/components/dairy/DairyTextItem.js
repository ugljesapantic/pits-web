import React, { useState } from 'react';

import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import AsyncInput from '../shared/AsyncInput';
import Swipeable from '../shared/Swipeable';
import { HoverActions } from '../../styles/layout';

const AsyncInputWrapper = styled(AsyncInput)`
  z-index: 3;
  border-radius: 3px;
  background-color: white;
`;

export default function DairyTextItem({ remove, item, update }) {
  const [updating, setUpdating] = useState(false);

  const removeItem = () => {
    setUpdating(true);
    remove(item._id);
  };

  const swipeOptions = () => ({
    actionText: { left: 'delete' },
    actions: { left: removeItem },
    updating
  });

  return (
    <Swipeable {...swipeOptions()}>
      <AsyncInputWrapper
        small
        plain
        blur
        init={item.content}
        save={content => update(item._id, { content })}
      />
      <HoverActions className="hover-actions">
        <FaTrash onClick={removeItem} />
      </HoverActions>
    </Swipeable>
  );
}
