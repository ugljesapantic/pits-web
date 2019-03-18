import React, {useContext} from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';
import AsyncInput from '../shared/AsyncInput';
import ShoppingListItem from './ShoppingListItem';
import { UXContext } from './../../App';

const Wrapper = styled.div`
    background: #FFF;
    border-radius: 5px;
    box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.03), 0 0px 0px 1px rgba(0, 0, 0, 0.01);
    margin: 1em 0;
`;

const Head = styled.div`
    display: flex;
    align-items: center;
    padding-right: 1rem;
`;

const Body = styled.div`
    border-top: 1px solid #f5f5f5;
    padding: 0.3rem 1rem;
`;

const Title = styled(AsyncInput)`
    font-weight: bold;
    margin: 0.3rem 1rem;
`;

const ListAsyncInput = styled(AsyncInput)`
    margin: 0.3rem  0;
    `

const OnlineToggle = styled.div`
    margin-left: 0.5rem;
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
    const ux = useContext(UXContext);
    console.log(ux);
  return (
    <Wrapper>
      <Head>
        <Title plain inline value={props.shoppingList.title} save={title => props.update(props.shoppingList._id, {title})}/>
        <OnlineToggle
            className={(props.shoppingList.online && 'online')}
            onClick={() => props.update(props.shoppingList._id, {online: !props.shoppingList.online})}>online</OnlineToggle>
        <DeleteIcon  onClick={() => props.remove(props.shoppingList._id)}/>
      </Head>
      <Body>
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
          <ListAsyncInput placeholder={'Add item'} save={title => props.addItem(props.shoppingList._id, title)}/>
      </Body>
    </Wrapper>
  )
}

ShoppingList.propTypes = {

}

export default ShoppingList

