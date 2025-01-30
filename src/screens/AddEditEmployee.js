import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CustomLoader from "../components/CustomLoader";

const AddEditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [employee, setEmployee] = useState({
        name: "",
        emailId: "",
        mobile: "",
        country: "",
        state: "",
        district: ""
    })
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then(response => setCountries(response.data.map(c => c.name.common)))
            .catch(error => console.error("Error fetching countries:", error))

        if (id) {
            axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`)
                .then(response => setEmployee(response.data))
                .catch(error => console.error("Error fetching employee details:", error))
        }
    }, [id])

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const apiCall = id
            ? axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, employee)
            : axios.post("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee", employee)

        apiCall
            .then(() => navigate("/"))
            .catch(error => console.error("Error saving employee:", error))
    }

    return (
        <div>
            <h1>{id ? "Edit Employee" : "Add Employee"}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={employee.name} onChange={handleChange} placeholder="Name" required />
                <input type="email" name="emailId" value={employee.emailId} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} placeholder="Mobile" required />
                <select name="country" value={employee.country} onChange={handleChange} required>
                    <option value="">Select Country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="text" name="state" value={employee.state} onChange={handleChange} placeholder="State" required />
                <input type="text" name="district" value={employee.district} onChange={handleChange} placeholder="District" required />
                <button type="submit">{id ? "Update" : "Add"} Employee</button>
            </form>
            <button onClick={() => navigate("/")}>Cancel</button>
            <CustomLoader isLoading={isLoading} />
        </div>
    )
}

export default AddEditEmployee;
