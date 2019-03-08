import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import Input from '../shared/Input';
import ShoppingListItem from './ShoppingListItem';

const Wrapper = styled.div`
    background: #FFF;
    border-radius: 5px;
    box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.03), 0 0px 0px 1px rgba(0, 0, 0, 0.01);
    margin: 1em 0;
`;

const Head = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5em 1em;
`;

const Body = styled.div`
    border-top: 1px solid #f5f5f5;
`;

const Title = styled.div`
    font-weight: bold;
`;

const OnlineToggle = styled.div`
    margin-left: 1em;
    font-weight: bold;
    cursor: pointer;
    background-color: #e8e8e8;
    border-radius: 10%;
    padding: 0.2em 0.4em;
`;

const DeleteIcon = styled(FaTrash)`
    cursor: pointer;
    margin-left: auto;
`;

function ShoppingList(props) {
  return (
    <Wrapper>
      <Head>
      <Title>{props.shoppingList.title}</Title>
          <OnlineToggle className={(props.shoppingList.online && 'online')}>online</OnlineToggle>
          <DeleteIcon  onClick={() => props.remove(props.shoppingList._id)}/>
      </Head>
      <Body>
          {props.shoppingList.items.map(item => 
            <ShoppingListItem title={item.title} key={item._id}/>
            )}
          <Input placeholder={'Add item'} save={title => props.addItem(title)}/>
      </Body>
    </Wrapper>
  )
}

ShoppingList.propTypes = {

}

export default ShoppingList

