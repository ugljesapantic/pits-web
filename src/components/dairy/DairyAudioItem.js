import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Swipeable from '../shared/Swipeable';
import { HoverActions } from '../../styles/layout';
import AudioPlayer from '../shared/AudioPlayer';

export default function DairyAudioItem({ item, remove }) {
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
      <AudioPlayer src={item.content} />
      <HoverActions className="hover-actions">
        <FaTrash onClick={removeItem} />
      </HoverActions>
    </Swipeable>
  );
}
