import { useState } from "react";
import { toast } from "react-toastify";
import { updateEmployee } from "../../services/EmployeeService";

import BackButton from "../../components/common/BackButton";
import InputField from "../../components/ui/InputField";
import SelectField from "../../components/ui/SelectField";
import TextAreaField from "../../components/ui/TextAreaField";
import Button from "../../components/ui/Button";

function UpdateProfile() {

    const employee = JSON.parse(localStorage.getItem("employee"));

    const [formData, setFormData] = useState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        phoneNumber: employee.phoneNumber,
        dateOfBirth: employee.dateOfBirth,
        gender: employee.gender,
        address: employee.address,
        // department: employee.department,
        // designation: employee.designation,
        // role: employee.role
    });

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await updateEmployee(
                employee.id,
                formData
            );

            toast.success("Profile Updated Successfully");

            localStorage.setItem(
                "employee",
                JSON.stringify(response.data)
            );

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-8">

            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">

                <div className="mb-8">

                    <BackButton />

                </div>

                <h1 className="text-3xl font-bold text-center text-purple-700 mb-10">

                    Update Profile

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
                            options={[
                                "Male",
                                "Female",
                                "Other"
                            ]}
                        />

                        {/* <SelectField
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            options={[
                                "IT",
                                "HR",
                                "Finance",
                                "Marketing",
                                "Sales"
                            ]}
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
                                "Intern"
                            ]}
                        />

                        <SelectField
                            label="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            options={[
                                "ADMIN",
                                "EMPLOYEE"
                            ]}
                        /> */}

                    </div>

                    <div className="mt-6">

                        <TextAreaField
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />

                    </div>
                                        <div className="pt-2">

                        <Button
                            text="Update Profile"
                            type="submit"
                        />

                    </div>

                </form>

            </div>

        </div>

    );

}

export default UpdateProfile;