import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CustomLoader from "../components/CustomLoader";

const EmployeeDetails = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`)
      .then(response => setEmployee(response.data))
      .catch(error => console.error("Error fetching employee details:", error))
  }, [id])

  return (
    <div>
      <h1>{employee.name}</h1>
      <p>Email: {employee.emailId}</p>
      <p>Mobile: {employee.mobile}</p>
      <p>Country: {employee.country}</p>
      <p>State: {employee.state}</p>
      <p>District: {employee.district}</p>
      <Link to={`/edit/${id}`}><button>Edit</button></Link>
      <Link to="/"><button>Back</button></Link>
      <CustomLoader isLoading={isLoading} />
    </div>
  )
}

export default EmployeeDetails;