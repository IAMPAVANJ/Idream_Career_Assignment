import React, { useState } from 'react'
import './upload.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
function Upload() {
    const navigate = useNavigate()

    const [newPost, setNewPost] = useState({
        label: '',
        image: ''
    })

    const checkLink=()=>{
        if(!newPost.image.includes(":")){
            Swal.fire("Link is not correct kindly pastes correct Link")
            setNewPost({...newPost,image:""})
        }
    }
    //handle Post Note
    const handlePostNote = async (e) => {
        e.preventDefault()
        const token = sessionStorage.getItem('token')
       let resp = await axios.post("http://localhost:8080/uploadImage",newPost,{
        headers:{
            authorization:token
        }
       })
       if(resp.status===201){
        Swal.fire("image Uploaded successfully")
        navigate("/images")
       }
       console.log(resp)
    }

    return (
        <div className='fluid-container postnotefrom-body'>
            <h1>Upload New Image</h1>
            <Link to="/images"><button className='btn btn-primary'>Main page</button></Link>
            <form className='post-note-form-container'>
                <label>TITLE</label>
                <input type='text' name='title' placeholder='Title' value={newPost.label} onChange={(e)=>{setNewPost({...newPost,label:e.target.value})}} required/>
                <label>Image URL</label>
                <input className='form-control' name='description' onBlur={checkLink} value={newPost.image} onChange={(e)=>{setNewPost({...newPost,image:e.target.value})}} required/>
                <button className='btn btn-danger postnote-btn' onClick={handlePostNote}>Upload</button>
            </form>
        </div>
    )
}

export default Upload;