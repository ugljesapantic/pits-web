import React, {useState} from 'react'
import AsyncInput from '../shared/AsyncInput';

import styled, {css} from 'styled-components';
import { FaShoppingCart, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const Wrapper = styled.div`
  margin: 0.3rem 0;
  height: 2rem;
  z-index: 1;
  /* TODO do something about border radius thing */
  border-radius: 3px;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: 1px 1px 1px 1px gray;

    .hover-actions {
      visibility: visible;
    }
  }
`;

const InputWrapper = styled.div`
  height: 2rem;
  z-index: 3;
  background-color: ${props => props.ordered ? 'lightgray' : 'white'};
`


const Action = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  color: white;
  font-weight: bold;
  line-height: 2rem;
  padding: 0 1rem;
  top: 0;
  left: 0;
`

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

//  props.updateItem(props.shoppingList._id, {title})
export default function ShoppingListItem(props) {
  const [position, setPosition] = useState();
  const [startPosition, setStartPosition] = useState()
  const [touching, setTouching] = useState(false);
  const [updating, setUpdating] = useState(false);

  const onTouchMove = (e) => {
    setPosition(e.targetTouches[0].clientX - startPosition);
  }

  const onTouchStart = (e) => {
    setStartPosition(e.targetTouches[0].clientX);
    setPosition(e.currentTarget.getBoundingClientRect().x);
    setTouching(true);
  }

  const onTouchEnd = (e) => {
    setTouching(false);
    const swipeDiff = e.changedTouches[0].clientX - startPosition;
    if (!props.online) {
      if (swipeDiff > 150) {
        remove();
      } else if (swipeDiff < -150) {
        purchase();
      }
    } else {
      if (!props.item.ordered) {
        if (swipeDiff > 150) {
          remove();
        } else if (swipeDiff < -150) {
          order(true);
        }
      } else {
        if (swipeDiff > 150) {
          order(false);
        } else if (swipeDiff < -150) {
          purchase();
        }
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
       return position > 0 ? 'delete' : 'purchase'
    } else {
      if (!props.item.ordered) { 
        return position > 0 ? 'delete' : 'order'
      } else {
        return position > 0 ? 'not arrived' : 'arrived'
      }
    }
  }

  const getACtionStyle = () => {
    return position > 0 ? {backgroundColor: 'red'} : {backgroundColor: 'green', textAlign: 'right'}
  }

  return (
    <Wrapper>
      {touching && <Action style={getACtionStyle()}>{getActionText()}</Action>}
      {!updating && <InputWrapper
      ordered={props.item.ordered}
      style={touching ? {
        position: 'fixed', 
        left: position,
        width: '100%',
        boxShadow: '1px 1px 1px 1px gray'
      } : {}}
      onTouchMove={onTouchMove} 
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
        <AsyncInput
        small
        plain
        blur
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
      </InputWrapper>}
    </Wrapper>
  )
}
