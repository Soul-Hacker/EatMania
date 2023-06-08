import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert';
import Navbar from '../components/Navbar';


export default function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleClick = () => {
       
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://backend-ufcs.onrender.com/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, geolocation: credentials.geolocation })

        });
        const json = await response.json()
        console.log(json);
        // consol
        if (!json.success) {
            Swal({
                title: 'Request Failed!',
                text: 'Please check the entered details',
                icon: 'error',
                button: 'OK',
            })
            // alert("enter vlaid credentials");
        }
        else{
            Swal({
                title: 'Good Job!',
                text: 'Now we are redirecting you to the login page',
                icon: 'success',
                button: 'OK',
            }).then(() => {
                window.location.href = 'https://eatmania.onrender.com/login';
            });
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
<div>
        <Navbar />
      </div>
            <div className='container' >

                <form className='w-50 m-auto mt-10 border bg-dark border-success rounded' onSubmit={handlesubmit}>

                    <div className="m-3">
                        <label htmlFor="user" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="m-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="m-3">
                        <label htmlFor="loaction" className="form-label">geolocation</label>
                        <input type="text" className="form-control" id="location" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>

                    <button type="submit" className="m-3 btn btn-success" onClick={handleClick} to="/login">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
                </form>
            </div>




        </div>
    )
}
