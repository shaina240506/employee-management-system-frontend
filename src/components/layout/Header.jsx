import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiUser,
  FiLock,
  FiLogOut,
  FiX,
} from "react-icons/fi";

function Header({ title }) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu]           = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const menuRef = useRef(null);
  const employee = JSON.parse(localStorage.getItem("employee"));

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employee");
    navigate("/");
  };

  return (
    <>
      <header className="slds-header">
        {/* Page Title */}
        <h1 style={{ fontSize: "15px", fontWeight: "700", margin: 0, color: "var(--slds-text-default)" }}>
          {title}
        </h1>

        {/* Right Controls */}
        <div style={{ position: "relative" }} ref={menuRef}>
          <button
            onClick={() => setShowMenu((v) => !v)}
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "transparent", border: "1px solid var(--slds-border)",
              borderRadius: "4px", padding: "5px 10px", cursor: "pointer",
              transition: "background var(--t-fast)", fontFamily: "inherit",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--slds-bg)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div className="slds-avatar slds-avatar-sm" style={{ fontSize: "12px" }}>
              {employee?.firstName?.charAt(0)?.toUpperCase()}
            </div>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "var(--slds-text-default)" }}>
              {employee?.firstName}
            </span>
            <FiChevronDown size={13} color="var(--slds-text-weak)" />
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div style={{
              position: "absolute", right: 0, top: "calc(100% + 6px)",
              background: "#fff", border: "1px solid var(--slds-border)",
              borderRadius: "6px", boxShadow: "var(--slds-shadow-md)",
              width: "220px", overflow: "hidden", zIndex: 500,
              animation: "slds-slideup .1s ease",
            }}>
              {/* User card */}
              <div style={{
                padding: "12px 16px", borderBottom: "1px solid var(--slds-border)",
                background: "var(--slds-bg)",
              }}>
                <div style={{ fontSize: "13px", fontWeight: "700" }}>
                  {employee?.firstName} {employee?.lastName}
                </div>
                <div style={{ fontSize: "11px", color: "var(--slds-text-weak)", marginTop: "2px" }}>
                  {employee?.email}
                </div>
              </div>

              {[
                {
                  icon: FiUser,
                  label: "Update Profile",
                  action: () => { setShowMenu(false); navigate("/employee/update-profile"); },
                  danger: false,
                },
                {
                  icon: FiLock,
                  label: "Change Password",
                  action: () => { setShowMenu(false); navigate("/employee/change-password"); },
                  danger: false,
                },
              ].map(({ icon: Icon, label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 16px", background: "transparent", border: "none",
                    cursor: "pointer", fontSize: "13px", fontFamily: "inherit",
                    color: "var(--slds-text-default)", transition: "background var(--t-fast)",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--slds-bg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}

              <div className="slds-divider" />

              <button
                onClick={() => { setShowMenu(false); setShowLogoutModal(true); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: "10px",
                  padding: "10px 16px", background: "transparent", border: "none",
                  cursor: "pointer", fontSize: "13px", fontFamily: "inherit",
                  color: "var(--slds-error)", transition: "background var(--t-fast)",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--slds-error-bg)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <FiLogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="slds-modal-backdrop">
          <div className="slds-modal" style={{ width: "400px" }}>
            <div className="slds-modal-header">
              <h2 className="slds-modal-title">Confirm Logout</h2>
              <button
                className="slds-btn-icon"
                onClick={() => setShowLogoutModal(false)}
                style={{ color: "var(--slds-text-weak)" }}
              >
                <FiX size={16} />
              </button>
            </div>
            <div className="slds-modal-body">
              <p style={{ margin: 0, color: "var(--slds-text-weak)", lineHeight: 1.6 }}>
                Are you sure you want to end your current session and log out?
              </p>
            </div>
            <div className="slds-modal-footer">
              <button className="slds-btn slds-btn-neutral" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="slds-btn slds-btn-destructive-filled" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
