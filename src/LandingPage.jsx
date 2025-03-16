import React from 'react';
import li from './assets/landingImage.jpg';
import { NavBar } from './NavBar/NavBar';

export function LandingPage() {
    return (
        <div className="position-relative vh-100 w-100 overflow-hidden">
            {/* Navbar */}
            <div style={{ position: 'absolute', top: '50px', width: '100%' }}>
                <NavBar />
            </div>
            <>
            {/* Background Image */}
            <img 
                src={li} 
                alt="Valo Image" 
                className="img-fluid object-fit-cover" 
                style={{ maxHeight: '100vh', maxWidth: '100vw', height: '100vh', width: '100vw' }}
            />
            </>
        </div>
    );
}
