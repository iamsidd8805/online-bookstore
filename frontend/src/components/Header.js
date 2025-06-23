import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleNavClick = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="logo" onClick={() => handleNavClick('/')}>
        <span role="img" aria-label="book">📚</span>
        <span className="logo-text">BookVerse</span>
      </div>
      <nav className={`nav-links${menuOpen ? ' open' : ''}`}>
        <Link to="/Home1" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
        <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
        <Link to="/order-history" onClick={() => setMenuOpen(false)}>Orders</Link>
        {!user && (
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        )}
        {user && (
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        )}
      </nav>
      <div className={`hamburger${menuOpen ? ' open' : ''}`} onClick={handleMenuToggle}>
        <span />
        <span />
        <span />
      </div>
    </header>
  );
};

export default Header;