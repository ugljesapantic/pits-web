import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    background: #FFF;
    border-radius: 5px;
    box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.03), 0 0px 0px 1px rgba(0, 0, 0, 0.01);
    margin: 1em 0;
`;

const HeadWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-right: 1rem;
`;

const BodyWrapper = styled.div`
    border-top: 1px solid #f5f5f5;
    padding: 0.3rem 1rem;
`;

export default class Card extends React.Component{
    render() {
        return <Wrapper>{this.props.children}</Wrapper>
    }

    static Head = (props) => {
        return (
            <HeadWrapper>{props.children}</HeadWrapper>
        )
    }

    static Body = (props) => {
        return (
            <BodyWrapper>{props.children}</BodyWrapper>
        )
    }
}



export function Body(props) {
    return (
        <BodyWrapper>{props.children}</BodyWrapper>
    )
}
