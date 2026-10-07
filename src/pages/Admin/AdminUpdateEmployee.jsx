import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateEmployee, getEmployeeById } from "../../services/EmployeeService";
import Layout from "../../components/layout/Layout";
import BackButton from "../../components/common/BackButton";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import TextAreaField from "../../components/ui/TextAreaField";
import Button from "../../components/ui/Button";

function AdminUpdateEmployee() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    department: "",
    designation: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchEmployee = async () => {
    setLoading(true);
    try {
      const response = await getEmployeeById(id);
      setFormData({
        firstName: response.data.firstName || "",
        lastName: response.data.lastName || "",
        phoneNumber: response.data.phoneNumber || "",
        dateOfBirth: response.data.dateOfBirth || "",
        gender: response.data.gender || "",
        address: response.data.address || "",
        department: response.data.department || "",
        designation: response.data.designation || "",
        role: response.data.role || "",
      });
    } catch (error) {
      toast.error("Unable to Fetch Employee");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateEmployee(id, formData);
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update Failed"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title="Edit Employee Record">
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <BackButton path="/admin/employees" />

        <div className="slds-card">
          <div className="slds-card-header">
            <h1 className="slds-card-title">Update Record: #{id}</h1>
          </div>
          <div className="slds-card-body">
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <span className="slds-spinner slds-spinner-md" />
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="slds-section-title">Personal Details</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
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

                <div className="slds-section-title">Organization Details</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
                  <SelectField
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    options={["IT", "HR", "Finance", "Marketing", "Sales"]}
                  />
                  <SelectField
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    options={[
                      "Software Engineer",
                      "Senior Software Engineer",
                      "HR Executive",
                      "Manager",
                      "Intern",
                    ]}
                  />
                  <SelectField
                    label="System Role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    options={["ADMIN", "EMPLOYEE"]}
                  />
                </div>

                <div className="slds-section-title">Address & Additional Notes</div>
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
                      text={submitting ? "Saving..." : "Update Record"}
                      type="submit"
                      disabled={submitting}
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminUpdateEmployee;