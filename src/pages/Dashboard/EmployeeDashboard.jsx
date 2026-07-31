import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import AIChatBot from "../../components/AIChatBot";
import {
    FaLaptop,
    FaDesktop,
    FaKeyboard,
    FaMouse,
    FaMobileAlt,
    FaHeadphones,
    FaIdBadge
} from "react-icons/fa";

import { MdMonitor } from "react-icons/md";

import { getEmployeeAssets } from "../../services/AssetService";

function Dashboard() {

    const navigate = useNavigate();

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const [assets, setAssets] = useState([]);

    const menuRef = useRef(null);

    const employee = JSON.parse(localStorage.getItem("employee"));

    const handleLogout = () => {

        localStorage.removeItem("employee");

        navigate("/");

    };

    const fetchAssets = async () => {

        try {

            const response = await getEmployeeAssets(employee.id);

            setAssets(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchAssets();

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {

                setShowMenu(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    if (!employee || employee.role !== "EMPLOYEE") {

        return <Navigate to="/" replace />;

    }

    const getIcon = (type) => {

        switch (type) {

            case "Laptop":

                return <FaLaptop className="text-purple-600 text-3xl" />;

            case "Desktop":

                return <FaDesktop className="text-purple-600 text-3xl" />;

            case "Monitor":

                return <MdMonitor className="text-purple-600 text-3xl" />;

            case "Keyboard":

                return <FaKeyboard className="text-purple-600 text-3xl" />;

            case "Mouse":

                return <FaMouse className="text-purple-600 text-3xl" />;

            case "Mobile":

                return <FaMobileAlt className="text-purple-600 text-3xl" />;

            case "Headphone":

                return <FaHeadphones className="text-purple-600 text-3xl" />;

            case "ID Card":

                return <FaIdBadge className="text-purple-600 text-3xl" />;

            default:

                return <FaLaptop className="text-purple-600 text-3xl" />;

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            {/* Header */}

            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-8 flex justify-between items-center text-white">

                <div>

                    <h1 className="text-5xl font-bold">

                        Welcome, {employee.firstName} 👋

                    </h1>

                    <p className="mt-3 text-xl">

                        {employee.designation} • {employee.department}

                    </p>

                </div>

                <div
                    className="relative"
                    ref={menuRef}
                >

                    <div

                        onClick={() =>
                            setShowMenu(!showMenu)
                        }

                        className="w-24 h-24 rounded-full bg-white text-purple-700 flex items-center justify-center text-4xl font-bold shadow-lg cursor-pointer hover:scale-105 transition"

                    >

                        {employee.firstName.charAt(0)}

                    </div>
                                        {showMenu && (

                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">

                            <button
                                onClick={() => {

                                    navigate("/employee/update-profile");
                                    setShowMenu(false);

                                }}
                                className="w-full flex items-center gap-3 px-5 py-4 text-gray-800 font-medium hover:bg-purple-100 hover:text-purple-700 transition"
                            >

                                👤

                                <span>Update Profile</span>

                            </button>

                            <button
                                onClick={() => {

                                    navigate("/employee/change-password");
                                    setShowMenu(false);

                                }}
                                className="w-full flex items-center gap-3 px-5 py-4 text-gray-800 font-medium hover:bg-orange-100 hover:text-orange-600 transition"
                            >

                                🔒

                                <span>Change Password</span>

                            </button>

                            <button
                                onClick={() => {

                                    setShowMenu(false);
                                    setShowLogoutModal(true);

                                }}
                                className="w-full flex items-center gap-3 px-5 py-4 text-red-600 font-medium hover:bg-red-100 transition"
                            >

                                🚪

                                <span>Logout</span>

                            </button>

                        </div>

                    )}

                </div>

            </div>

            {/* Employee Details */}

            <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

                <h2 className="text-3xl font-bold text-purple-700 mb-8">

                    Employee Details

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 text-lg">

                    <p><b>Name :</b> {employee.firstName} {employee.lastName}</p>

                    <p><b>Email :</b> {employee.email}</p>

                    <p><b>Phone :</b> {employee.phoneNumber}</p>

                    <p><b>Gender :</b> {employee.gender}</p>

                    <p><b>Date of Birth :</b> {employee.dateOfBirth}</p>

                    <p><b>Department :</b> {employee.department}</p>

                    <p><b>Designation :</b> {employee.designation}</p>
                    
                    <p> <b> Address : </b> {employee.address}</p>

                </div>

            </div>

            {/* My Assets */}

            <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">

                <h2 className="text-3xl font-bold text-purple-700 mb-8">

                    My Assets

                </h2>

                {

                    assets.length > 0 ?

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {

                            assets.map((asset) => (

                                <div

                                    key={asset.id}

                                    className="border border-gray-200 rounded-2xl p-6 shadow hover:shadow-xl hover:-translate-y-1 transition-all duration-300"

                                >

                                    <div className="flex items-center gap-4 mb-5">

                                        {getIcon(asset.assetType)}

                                        <div>

                                            <h3 className="font-bold text-xl">

                                                {asset.assetName}

                                            </h3>

                                            <p className="text-gray-500">

                                                {asset.assetType}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="space-y-3 text-gray-700">

                                        <p>

                                            <b>Allocated :</b>{" "}

                                            {

                                                new Date(asset.allocatedDate)

                                                .toLocaleDateString(

                                                    "en-IN",

                                                    {

                                                        day:"2-digit",

                                                        month:"long",

                                                        year:"numeric"

                                                    }

                                                )

                                            }

                                        </p>

                                        <div className="flex items-center gap-2">

                                            <b>Status :</b>

                                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">

                                                {asset.status}

                                            </span>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                    :

                    <div className="text-center py-16">

                        <FaLaptop className="text-6xl text-gray-300 mx-auto mb-4"/>

                        <h3 className="text-2xl font-semibold text-gray-500">

                            No Assets Assigned

                        </h3>

                        <p className="text-gray-400 mt-2">

                            Contact Admin if you think this is incorrect.

                        </p>

                    </div>

                }

            </div>
                        {/* Logout Modal */}

            {

                showLogoutModal && (

                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                        <div className="bg-white rounded-2xl p-8 w-[400px] shadow-2xl">

                            <h2 className="text-2xl font-bold text-center text-gray-800">

                                Confirm Logout

                            </h2>

                            <p className="text-center text-gray-600 mt-4">

                                Are you sure you want to logout from your account?

                            </p>

                            <div className="flex justify-center gap-5 mt-8">

                                <button

                                    onClick={() =>
                                        setShowLogoutModal(false)
                                    }

                                    className="px-6 py-3 rounded-lg bg-gray-300 hover:bg-gray-400"

                                >

                                    Cancel

                                </button>

                                <button

                                    onClick={handleLogout}

                                    className="px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700"

                                >

                                    Logout

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }
<AIChatBot role="EMPLOYEE" />
        </div>
        
    );

}

export default Dashboard;