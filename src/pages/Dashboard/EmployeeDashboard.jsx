import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AIChatBot from "../../components/AIChatBot";
import Layout from "../../components/layout/Layout";
import {
  FaLaptop,
  FaDesktop,
  FaKeyboard,
  FaMouse,
  FaMobileAlt,
  FaHeadphones,
  FaIdBadge,
  FaPlug,
} from "react-icons/fa";
import { MdMonitor } from "react-icons/md";
import { getEmployeeAssets } from "../../services/AssetService";

function Dashboard() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(true);

  const employee = JSON.parse(localStorage.getItem("employee") || "{}");

  const fetchAssets = async () => {
    if (!employee?.id) return;
    setLoadingAssets(true);
    try {
      const response = await getEmployeeAssets(employee.id);
      setAssets(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAssets(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  if (!employee || employee.role !== "EMPLOYEE") {
    return <Navigate to="/" replace />;
  }

  const getIcon = (type) => {
    switch (type) {
      case "Laptop":
        return <FaLaptop className="text-blue-600 text-2xl" />;
      case "Desktop":
        return <FaDesktop className="text-blue-600 text-2xl" />;
      case "Monitor":
        return <MdMonitor className="text-blue-600 text-2xl" />;
      case "Keyboard":
        return <FaKeyboard className="text-blue-600 text-2xl" />;
      case "Mouse":
        return <FaMouse className="text-blue-600 text-2xl" />;
      case "Mobile":
        return <FaMobileAlt className="text-blue-600 text-2xl" />;
      case "Headphone":
        return <FaHeadphones className="text-blue-600 text-2xl" />;
      case "Charger":
        return <FaPlug className="text-blue-600 text-2xl" />;
      case "ID Card":
        return <FaIdBadge className="text-blue-600 text-2xl" />;
      default:
        return <FaLaptop className="text-blue-600 text-2xl" />;
    }
  };

  return (
    <Layout title="Employee Portal">
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Banner Card */}
        <div
          className="slds-card"
          style={{
            background: "linear-gradient(135deg, var(--slds-brand-dark) 0%, var(--slds-brand) 100%)",
            color: "#fff",
            border: "none",
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div className="slds-avatar slds-avatar-xl" style={{ background: "rgba(255, 255, 255, 0.2)", color: "#fff" }}>
            {employee.firstName ? employee.firstName.charAt(0).toUpperCase() : "E"}
          </div>
          <div>
            <div style={{ fontSize: "12px", opacity: 0.8, textTransform: "uppercase", letterSpacing: ".05em", fontWeight: "700" }}>
              Employee Profile
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", margin: "4px 0" }}>
              Welcome, {employee.firstName} {employee.lastName} 👋
            </h1>
            <p style={{ fontSize: "13px", opacity: 0.9, margin: 0 }}>
              {employee.designation} • {employee.department}
            </p>
          </div>
        </div>

        {/* Record Detail Card */}
        <div className="slds-card">
          <div className="slds-card-header">
            <h2 className="slds-card-title">Employee Information</h2>
            <button
              onClick={() => navigate("/employee/update-profile")}
              className="slds-btn slds-btn-neutral"
            >
              Edit Details
            </button>
          </div>
          <div className="slds-card-body">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <div className="slds-record-field">
                <span className="slds-record-label">Full Name</span>
                <span className="slds-record-value" style={{ fontWeight: "600" }}>
                  {employee.firstName} {employee.lastName}
                </span>
              </div>
              <div className="slds-record-field">
                <span className="slds-record-label">Email Address</span>
                <span className="slds-record-value">{employee.email}</span>
              </div>
              <div className="slds-record-field">
                <span className="slds-record-label">Phone Number</span>
                <span className="slds-record-value">{employee.phoneNumber}</span>
              </div>
              <div className="slds-record-field">
                <span className="slds-record-label">Gender</span>
                <span className="slds-record-value">{employee.gender}</span>
              </div>
              <div className="slds-record-field">
                <span className="slds-record-label">Date of Birth</span>
                <span className="slds-record-value">{employee.dateOfBirth}</span>
              </div>
              <div className="slds-record-field">
                <span className="slds-record-label">Department</span>
                <span className="slds-record-value">
                  <span className="slds-badge slds-badge-info">{employee.department}</span>
                </span>
              </div>
              <div className="slds-record-field">
                <span className="slds-record-label">Designation</span>
                <span className="slds-record-value">{employee.designation}</span>
              </div>
              <div className="slds-record-field" style={{ gridColumn: "1 / -1" }}>
                <span className="slds-record-label">Address</span>
                <span className="slds-record-value">{employee.address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Assets Card */}
        <div className="slds-card">
          <div className="slds-card-header">
            <h2 className="slds-card-title">My Assigned Assets ({assets.length})</h2>
          </div>
          <div className="slds-card-body">
            {loadingAssets ? (
              <div style={{ textAlign: "center", padding: "30px" }}>
                <span className="slds-spinner slds-spinner-md" />
              </div>
            ) : assets.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    style={{
                      border: "1px solid var(--slds-border)",
                      borderRadius: "6px",
                      padding: "16px",
                      background: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "6px",
                          background: "var(--slds-brand-subtle)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {getIcon(asset.assetType)}
                      </div>
                      <div>
                        <h3 style={{ fontSize: "14px", fontWeight: "700", margin: 0, color: "var(--slds-text-default)" }}>
                          {asset.assetName}
                        </h3>
                        <span style={{ fontSize: "12px", color: "var(--slds-text-weak)" }}>
                          {asset.assetType}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "8px", borderTop: "1px solid var(--slds-border)" }}>
                      <span style={{ fontSize: "12px", color: "var(--slds-text-weak)" }}>
                        Allocated: {new Date(asset.allocatedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                      <span className="slds-badge slds-badge-success">{asset.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="slds-empty-state">
                <FaLaptop size={36} style={{ marginBottom: "12px", color: "var(--slds-border-strong)" }} />
                <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 4px", color: "var(--slds-text-default)" }}>
                  No Assets Currently Assigned
                </h3>
                <p style={{ fontSize: "13px", color: "var(--slds-text-weak)", margin: 0 }}>
                  Contact your system administrator if you require equipment assignment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AIChatBot role="EMPLOYEE" />
    </Layout>
  );
}

export default Dashboard;