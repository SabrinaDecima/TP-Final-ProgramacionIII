import React, { useState } from 'react';

const Header = ({ userEmail = "usuario@gmail.com" }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="w-100 bg-white shadow-sm py-2 position-relative">
      <div className="container-fluid d-flex justify-content-between align-items-center px-3">
        {/* Logo */}
        <div className="logo fw-bold fs-5 text-primary">
          MiApp
        </div>

        {/* Usuario - Avatar + Email */}
        <div className="d-flex align-items-center position-relative">
          <div
            className="d-flex align-items-center gap-2 text-decoration-none cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ userSelect: 'none' }}
          >
            {/* Avatar */}
            <div
              className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-xl"
              style={{ width: '40px', height: '40px', fontSize: '0.75rem' }}
              aria-label="Avatar del usuario"
            >
              U
            </div>
            {/* Email (visible en md+) */}
            <span className="mb-0 me-3 small text-muted d-none d-md-block">
              {userEmail}
            </span>
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className="dropdown-menu show position-absolute top-100 end-0 mt-2" style={{ zIndex: 1050 }}>
              <a className="dropdown-item" href="/perfil">Ver perfil</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item text-danger" href="/logout">Cerrar sesión</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;