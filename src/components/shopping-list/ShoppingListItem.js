import React, { useState } from 'react';

import styled from 'styled-components';
import { FaShoppingCart, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import AsyncInput from '../shared/AsyncInput';
import Swipeable from '../shared/Swipeable';
import { HoverActions } from '../../styles/layout';

const AsyncInputWrapper = styled(AsyncInput)`
  z-index: 3;
  border-radius: 3px;
  background-color: ${props => (props.ordered ? 'lightgray' : 'white')};
`;

//  props.updateItem(props.shoppingList._id, {title})
export default function ShoppingListItem({ item, listId, update, online }) {
  const [updating, setUpdating] = useState(false);

  const order = ordered => {
    setUpdating(true);
    update(listId, item._id, { ordered });
  };

  const purchase = () => {
    setUpdating(true);
    update(listId, item._id, { purchased: true });
  };

  const remove = () => {
    setUpdating(true);
    remove(listId, item._id);
  };

  const getActionText = () => {
    if (!online) {
      return { left: 'delete', right: 'purchase' };
    }
    if (!item.ordered) {
      return { left: 'delete', right: 'order' };
    }
    return { left: 'not arrived', right: 'arrived' };
  };

  const getSwipeActions = () => {
    if (!online) {
      return { right: purchase, left: remove };
    }
    if (!item.ordered) {
      return { right: order.bind(null, true), left: remove };
    }
    return { right: purchase, left: order.bind(null, false) };
  };

  const swipeOptions = () => ({
    actionText: getActionText(),
    actions: getSwipeActions(),
    updating
  });

  return (
    <Swipeable {...swipeOptions()}>
      <AsyncInputWrapper
        small
        plain
        blur
        ordered={item.ordered}
        init={item.title}
        save={title => update(listId, item._id, { title })}
      />
      <HoverActions className="hover-actions">
        {!online && (
          <React.Fragment>
            <FaShoppingCart onClick={purchase} />
            <FaTrash onClick={remove} />
          </React.Fragment>
        )}
        {online && !item.ordered ? (
          <React.Fragment>
            <FaShoppingCart onClick={() => order(true)} />
            <FaTrash onClick={remove} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <FaCheck onClick={purchase} />
            <FaTimes onClick={() => order(false)} />
          </React.Fragment>
        )}
      </HoverActions>
    </Swipeable>
  );
}
