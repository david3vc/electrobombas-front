import { NavLink } from 'react-router-dom';
import { navItems } from './navConfig';

interface SidebarProps {
  onNavigate: () => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  return (
    <aside className="admin-sidebar" id="adminSidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <NavLink className="brand-mark" to="/" aria-label="adminHMD dashboard">
          <span className="brand-icon">
            <i className="bi bi-grid-1x2-fill" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <span className="brand-title">adminHMD</span>
            <span className="brand-subtitle">Admin Template</span>
          </span>
        </NavLink>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            onClick={onNavigate}
            className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
          >
            <span className="nav-icon">
              <i className={`bi ${item.icon}`} aria-hidden="true" />
            </span>
            <span className="nav-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot" />
        <span className="sidebar-footer-text">System running smoothly</span>
      </div>
    </aside>
  );
};

export default Sidebar;
