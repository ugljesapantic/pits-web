import React from 'react';
import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import ClipboardItem from './ClipboardItem';

import Card from '../shared/Card';
import AsyncInput from '../shared/AsyncInput';

const Title = styled(AsyncInput)`
  font-weight: bold;
  margin: 0.3rem 1rem;
`;

const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  margin-left: auto;
`;

const ListAsyncInput = styled(AsyncInput)`
  margin: 0.3rem 0;
`;

function Clipboard({
  clipboard,
  remove,
  update,
  addItem,
  removeItem,
  updateItem
}) {
  return (
    <Card>
      <Card.Head>
        <Title
          blur
          plain
          inline
          init={clipboard.title}
          save={title => update(clipboard._id, { title })}
        />
        <DeleteIcon onClick={() => remove(clipboard._id)} />
      </Card.Head>
      <Card.Body>
        {clipboard.items.map(item => (
          <ClipboardItem
            remove={removeItem}
            update={updateItem}
            item={item}
            clipboardId={clipboard._id}
            key={item._id}
          />
        ))}
        <ListAsyncInput
          blur
          placeholder="Add item"
          save={title => addItem(clipboard._id, title)}
        />
      </Card.Body>
    </Card>
  );
}

export default Clipboard;
