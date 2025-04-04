import React, { useState } from 'react';

export function NavBar({ textColor = '#ff6666', onMenuToggle }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (onMenuToggle) {
            onMenuToggle(!isOpen);
        }
    };

    return (
        <>
            {isOpen && <div className="menu-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 }}></div>}
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-absolute w-100 px-3" style={{ zIndex: 2 }}>
                <div className="container">
                    {/* Hamburger Button */}
                    <button 
                        className="navbar-toggler border-0 text-light ms-auto" 
                        type="button" 
                        onClick={toggleMenu}
                        style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links */}
                    <div className={`navbar-collapse ${isOpen ? 'show' : 'collapse'}`} style={{ backgroundColor: 'transparent' }}>
                        <ul className="navbar-nav mx-auto text-center" style={{ fontWeight: 'bold', fontFamily: 'Comic Sans MS, cursive, sans-serif', gap: '20px' }}>
                            <li className="nav-item me-3"><a className="nav-link" href="#agents" style={{ color: textColor, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Agents</a></li>
                            <li className="nav-item me-3"><a className="nav-link" href="#gameModes" style={{ color: textColor, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Game Modes</a></li>
                            <li className="nav-item me-3"><a className="nav-link" href="#map" style={{ color: textColor, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Map</a></li>
                            <li className="nav-item me-3"><a className="nav-link" href="#weapons" style={{ color: textColor, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Weapons</a></li>
                            <li className="nav-item me-3"><a className="nav-link" href="#competitive" style={{ color: textColor, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Competitive</a></li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
