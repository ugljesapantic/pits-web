import React, {useState} from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'
import useWindowWidth from './../hooks/window-width';
import { Icon } from 'semantic-ui-react';

const Menu = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 4em;
    z-index: 10;
    display: flex;
    width: 100%;
    align-items: center;
`;

const MenuItem = styled.div`
    color: #333333;
    font-weight: bold;
    letter-spacing: 0.1em;
    padding: 0 1em;
    cursor: pointer;
    ${({right}) => right && 'margin-left: auto'}
    ${({isMobile}) => isMobile && 'line-height: 4em'}
`

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

     ${({active}) => active && 'left: 0'};
`

const SideMenuBackground = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    display: none;
    top: 0;
    z-index: 20;
    background-color: rgba(0,0,0, 0.6);

    ${({active}) => active && 'display: block'};
`


const TopNavigation = ({logout, isAuthenticated, history}) => {
    const [active, setActive] = useState(false);
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth < 768;

    const goTo = (page) => {
        history.push(page)
    }

    const userPages = () => <React.Fragment>
        <MenuItem isMobile onClick={() => goTo('dashboard')}>Dashboard</MenuItem>
        <MenuItem isMobile onClick={() => goTo('clipboard')}>Clipboard</MenuItem>
        <MenuItem isMobile onClick={() => goTo('shopping-list')}>Shopping List</MenuItem>
    </React.Fragment>

    const sideMenu = (active) => 
    <React.Fragment>
        <SideMenuBackground active={active} onClick={() => setActive(false)}>
        </SideMenuBackground>
        <SideMenu active={active}>
            {userPages()}
        </SideMenu>
    </React.Fragment>
    
    const userMenu = () => (<Menu responsive>
        {isMobile && <Burger onClick={() => setActive(!active)} name="bars" size="large"/>}
        {!isMobile && userPages()}
        {sideMenu(isMobile && active)}
        <MenuItem  onClick={logout} right>Logout</MenuItem>
    </Menu>)

    const guestMenu = () => (<Menu>
        <MenuItem onClick={() => goTo('')}>Home</MenuItem>
        <MenuItem onClick={() => goTo('login')} right={true}>Login</MenuItem>
        <MenuItem onClick={() => goTo('signup')}>Sign Up</MenuItem>
    </Menu>)

    return isAuthenticated ? userMenu() : guestMenu();
}

TopNavigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

export default TopNavigation;
