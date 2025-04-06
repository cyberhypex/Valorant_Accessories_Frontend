import React from 'react';
import li from './assets/landingImage.jpg';
import { NavBar } from './NavBar/NavBar';
import { Outlet } from 'react-router-dom';

export function LandingPage() {
    return (
        <div className="position-relative min-vh-100 w-100 overflow-hidden">
            {/* Background Image */}
            <img 
                src={li} 
                alt="Valo Image" 
                className="img-fluid position-fixed top-0 start-0 object-fit-cover" 
                style={{ zIndex: -1, height: '100vh', width: '100vw' }}
            />

            {/* Navbar */}
            <NavBar />

            {/* Render nested routes here */}
            <div style={{ paddingTop: '80px', zIndex: 1, position: 'relative' }}>
                <Outlet />
            </div>
        </div>
    );
}
