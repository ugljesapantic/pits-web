import React, {useState} from 'react'
import AsyncInput from '../shared/AsyncInput';

import styled from 'styled-components';
import { FaShoppingCart, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
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
  background-color: ${props => props.ordered ? 'lightgray' : 'white'};
`;

//  props.updateItem(props.shoppingList._id, {title})
export default function ShoppingListItem(props) {
  const [updating, setUpdating] = useState(false);

 
  const getSwipeActions = () => {
    if (!props.online) {
      return {right: purchase, left: remove}
    } else {
      if (!props.item.ordered) {
        return {right: order.bind(null, true), left: remove}
      } else {
        return {right: purchase, left: order.bind(null, false)}
      }
    }
  }

  const order = (ordered) => {
    setUpdating(true);
    props.update(props.listId, props.item._id, {ordered});
  }

  const purchase = () => {
    setUpdating(true);
    props.update(props.listId, props.item._id, {purchased: true});
  }

  const remove = () => {
    setUpdating(true);
    props.remove(props.listId, props.item._id);
  }

  const getActionText = () => {
    if (!props.online) {
       return {left: 'delete' , right: 'purchase'}
    } else {
      if (!props.item.ordered) { 
        return {left: 'delete' , right: 'order'}
      } else {
        return {left: 'not arrived' , right: 'arrived'}
      }
    }
  }

  const swipeOptions = () => {
    return {
      actionText: getActionText(),
      actions: getSwipeActions(),
      updating: updating
    }
  }

  return (
    <Swipeable {...swipeOptions()}>
       <AsyncInputWrapper
        small
        plain
        blur
        ordered={props.item.ordered}
        value={props.item.title}
        save={title => props.update(props.listId, props.item._id, {title})}/>
      <HoverActions className="hover-actions">
        {!props.online ? <React.Fragment>
          <FaShoppingCart onClick={purchase}/>
          <FaTrash onClick={remove}/>
        </React.Fragment> :
          !props.item.ordered ? <React.Fragment>
          <FaShoppingCart onClick={() => order(true)}/>
          <FaTrash onClick={remove}/>
        </React.Fragment>: <React.Fragment>
          <FaCheck onClick={purchase}/>
          <FaTimes onClick={() => order(false)}/>
        </React.Fragment>}
      </HoverActions>
    </Swipeable>
  )
}
