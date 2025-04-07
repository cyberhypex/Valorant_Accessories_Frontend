import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar/NavBar';

export function PageLayout() {
    return (
        <div className="min-vh-100 w-100 bg-dark text-light">
            <NavBar />
            <div style={{ paddingTop: '80px' }}>
                <Outlet />
            </div>
        </div>
    );
}
