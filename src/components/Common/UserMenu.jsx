import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function UserMenu() {
  const navigate = useNavigate();
  const { userProfile, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleLogout = async () => {
    setOpen(false);
    try {
      await logout();
    } finally {
      navigate('/login');
    }
  };

  const initial = userProfile?.username?.[0]?.toUpperCase() || '?';

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-11 h-11 flex items-center justify-center rounded-neo bg-neo-primary text-white font-bold shadow-neo-button transition-all duration-200 hover:shadow-neo-lg active:shadow-neo-button-pressed"
        aria-label="Menú de usuario"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-neo-light rounded-neo shadow-neo-lg p-2 z-20 animate-slide-in">
          <div className="px-3 py-2 border-b border-neo-bg mb-1">
            <p className="text-neo-dark font-semibold truncate">{userProfile?.username}</p>
            <p className="text-neo-dark text-xs opacity-60 truncate">{userProfile?.email}</p>
          </div>

          <Link
            to="/profile"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 rounded-neo text-neo-dark hover:bg-neo-bg transition-colors"
          >
            👤 Editar perfil
          </Link>

          {userProfile?.is_admin && (
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-neo text-neo-dark hover:bg-neo-bg transition-colors"
            >
              🛠️ Panel de administración
            </Link>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded-neo text-neo-accent hover:bg-neo-bg transition-colors"
          >
            🚪 Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
