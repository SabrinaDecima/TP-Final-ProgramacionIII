import { useState } from 'react';

const Header = ({ userEmail = 'usuario@gmail.com', handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const onLogout = () => {
    if (handleLogout) handleLogout();
  };

  return (
    <header className="w-100 shadow-sm py-2 position-relative position-fixed top-0 start-0">
      <div className="container-fluid d-flex justify-content-end align-items-center px-3">
        {/* Usuario - Avatar + Email */}
        <div className="d-flex align-items-center position-relative">
          <div
            className="d-flex align-items-center gap-2 text-decoration-none cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ userSelect: 'none' }}
          >
            {/* Avatar */}
            <div
              className="avatar rounded-circle d-flex align-items-center justify-content-center text-white fw-bold shadow-xl"
              aria-label="Avatar del usuario"
            >
              {userEmail.charAt(0).toUpperCase()}
            </div>
            {/* Email (visible en md+) */}
            <span className=" text-white mb-0 me-3 small d-none d-md-block">
              {userEmail}
            </span>
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div
              className="dropdown-menu show position-absolute top-100 end-0 mt-2"
              style={{ zIndex: 1050 }}
            >
              <a className="dropdown-item" href="/perfil">
                Ver perfil
              </a>
              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item text-danger"
                onClick={onLogout}
                style={{ cursor: 'pointer' }}
              >
                Cerrar sesión
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
