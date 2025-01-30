import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ReactSelect from "react-select";
import CustomLoader from "../components/CustomLoader";
import "../styles/AddEditEmployee.css";
import { SingleValue } from "react-select/animated";
import WarningModal from "../components/WarningModal";
import SuccessModal from "../components/SuccessModal";

const AddEditEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const [mode, setMode] = useState(() =>
        id ? (location.pathname.includes("employee") ? "view" : "edit") : "add"
    )
    const [isLoading, setIsLoading] = useState(false);
    const [employee, setEmployee] = useState({
        name: "",
        emailId: "",
        mobile: "",
        country: "",
        state: "",
        district: ""
    })
    const [countries, setCountries] = useState([]);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [error, setError] = useState("")
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState("")

    const reactSelectStyle = {
        control: (baseStyles, { isDisabled }) => ({
            ...baseStyles,
            boxShadow: "none",
            fontSize: window.innerWidth < 768 ? "12px" : "14px",
            border: isDisabled ? "1px solid #ccc" : baseStyles.border,
            "&:hover": {
                border: "1px solid #888"
            },
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#555"
        }),
        indicatorSeparator: () => ({
            display: "none"
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            fontSize: window.innerWidth < 768 ? "12px" : "14px",
        }),
        singleValue: (base, { isDisabled }) => ({
            ...base,
            color: "#000",
        })
    }

    useEffect(() => {
        // setIsLoading(true);
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => {
                // setIsLoading(false);
                const countryOptions = response.data.map(country => ({
                    value: country.name.common,
                    label: country.name.common
                }));
                setCountries(countryOptions);
            })
            .catch(error => {
                // setIsLoading(false);
                setError("Error fetching countries!")
                setIsWarningModalOpen(true);
                console.error("Error fetching countries:", error);
            })

        if (id) {
            setIsLoading(true)
            axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`)
                .then(response => {
                    setIsLoading(false);
                    setEmployee(response.data);
                })
                .catch(error => {
                    setIsLoading(false);
                    console.error("Error fetching employee details:", error);
                })
        }
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    }

    const handleCountryChange = (selectedOption) => {
        setEmployee(prev => ({ ...prev, country: selectedOption?.value || "" }));
    }

    const handleSubmit = () => {
        setIsLoading(true);

        if (!employee.name) {
            setError("Name is required!");
            setIsWarningModalOpen(true);
            setIsLoading(false);
            return
        }

        if (!employee.emailId) {
            setError("Email is required!");
            setIsWarningModalOpen(true);
            setIsLoading(false);
            return
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (employee.emailId && !emailRegex.test(employee.emailId)) {
            setError("Please enter a valid email address!");
            setIsWarningModalOpen(true);
            setIsLoading(false);
            return
        }

        if (!employee.mobile) {
            setError("Mobile number is required!");
            setIsWarningModalOpen(true);
            setIsLoading(false);
            return
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (employee.mobile && !mobileRegex.test(employee.mobile)) {
            setError("Please enter a valid 10-digit mobile number!");
            setIsWarningModalOpen(true);
            setIsLoading(false);
            return
        }

        if (!employee.country) {
            setError("Country is required!");
            setIsWarningModalOpen(true);
            setIsLoading(false);
            return
        }

        if (!employee.state) {
            setError("State is required!");
            setIsWarningModalOpen(true);
            setIsLoading(false);
            return
        }

        if (!employee.district) {
            setError("District is required!");
            setIsWarningModalOpen(true);
            setIsLoading(false);
            return
        }

        const apiCall = id
            ? axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, employee)
            : axios.post("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee", employee);

        apiCall
            .then(() => {
                setIsLoading(false);
                setTimeout(() => {
                    setIsSuccessModalOpen(true);
                    setMessage(mode == "edit"
                        ? "Employee update successfully."
                        : "Employee added successfully.")
                }, 300);
            })
            .catch(error => {
                setIsLoading(false);
                console.error("Error saving employee:", error);
            })
    }

    const toggleEditMode = () => {
        setMode("edit");
    }

    const closeWarningModal = () => {
        setIsWarningModalOpen(false);
    }

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        navigate("/");
    }

    return (
        <>
            <div className="addEditEmp_cardContainer fadeInAnimation">
                <h1 className="addEditEmp_heading">
                    {mode === "view" ? "View Employee" : mode === "edit" ? "Edit Employee" : "Add Employee"}
                </h1>
                {mode === "view" ? (
                    <div className="addEditEmp_inputContainerView">
                        <>
                            <div className="addEditEmp_viewField">
                                <label>Name</label>
                                <span>:</span>
                                <p>{employee?.name || "N/A"}</p>
                            </div>
                            <div className="addEditEmp_viewField">
                                <label>Email</label>
                                <span>:</span>
                                <p>{employee?.emailId || "N/A"}</p>
                            </div>
                            <div className="addEditEmp_viewField">
                                <label>Mobile</label>
                                <span>:</span>
                                <p>{employee?.mobile || "N/A"}</p>
                            </div>
                            <div className="addEditEmp_viewField">
                                <label>Country</label>
                                <span>:</span>
                                <p>{employee?.country || "N/A"}</p>
                            </div>
                            <div className="addEditEmp_viewField">
                                <label>State</label>
                                <span>:</span>
                                <p>{employee?.state || "N/A"}</p>
                            </div>
                            <div className="addEditEmp_viewField">
                                <label>District</label>
                                <span>:</span>
                                <p>{employee?.district || "N/A"}</p>
                            </div>
                        </>
                    </div>
                ) : (
                    <div className="addEditEmp_inputContainer">
                        <>
                            <input
                                type="text"
                                name="name"
                                value={employee.name}
                                onChange={handleChange}
                                onKeyDown={
                                    (e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }
                                }
                                placeholder="Name"
                                className="addEditEmp_input"
                                required
                            />
                            <input
                                type="email"
                                name="emailId"
                                value={employee.emailId}
                                onChange={handleChange}
                                onKeyDown={
                                    (e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }
                                }
                                placeholder="Email"
                                className="addEditEmp_input"
                                required
                            />
                            <input
                                type="text"
                                name="mobile"
                                value={employee.mobile}
                                onChange={handleChange}
                                onKeyDown={
                                    (e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }
                                }
                                maxLength={10}
                                placeholder="Mobile"
                                className="addEditEmp_input"
                                required
                            />
                            <div className="addEditEmp_selectContainer">
                                <ReactSelect
                                    value={countries.find(c => c.value === employee.country) || null}
                                    onChange={handleCountryChange}
                                    options={countries}
                                    placeholder="Select Country"
                                    styles={reactSelectStyle}
                                />
                            </div>
                            <input
                                type="text"
                                name="state"
                                value={employee.state}
                                onChange={handleChange}
                                onKeyDown={
                                    (e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }
                                }
                                placeholder="State"
                                className="addEditEmp_input"
                                required
                            />
                            <input
                                type="text"
                                name="district"
                                value={employee.district}
                                onChange={handleChange}
                                onKeyDown={
                                    (e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }
                                }
                                placeholder="District"
                                className="addEditEmp_input"
                                required
                            />
                        </>
                    </div>
                )}
                <div className="addEditEmp_buttonsContainer">
                    {mode === "view" ? (
                        <button
                            onClick={toggleEditMode}
                            className="addEditEmp_button"
                        >
                            Edit Employee
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="addEditEmp_button"
                        >
                            {mode === "edit" ? "Update" : "Add"} Employee
                        </button>
                    )}
                    <button
                        onClick={() => navigate("/")}
                        className="addEditEmp_cancelButton"
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <WarningModal
                error={error}
                isWarningModalOpen={isWarningModalOpen}
                closeWarningModal={closeWarningModal}
            />
            <SuccessModal
                message={message}
                isSuccessModalOpen={isSuccessModalOpen}
                closeSuccessModal={closeSuccessModal}
            />
            <CustomLoader isLoading={isLoading} />
        </>
    );
};

export default AddEditEmployee;