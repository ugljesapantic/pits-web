import React from 'react';

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
  margin: 0.3rem 0;
`;

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

function ShoppingList({
  shoppingList,
  update,
  remove,
  updateItem,
  addItem,
  removeItem
}) {
  return (
    <Card>
      <Card.Head>
        <Title
          blur
          plain
          inline
          init={shoppingList.title}
          save={title => update(shoppingList._id, { title })}
        />
        <OnlineToggle
          className={shoppingList.online && 'online'}
          onClick={() =>
            update(shoppingList._id, {
              online: !shoppingList.online
            })
          }
        >
          online
        </OnlineToggle>
        <DeleteIcon onClick={() => remove(shoppingList._id)} />
      </Card.Head>
      <Card.Body>
        {shoppingList.items
          .filter(item => item.ordered && !item.purchased)
          .map(item => (
            <ShoppingListItem
              remove={removeItem}
              update={updateItem}
              item={item}
              listId={shoppingList._id}
              online={shoppingList.online}
              key={item._id}
            />
          ))}
        {shoppingList.items
          .filter(item => !item.ordered && !item.purchased)
          .map(item => (
            <ShoppingListItem
              remove={removeItem}
              update={updateItem}
              item={item}
              listId={shoppingList._id}
              online={shoppingList.online}
              key={item._id}
            />
          ))}
        <ListAsyncInput
          blur
          placeholder="Add item"
          save={title => addItem(shoppingList._id, title)}
        />
      </Card.Body>
    </Card>
  );
}

ShoppingList.propTypes = {};

export default React.memo(ShoppingList);
