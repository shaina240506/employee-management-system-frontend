import { useState } from "react";
import { toast } from "react-toastify";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { deleteEmployee } from "../../services/EmployeeService";
import Layout from "../../components/layout/Layout";
import BackButton from "../../components/common/BackButton";
import InputField from "../../components/ui/InputField";
import Button from "../../components/ui/Button";

function DeleteEmployee() {
  const [id, setId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    if (!id) {
      toast.error("Please Enter Employee ID");
      return;
    }
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteEmployee(id);
      toast.success(response.data);
      setId("");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete Failed"
      );
    }
  };

  return (
    <Layout title="Delete Employee">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <BackButton />

        <div className="slds-card" style={{ maxWidth: "480px", width: "100%" }}>
          <div className="slds-card-header">
            <h1 className="slds-card-title" style={{ color: "var(--slds-error)" }}>Delete Employee</h1>
          </div>
          <div className="slds-card-body">
            <form onSubmit={handleDelete} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <InputField
                label="Employee ID"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter Employee ID"
              />
              <Button text="Delete Employee" type="submit" />
            </form>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="slds-modal-backdrop">
          <div className="slds-modal" style={{ width: "min(92vw, 420px)" }}>
            <div className="slds-modal-header">
              <h2 className="slds-modal-title" style={{ color: "var(--slds-error)" }}>
                Delete Employee
              </h2>
              <button
                className="slds-btn-icon"
                onClick={() => setShowDeleteModal(false)}
                style={{ color: "var(--slds-text-weak)" }}
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
              <h3 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 8px" }}>Are you sure?</h3>
              <p style={{ fontSize: "13px", color: "var(--slds-text-weak)", margin: 0, lineHeight: 1.5 }}>
                You are about to permanently delete employee with ID{" "}
                <strong style={{ color: "var(--slds-text-default)" }}>#{id}</strong>.
                This action cannot be undone.
              </p>
            </div>
            <div className="slds-modal-footer">
              <button
                className="slds-btn slds-btn-neutral"
                onClick={() => setShowDeleteModal(false)}
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

export default DeleteEmployee;