import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSearch, FiEye, FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import Layout from "../../components/layout/Layout";
import {
  getEmployeeAssetSummary,
  getEmployeeAssets,
  deleteMultipleAssets,
} from "../../services/AssetService";

function AssetManagement() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [employeeAssets, setEmployeeAssets] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedAssets, setSelectedAssets] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((employee) => {
      const keyword = search.toLowerCase();
      return (
        (employee.employeeName && employee.employeeName.toLowerCase().includes(keyword)) ||
        (employee.department && employee.department.toLowerCase().includes(keyword)) ||
        (employee.designation && employee.designation.toLowerCase().includes(keyword))
      );
    });
    setFilteredEmployees(filtered);
  }, [search, employees]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await getEmployeeAssetSummary();
      setEmployees(response.data);
      setFilteredEmployees(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Fetch Employees");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (employee) => {
    try {
      const response = await getEmployeeAssets(employee.employeeId);
      setEmployeeAssets(response.data);
      setSelectedEmployee(employee);
      setShowViewModal(true);
    } catch (error) {
      toast.error("Unable to Fetch Assets");
    }
  };

  const handleDeleteClick = async (employee) => {
    try {
      const response = await getEmployeeAssets(employee.employeeId);
      setEmployeeAssets(response.data);
      setSelectedEmployee(employee);
      setSelectedAssets([]);
      setShowDeleteModal(true);
    } catch (error) {
      toast.error("Unable to Fetch Assets");
    }
  };

  const handleUpdateClick = async (employee) => {
    try {
      const response = await getEmployeeAssets(employee.employeeId);
      setEmployeeAssets(response.data);
      setSelectedEmployee(employee);
      setShowUpdateModal(true);
    } catch (error) {
      toast.error("Unable to Fetch Assets");
    }
  };

  const handleCheckbox = (assetId) => {
    if (selectedAssets.includes(assetId)) {
      setSelectedAssets(selectedAssets.filter((id) => id !== assetId));
    } else {
      setSelectedAssets([...selectedAssets, assetId]);
    }
  };

  const confirmDelete = async () => {
    if (selectedAssets.length === 0) {
      toast.error("Please Select Asset");
      return;
    }
    try {
      await deleteMultipleAssets(selectedAssets);
      toast.success("Assets Deleted Successfully");
      setShowDeleteModal(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Delete Assets");
    }
  };

  return (
    <Layout title="Asset Inventory Management">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Page Header */}
        <div className="slds-page-header">
          <div>
            <h1 className="slds-page-header-title">Hardware & Equipment Allocation</h1>
            <p className="slds-page-header-subtitle">
              Overview of assets assigned to employees across departments
            </p>
          </div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%", maxWidth: "320px" }}>
            <FiSearch
              size={14}
              style={{
                position: "absolute",
                left: "10px",
                color: "var(--slds-text-weak)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
            <input
              type="text"
              placeholder="Search by name, department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="slds-input"
              style={{ paddingLeft: "32px", width: "100%", height: "36px" }}
            />
          </div>
        </div>

        {/* Assets Summary Table Card */}
        <div className="slds-card">
          <div className="slds-card-body" style={{ padding: 0 }}>
            {loading ? (
              <div style={{ textAlign: "center", padding: "60px" }}>
                <span className="slds-spinner slds-spinner-md" />
                <div style={{ marginTop: "12px", color: "var(--slds-text-weak)", fontSize: "13px" }}>
                  Loading Asset Directory...
                </div>
              </div>
            ) : (
              <div className="slds-table-wrap" style={{ border: "none" }}>
                <table className="slds-table">
                  <thead>
                    <tr>
                      <th style={{ width: "60px" }} className="text-center">ID</th>
                      <th>Employee</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th className="text-center">Total Assets</th>
                      <th className="text-center">Status</th>
                      <th className="text-center" style={{ width: "160px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((emp) => (
                        <tr key={emp.employeeId}>
                          <td className="text-center" style={{ fontWeight: "700", color: "var(--slds-text-weak)" }}>
                            {emp.employeeId}
                          </td>
                          <td style={{ fontWeight: "600", color: "var(--slds-text-default)" }}>
                            {emp.employeeName}
                          </td>
                          <td>
                            {emp.department ? (
                              <span className="slds-badge slds-badge-neutral">{emp.department}</span>
                            ) : (
                              <span style={{ color: "var(--slds-text-weak)" }}>—</span>
                            )}
                          </td>
                          <td style={{ fontSize: "12px" }}>{emp.designation || "—"}</td>
                          <td className="text-center">
                            <span style={{ fontWeight: "700", color: "var(--slds-brand)" }}>
                              {emp.totalAssets}
                            </span>
                          </td>
                          <td className="text-center">
                            <span
                              className={`slds-badge ${
                                emp.status === "Assigned"
                                  ? "slds-badge-success"
                                  : "slds-badge-warning"
                              }`}
                            >
                              {emp.status === "Assigned" ? "Assigned" : "Not Assigned"}
                            </span>
                          </td>
                          <td className="text-center">
                            <div style={{ display: "flex", justifyContent: "center", gap: "4px" }}>
                              <button
                                onClick={() => handleView(emp)}
                                className="slds-btn-icon slds-btn-icon-primary"
                                title="View Assigned Assets"
                              >
                                <FiEye size={15} />
                              </button>
                              <button
                                onClick={() => handleUpdateClick(emp)}
                                className="slds-btn-icon slds-btn-icon-warning"
                                title="Update Asset Status"
                              >
                                <FiEdit2 size={14} />
                              </button>
                              <button
                                onClick={() => navigate(`/admin/assign-asset/${emp.employeeId}`)}
                                className="slds-btn-icon slds-btn-icon-success"
                                title="Assign New Asset"
                              >
                                <FiPlus size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(emp)}
                                className="slds-btn-icon slds-btn-icon-danger"
                                title="Delete Assets"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" style={{ textAlign: "center", padding: "40px", color: "var(--slds-text-weak)" }}>
                          No Employees Match Search
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && (
        <div className="slds-modal-backdrop">
          <div className="slds-modal" style={{ width: "min(92vw, 560px)" }}>
            <div className="slds-modal-header">
              <h2 className="slds-modal-title">
                Assets Assigned to {selectedEmployee?.employeeName}
              </h2>
              <button className="slds-btn-icon" onClick={() => setShowViewModal(false)}>
                <FiX size={16} />
              </button>
            </div>
            <div className="slds-modal-body">
              {employeeAssets.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {employeeAssets.map((asset) => (
                    <div
                      key={asset.id}
                      style={{
                        border: "1px solid var(--slds-border)",
                        borderRadius: "6px",
                        padding: "14px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "14px" }}>{asset.assetName}</div>
                        <div style={{ fontSize: "12px", color: "var(--slds-text-weak)", marginTop: "2px" }}>
                          Type: {asset.assetType} • Allocated: {asset.allocatedDate}
                        </div>
                      </div>
                      <span
                        className={`slds-badge ${
                          asset.status === "Allocated" || asset.status === "In Use"
                            ? "slds-badge-success"
                            : "slds-badge-error"
                        }`}
                      >
                        {asset.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "30px", color: "var(--slds-text-weak)" }}>
                  No Assets Currently Assigned
                </div>
              )}
            </div>
            <div className="slds-modal-footer">
              <button className="slds-btn slds-btn-neutral" onClick={() => setShowViewModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="slds-modal-backdrop">
          <div className="slds-modal" style={{ width: "min(92vw, 560px)" }}>
            <div className="slds-modal-header">
              <h2 className="slds-modal-title">
                Update Asset Details for {selectedEmployee?.employeeName}
              </h2>
              <button className="slds-btn-icon" onClick={() => setShowUpdateModal(false)}>
                <FiX size={16} />
              </button>
            </div>
            <div className="slds-modal-body">
              {employeeAssets.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {employeeAssets.map((asset) => (
                    <div
                      key={asset.id}
                      style={{
                        border: "1px solid var(--slds-border)",
                        borderRadius: "6px",
                        padding: "14px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "700", fontSize: "14px" }}>{asset.assetName}</div>
                        <div style={{ fontSize: "12px", color: "var(--slds-text-weak)", marginTop: "2px" }}>
                          {asset.assetType} • Allocated: {asset.allocatedDate}
                        </div>
                      </div>
                      <button
                        onClick={() => navigate(`/admin/update-asset/${asset.id}`)}
                        className="slds-btn slds-btn-neutral"
                        style={{ height: "28px", padding: "0 10px", fontSize: "12px" }}
                      >
                        <FiEdit2 size={12} /> Edit
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "30px", color: "var(--slds-text-weak)" }}>
                  No Assets Available to Edit
                </div>
              )}
            </div>
            <div className="slds-modal-footer">
              <button className="slds-btn slds-btn-neutral" onClick={() => setShowUpdateModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="slds-modal-backdrop">
          <div className="slds-modal" style={{ width: "min(92vw, 480px)" }}>
            <div className="slds-modal-header">
              <h2 className="slds-modal-title" style={{ color: "var(--slds-error)" }}>
                Delete Assets for {selectedEmployee?.employeeName}
              </h2>
              <button className="slds-btn-icon" onClick={() => setShowDeleteModal(false)}>
                <FiX size={16} />
              </button>
            </div>
            <div className="slds-modal-body">
              <p style={{ fontSize: "13px", color: "var(--slds-text-weak)", marginBottom: "14px" }}>
                Select the assets you wish to remove from this employee:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "250px", overflowY: "auto" }}>
                {employeeAssets.map((asset) => (
                  <label
                    key={asset.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      border: "1px solid var(--slds-border)",
                      borderRadius: "6px",
                      padding: "10px 14px",
                      cursor: "pointer",
                      background: selectedAssets.includes(asset.id) ? "var(--slds-error-bg)" : "#fff",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="slds-checkbox"
                      checked={selectedAssets.includes(asset.id)}
                      onChange={() => handleCheckbox(asset.id)}
                    />
                    <div>
                      <div style={{ fontWeight: "700", fontSize: "13px" }}>{asset.assetName}</div>
                      <div style={{ fontSize: "11px", color: "var(--slds-text-weak)" }}>
                        {asset.assetType} (ID: #{asset.id})
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="slds-modal-footer">
              <button className="slds-btn slds-btn-neutral" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button className="slds-btn slds-btn-destructive-filled" onClick={confirmDelete}>
                Delete Selected ({selectedAssets.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AssetManagement;
