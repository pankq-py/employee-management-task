import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import MaterialTable from "@material-table/core"
import "../styles/Home.css"
import { MdList, MdGridView } from "react-icons/md";
import { TbEdit, TbEye, TbTrash } from "react-icons/tb";
import CustomLoader from "../components/CustomLoader";
import ConfirmationModal from "../components/ConfirmationModal"
import WarningModal from "../components/WarningModal"
import SuccessModal from "../components/SuccessModal"

const Home = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState([])
    const [searchId, setSearchId] = useState("")
    const [isCardView, setIsCardView] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [error, setError] = useState("")
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [message, setMessage] = useState("")

    const columnsData = [
        { title: "ID", field: "id", width: "10%" },
        {
            title: "Avatar",
            field: "avatar",
            render: rowData => (
                <div className="home_avatarTable">
                    <img
                        src={
                            // rowData?.avatar ||
                            `https://api.dicebear.com/9.x/adventurer/svg?seed=${rowData?.name}`
                        }
                        alt={rowData?.name}
                    />
                </div>
            ),
            width: "10%"
        },
        { title: "Name", field: "name", width: "20%" },
        { title: "Email", field: "emailId", width: "25%" },
        {
            title: "Actions",
            field: "actions",
            render: rowData => (
                <div className="home_actions">
                    <button
                        onClick={() => navigate(`/edit/${rowData?.id}`)}
                        className="home_editButton"
                        title="Edit"
                    >
                        <TbEdit size={20} />
                    </button>
                    <button
                        onClick={() => navigate(`/employee/${rowData?.id}`)}
                        className="home_viewButton"
                        title="View"
                    >
                        <TbEye size={20} />
                    </button>
                    <button
                        className="home_deleteButton"
                        onClick={() => openDeleteModal(rowData?.id)}
                        title="Delete"
                    >
                        <TbTrash size={20} />
                    </button>
                </div>
            ),
            width: "15%"
        }
    ]

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
            setIsLoading(true);
            axios
                .get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${searchId}`)
                .then(response => {
                    setSearchId("")
                    setIsLoading(false);
                    setEmployees([response?.data ?? {}])
                })
                .catch(error => {
                    setIsLoading(false);
                    setIsWarningModalOpen(true);
                    setError("Employee not found!")
                    console.error("Employee not found:", error)
                })
        } else {
            getEmployeeData()
        }
    }

    const openDeleteModal = (id) => {
        setSelectedEmployeeId(id);
        setIsModalOpen(true);
    }

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setSelectedEmployeeId(null);
    }

    const closeWarningModal = () => {
        setIsWarningModalOpen(false);
    }

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    }

    const handleDelete = () => {
        if (selectedEmployeeId) {
            setIsLoading(true);
            axios
                .delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${selectedEmployeeId}`)
                .then(() => {
                    setIsLoading(false);
                    setEmployees(employees?.filter(emp => emp?.id !== selectedEmployeeId));
                    closeDeleteModal();
                    getEmployeeData();
                    setTimeout(() => {
                        setIsSuccessModalOpen(true);
                        setMessage("Employee deleted successfully.")
                    }, 300);
                })
                .catch(error => {
                    setIsLoading(false);
                    console.error("Error deleting employee:", error)
                });
        }
    }

    return (
        <div className="home_container fadeInAnimation">
            <h1>Employee List</h1>
            <div className="home_searchContainer">
                <input
                    type="text"
                    placeholder="Search by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    className="home_input"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />
                <button onClick={handleSearch} className="home_button">Search</button>
                <button onClick={() => navigate("/add")} className="home_addButton">
                    Add Employee
                </button>
                <button
                    onClick={() => setIsCardView(prev => !prev)}
                    className="home_toggleButton fadeInAnimation"
                    title={isCardView ? "Switch to List View" : "Switch to Grid View"}
                >
                    {
                        isCardView ?
                            <MdList size={25} className="fadeInAnimation" />
                            :
                            <MdGridView size={25} className="fadeInAnimation" />
                    }
                </button>
            </div>

            {isCardView ? (
                <div className="home_employeeList fadeInAnimation">
                    {employees?.map(emp => (
                        <div key={emp?.id} className="home_employeeCard">
                            <div className="home_avatar">
                                <img
                                    src={
                                        // emp?.avatar ||
                                        `https://api.dicebear.com/9.x/adventurer/svg?seed=${emp?.name}`
                                    }
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
                                        title="Edit"
                                    >
                                        <TbEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => navigate(`/employee/${emp?.id}`)}
                                        className="home_viewButton"
                                        title="View"
                                    >
                                        <TbEye size={20} />
                                    </button>
                                    <button
                                        className="home_deleteButton"
                                        onClick={() => openDeleteModal(emp?.id)}
                                        title="Delete"
                                    >
                                        <TbTrash size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="fadeInAnimation">
                    <MaterialTable
                        title="Employee List"
                        columns={columnsData}
                        data={employees}
                        options={{
                            search: false,
                            paging: true,
                            sorting: true,
                            columnResizable: true,
                        }}
                    />
                </div>
            )}
            <ConfirmationModal
                isModalOpen={isModalOpen}
                closeDeleteModal={closeDeleteModal}
                handleDelete={handleDelete}
            />
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
            <CustomLoader
                isLoading={isLoading}
            />
        </div>
    )
}

export default Home
