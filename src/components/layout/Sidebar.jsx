import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiSearch,
  FiPackage,
  FiGrid,
} from "react-icons/fi";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const employee = JSON.parse(localStorage.getItem("employee"));
  const isAdmin = employee?.role === "ADMIN";

  const adminNavItems = [
    { icon: FiHome,    label: "Dashboard",  path: "/admin/dashboard" },
    { icon: FiUsers,   label: "Employees",  path: "/admin/employees" },
    { icon: FiSearch,  label: "Search",     path: "/admin/search" },
    { icon: FiPackage, label: "Assets",     path: "/admin/assets" },
  ];

  const employeeNavItems = [
    { icon: FiHome, label: "Dashboard", path: "/employee/dashboard" },
  ];

  const navItems = isAdmin ? adminNavItems : employeeNavItems;

  return (
    <div className="slds-sidebar">
      {/* Logo */}
      <div style={{
        padding: "18px 16px",
        borderBottom: "1px solid var(--slds-nav-border)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}>
        <div style={{
          width: "34px",
          height: "34px",
          background: "var(--slds-brand)",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}>
          <FiGrid size={18} color="#fff" />
        </div>
        <div>
          <div style={{ color: "#fff", fontWeight: "800", fontSize: "14px", letterSpacing: ".02em" }}>
            EMS
          </div>
          <div style={{ color: "var(--slds-nav-text)", fontSize: "10px", letterSpacing: ".03em" }}>
            Employee Manager
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, paddingTop: "8px" }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "10px 16px",
                background: isActive ? "var(--slds-nav-active-bg)" : "transparent",
                border: "none",
                borderLeft: isActive
                  ? "3px solid var(--slds-brand)"
                  : "3px solid transparent",
                color: isActive ? "var(--slds-nav-text-active)" : "var(--slds-nav-text)",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "inherit",
                fontWeight: isActive ? "600" : "400",
                transition: "all var(--t-fast)",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "var(--slds-nav-hover-bg)";
                  e.currentTarget.style.color = "var(--slds-nav-text-active)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--slds-nav-text)";
                }
              }}
            >
              <Icon size={15} style={{ flexShrink: 0 }} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Footer */}
      <div style={{
        padding: "14px 16px",
        borderTop: "1px solid var(--slds-nav-border)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="slds-avatar slds-avatar-sm" style={{ background: "var(--slds-brand-dark)" }}>
            {employee?.firstName?.charAt(0)?.toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              color: "#fff",
              fontSize: "12px",
              fontWeight: "600",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
              {employee?.firstName} {employee?.lastName}
            </div>
            <div style={{ color: "var(--slds-nav-text)", fontSize: "10px", marginTop: "1px" }}>
              {employee?.role === "ADMIN" ? "Administrator" : "Employee"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
