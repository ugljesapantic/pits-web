import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import useWindowWidth from '../hooks/window-width';

const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 4em;
  z-index: 10;
  display: flex;
  width: 100%;
  align-items: center;
  background-color: white;
  box-shadow: 0 1px 0px rgba(0, 0, 0, 0.03), 0 1px 1px rgba(0, 0, 0, 0.05);
`;

const MenuItem = styled.div`
    color: #333333;
    font-weight: bold;
    letter-spacing: 0.1em;
    padding: 0 1em;
    cursor: pointer;
    ${({ right }) => right && 'margin-left: auto'}
    ${({ isMobile }) => isMobile && 'line-height: 4em'}
    ${({ active }) => active && 'background-color: gray; color: white'}
`;

const Burger = styled(Icon)`
  display: inline-block;
  padding: 0 1em;
  cursor: pointer;
`;

const SideMenu = styled.div`
  background: white;
  width: 180px;
  height: 100vh;
  top: 0;
  position: absolute;
  left: -180px;
  transition: left 0.3s ease-out;
  z-index: 30;

  ${({ active }) => active && 'left: 0'};
`;

const SideMenuBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  display: none;
  top: 0;
  z-index: 20;
  background-color: rgba(0, 0, 0, 0.6);

  ${({ active }) => active && 'display: block'};
`;

const TopNavigation = ({ logout, isAuthenticated, history, location }) => {
  const [active, setActive] = useState(false);
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;

  const goTo = page => {
    history.push(page);
    setActive(false);
  };

  const userPages = current => (
    <React.Fragment>
      <MenuItem
        active={current === '/dashboard'}
        isMobile
        onClick={() => goTo('dashboard')}
      >
        Dashboard
      </MenuItem>
      <MenuItem
        active={current === '/clipboard'}
        isMobile
        onClick={() => goTo('clipboard')}
      >
        Clipboard
      </MenuItem>
      <MenuItem
        active={current === '/shopping-list'}
        isMobile
        onClick={() => goTo('shopping-list')}
      >
        Shopping List
      </MenuItem>
      <MenuItem
        active={current === '/dairy'}
        isMobile
        onClick={() => goTo('dairy')}
      >
        Dairy
      </MenuItem>
    </React.Fragment>
  );

  const sideMenu = (menuActive, current) => (
    <React.Fragment>
      <SideMenuBackground
        active={menuActive}
        onClick={() => setActive(false)}
      />
      <SideMenu active={menuActive}>{userPages(current)}</SideMenu>
    </React.Fragment>
  );

  const userMenu = current => (
    <Menu responsive>
      {isMobile && (
        <Burger onClick={() => setActive(!active)} name="bars" size="large" />
      )}
      {!isMobile && userPages(current)}
      {sideMenu(isMobile && active, current)}
      <MenuItem onClick={logout} right>
        Logout
      </MenuItem>
    </Menu>
  );

  const guestMenu = () => (
    <Menu>
      <MenuItem onClick={() => goTo('')}>Home</MenuItem>
      <MenuItem onClick={() => goTo('login')} right>
        Login
      </MenuItem>
      <MenuItem onClick={() => goTo('signup')}>Sign Up</MenuItem>
    </Menu>
  );

  return isAuthenticated ? userMenu(location.pathname) : guestMenu();
};

export default TopNavigation;
