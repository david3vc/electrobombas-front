import { Link } from 'react-router-dom';
import avatar from '../templates/images/avatar/avatar.jpg';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
}

const notifications = [
  { title: 'New user registered', time: '4 minutes ago', to: '/users' },
  { title: 'Revenue target reached', time: '32 minutes ago', to: '/charts' },
  { title: 'Security review completed', time: '1 hour ago', to: '/settings' },
];

const Navbar = ({ theme, onToggleSidebar, onToggleTheme }: NavbarProps) => {
  return (
    <nav className="navbar admin-navbar navbar-expand bg-white">
      <div className="container-fluid px-3 px-lg-4">
        <button
          className="sidebar-toggle"
          type="button"
          aria-controls="adminSidebar"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          <span />
          <span />
          <span />
        </button>

        <form className="d-none d-md-flex ms-3 flex-grow-1" role="search" onSubmit={(e) => e.preventDefault()}>
          <input className="form-control search-input" type="search" placeholder="Search users, orders, reports" aria-label="Search" />
        </form>

        <div className="navbar-actions ms-auto">
          <button
            className="icon-button theme-toggle"
            type="button"
            aria-label="Switch color theme"
            title="Switch color theme"
            onClick={onToggleTheme}
          >
            <i className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}`} aria-hidden="true" />
          </button>

          <div className="dropdown">
            <button className="icon-button" type="button" data-bs-toggle="dropdown" aria-expanded="false" aria-label="Notifications">
              <span className="notification-dot" />
              <i className="bi bi-bell" aria-hidden="true" />
            </button>
            <div className="dropdown-menu dropdown-menu-end notification-menu">
              <div className="dropdown-header fw-bold text-body">Notifications</div>
              {notifications.map((n) => (
                <Link key={n.title} className="dropdown-item" to={n.to}>
                  <span className="notification-title">{n.title}</span>
                  <span className="notification-time">{n.time}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="dropdown">
            <button className="profile-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img className="avatar-img avatar-sm" src={avatar} alt="Admin" />
              <span className="profile-name d-none d-sm-inline">Admin</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/settings">Account settings</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><Link className="dropdown-item" to="/login">Sign out</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
