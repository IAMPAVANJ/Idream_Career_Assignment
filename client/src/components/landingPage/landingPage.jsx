import React from "react";
import { useState,useEffect } from "react";
import {Link} from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import "./landingPage.css"
const LandingPage = ()=>{
    const [data,setData] = useState([])
    const [name,setName] = useState("")
    const [search,setSearch] = useState("")
    const deleteImage=(id)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          handleDelete(id)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    }
    const handleDelete=async(id)=>{
     const resp= await axios.delete(`http://localhost:8080/deleteImage/${id}`)
      console.log("deleted Resp",resp)
      
    }
    const getNoteList = async () => {
        const token = sessionStorage.getItem('token')
        const name = sessionStorage.getItem('name')
        const { data } = await axios.get('http://localhost:8080/', {
          headers: {
            authorization: token
          }
        })
        setName(name)
        console.log(data.data)
        
          setData(data.data)
        
      }
      useEffect(() => {
      }, [data])
      useEffect(() => {
        getNoteList();
      }, [])
    return(
        <div className="mainContainer">
            <div className="container shadow-lg p-3 mb-1 mt-1 rounded" style={{width:"80%",height:"10%",display:"flex",justifyContent:"space-evenly"}}>
                <div id="name">
                    <h2>WelCome,{name}</h2>
                </div>
                <div>
                  <input type="text" id="searchInput" className="form-control" value={search} placeholder="search image..." onChange={e=>{setSearch(e.target.value)}}/>
                </div>
                <div id="uploadButton">
                    <Link to="/upload"><button className="btn btn-success">Upload Image</button></Link>
                    <Link to="/"><button className="btn btn-danger">LogOut</button></Link>
                </div>
            </div>
            <div className="imageContainer">
            {data.length>0 && search===""?data.map((item,index)=>{
                return(
                    <div className="card" key={index} style={{backgroundImage:`url(${item.image})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat: 'no-repeat'}}>
                        <button className="btn btn-danger" onClick={()=>{deleteImage(item._id)}}>delete</button>
                        
                        <h3>{item.label}</h3>
                    </div>
                )
            }):data.length<=0?<h1>Kindly Upload Images</h1>:data.map((item,index)=>{
              let image;
              let label;
              let id;
              if(item.label.toLowerCase().includes(search.toLowerCase())){
                 image = item.image;
                 label = item.label
                 id = item._id
              }
              return<>
                <div className="card" key={index} style={{backgroundImage:`url(${image})`,backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat: 'no-repeat'}}>
                        <button className="btn btn-danger" onClick={()=>{deleteImage(id)}}>delete</button>
                        <h3>{label}</h3>
                    </div>
              </>
            })}
            </div>
        </div>
    )
}
export default LandingPage;