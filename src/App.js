import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import TopNavigation from './components/TopNavigation';
import GuestRoute from './components/routes/GuestRoute';
import HomePage from './components/HomePage';
import SignupPage from './components/SignupPage';
import UserRoute from './components/routes/UserRoute';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';
import { logout as logoutAction } from './actions';
import ClipboardPage from './components/clipboard/ClipboardPage';
import { main } from './styles/layout';
import ShoppingListPage from './components/shopping-list/ShoppingListPage';
import DairyPage from './components/dairy/DairyPage';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: #ebeced;
`;

const ContentWrapper = styled.div`
  ${main};
  position: relative;
  margin-left: 1em;
  margin-right: 1em;
  max-width: 200em;
`;

export const UXContext = React.createContext({});

class App extends Component {
  state = {
    ux: {
      isTouch: 'ontouchstart' in document.documentElement
    }
  };

  render() {
    const { location, history, isAuthenticated, logout } = this.props;
    const { ux } = this.state;
    return (
      <UXContext.Provider value={ux}>
        <AppWrapper ref={this.handleContextRef}>
          <TopNavigation
            location={location}
            history={history}
            isAuthenticated={isAuthenticated}
            logout={logout}
          />
          <ContentWrapper>
            <GuestRoute
              location={location}
              path="/login"
              exact
              component={LoginPage}
            />
            <GuestRoute
              location={location}
              path="/signup"
              exact
              component={SignupPage}
            />
            <GuestRoute
              location={location}
              path="/"
              exact
              component={HomePage}
            />
            <UserRoute
              location={location}
              path="/dashboard"
              exact
              component={DashboardPage}
            />
            <UserRoute
              location={location}
              path="/clipboard"
              exact
              component={ClipboardPage}
            />
            <UserRoute
              location={location}
              path="/shopping-list"
              exact
              component={ShoppingListPage}
            />
            <UserRoute
              location={location}
              path="/dairy"
              exact
              component={DairyPage}
            />
          </ContentWrapper>
        </AppWrapper>
      </UXContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.auth
  };
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
