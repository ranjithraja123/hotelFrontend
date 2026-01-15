import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { checkAdminCode } from '../../redux/adminSlice';
import toast from 'react-hot-toast'
import LMOFFFF from '../../assets/images/LMOFFFF.png';


const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalInput, setModalInput] = useState({
        admin: "",
        admincode: "",
    });
    const [time, setTime] = useState(new Date())

    const [fielderror, setError] = useState("");
    const [showSoftTokenField, setShowSoftTokenField] = useState(false); // For showing soft token field
    const [softToken, setSoftToken] = useState(""); // State for soft token input
    const navbarRef = useRef(null);
    const navbarToggleRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }


    const dispatch = useDispatch();
    const { loading, success, error, data } = useSelector((state) => state.admin);

    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setShowSoftTokenField(false); // Reset soft token field visibility
        setModalInput({ admin: "", admincode: "" }); // Clear modal inputs
        setSoftToken(""); // Clear soft token
        setError("");
    };

    useEffect(() => {
        console.log(data, "data")
    }, {})



    const handleSave = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}admin/checkAdmin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(modalInput),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data, "res");

            if (response.ok) {
                //alert("Admin Added Successfully");
                toast.success("Admin Added Successfully. Please provide token")
                setShowSoftTokenField(true); // Show soft token input on success
            } else {
                //setError(data.message || "Validation failed");
                toast.error(data.message || "Validation Failed")
            }
        } catch (error) {
            console.error("API Error", error);
            //setError("An error occurred. Please try again later.");
            toast.error("Admin did not match")
        }
    };

    const handleSoftTokenSubmit = async () => {
        if (!modalInput.admin || !modalInput.admincode || !softToken) {
            setError("All fields are required.");
            return;
        }

        // try {
        //     const response = await fetch("http://localhost:8000/admin/checkCode", {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             admin: modalInput.admin,
        //             admincode: modalInput.admincode,
        //             adminsoft:softToken,
        //         }),
        //     }); 

        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //     const data = await response.json();
        //     console.log(data, "checkCode response");

        //     if (response.ok) {
        //         alert("Soft Token Verified Successfully");
        //         handleCloseModal();
        //     } else {
        //         setError(data.message || "Verification failed");
        //     }
        // } catch (error) {
        //     console.error("API Error", error);
        //     setError("An error occurred. Please try again later.");
        // }

        dispatch(checkAdminCode({
            admin: modalInput.admin,
            admincode: modalInput.admincode,
            adminsoft: softToken
        }))
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setModalInput((prevInput) => ({
            ...prevInput,
            [id]: value,
        }));
    };

    const handleSoftTokenChange = (e) => {
        setSoftToken(e.target.value);
    };

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <div className="row w-100 d-flex align-items-center">

                        <div className="col-6 text-light d-flex align-items-center">
                            <Link style={{ textDecoration: 'none', color: "white" }} to="/">
                                <img src={LMOFFFF} style={{ height: "95px", width: "170px" }} alt="Logo" />
                            </Link>



                        </div>

                        <div className="col-6">

                            <ul className={isOpen ? ".nav" : "links d-flex justify-content-end text-light m-0"}>


                                <Link className=' content mx-3' style={{ textDecoration: 'none', color: 'white' }} to="/">Home</Link>
                                <Link className='content mx-3' style={{ textDecoration: 'none', color: 'white' }} to="/abouthotel">About</Link>
                                <Link
                                    className='content mx-3'
                                    style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
                                    onClick={handleOpenModal}
                                >
                                    <IoMdAddCircleOutline size={23} />
                                </Link>
                                {
                                    data?.adminData?.adminSoftCode && <Link className='mx-3' style={{ textDecoration: 'none', color: 'white' }} to="/addRooms">Add Rooms</Link>

                                }

                            </ul>

                        </div>
                    </div>
                </div>
            </nav>

            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Admin</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="admin" className="form-label">Admin</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="admin"
                                            placeholder="Enter Admin Name"
                                            value={modalInput.admin}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="admincode" className="form-label">Admin Code</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="admincode"
                                            placeholder="Enter Admin Code"
                                            value={modalInput.admincode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    {showSoftTokenField && (
                                        <div className="mb-3">
                                            <label htmlFor="softToken" className="form-label">Soft Token</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="softToken"
                                                placeholder="Enter Soft Token"
                                                value={softToken}
                                                onChange={handleSoftTokenChange}
                                            />
                                        </div>
                                    )}

                                    {fielderror && <div className="text-danger">{fielderror}</div>}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                                {showSoftTokenField ? (
                                    <button type="button" className="btn btn-primary" onClick={handleSoftTokenSubmit}>
                                        Submit Soft Token
                                    </button>
                                ) : (
                                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                                        Save
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
