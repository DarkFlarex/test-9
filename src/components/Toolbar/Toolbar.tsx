import React from 'react';
import { NavLink } from 'react-router-dom';

const Toolbar: React.FC = () => {
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    Finance Tracker
                </NavLink>
                <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
                    <li className="nav-item">
                        <NavLink to="/categories" className="nav-link">
                            Categories
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/add_transaction" className="nav-link">
                            Add transaction
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Toolbar;
