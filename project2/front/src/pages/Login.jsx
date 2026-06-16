import React, { useState, useContext, useEffect } from 'react'
import {useFormik} from 'formik'
import LoginSchema from '../schema/LoginSchema'
import axios from 'axios'
import AuthContext from '../context/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'
import UnProtectedService from '../services/UnProtectedServices'

const Login = () => {
    let navigate = useNavigate();

    let [isLoggedIn, setIsLoggedIn] = useContext(AuthContext)

    let [msg, setMsg] = useState("")

    useEffect(()=>{
        if(localStorage.getItem("access-token")){
            navigate("/myprofile")
        }
    },[])
    
    let frm = useFormik({
        validationSchema : LoginSchema,
        initialValues : {
            username : "",
            password : ""
        },
        onSubmit : (formData)=>{
            // console.log(formData)
            UnProtectedService
            .post(`/userauth`, formData)
            .then(response=>{
                console.log(response.data)
                if(response.data.success==true){
                    let name = response.data.name;
                    let token = response.data.token;
                    let temp = { isLogged : true, name : name }
                    localStorage.setItem("access-token", token)    
                    localStorage.setItem("name", name)    
                    setIsLoggedIn(temp)
                    navigate("/")

                }else{
                    if(response.data.errType==1){
                        setMsg("This Username/Email and Password is Incorrect")
                    }
                    if(response.data.errType==2){
                        
                        setMsg("This Password is Incorrect")
                    }
                }
            })
        }
    })

  return (
    <section id="menu" className="menu section" style={{minHeight : "750px", marginTop : "100px"}}>
        <div className="container">
            <form onSubmit={frm.handleSubmit}>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card mt-5 border border-warning">
                        <div className="card-header bg-warning">
                            <h3 className='text-dark text-center'>Login</h3>
                        </div>
                        <div className="card-body ">
                            <div className='my-3'>

                            <label>Username/Email</label>
                            <input name='username' onChange={frm.handleChange} type='text' className={'form-control bg-gray my-3 '+ (frm.errors.username && frm.touched.username ? 'is-invalid' : '')} />
                            {
                                frm.errors.username && frm.touched.username
                                ?
                                <small className='text-danger'>{frm.errors.username}</small>
                                :
                                ''
                            }
                            </div>
                            <div className='my-3'>

                            <label>Password</label>
                            <input name='password' onChange={frm.handleChange} type='password' className={'form-control bg-gray my-3 ' + (frm.errors.password && frm.touched.password ? 'is-invalid' : '')} />
                            {
                                frm.errors.password && frm.touched.password
                                ?
                                <small className='text-danger'>{frm.errors.password}</small>
                                :
                                ''
                            }
                            <p className='text-danger text-center'>{msg}</p>
                            </div>
                        </div>
                        <div className="card-footer bg-warning">
                            <button type='submit' className='btn btn-dark px-4' style={{borderRadius : 50}}>Login</button>
                            <br />
                            <NavLink className={'btn btn-link'} to={'/forgotpassword'}>Forgot Password</NavLink>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>

        
    </section>
  )
}

export default Login