import { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import BackButton from "../../components/common/BackButton";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import TextAreaField from "../../components/ui/TextAreaField";
import Button from "../../components/ui/Button";
import { updateEmployee } from "../../services/EmployeeService";

function UpdateProfile() {
  const employee = JSON.parse(localStorage.getItem("employee") || "{}");

  const [formData, setFormData] = useState({
    firstName: employee.firstName || "",
    lastName: employee.lastName || "",
    phoneNumber: employee.phoneNumber || "",
    dateOfBirth: employee.dateOfBirth || "",
    gender: employee.gender || "",
    address: employee.address || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateEmployee(employee.id, formData);
      toast.success("Profile Updated Successfully");
      localStorage.setItem("employee", JSON.stringify(response.data));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Update Personal Profile">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <BackButton />

        <div className="slds-card">
          <div className="slds-card-header">
            <h1 className="slds-card-title">Edit Profile Details</h1>
          </div>
          <div className="slds-card-body">
            <form onSubmit={handleSubmit}>
              <div className="slds-section-title">Personal Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "20px" }}>
                <InputField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <InputField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <InputField
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
                <InputField
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
                <SelectField
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  options={["Male", "Female", "Other"]}
                />
              </div>

              <div className="slds-section-title">Residential Address</div>
              <div style={{ marginBottom: "24px" }}>
                <TextAreaField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: "clamp(160px, 200px, 100%)" }}>
                  <Button
                    text={loading ? "Saving..." : "Save Profile"}
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

export default UpdateProfile;