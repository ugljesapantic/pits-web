import React, {useState} from 'react'
import Input from '../shared/Input';

import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0.3rem 0;
  height: 2rem;
`;

const InputWrapper = styled.div`
  height: 2rem;
`
//  props.updateItem(props.shoppingList._id, {title})
export default function ShoppingListItem(props) {
  const [position, setPosition] = useState();
  const [startPosition, setStartPosition] = useState()
  const [touching, setTouching] = useState(false);

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
    if (swipeDiff > 150) {
      console.log('right');
    } else if (swipeDiff < -150) {
      console.log('left')
    }
  }

  return (
    <Wrapper>
      <InputWrapper 
      style={touching ? {
        position: 'fixed', 
        left: position,
        width: '100%',
        boxShadow: '1px 1px 1px 1px gray'
      } : {}}
      onTouchMove={onTouchMove} 
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}>
        <Input
        small
        plain
        value={props.item.title}
        save={title => props.update(props.listId, props.item._id, {title})}/>
      </InputWrapper>
    </Wrapper>
  )
}
