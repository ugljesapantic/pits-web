import React from 'react'
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types'

const TopNavigation = ({logout, isAuthenticated}) => {

    const menuOptions = {
        size: 'large',
        fixed: 'top'
    }

    const userMenu = () => (<Menu {...menuOptions} pointing>
        <Menu.Item  as={Link} to="/dashboard">Dashboard</Menu.Item>
        <Menu.Item  as={Link} to="/clipboard">Clipboard</Menu.Item>
        <Menu.Item  as={Link} to="/shopping-list">Shopping List</Menu.Item>
        <Menu.Item  position="right" onClick={logout}>Logout</Menu.Item>
    </Menu>)

    const guestMenu = () => (<Menu {...menuOptions} pointing>
        <Menu.Item as={Link} to="/">Home</Menu.Item>
        <Menu.Item as={Link} to="/login" position="right">Login</Menu.Item>
        <Menu.Item as={Link} to="/signup">Sign Up</Menu.Item>
    </Menu>)

    return isAuthenticated ? userMenu() : guestMenu();
}

TopNavigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

export default TopNavigation;
