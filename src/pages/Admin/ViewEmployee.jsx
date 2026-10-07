import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import { getEmployeeById } from "../../services/EmployeeService";
import Layout from "../../components/layout/Layout";
import BackButton from "../../components/common/BackButton";

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await getEmployeeById(id);
      setEmployee(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Employee Not Found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  return (
    <Layout title="Employee Record Details">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Navigation & Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <BackButton path="/admin/employees" />
          {employee && (
            <button
              onClick={() => navigate(`/admin/update/${employee.id}`)}
              className="slds-btn slds-btn-brand"
            >
              <FiEdit2 size={14} /> Edit Record
            </button>
          )}
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "60px" }}>
            <span className="slds-spinner slds-spinner-md" />
            <div style={{ marginTop: "12px", color: "var(--slds-text-weak)", fontSize: "13px" }}>
              Fetching Employee Record...
            </div>
          </div>
        ) : employee ? (
          <div className="slds-card">
            {/* Record Header Banner */}
            <div
              className="slds-card-header"
              style={{
                background: "var(--slds-bg-alt)",
                padding: "20px 24px",
                borderBottom: "1px solid var(--slds-border)",
              }}
            >
              <div className="slds-record-banner-inner" style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div className="slds-avatar slds-avatar-lg" style={{ background: "var(--slds-brand)", flexShrink: 0 }}>
                  {employee.firstName?.charAt(0)?.toUpperCase()}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h1 style={{ fontSize: "20px", fontWeight: "800", margin: "0 0 4px", color: "var(--slds-text-default)", wordBreak: "break-word" }}>
                    {employee.firstName} {employee.lastName}
                  </h1>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "12px", color: "var(--slds-text-weak)", flexWrap: "wrap" }}>
                    <span>ID: #{employee.id}</span>
                    {employee.designation && (
                      <>
                        <span>•</span>
                        <span>{employee.designation}</span>
                      </>
                    )}
                    {employee.department && (
                      <>
                        <span>•</span>
                        <span className="slds-badge slds-badge-info">{employee.department}</span>
                      </>
                    )}
                    <span>•</span>
                    <span className={`slds-badge ${employee.role === "ADMIN" ? "slds-badge-error" : "slds-badge-success"}`}>
                      {employee.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Record Details Body */}
            <div className="slds-card-body" style={{ padding: "24px" }}>
              <div className="slds-section-title">Personal & Contact Information</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "28px" }}>
                <div className="slds-record-field">
                  <span className="slds-record-label">First Name</span>
                  <span className="slds-record-value">{employee.firstName}</span>
                </div>
                <div className="slds-record-field">
                  <span className="slds-record-label">Last Name</span>
                  <span className="slds-record-value">{employee.lastName}</span>
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
                  <span className="slds-record-label">Date of Birth</span>
                  <span className="slds-record-value">{employee.dateOfBirth}</span>
                </div>
                <div className="slds-record-field">
                  <span className="slds-record-label">Gender</span>
                  <span className="slds-record-value">{employee.gender}</span>
                </div>
                <div className="slds-record-field" style={{ gridColumn: "1 / -1" }}>
                  <span className="slds-record-label">Residential Address</span>
                  <span className="slds-record-value">{employee.address}</span>
                </div>
              </div>

              <div className="slds-section-title">System & Audit Metadata</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                <div className="slds-record-field">
                  <span className="slds-record-label">System Role</span>
                  <span className="slds-record-value">{employee.role}</span>
                </div>
                <div className="slds-record-field">
                  <span className="slds-record-label">Account Created At</span>
                  <span className="slds-record-value">
                    {employee.createdAt
                      ? new Date(employee.createdAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="slds-record-field">
                  <span className="slds-record-label">Last Updated At</span>
                  <span className="slds-record-value">
                    {employee.updatedAt
                      ? new Date(employee.updatedAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default ViewEmployee;
