import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import TopNavigation from './components/TopNavigation';
import { Sticky } from 'semantic-ui-react';

import { blackGradientBackground } from './styles/styles.js'

const AppWrapper = styled.div`
  position: relative;
`

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

class App extends Component {

  state = {};
  handleContextRef = contextRef => this.setState({ contextRef });


  render() {
    const { contextRef } = this.state;
    return (
      <AppWrapper ref={this.handleContextRef} className="App">
        <Sticky context={contextRef} >
          <TopNavigation isAuthenticated={false}></TopNavigation>
        </Sticky>
        {/* <GuestRoute location={location} path="/login" exact component={LoginPage} />
        <GuestRoute location={location} path="/signup" exact component={SignupPage} /> */}
        <AppMain>
          <AppTitle>Welcome to the Personal Issue tracking System</AppTitle>
          <Button primary size='huge'>SIGN UP</Button>
        </AppMain>
        <div style={{height: '200vh', backgroundColor: 'lightgreen'}}>
          Landing page 2
        </div>
        <div style={{height: '200vh', backgroundColor: 'cyan'}}>
          Landing page 3
        </div>
      </AppWrapper>
    );
  }
}

export default App;
