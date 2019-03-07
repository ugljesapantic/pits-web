import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components';

const Wrapper = styled.div`
    box-shadow: rgb(204, 204, 204) 0px 1px 2px;
    margin: 0.5em;
`;

const Head = styled.div`
    display: flex;
    align-items: center;
`;

const Body = styled.div`
    
`;

const Title = styled.div`
    
`;

const OnlineToggle = styled.div`
    margin-left: 0.5em;
    cursor: pointer;
    background-color: #e8e8e8;
    border-radius: 10%;
    padding: 0.2em 0.4em;
`;

function ShoppingList(props) {
  return (
    <Wrapper>
      <Head>
          <Title>{props.shoppingList.title}</Title>
          <OnlineToggle className={(props.shoppingList.online && 'online')}>online</OnlineToggle>
      </Head>
      <Body>
          
      </Body>
    </Wrapper>
  )
}

ShoppingList.propTypes = {

}

export default ShoppingList

