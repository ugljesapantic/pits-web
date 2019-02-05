import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';

const AppWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%);
`

const AppTitle = styled.h1`
  margin-bottom: 3rem;
  max-width: 80vw;
  text-align: center;
`

class App extends Component {
  render() {
    return (
      <AppWrapper className="App">
        <AppTitle>Welcome to the Personal Issue tracking System</AppTitle>
        <Button primary size='massive'>SIGN UP</Button>
      </AppWrapper>
    );
  }
}

export default App;
