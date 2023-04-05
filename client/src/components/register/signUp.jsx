import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import "./signup.css"
const SignUp = ()=>{
    const [form,setForm] = useState({name:"",email:"",password:"",confirmPassword:""})
    const [error,setError] = useState("");
    const navigate = useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(form.password!==form.confirmPassword){
            setError("Password Not matching")
        }else{
            const resp = await axios.post("http://localhost:8080/register",form)
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Logged In Successfully',
                showConfirmButton: false,
                timer: 1500
              })
            setTimeout(()=>{
                navigate('/')
            },2000)
            setError("")
          

        }
    }
    return(
        <div id='mainContainer'>
            <h3>{error}</h3>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                <div>
                        <label className='form-label' htmlFor="name">Name:<input type="text" value={form.name} id="name" className='form-control' placeholder="Enter Name" onChange={e=>{setForm({...form,name:e.target.value})}}/></label>
                    </div>
                    <div>
                        <label className='form-label' htmlFor="email">Email:<input type="email" value={form.email} id="email" className='form-control' placeholder="Email" onChange={e=>{setForm({...form,email:e.target.value})}}/></label>
                    </div>
                    <div>
                        <label className='form-label' htmlFor="password" >Password:&nbsp;&nbsp;&nbsp;<input type="password" className='form-control' value={form.password} id="password" placeholder="Enter Password" onChange={e=>setForm({...form,password:e.target.value})}/></label>
                    </div>
                    <div>
                        <label className='form-label' htmlFor="confirmPassword">Confirm Password:<input type="password" className='form-control' value={form.confirmPassword} id="confirmPassword" placeholder="Enter confirmPassword" onChange={e=>setForm({...form,confirmPassword:e.target.value})}/></label>
                    </div>
                    <div id='inputCheckboxDiv'>
                        <label className='form-label' htmlFor=""><input type="checkbox"  id="inputCheckbox" className='form-check-label' required/> I agree all the terms and conditions</label>
                    </div>
                    <button type='submit' className='btn btn-primary'>Register</button>
                </form>
            </div>
        </div>
    )
}
export default SignUp;