import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerEmployee } from "../../services/EmployeeService";

import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import TextAreaField from "../../components/ui/TextAreaField";
import { FiGrid, FiChevronLeft } from "react-icons/fi";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const maxDOB = new Date();
  maxDOB.setFullYear(maxDOB.getFullYear() - 18);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
    phoneNumber: "", dateOfBirth: "", gender: "", department: "",
    designation: "", address: "", favouriteColorAnswer: "",
    birthplaceAnswer: "", firstSchoolAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName || !formData.lastName || !formData.email ||
      !formData.password || !formData.confirmPassword || !formData.phoneNumber ||
      !formData.dateOfBirth || !formData.gender || !formData.department ||
      !formData.designation || !formData.address || !formData.favouriteColorAnswer ||
      !formData.birthplaceAnswer || !formData.firstSchoolAnswer
    ) {
      toast.error("All fields are required.");
      return;
    }
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email)) { toast.error("Please enter a valid email address."); return; }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phoneNumber)) { toast.error("Phone number must be 10 digits."); return; }

    const nameRegex = /^[A-Za-z ]+$/;
    if (!nameRegex.test(formData.firstName)) { toast.error("First Name should contain only letters."); return; }
    if (!nameRegex.test(formData.lastName))  { toast.error("Last Name should contain only letters.");  return; }
    if (formData.password.length < 8) { toast.error("Password must be at least 8 characters."); return; }
    if (formData.password !== formData.confirmPassword) { toast.error("Passwords do not match!"); return; }

    setLoading(true);
    try {
      const { confirmPassword, ...employeeData } = formData;
      employeeData.email = employeeData.email.trim();
      const response = await registerEmployee(employeeData);
      toast.success(response.data.message);
      setFormData({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
        phoneNumber: "", dateOfBirth: "", gender: "", department: "",
        designation: "", address: "", favouriteColorAnswer: "",
        birthplaceAnswer: "", firstSchoolAnswer: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--slds-bg)", display: "flex", flexDirection: "column" }}>
      {/* Top Nav Strip */}
      <div style={{
        background: "var(--slds-brand-darker)", height: "48px",
        display: "flex", alignItems: "center", padding: "0 32px", gap: "12px",
      }}>
        <FiGrid size={18} color="#fff" />
        <span style={{ color: "#fff", fontWeight: "700", fontSize: "14px" }}>EMS — Employee Registration</span>
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 24px" }}>
        <div style={{ width: "100%", maxWidth: "860px" }}>
          {/* Back */}
          <div style={{ marginBottom: "16px" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                display: "inline-flex", alignItems: "center", gap: "4px",
                background: "none", border: "none", cursor: "pointer",
                color: "var(--slds-brand)", fontSize: "13px", fontWeight: "600", fontFamily: "inherit",
              }}
            >
              <FiChevronLeft size={16} /> Back to Login
            </button>
          </div>

          <div className="slds-card">
            <div className="slds-card-header">
              <h1 className="slds-card-title" style={{ fontSize: "16px" }}>New Employee Registration</h1>
              <span className="slds-badge slds-badge-info">Self-Registration</span>
            </div>
            <div className="slds-card-body">
              <form onSubmit={handleSubmit} autoComplete="off">
                {/* Personal Info */}
                <p className="slds-section-title">Personal Information</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <InputField label="First Name" name="firstName" value={formData.firstName}
                    onChange={handleChange} placeholder="John" />
                  <InputField label="Last Name" name="lastName" value={formData.lastName}
                    onChange={handleChange} placeholder="Doe" />
                  <InputField label="Email Address" type="email" name="email" value={formData.email}
                    onChange={handleChange} placeholder="john.doe@company.com" autoComplete="off" />
                  <InputField label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber}
                    onChange={handleChange} placeholder="9876543210" />
                  <InputField label="Date of Birth" type="date" name="dateOfBirth" value={formData.dateOfBirth}
                    onChange={handleChange} max={maxDOB.toISOString().split("T")[0]} />
                  <SelectField label="Gender" name="gender" value={formData.gender}
                    onChange={handleChange} options={["Male", "Female", "Other"]} />
                </div>

                {/* Job Info */}
                <p className="slds-section-title">Job Details</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <SelectField label="Department" name="department" value={formData.department}
                    onChange={handleChange} options={["IT", "HR", "Finance", "Marketing", "Sales"]} />
                  <SelectField label="Designation" name="designation" value={formData.designation}
                    onChange={handleChange}
                    options={["Software Engineer", "Senior Software Engineer", "HR Executive", "Manager", "Intern"]} />
                </div>
                <div style={{ marginTop: "16px" }}>
                  <TextAreaField label="Address" name="address" value={formData.address}
                    onChange={handleChange} placeholder="Full address" />
                </div>

                {/* Password */}
                <p className="slds-section-title">Account Security</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <InputField label="Password" type="password" name="password" value={formData.password}
                    onChange={handleChange} placeholder="Min. 8 characters" autoComplete="off" />
                  <InputField label="Confirm Password" type="password" name="confirmPassword"
                    value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter password" />
                </div>

                {/* Security Questions */}
                <p className="slds-section-title">Security Questions</p>
                <p style={{ fontSize: "12px", color: "var(--slds-text-weak)", marginBottom: "16px" }}>
                  These answers will be used to recover your account if you forget your password.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                  <InputField label="Favourite Color" name="favouriteColorAnswer" value={formData.favouriteColorAnswer}
                    onChange={handleChange} placeholder="e.g. Blue" />
                  <InputField label="Birth Place" name="birthplaceAnswer" value={formData.birthplaceAnswer}
                    onChange={handleChange} placeholder="e.g. Mumbai" />
                  <InputField label="First School" name="firstSchoolAnswer" value={formData.firstSchoolAnswer}
                    onChange={handleChange} placeholder="e.g. St. Xavier's" />
                </div>

                {/* Submit */}
                <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button type="button" className="slds-btn slds-btn-outline"
                    onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="slds-btn slds-btn-brand slds-btn-lg">
                    {loading ? (
                      <><span className="slds-spinner slds-spinner-sm" style={{ marginRight: "8px" }} />Registering…</>
                    ) : "Register Employee"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
