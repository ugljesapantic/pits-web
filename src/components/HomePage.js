import React from 'react'
import { blackGradientBackground } from '../styles/styles.js'
import styled from 'styled-components';
import { Button } from 'semantic-ui-react';

const AppMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  ${blackGradientBackground};
`

const AppTitle = styled.h1`
  margin-bottom: 3rem;
  max-width: 80vw;
  text-align: center;
`

/* TODO remove hardcoded divs */
const HomePage =  () =>
<React.Fragment>
  <AppMain>
    <AppTitle>Welcome to the Personal Issue tracking System</AppTitle>
    <Button primary size='huge'>SIGN UP</Button>
  </AppMain>
  <div style={{height: '200vh', backgroundColor: 'lightgreen'}}>
    About app
  </div>
  <div style={{height: '200vh', backgroundColor: 'cyan'}}>
    Something else
  </div>
</React.Fragment>

export default HomePage;
