import { useEffect } from "react";
import EmployeeLogin from "./EmployeeLogin";
import { FiGrid } from "react-icons/fi";

function AuthPage() {
  useEffect(() => {
    document.title = "Login | EMS";
  }, []);

  return (
    <div className="slds-auth-wrap">
      {/* ── Brand Panel ── */}
      <div className="slds-auth-brand">
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "48px" }}>
          <div style={{
            width: "48px", height: "48px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <FiGrid size={24} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: "22px", fontWeight: "800", letterSpacing: ".02em" }}>EMS</div>
            <div style={{ fontSize: "12px", opacity: 0.7, marginTop: "2px" }}>Employee Management</div>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "32px", fontWeight: "800", margin: "0 0 16px", lineHeight: 1.2 }}>
          Manage your workforce smarter.
        </h1>
        <p style={{ fontSize: "15px", opacity: 0.75, lineHeight: 1.7, margin: "0 0 48px" }}>
          A unified platform for employee records, asset tracking, and HR operations — built for modern teams.
        </p>

        {/* Feature bullets */}
        {[
          "Real-time employee directory",
          "Asset assignment & tracking",
          "AI-powered HR assistant",
          "Secure role-based access",
        ].map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{
              width: "20px", height: "20px", borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: "700", flexShrink: 0,
            }}>✓</div>
            <span style={{ fontSize: "14px", opacity: 0.85 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* ── Form Panel ── */}
      <div className="slds-auth-form-panel">
        <div style={{ width: "100%", maxWidth: "380px" }}>
          {/* Form header */}
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "22px", fontWeight: "700", margin: "0 0 6px", color: "var(--slds-text-default)" }}>
              Welcome back
            </h2>
            <p style={{ fontSize: "13px", color: "var(--slds-text-weak)", margin: 0 }}>
              Sign in to continue to Employee Management System
            </p>
          </div>

          <EmployeeLogin />

          {/* Footer */}
          <div style={{
            marginTop: "32px", paddingTop: "20px",
            borderTop: "1px solid var(--slds-border)",
            textAlign: "center",
            fontSize: "11px", color: "var(--slds-text-weak)",
          }}>
            © {new Date().getFullYear()} Employee Management System · All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;