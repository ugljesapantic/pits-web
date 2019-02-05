import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import styled from 'styled-components';
import TopNavigation from './components/TopNavigation';
import {BrowserRouter} from 'react-router-dom';
import { Sticky } from 'semantic-ui-react';

import { blackColor } from './styles/colors.js'

const AppWrapper = styled.div`
  position: relative;
`

const AppBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(0deg, ${blackColor(0.8)} 0%, ${blackColor(0.8)} 10%, ${blackColor(1)} 100%);
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
      <BrowserRouter>
        <AppWrapper ref={this.handleContextRef} className="App">
          <Sticky context={contextRef} >
            <TopNavigation isAuthenticated={false}></TopNavigation>
          </Sticky> 
          <AppBody>
            <AppTitle>Welcome to the Personal Issue tracking System</AppTitle>
            <Button primary size='huge'>SIGN UP</Button>
          </AppBody>
          <div style={{height: '200vh', backgroundColor: 'lightgreen'}}>
            Landing page 2
          </div>
          <div style={{height: '200vh', backgroundColor: 'cyan'}}>
            Landing page 3
          </div>
        </AppWrapper>
      </BrowserRouter>
    );
  }
}

export default App;
