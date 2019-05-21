import React, { useState } from 'react';

import styled from 'styled-components';
import { FaCopy, FaTrash } from 'react-icons/fa';
import Swipeable from '../shared/Swipeable';
import { HoverActions } from '../../styles/layout';
import AudioPlayer from '../shared/AudioPlayer';

const AudioWrapper = styled.audio`
  z-index: 3;
  border-radius: 3px;
  background-color: white;
`;

export default function DairyAudioItem(props) {
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
      <AudioPlayer src={props.item.content} />
      <HoverActions className="hover-actions">
        <FaTrash onClick={remove} />
      </HoverActions>
    </Swipeable>
  );
}
