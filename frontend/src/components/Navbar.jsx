import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#333', padding: '15px', marginBottom: '20px' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h3 style={{ color: 'white', margin: 0 }}>Vehicle Rental</h3>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Home
        </Link>
        <Link to="/add-rental" style={{ color: 'white', textDecoration: 'none' }}>
          Add Vehicle
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;