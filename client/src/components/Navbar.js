import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import Modal from '../Modal'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'
import Swal from 'sweetalert';
import Logo from '../Logo.png'


export default function Navbar() {
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate()
    const handleLogout = () => {
        Swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: ["Cancel", "LogOut!"],
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                Swal("LogOut!", "Logout successful", "success");
                localStorage.removeItem('token')
                navigate('/')
            } else {
                Swal("Cancelled", "Logout cancelled!", "error");
            }
        });
       
    }
    const loadCart = () => {
        setCartView(true)
    }

    const items = useCart();
    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/"><img src={Logo} style={{ height: '50px', width: '50px' }} /></Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("token")) ?

                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/myOrderData">MyOrders</Link>


                                </li> : ""}
                        </ul>
                        {(!localStorage.getItem("token")) ?

                            <div className="d-flex">
                                <Link className="btn bg-white text-success mx-1 " to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </div> :
                            <div>
                                <div className='btn bg-white text-success mx-2' onClick={loadCart} >
                                    MyCart {" "}
                                    <Badge pill bg="danger">{items.length}</Badge>

                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : ""}
                                <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                                    Logout

                                </div>
                            </div>

                        }
                    </div>

                </div>
            </nav>
        </div>
    )
}
