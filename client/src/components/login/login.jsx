import "./login.css"
import React, { useState,useEffect } from 'react'
import "./login.css"
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    useEffect(()=>{
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('name')
    },[])
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)
        try {
            console.log("entered in try block")
            const resp = await axios.post('http://localhost:8080/login', form)
            console.log(resp)
            if (resp.data.success) {
                const token = resp.data.token
                const name = resp.data.user.name
                console.log(name)
                sessionStorage.setItem('name',name)
                sessionStorage.setItem('token', token)
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Logged In Successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                setTimeout(()=>{
                    navigate('/images')
                },2000)
            }
            else{
                toast.error("enter correct Credentials")

            }
        }
        catch(error){
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
              ){
                toast.error("please correct credetials")
              }
        }
    }
    return (
        <div id='mainContainer'>
            <div className='container'>
                <h1>My gallary</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='form-label' htmlFor="email">Email:<input type="email" value={form.email} id="email" className='form-control' placeholder="Email" onChange={e => { setForm({ ...form, email: e.target.value }) }} /></label>
                    </div>
                    <div>
                        <label className='form-label' htmlFor="password" >Password:&nbsp;&nbsp;&nbsp;<input type="password" className='form-control' value={form.password} id="password" placeholder="Enter Password" onChange={e => setForm({ ...form, password: e.target.value })} /></label>
                    </div>
                    <div id='inputCheckboxDiv'>
                        <label className='form-label' htmlFor=""><input type="checkbox" id="inputCheckbox" className='form-check-label' required /> I agree all the terms and conditions</label>
                    </div>
                    <div>
                        <Link to="/register"><button className="btn btn-danger">Register</button></Link>
                    </div>
                    <button type='submit' id="loginButton" className='btn btn-primary'>Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;