import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'

import * as YUP from 'yup'

let SignupSchema = YUP.object({
    fullname : YUP.string().required("Insert Your Full Name"),
    username : YUP.string().required("Insert Your Username"),
    email : YUP.string().required("Insert Your E-Mail Id"),
    password : YUP.string().required("Insert Your Password"),
    repassword : YUP.string().required("Insert Your Re-Password"),
    city : YUP.string().required("Select Your City"),
    contact : YUP.string().required("Insert Your Contact Number"),
    address : YUP.string().required("Insert Your Full Address"),
    gender : YUP.string().required("Select Your Gender"),
})
const Signup = () => {
    let [loader, setLoader] = useState(false)
    let navigate = useNavigate();
    let SignupForm = useFormik({
        validationSchema : SignupSchema,
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
            console.log(formData)
            return;

            setLoader(true)
            
            // console.log(formData)
            
            axios
            // .post(import.meta.env.VITE_API_URL+"/user", formData)
            .post(`${import.meta.env.VITE_API_URL}/user`, formData)
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
        .get(`${import.meta.env.VITE_API_URL}/city`)
        .then(response=>{
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
                            <input type='text' name='fullname' onChange={SignupForm.handleChange} placeholder='Full Name' className={'form-control '+ (SignupForm.errors.fullname && SignupForm.touched.fullname ? 'is-invalid' : '')} />
                            {
                                SignupForm.errors.fullname && SignupForm.touched.fullname                                
                                ?
                                <small className='text-danger'>{SignupForm.errors.fullname}</small>
                                :
                                ''
                            }
                        </div>
                        <div className='my-2'>
                            <label>Username</label>
                            <input type='text' name='username' onChange={SignupForm.handleChange} placeholder='Username' className={'form-control '+ (SignupForm.errors.username && SignupForm.touched.username ? 'is-invalid' : '')} />
                            {
                                SignupForm.errors.username && SignupForm.touched.username                                
                                ?
                                <small className='text-danger'>{SignupForm.errors.username}</small>
                                :
                                ''
                            }
                        </div>
                        <div className='my-2'>
                            <label>Email</label>
                            <input type='text' name='email' onChange={SignupForm.handleChange} placeholder='Email' className={'form-control '+(SignupForm.errors.email && SignupForm.touched.email ? 'is-invalid' : '')} />
                            {
                                SignupForm.errors.email && SignupForm.touched.email
                                ?
                                <small className='text-danger'>{SignupForm.errors.email}</small>
                                :
                                ''
                            }
                        </div>
                        <div className='my-2'>
                            <label>Password</label>
                            <input type='password' name='password' onChange={SignupForm.handleChange} placeholder='Password' className={'form-control '+ (SignupForm.errors.password && SignupForm.touched.password ? 'is-invalid' : '')} />
                            {
                                SignupForm.errors.password && SignupForm.touched.password                                
                                ?
                                <small className='text-danger'>{SignupForm.errors.password}</small>
                                :
                                ''
                            }
                        </div>
                        <div className='my-2'>
                            <label>Re-Password</label>
                            <input type='password' name='repassword' onChange={SignupForm.handleChange} placeholder='Re-Password' className={'form-control '+ (SignupForm.errors.repassword && SignupForm.touched.repassword ? 'is-invalid' : '')} />
                            {
                                SignupForm.errors.repassword && SignupForm.touched.repassword                                
                                ?
                                <small className='text-danger'>{SignupForm.errors.repassword}</small>
                                :
                                ''
                            }
                        </div>
                        <div className='my-2'>
                            <label>Contact</label>
                            <input type='text' name='contact' onChange={SignupForm.handleChange} placeholder='Contact' className={'form-control '+ (SignupForm.errors.contact && SignupForm.touched.contact ? 'is-invalid' : '')} />
                            {
                                SignupForm.errors.contact && SignupForm.touched.contact                                
                                ?
                                <small className='text-danger'>{SignupForm.errors.contact}</small>
                                :
                                ''
                            }
                        </div>
                        <div className='my-2'>
                            <label>Address</label>
                            <textarea name='address' onChange={SignupForm.handleChange} placeholder='Address' className={'form-control '+ (SignupForm.errors.address && SignupForm.touched.address ? 'is-invalid' : '')}></textarea>
                            {
                                SignupForm.errors.address && SignupForm.touched.address                                
                                ?
                                <small className='text-danger'>{SignupForm.errors.address}</small>
                                :
                                ''
                            }
                        </div>
                        <div className='my-2'>
                            <label>City</label>
                            <select name='city' onChange={SignupForm.handleChange} className={'form-control '+ (SignupForm.errors.city && SignupForm.touched.city ? 'is-invalid' : '')}>
                              <option>Select</option>
                              {
                                city.map(item=>{
                                    return(
                                        <option>{item.name}</option>
                                    )
                                })
                              }
                              
                            </select>
                            {
                                SignupForm.errors.city && SignupForm.touched.city                                
                                ?
                                <small className='text-danger'>{SignupForm.errors.city}</small>
                                :
                                ''
                            }
                        </div>
                        <div className="my-3">
                          <label>Gender</label>
                          <br />
                          Male <input type='radio' value="male" name='gender' onChange={SignupForm.handleChange}/>
                          &nbsp;&nbsp;&nbsp;
                          Female <input type='radio' value="female" name='gender' onChange={SignupForm.handleChange}/>
                          <br />
                          {
                                SignupForm.errors.gender && SignupForm.touched.gender                                
                                ?
                                <small className='text-danger'>{SignupForm.errors.gender}</small>
                                :
                                ''
                            }
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