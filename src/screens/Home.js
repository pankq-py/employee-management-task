import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import MaterialTable from "@material-table/core"
import "../styles/Home.css"
import { MdList, MdGridView } from "react-icons/md";
import CustomLoader from "../components/CustomLoader";

const Home = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState([])
    const [searchId, setSearchId] = useState("")
    const [isCardView, setIsCardView] = useState(false)

    const getEmployeeData = () => {
        setIsLoading(true);
        axios
            .get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee")
            .then(response => {
                setIsLoading(false);
                setEmployees(response?.data ?? [])
            })
            .catch(error => {
                setIsLoading(false);
                console.error("Error fetching employees:", error)
            })
    }

    useEffect(() => {
        getEmployeeData()
    }, [])

    const handleSearch = () => {
        if (searchId) {
            axios
                .get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${searchId}`)
                .then(response => setEmployees([response?.data ?? {}]))
                .catch(error => console.error("Employee not found:", error))
        } else {
            getEmployeeData()
        }
    }

    const handleDelete = (id) => {
        axios
            .delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`)
            .then(() => setEmployees(employees?.filter(emp => emp?.id !== id)))
            .catch(error => console.error("Error deleting employee:", error))
    }

    return (
        <div className="home_container">
            <h1>Employee List</h1>
            <div className="home_searchContainer">
                <input
                    type="text"
                    placeholder="Search by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="home_input"
                />
                <button onClick={handleSearch} className="home_button">Search</button>
                <button onClick={() => navigate("/add")} className="home_addButton">
                    Add Employee
                </button>
                <button
                    onClick={() => setIsCardView(isCardView === "cards" ? "table" : "cards")}
                    className="home_toggleButton"
                >
                    {
                        isCardView === "cards" ?
                            <MdList size={25} />
                            :
                            <MdGridView size={25} />
                    }
                </button>
            </div>

            {isCardView === "cards" ? (
                <div className="home_employeeList">
                    {employees?.map(emp => (
                        <div key={emp?.id} className="home_employeeCard">
                            <div className="home_avatar">
                                <img
                                    src={emp?.avatar || `https://api.dicebear.com/9.x/adventurer/svg?seed=${emp?.name}`}
                                    alt={emp?.name}
                                />
                            </div>
                            <div className="home_employeeInfo">
                                <h2 className="home_employeeName">{emp?.name}</h2>
                                <p className="home_employeeEmail">{emp?.emailId}</p>
                                <div className="home_actions">
                                    <button
                                        onClick={() => navigate(`/edit/${emp?.id}`)}
                                        className="home_editButton"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => navigate(`/employee/${emp?.id}`)}
                                        className="home_viewButton"
                                    >
                                        View
                                    </button>
                                    <button
                                        className="home_deleteButton"
                                        onClick={() => handleDelete(emp?.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <MaterialTable
                    title="Employee List"
                    columns={[
                        { title: "ID", field: "id" },
                        {
                            title: "Avatar",
                            field: "avatar",
                            render: rowData => (
                                <img
                                    src={rowData.avatar || `https://api.dicebear.com/9.x/adventurer/svg?seed=${rowData.name}`}
                                    alt={rowData.name}
                                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                                />
                            )
                        },
                        { title: "Name", field: "name" },
                        { title: "Email", field: "emailId" },
                        {
                            title: "Actions",
                            field: "actions",
                            render: rowData => (
                                <div className="home_actions">
                                    <button
                                        onClick={() => navigate(`/edit/${rowData.id}`)}
                                        className="home_editButton"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => navigate(`/employee/${rowData.id}`)}
                                        className="home_viewButton"
                                    >
                                        View
                                    </button>
                                    <button
                                        className="home_deleteButton"
                                        onClick={() => handleDelete(rowData.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )
                        }
                    ]}
                    data={employees}
                    options={{
                        search: false,
                        paging: true,
                        sorting: true
                    }}
                />
            )}
            <CustomLoader isLoading={true} />
        </div>
    )
}

export default Home
