import React from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
const Login = () => {
    let navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem(import.meta.env.VITE_ADMIN_ACCESS_TOKEN)){
            navigate("/dashboard")
        }
    },[])

    let [errMsg, setErrMsg] = useState("")
    let frm = useFormik({
        initialValues : {
            username : "",
            password : ""
        },
        onSubmit : (formData)=>{
            axios
            .post(`${import.meta.env.VITE_API_URL}/adminauth`, formData)
            .then(response=>{
                if(response.data.success==true){
                    let token = response.data.token;
                    let name = response.data.name;
                    localStorage.setItem(import.meta.env.VITE_ADMIN_ACCESS_TOKEN, token);
                    localStorage.setItem("admin-name", name)
                    navigate("/dashboard");
                }else{
                    if(response.data.errType==1){
                        setErrMsg("This Username and Password is Incorrect")
                    }
                    if(response.data.errType==2){
                        
                        setErrMsg("This Password is Incorrect")
                    }
                }
            })

        }
    })


  return (
    <div className='container'>
        <div className="row mt-5">
            <form onSubmit={frm.handleSubmit}>
            <div className="col-md-4 mt-5 offset-md-4">
                <div className="card">
                    <div className="card-header">
                        <h4 className='text-center'>Administrator</h4>
                    </div>
                    <div className="card-body">
                        <div className="my-2">
                            <label>Username</label>
                            <input name='username' onChange={frm.handleChange} type='text' className='form-control' />
                        </div>
                        <div className="my-2">
                            <label>Password</label>
                            <input name='password' onChange={frm.handleChange} type='password' className='form-control' />
                        </div>
                        <p className='text-danger text-center'>{errMsg}</p>
                    </div>
                    <div className="card-footer">
                        <button type='submit' className='btn btn-primary'>Login</button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Login