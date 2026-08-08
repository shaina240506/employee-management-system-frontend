import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import BackButton from "../../components/common/BackButton";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import Button from "../../components/ui/Button";
import { getAssetById, updateAsset } from "../../services/AssetService";

function UpdateAsset() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employeeId: "",
    assetType: "",
    assetName: "",
    allocatedDate: "",
    status: "",
  });

  const fetchAsset = async () => {
    try {
      const response = await getAssetById(id);
      setFormData({
        employeeId: response.data.employeeId,
        assetType: response.data.assetType,
        assetName: response.data.assetName,
        allocatedDate: response.data.allocatedDate,
        status: response.data.status,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to Fetch Asset"
      );
    }
  };

  useEffect(() => {
    fetchAsset();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.assetType ||
      !formData.assetName ||
      !formData.allocatedDate ||
      !formData.status
    ) {
      toast.error("All Fields are Required");
      return;
    }

    setLoading(true);
    try {
      await updateAsset(id, formData);
      toast.success("Asset Updated Successfully");
      navigate("/admin/assets");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to Update Asset"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Edit Asset Specification">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <BackButton path="/admin/assets" />

        <div className="slds-card">
          <div className="slds-card-header">
            <h1 className="slds-card-title">Update Asset Record: #{id}</h1>
          </div>
          <div className="slds-card-body">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
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
                  label="Asset Name"
                  name="assetName"
                  value={formData.assetName}
                  onChange={handleChange}
                />
                <InputField
                  label="Allocated Date"
                  type="date"
                  name="allocatedDate"
                  value={formData.allocatedDate}
                  onChange={handleChange}
                />
                <SelectField
                  label="Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={["Allocated", "In Use", "Returned", "Damaged"]}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "200px" }}>
                  <Button
                    text={loading ? "Updating..." : "Save Changes"}
                    type="submit"
                    disabled={loading}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateAsset;