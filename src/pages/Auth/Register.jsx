import { useState } from "react";
import { toast } from "react-toastify";
import BackButton from "../../components/common/BackButton";
import { registerEmployee } from "../../services/EmployeeService";

import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import TextAreaField from "../../components/ui/TextAreaField";
import Button from "../../components/ui/Button";

function Register() {
  const [loading, setLoading] = useState(false);
  const maxDOB = new Date();
maxDOB.setFullYear(maxDOB.getFullYear() - 18);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    department: "",
    designation: "",
    address: "",
    favouriteColorAnswer: "",
    birthplaceAnswer: "",
    firstSchoolAnswer: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.phoneNumber ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.department ||
      !formData.designation ||
      !formData.address ||
      !formData.favouriteColorAnswer ||
      !formData.birthplaceAnswer ||
      !formData.firstSchoolAnswer
    ) {
      toast.error("All fields are required.");
      return;
    }
    const email = formData.email.trim();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error("Phone number must be 10 digits.");
      return;
    }
    const nameRegex = /^[A-Za-z ]+$/;

    if (!nameRegex.test(formData.firstName)) {
      toast.error("First Name should contain only letters.");
      return;
    }

    if (!nameRegex.test(formData.lastName)) {
      toast.error("Last Name should contain only letters.");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters.");

      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...employeeData } = formData;
      employeeData.email = employeeData.email.trim();
      const response = await registerEmployee(employeeData);

      toast.success(response.data.message);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        department: "",
        designation: "",
        address: "",
        favouriteColorAnswer: "",
        birthplaceAnswer: "",
        firstSchoolAnswer: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-10">
        <div className="mb-8">
          <BackButton />
        </div>

        <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">
          Employee Registration
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
            />

            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              autoComplete="off"
            />

            <InputField
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
            />

            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              autoComplete="off"
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
            <InputField
    label="Date of Birth"
    type="date"
    name="dateOfBirth"
    value={formData.dateOfBirth}
    onChange={handleChange}
    max={maxDOB.toISOString().split("T")[0]}
/>

            <SelectField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={["Male", "Female", "Other"]}
            />

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
          </div>

          <div className="mt-6">
            <TextAreaField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <InputField
              label="Favourite Color"
              name="favouriteColorAnswer"
              value={formData.favouriteColorAnswer}
              onChange={handleChange}
              placeholder="Favourite Color"
            />

            <InputField
              label="Birth Place"
              name="birthplaceAnswer"
              value={formData.birthplaceAnswer}
              onChange={handleChange}
              placeholder="Birth Place"
            />

            <InputField
              label="First School"
              name="firstSchoolAnswer"
              value={formData.firstSchoolAnswer}
              onChange={handleChange}
              placeholder="First School"
            />
          </div>

          <div className="pt-2">
            <Button
              text={loading ? "Registering..." : "Register"}
              type="submit"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
