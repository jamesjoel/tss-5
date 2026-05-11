import React from 'react'
import {useFormik} from 'formik'
import LoginSchema from '../schema/LoginSchema'
import axios from 'axios'
import { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const Login = () => {
    let navigate = useNavigate();
    let [loggedIn, setLoggedIn] = useContext(AuthContext);

    let [errMsg, setErrMsg] = useState("")

    let frm = useFormik({
        initialValues : {
            username : "",
            password : ""
        },
        validationSchema : LoginSchema,
        onSubmit : (formData)=>{
            axios
            .post(`${import.meta.env.VITE_API_URL}/userauth`, formData)
            .then(response=>{
                
                if(response.data.success==true){
                    localStorage.setItem("access-token", response.data.token);
                    localStorage.setItem("name", response.data.name);
                    setLoggedIn({
                        isToken :  true,
                        name : localStorage.getItem("name")
                    })
                    navigate("/");

                }else{
                
                    if(response.data.errType==1){
                        setErrMsg("Username & Password is Incorrect !")
                    }
                    if(response.data.errType==2){
                        
                        setErrMsg("This Password is Incorrect !")
                    }
                }
            })
        }
    })



  return (
    <div className="container my-5" style={{minHeight : 750}}>
            <form onSubmit={frm.handleSubmit}>
        <div className="row">
            <div className="col-md-6 offset-md-3 mt-5">
                <div className="card">
                    <div className="card-header bg-yellow">
                        <h3 className='text-light'>Login</h3>
                    </div>
                    <div className="card-body">
                        <div className='my-2'>
                            <label>Username or Email {frm.errors.username && frm.touched.username ? <span className='text-danger'>{frm.errors.username}</span> : ''}</label>
                            <input type='text' name='username' onChange={frm.handleChange} placeholder='Username/Email' className={'form-control '+(frm.errors.username && frm.touched.username ? 'is-invalid' : '')} />
                        </div>
                        <div className='my-2'>
                            <label>Password {frm.errors.password && frm.touched.password ? <span className='text-danger'>{frm.errors.password}</span> : ''}</label>
                            <input type='password' name='password' onChange={frm.handleChange} placeholder='Password' className={'form-control '+(frm.errors.password && frm.touched.password ? 'is-invalid' : '')} />
                        </div>
                        <p className='mt-3 text-center text-danger'>
                            {errMsg}
                        </p>
                    </div>
                    <div className="card-footer bg-yellow">
                        <button type='submit' className='btn btn-dark'>Login</button>
                    </div>
                </div>
            </div>
        </div>
            </form>
    </div>
  )
}

export default Login