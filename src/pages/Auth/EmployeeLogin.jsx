import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgetPassword, loginEmployee } from "../../services/EmployeeService";
import InputField from "../../components/ui/InputField";
import { FiX } from "react-icons/fi";

function EmployeeLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotData, setForgotData] = useState({
    email: "",
    favouriteColorAnswer: "",
    birthplaceAnswer: "",
    firstSchoolAnswer: "",
    newPassword: "",
    confirmPassword: "",
  });

  /* ── Handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email.trim())    { toast.error("Email is required.");    return; }
    if (!loginData.password.trim()) { toast.error("Password is required."); return; }
    setLoading(true);
    try {
      const response = await loginEmployee(loginData);
      localStorage.setItem("employee", JSON.stringify(response.data));
      toast.success("Login Successful");
      if (response.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Please enter Email and Password.");
      } else {
        toast.error(error.response?.data?.message || "Invalid Email or Password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (forgotData.newPassword !== forgotData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { confirmPassword, ...requestData } = forgotData;
      const response = await forgetPassword(requestData);
      toast.success(response.data);
      setShowForgotModal(false);
      setForgotData({
        email: "", favouriteColorAnswer: "", birthplaceAnswer: "",
        firstSchoolAnswer: "", newPassword: "", confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Password Reset Failed");
    }
  };

  /* ── Render ── */
  return (
    <>
      <form onSubmit={handleSubmit} autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          autoComplete="off"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          autoComplete="off"
        />

        <div style={{ textAlign: "right", marginTop: "-8px" }}>
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: "12px", color: "var(--slds-brand)", fontWeight: "600", fontFamily: "inherit",
            }}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="slds-btn slds-btn-brand slds-btn-lg slds-btn-full"
          style={{ marginTop: "4px" }}
        >
          {loading ? (
            <>
              <span className="slds-spinner slds-spinner-sm" style={{ marginRight: "8px" }} />
              Signing In…
            </>
          ) : "Sign In"}
        </button>

        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          color: "var(--slds-text-weak)", fontSize: "12px",
        }}>
          <div style={{ flex: 1, height: "1px", background: "var(--slds-border)" }} />
          OR
          <div style={{ flex: 1, height: "1px", background: "var(--slds-border)" }} />
        </div>

        <button
          type="button"
          onClick={() => navigate("/employee/register")}
          className="slds-btn slds-btn-outline slds-btn-lg slds-btn-full"
        >
          Create Account
        </button>
      </form>

      {/* ── Forgot Password Modal ── */}
      {showForgotModal && (
        <div className="slds-modal-backdrop">
          <div className="slds-modal" style={{ width: "480px" }}>
            <div className="slds-modal-header">
              <h2 className="slds-modal-title">Reset Password</h2>
              <button className="slds-btn-icon" onClick={() => setShowForgotModal(false)}>
                <FiX size={16} />
              </button>
            </div>
            <div className="slds-modal-body" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <p style={{ margin: "0 0 4px", fontSize: "13px", color: "var(--slds-text-weak)" }}>
                Answer your security questions to verify your identity and reset your password.
              </p>
              <InputField label="Email Address" name="email" value={forgotData.email}
                onChange={handleForgotChange} placeholder="Enter your email" />
              <div className="slds-section-title" style={{ marginBottom: "8px", marginTop: "4px" }}>Security Questions</div>
              <InputField label="Favourite Color" name="favouriteColorAnswer" value={forgotData.favouriteColorAnswer}
                onChange={handleForgotChange} placeholder="Your favourite color" />
              <InputField label="Birth Place" name="birthplaceAnswer" value={forgotData.birthplaceAnswer}
                onChange={handleForgotChange} placeholder="Your birth place" />
              <InputField label="First School" name="firstSchoolAnswer" value={forgotData.firstSchoolAnswer}
                onChange={handleForgotChange} placeholder="Your first school" />
              <div className="slds-section-title" style={{ marginBottom: "8px", marginTop: "4px" }}>New Password</div>
              <InputField label="New Password" type="password" name="newPassword" value={forgotData.newPassword}
                onChange={handleForgotChange} placeholder="Enter new password" />
              <InputField label="Confirm Password" type="password" name="confirmPassword" value={forgotData.confirmPassword}
                onChange={handleForgotChange} placeholder="Confirm new password" />
            </div>
            <div className="slds-modal-footer">
              <button className="slds-btn slds-btn-neutral" onClick={() => setShowForgotModal(false)}>Cancel</button>
              <button className="slds-btn slds-btn-brand" onClick={handleForgotPassword}>Reset Password</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmployeeLogin;