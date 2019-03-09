import React from 'react'
import Input from '../shared/Input';

import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0.3rem 0;
`;
//  props.updateItem(props.shoppingList._id, {title})
export default function ShoppingListItem(props) {
  return (
    <Wrapper>
      <Input small plain value={props.item.title} save={title => props.update(props.listId, props.item._id, {title})}/>
    </Wrapper>
  )
}
