import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
            
            {/* ✅ Changed position-absolute → position-fixed top-0 start-0 */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-transparent position-fixed top-0 start-0 w-100 px-3" style={{ zIndex: 2 }}>
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
                    <ul
  className="navbar-nav mx-auto text-center"
  style={{
    fontWeight: 'bold',
    fontFamily: 'Comic Sans MS, cursive, sans-serif',
    gap: '20px',
  }}
>
<li className="nav-item me-3">
  <Link
    className="nav-link"
    to="/"
    style={{
      color: textColor,
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      transition: 'color 0.2s',
    }}
    onMouseEnter={(e) => (e.target.style.color = 'white')}
    onMouseLeave={(e) => (e.target.style.color = textColor)}
  >
    Home
  </Link>
</li>

  <li className="nav-item me-3">
    <Link
      className="nav-link"
      to="/agents"
      style={{
        color: textColor,
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.color = 'white')}
      onMouseLeave={(e) => (e.target.style.color = textColor)}
    >
      Agents
    </Link>
  </li>
  <li className="nav-item me-3">
    <Link
      className="nav-link"
      to="/gamemodes"
      style={{
        color: textColor,
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.color = 'white')}
      onMouseLeave={(e) => (e.target.style.color = textColor)}
    >
      Game Modes
    </Link>
  </li>
  <li className="nav-item me-3">
    <Link
      className="nav-link"
      to="/maps"
      style={{
        color: textColor,
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.color = 'white')}
      onMouseLeave={(e) => (e.target.style.color = textColor)}
    >
      Map
    </Link>
  </li>
  <li className="nav-item me-3">
    <Link
      className="nav-link"
      to="/weapons"
      style={{
        color: textColor,
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.color = 'white')}
      onMouseLeave={(e) => (e.target.style.color = textColor)}
    >
      Weapons
    </Link>
  </li>
  <li className="nav-item me-3">
    <Link
      className="nav-link"
      to="/competetiers"
      style={{
        color: textColor,
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        transition: 'color 0.2s',
      }}
      onMouseEnter={(e) => (e.target.style.color = 'white')}
      onMouseLeave={(e) => (e.target.style.color = textColor)}
    >
      Competitive Tier
    </Link>
  </li>
</ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
