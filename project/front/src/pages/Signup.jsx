import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'


const Signup = () => {
    let [loader, setLoader] = useState(false)
    let navigate = useNavigate();
    let SignupForm = useFormik({
        initialValues : {
            fullname : "",
            email : "",
            username : "",
            password : "",
            contact : "",
            gender : "",
            address : "",
            city : "",
            repassword : ""
        },
        onSubmit : (formData)=>{
            setLoader(true)
            
            // console.log(formData)
            
            axios
            .post("http://localhost:3000/api/v1/user", formData)
            .then(response=>{
                setLoader(false)
                toast("You Are Succeses Full Signup !", {
                    onClose : ()=>navigate("/login")
                });
                
            })
        }
    })


    let [city, setCity] = useState([])

    useEffect(()=>{
        axios
        .get("http://localhost:3000/api/v1/city")
        .then(response=>{
            // console.log(response.data)
            setCity(response.data.result)
        })
    },[])


  return (
    <>
    <ToastContainer autoClose={3000} theme="dark" />
    <div className="container my-5" style={{minHeight : 750}}>
            <form onSubmit={SignupForm.handleSubmit}>
        <div className="row">
            <div className="col-md-6 offset-md-3 mt-5">
                <div className="card">
                    <div className="card-header bg-yellow">
                        <h3 className='text-light'>Registration</h3>
                    </div>
                    <div className="card-body">
                        <div className='my-2'>
                            <label>Full Name</label>
                            <input type='text' name='fullname' onChange={SignupForm.handleChange} placeholder='Full Name' className='form-control' />
                        </div>
                        <div className='my-2'>
                            <label>Username</label>
                            <input type='text' name='username' onChange={SignupForm.handleChange} placeholder='Username' className='form-control' />
                        </div>
                        <div className='my-2'>
                            <label>Email</label>
                            <input type='text' name='email' onChange={SignupForm.handleChange} placeholder='Email' className='form-control' />
                        </div>
                        <div className='my-2'>
                            <label>Password</label>
                            <input type='password' name='password' onChange={SignupForm.handleChange} placeholder='Password' className='form-control' />
                        </div>
                        <div className='my-2'>
                            <label>Re-Password</label>
                            <input type='password' name='repassword' onChange={SignupForm.handleChange} placeholder='Re-Password' className='form-control' />
                        </div>
                        <div className='my-2'>
                            <label>Contact</label>
                            <input type='text' name='contact' onChange={SignupForm.handleChange} placeholder='Contact' className='form-control' />
                        </div>
                        <div className='my-2'>
                            <label>Address</label>
                            <textarea name='address' onChange={SignupForm.handleChange} placeholder='Address' className='form-control'></textarea>
                        </div>
                        <div className='my-2'>
                            <label>City</label>
                            <select name='city' onChange={SignupForm.handleChange} className='form-control'>
                              <option>Select</option>
                              {
                                city.map(item=>{
                                    return(
                                        <option>{item.name}</option>
                                    )
                                })
                              }
                              
                            </select>
                        </div>
                        <div className="my-3">
                          <label>Gender</label>
                          <br />
                          Male <input type='radio' value="male" name='gender' onChange={SignupForm.handleChange}/>
                          &nbsp;&nbsp;&nbsp;
                          Female <input type='radio' value="female" name='gender' onChange={SignupForm.handleChange}/>
                        </div>
                    </div>
                    <div className="card-footer bg-yellow">
                        <button type='submit' className='btn btn-dark'>
                        Signup &nbsp;
                        { 
                        loader 
                        ? 
                        <span className='spinner-border spinner-border-sm'></span>
                        :
                        ''
                        }
                        </button>
                    </div>
                </div>
            </div>
        </div>
            </form>
    </div>
    </>
  )
}

export default Signup