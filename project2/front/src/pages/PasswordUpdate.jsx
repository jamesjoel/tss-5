import { useFormik } from 'formik';
import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import UnProtectedService from '../services/UnProtectedServices';

const PasswordUpdate = () => {

    let navigate = useNavigate();
    useEffect(()=>{
        
        if(! localStorage.getItem("forgot-pass-token")){
        
            navigate("/login")
        }
    },[])

    let frm = useFormik({
        initialValues : {
            password : "",
            repass : ""
        },
        onSubmit : (formData)=>{
            UnProtectedService
            .post("/user/updatepassword", formData, {
                headers : {Authorization : localStorage.getItem('forgot-pass-token')}
            })
            .then(response=>{
                localStorage.removeItem("forgot-pass-token")
                navigate("/login");
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
                            <h3 className='text-dark text-center'>Update Your Password</h3>
                        </div>
                        <div className="card-body">
                            <div className='mt-4'>
                                <label className='my-2'>New Password</label>
                                <input name="password" onChange={frm.handleChange} type='password' className='form-control bg-gray' />
                            </div>
                            <div className='mt-4'>
                                <label className='my-2'>Confirm New Password</label>
                                <input name="repass" onChange={frm.handleChange} type='password' className='form-control bg-gray' />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type='submit' className='btn btn-dark' style={{borderRadius: 50}}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </section>
  )
}

export default PasswordUpdate