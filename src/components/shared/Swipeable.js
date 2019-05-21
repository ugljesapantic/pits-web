import React, { useState } from 'react';

import styled from 'styled-components';

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

const ChildrenWrapper = styled.div`
  height: 2rem;
  z-index: 3;
`;

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
`;

//  props.updateItem(props.shoppingList._id, {title})
export default function Swipeable(props) {
  const [position, setPosition] = useState();
  const [startPosition, setStartPosition] = useState();
  const [touching, setTouching] = useState(false);

  const onTouchMove = e => {
    setPosition(e.targetTouches[0].clientX - startPosition);
  };

  const onTouchStart = e => {
    setStartPosition(e.targetTouches[0].clientX);
    setPosition(e.currentTarget.getBoundingClientRect().x);
    setTouching(true);
  };

  const onTouchEnd = e => {
    setTouching(false);
    const swipeDiff = e.changedTouches[0].clientX - startPosition;
    if (swipeDiff > 150) {
      props.actions.right && props.actions.right();
    } else if (swipeDiff < -150) {
      props.actions.left && props.actions.left();
    }
  };

  const getActionText = () => {
    return props.actionText[position > 0 ? 'right' : 'left'];
  };

  const getACtionStyle = () => {
    //   TODO modify colors
    return position < 0
      ? { backgroundColor: 'red', textAlign: 'right' }
      : { backgroundColor: 'green' };
  };

  return (
    <Wrapper>
      {touching && <Action style={getACtionStyle()}>{getActionText()}</Action>}
      {!props.updating && (
        <ChildrenWrapper
          style={
            touching
              ? {
                  position: 'fixed',
                  left: position,
                  width: '100%',
                  boxShadow: '1px 1px 1px 1px gray'
                }
              : {}
          }
          onTouchMove={onTouchMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {props.children}
        </ChildrenWrapper>
      )}
    </Wrapper>
  );
}
