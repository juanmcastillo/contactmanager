import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import { Link } from 'react-router-dom';

function AppHeader() {
    return (
        <Navbar inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to='/'>Contact Manager</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
        </Navbar>
    );
}

export default AppHeader;