import React from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import ClipboardItem from './ClipboardItem';

import Card from '../shared/Card';
import AsyncInput from './../shared/AsyncInput';
import { FaTrash } from 'react-icons/fa';

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

function Clipboard(props) {
  return (
    <Card>
      <Card.Head>
        <Title
          blur
          plain
          inline
          value={props.clipboard.title}
          save={title => props.update(props.clipboard._id, { title })}
        />
        <DeleteIcon onClick={() => props.remove(props.clipboard._id)} />
      </Card.Head>
      <Card.Body>
        {props.clipboard.items.map(item => (
          <ClipboardItem
            remove={props.removeItem}
            update={props.updateItem}
            item={item}
            clipboardId={props.clipboard._id}
            key={item._id}
          />
        ))}
        <ListAsyncInput
          blur
          placeholder={'Add item'}
          save={title => props.addItem(props.clipboard._id, title)}
        />
      </Card.Body>
    </Card>
  );
}

Clipboard.propTypes = {
  clipboard: PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        value: PropTypes.string
      })
    )
  }),
  addItem: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

export default Clipboard;
