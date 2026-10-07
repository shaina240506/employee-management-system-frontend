import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiAlertTriangle, FiX } from "react-icons/fi";
import { getAllEmployees, deleteEmployee } from "../../services/EmployeeService";
import Layout from "../../components/layout/Layout";

function GetAllEmployees() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Fetch Employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteEmployee(selectedEmployee.id);
      toast.success("Employee Deleted Successfully");
      setShowDeleteModal(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <Layout title="All Employees">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Page Header */}
        <div className="slds-page-header">
          <div>
            <h1 className="slds-page-header-title">Employee Directory</h1>
            <p className="slds-page-header-subtitle">
              Manage and view all registered employee accounts ({employees.length} total)
            </p>
          </div>
          <button
            onClick={() => navigate("/admin/search")}
            className="slds-btn slds-btn-brand"
          >
            <FiSearch size={14} /> Advanced Search
          </button>
        </div>

        {/* Table Card */}
        <div className="slds-card">
          <div className="slds-card-body" style={{ padding: 0 }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px" }}>
                <span className="slds-spinner slds-spinner-md" />
                <div style={{ marginTop: "12px", color: "var(--slds-text-weak)", fontSize: "13px" }}>
                  Loading Employee Records...
                </div>
              </div>
            ) : employees.length > 0 ? (
              <div className="slds-table-wrap" style={{ border: "none" }}>
                <table className="slds-table">
                  <thead>
                    <tr>
                      <th style={{ width: "60px" }} className="text-center">ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th className="text-center">Role</th>
                      <th className="text-center" style={{ width: "120px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.id}>
                        <td className="text-center" style={{ fontWeight: "700", color: "var(--slds-text-weak)" }}>
                          {emp.id}
                        </td>
                        <td>
                          <div style={{ fontWeight: "600", color: "var(--slds-text-default)" }}>
                            {emp.firstName} {emp.lastName}
                          </div>
                        </td>
                        <td style={{ color: "var(--slds-text-weak)" }}>{emp.email}</td>
                        <td style={{ color: "var(--slds-text-weak)" }}>{emp.phoneNumber}</td>
                        <td>
                          {emp.department ? (
                            <span className="slds-badge slds-badge-neutral">{emp.department}</span>
                          ) : (
                            <span style={{ color: "var(--slds-text-weak)" }}>—</span>
                          )}
                        </td>
                        <td style={{ fontSize: "12px" }}>{emp.designation || "—"}</td>
                        <td className="text-center">
                          <span className={`slds-badge ${emp.role === "ADMIN" ? "slds-badge-error" : "slds-badge-success"}`}>
                            {emp.role}
                          </span>
                        </td>
                        <td className="text-center">
                          <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
                            <button
                              onClick={() => navigate(`/admin/view/${emp.id}`)}
                              className="slds-btn-icon slds-btn-icon-primary"
                              title="View Details"
                            >
                              <FiEye size={15} />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/update/${emp.id}`)}
                              className="slds-btn-icon slds-btn-icon-warning"
                              title="Edit Record"
                            >
                              <FiEdit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(emp)}
                              className="slds-btn-icon slds-btn-icon-danger"
                              title="Delete Account"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="slds-empty-state">
                <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px", color: "var(--slds-text-default)" }}>
                  No Employees Found
                </h3>
                <p style={{ fontSize: "13px", color: "var(--slds-text-weak)", margin: 0 }}>
                  There are currently no employee records in the system.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="slds-modal-backdrop">
          <div className="slds-modal" style={{ width: "min(92vw, 420px)" }}>
            <div className="slds-modal-header">
              <h2 className="slds-modal-title" style={{ color: "var(--slds-error)" }}>
                Delete Employee Account
              </h2>
              <button
                className="slds-btn-icon"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedEmployee(null);
                }}
              >
                <FiX size={16} />
              </button>
            </div>
            <div className="slds-modal-body" style={{ textAlign: "center", padding: "24px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--slds-error-bg)",
                  color: "var(--slds-error)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <FiAlertTriangle size={24} />
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 8px" }}>
                Are you sure?
              </h3>
              <p style={{ fontSize: "13px", color: "var(--slds-text-weak)", margin: 0, lineHeight: 1.5 }}>
                You are about to permanently delete employee{" "}
                <strong style={{ color: "var(--slds-text-default)" }}>
                  {selectedEmployee?.firstName} {selectedEmployee?.lastName}
                </strong>
                . This action cannot be undone.
              </p>
            </div>
            <div className="slds-modal-footer">
              <button
                className="slds-btn slds-btn-neutral"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedEmployee(null);
                }}
              >
                Cancel
              </button>
              <button className="slds-btn slds-btn-destructive-filled" onClick={confirmDelete}>
                Delete Employee
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default GetAllEmployees;
