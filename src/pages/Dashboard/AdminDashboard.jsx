import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUsers, FiPackage, FiSearch, FiArrowRight } from "react-icons/fi";
import { countEmployees } from "../../services/EmployeeService";
import AIChatBot from "../../components/AIChatBot";
import Layout from "../../components/layout/Layout";

function AdminDashboard() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("employee") || "{}");

  const [count, setCount] = useState(0);
  const [loadingCount, setLoadingCount] = useState(true);

  const fetchCount = async () => {
    setLoadingCount(true);
    try {
      const response = await countEmployees();
      setCount(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to Fetch Employee Count"
      );
    } finally {
      setLoadingCount(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Banner Card */}
        <div
          className="slds-card"
          style={{
            background: "linear-gradient(135deg, var(--slds-brand-darker) 0%, var(--slds-brand) 100%)",
            color: "#fff",
            border: "none",
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "12px", opacity: 0.8, textTransform: "uppercase", letterSpacing: ".05em", fontWeight: "700" }}>
              Administrator Overview
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", margin: "6px 0 4px" }}>
              Welcome back, {admin.firstName || "Admin"} 👋
            </h1>
            <p style={{ fontSize: "13px", opacity: 0.9, margin: 0 }}>
              {admin.email || "System Administrator"}
            </p>
          </div>
          <div
            className="slds-avatar slds-avatar-xl"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              color: "#fff",
              border: "2px solid rgba(255, 255, 255, 0.4)",
            }}
          >
            {admin.firstName ? admin.firstName.charAt(0).toUpperCase() : "A"}
          </div>
        </div>

        {/* Metrics Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {/* Total Employees Metric */}
          <div
            className="slds-metric-tile"
            onClick={() => navigate("/admin/employees")}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                background: "var(--slds-brand-subtle)",
                color: "var(--slds-brand)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FiUsers size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", color: "var(--slds-text-weak)", fontWeight: "600" }}>
                TOTAL EMPLOYEES
              </div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: "var(--slds-text-default)", marginTop: "2px" }}>
                {loadingCount ? <span className="slds-spinner slds-spinner-sm" /> : count}
              </div>
            </div>
            <FiArrowRight size={18} color="var(--slds-text-weak)" />
          </div>

          {/* Asset Management Shortcut */}
          <div
            className="slds-metric-tile"
            onClick={() => navigate("/admin/assets")}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                background: "var(--slds-orange-bg)",
                color: "var(--slds-orange)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FiPackage size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", color: "var(--slds-text-weak)", fontWeight: "600" }}>
                ASSET MANAGEMENT
              </div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--slds-text-default)", marginTop: "6px" }}>
                Track & Allocate Hardware
              </div>
            </div>
            <FiArrowRight size={18} color="var(--slds-text-weak)" />
          </div>

          {/* Search Shortcut */}
          <div
            className="slds-metric-tile"
            onClick={() => navigate("/admin/search")}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                background: "var(--slds-info-bg)",
                color: "var(--slds-info)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FiSearch size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", color: "var(--slds-text-weak)", fontWeight: "600" }}>
                QUICK SEARCH
              </div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--slds-text-default)", marginTop: "6px" }}>
                Filter Employee Directory
              </div>
            </div>
            <FiArrowRight size={18} color="var(--slds-text-weak)" />
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="slds-card">
          <div className="slds-card-header">
            <h2 className="slds-card-title">Quick Administration Actions</h2>
          </div>
          <div className="slds-card-body" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <button
              onClick={() => navigate("/admin/employees")}
              className="slds-btn slds-btn-outline slds-btn-lg"
              style={{ justifyContent: "flex-start" }}
            >
              <FiUsers size={16} /> View All Employees
            </button>
            <button
              onClick={() => navigate("/admin/assets")}
              className="slds-btn slds-btn-outline slds-btn-lg"
              style={{ justifyContent: "flex-start" }}
            >
              <FiPackage size={16} /> Manage Asset Inventory
            </button>
            <button
              onClick={() => navigate("/admin/search")}
              className="slds-btn slds-btn-outline slds-btn-lg"
              style={{ justifyContent: "flex-start" }}
            >
              <FiSearch size={16} /> Search Records
            </button>
          </div>
        </div>
      </div>

      <AIChatBot role="ADMIN" />
    </Layout>
  );
}

export default AdminDashboard;