import React from 'react'
import styled from 'styled-components';
import { fullScreen } from '../styles/layout';
import Button from './shared/Button';


const AppMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${fullScreen};
`

const AppTitle = styled.h1`
  margin-bottom: 3rem;
  max-width: 80vw;
  text-align: center;
`

/* TODO remove hardcoded divs */
const HomePage =  ({history}) =>

  <AppMain>
    <AppTitle>Welcome to the Personal Management Tool</AppTitle>
    <Button primary onClick={() => history.push('signup')}>SIGN UP</Button>
  </AppMain>

export default HomePage;
