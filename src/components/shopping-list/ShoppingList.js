import React from 'react'

import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import AsyncInput from '../shared/AsyncInput';
import ShoppingListItem from './ShoppingListItem';

import Card from '../shared/Card';


const Title = styled(AsyncInput)`
    font-weight: bold;
    margin: 0.3rem 1rem;
`;

const ListAsyncInput = styled(AsyncInput)`
    margin: 0.3rem  0;
    `

const OnlineToggle = styled.div`
    margin: 0 0.5rem;
    font-weight: bold;
    cursor: pointer;
    background-color: #e8e8e8;
    border-radius: 10%;
    padding: 0.2em 0.4rem;


    &:not(.online) {
        opacity: 0.5;
    }
`;

const DeleteIcon = styled(FaTrash)`
    cursor: pointer;
    margin-left: auto;
`;


function ShoppingList(props) {
    console.log('lallalalalalal')

  return (
    <Card>
      <Card.Head>
        <Title blur plain inline value={props.shoppingList.title} save={title => props.update(props.shoppingList._id, {title})}/>
        <OnlineToggle
            className={(props.shoppingList.online && 'online')}
            onClick={() => props.update(props.shoppingList._id, {online: !props.shoppingList.online})}>online</OnlineToggle>
        <DeleteIcon  onClick={() => props.remove(props.shoppingList._id)}/>
      </Card.Head>
      <Card.Body>
          {props.shoppingList.items.filter(item => item.ordered && !item.purchased).map(item => 
            <ShoppingListItem 
            remove={props.removeItem}
            update={props.updateItem}
            item={item}
            listId={props.shoppingList._id}
            online={props.shoppingList.online}
            key={item._id}/>
            )}
            {props.shoppingList.items.filter(item => !item.ordered && !item.purchased).map(item => 
            <ShoppingListItem 
            remove={props.removeItem}
            update={props.updateItem}
            item={item}
            listId={props.shoppingList._id}
            online={props.shoppingList.online}
            key={item._id}/>
            )}
          <ListAsyncInput blur placeholder={'Add item'} save={title => props.addItem(props.shoppingList._id, title)}/>
      </Card.Body>
    </Card>
  )
}

ShoppingList.propTypes = {

}

export default React.memo(ShoppingList)

