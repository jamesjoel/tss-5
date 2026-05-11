import React, { useState } from 'react'
import {useFormik} from 'formik'
import UnProtactedService from '../services/UnProtactedService'
import {useNavigate} from 'react-router-dom'
const Login = () => {

    let navigate = useNavigate();

    let [errMsg, setErrMsg] = useState("")
    let frm = useFormik({
        initialValues : {
            username : "",
            password : ""
        },
        onSubmit : (formData)=>{
            UnProtactedService
            .post("/adminauth", formData)
            .then(response=>{
                console.log(response.data)
                if(response.data.success==true){
                    localStorage.setItem("admin-access-token", response.data.token)
                    localStorage.setItem("admin-name", response.data.name)
                    localStorage.setItem("admin-type", response.data.type)
                    navigate("/dashboard")

                }else{
                    if(response.data.errType==1)
                        setErrMsg("This Username and Password is Incorrect")
                    if(response.data.errType==2)
                        setErrMsg("This Password is Incorrect")
                }
            })
        }
    })


  return (
    <div className="container-fluid pt-4 px-4">
          <div className="bg-secondary text-center rounded p-4">
            <form onSubmit={frm.handleSubmit}>
                <div className="row">
                    <div className="col-md-4 offset-md-4 my-5">
                        <div className="card bg-dark my-5">
                            <div className="card-header">
                                <h4>Administrator</h4>
                            </div>
                            <div className="card-body">
                                <div className="my-3">
                                    <label className='text-start d-block m-2'>Username</label>
                                    <input name='username' onChange={frm.handleChange} type='text' placeholder='Username' className='form-control' />
                                </div>
                                <div className="my-3">
                                    <label className='text-start d-block m-2'>Password</label>
                                    <input name='password' onChange={frm.handleChange} type='password' placeholder='Password' className='form-control' />
                                </div>
                            </div>
                            <div className="card-footer">
                                <button type='submit' className='btn btn-light'>Login</button>
                                <p className='text-danger'>{errMsg}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
          </div>
    </div>
  )
}

export default Login