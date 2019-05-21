import React, { useState } from 'react';
import AsyncInput from '../shared/AsyncInput';

import styled from 'styled-components';
import { FaCopy, FaTrash } from 'react-icons/fa';
import Swipeable from '../shared/Swipeable';
import { HoverActions } from '../../styles/layout';

const AsyncInputWrapper = styled(AsyncInput)`
  z-index: 3;
  border-radius: 3px;
  background-color: white;
`;

export default function DairyTextItem(props) {
  const [updating, setUpdating] = useState(false);

  const remove = () => {
    setUpdating(true);
    props.remove(props.item._id);
  };

  const swipeOptions = () => {
    return {
      actionText: { left: 'delete' },
      actions: { left: remove },
      updating: updating
    };
  };

  return (
    <Swipeable {...swipeOptions()}>
      <AsyncInputWrapper
        small
        plain
        blur
        value={props.item.content}
        save={content => props.update(props.item._id, { content })}
      />
      <HoverActions className="hover-actions">
        <FaTrash onClick={remove} />
      </HoverActions>
    </Swipeable>
  );
}
