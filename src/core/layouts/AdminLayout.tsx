import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAdminShell } from '../../hooks/useAdminShell';

/**
 * Equivalente al <div class="admin-shell"> del HTML original.
 * La plantilla adminHMD controla el estado del sidebar (mini / open) agregando
 * clases al <body> ("sidebar-mini", "sidebar-open"). Replicamos eso con un
 * efecto que sincroniza las clases del body con el estado de React.
 */
const AdminLayout = () => {
  const { sidebarMini, sidebarOpen, theme, toggleSidebar, closeMobileSidebar, toggleTheme } = useAdminShell();

  useEffect(() => {
    document.body.classList.toggle('sidebar-mini', sidebarMini);
    document.body.classList.toggle('sidebar-open', sidebarOpen);
  }, [sidebarMini, sidebarOpen]);

  return (
    <div className="admin-shell">
      <div className="sidebar-backdrop" onClick={closeMobileSidebar} />

      <Sidebar onNavigate={closeMobileSidebar} />

      <div className="admin-main">
        <Navbar theme={theme} onToggleSidebar={toggleSidebar} onToggleTheme={toggleTheme} />

        <main className="dashboard-content">
          <div className="container-fluid px-3 px-lg-4 py-4">
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
