import React from 'react'
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const AppMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AppTitle = styled.h1`
  margin-bottom: 3rem;
  max-width: 80vw;
  text-align: center;
`

/* TODO remove hardcoded divs */
const HomePage =  ({location}) =>
<React.Fragment>
  <AppMain>
    <AppTitle>Welcome to the Personal Issue tracking System</AppTitle>
    <Button primary size='huge'>SIGN UP</Button>
  </AppMain>
</React.Fragment>

export default HomePage;
