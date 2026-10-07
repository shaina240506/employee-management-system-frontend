import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import BackButton from "../../components/common/BackButton";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import Button from "../../components/ui/Button";
import { getEmployeeById } from "../../services/EmployeeService";
import { assignAsset, getEmployeeAssets } from "../../services/AssetService";

function AssignAsset() {
  const { id } = useParams();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({});

  const [formData, setFormData] = useState({
    employeeId: "",
    assetType: "",
    assetName: "",
    allocatedDate: "",
    status: "Assigned",
  });

  const fetchAssets = async () => {
    try {
      const response = await getEmployeeAssets(id);
      setAssets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await getEmployeeById(id);
      setEmployee(response.data);
      setFormData((prev) => ({
        ...prev,
        employeeId: response.data.id,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Fetch Employee");
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchAssets();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (
      !formData.assetType ||
      !formData.assetName ||
      !formData.allocatedDate ||
      !formData.status
    ) {
      toast.error("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await assignAsset(formData);
      toast.success("Asset Assigned Successfully");
      setFormData({
        employeeId: employee.id,
        assetType: "",
        assetName: "",
        allocatedDate: "",
        status: "Assigned",
      });
      fetchAssets();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to Assign Asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Assign Hardware Asset">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <BackButton path="/admin/assets" />

        {/* Assign Form Card */}
        <div className="slds-card">
          <div className="slds-card-header">
            <div>
              <h1 className="slds-card-title">New Asset Allocation</h1>
              <p style={{ fontSize: "12px", color: "var(--slds-text-weak)", margin: "2px 0 0" }}>
                Assign hardware equipment to {employee.firstName} {employee.lastName} (ID: #{employee.id})
              </p>
            </div>
          </div>
          <div className="slds-card-body">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
                <InputField
                  label="Employee ID"
                  value={employee.id || ""}
                  readOnly
                />
                <InputField
                  label="Employee Name"
                  value={`${employee.firstName || ""} ${employee.lastName || ""}`}
                  readOnly
                />
                <SelectField
                  label="Asset Type"
                  name="assetType"
                  value={formData.assetType}
                  onChange={handleChange}
                  options={[
                    "Laptop",
                    "Desktop",
                    "Monitor",
                    "Mouse",
                    "Keyboard",
                    "Headphone",
                    "Mobile",
                    "Charger",
                    "ID Card",
                  ]}
                />
                <InputField
                  label="Asset Name / Model"
                  name="assetName"
                  value={formData.assetName}
                  onChange={handleChange}
                  placeholder="e.g. MacBook Pro M2 16-inch"
                />
                <InputField
                  label="Allocated Date"
                  type="date"
                  name="allocatedDate"
                  value={formData.allocatedDate}
                  onChange={handleChange}
                />
                <SelectField
                  label="Allocation Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={["Assigned", "Returned", "Lost", "Damaged"]}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "clamp(160px, 200px, 100%)" }}>
                  <Button
                    text={loading ? "Assigning..." : "Assign Equipment"}
                    type="submit"
                    disabled={loading}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Previous Assets Card */}
        <div className="slds-card">
          <div className="slds-card-header">
            <h2 className="slds-card-title">Previously Allocated Equipment ({assets.length})</h2>
          </div>
          <div className="slds-card-body" style={{ padding: 0 }}>
            {assets.length === 0 ? (
              <div className="slds-empty-state">
                <p style={{ margin: 0 }}>No Assets Previously Assigned to this Employee</p>
              </div>
            ) : (
              <div className="slds-table-wrap" style={{ border: "none" }}>
                <table className="slds-table">
                  <thead>
                    <tr>
                      <th>Asset Name</th>
                      <th>Type</th>
                      <th>Allocated Date</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map((asset) => (
                      <tr key={asset.id}>
                        <td style={{ fontWeight: "700" }}>{asset.assetName}</td>
                        <td style={{ color: "var(--slds-text-weak)" }}>{asset.assetType}</td>
                        <td>{new Date(asset.allocatedDate).toLocaleDateString("en-IN")}</td>
                        <td className="text-center">
                          <span className="slds-badge slds-badge-success">{asset.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AssignAsset;
