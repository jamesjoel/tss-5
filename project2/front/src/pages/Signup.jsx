import React, { useEffect, useState } from 'react'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import SignupSchema from '../schema/SignupSchema'

const Signup = () => {
    let navigate = useNavigate();
    let [city, setCity] = useState([])

    useEffect(()=>{

        axios
        .get(`${import.meta.env.VITE_API_URL}/city`)
        .then(response=>{
            // console.log(response.data)
            setCity(response.data.result);
        })
    },[])
    

    let frm = useFormik({
        validationSchema : SignupSchema,
        initialValues : {
            fullname : "",
            username : "",
            email : "",
            password : "",
            repassword : "",
            contact : "",
            address : "",
            city : "",
            gender : "",
        },
        onSubmit : (formData)=>{
            axios
            .post(`${import.meta.env.VITE_API_URL}/user`, formData)
            .then(response=>{
                navigate("/login")
                // console.log(response.data)
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
                            <h3 className='text-dark text-center'>Signup</h3>
                        </div>
                        <div className="card-body ">
                            <div className='my-3'>

                            <label>Full Name</label>
                            <input name='fullname' onChange={frm.handleChange} type='text' className={'form-control bg-gray my-3 ' + (frm.errors.fullname && frm.touched.fullname ? 'is-invalid' : '')} />
                            <small className='text-danger'>
                                {
                                    frm.errors.fullname && frm.touched.fullname
                                    ?
                                    frm.errors.fullname
                                    :
                                    ''
                                }
                            </small>
                            </div>
                            <div className='my-3'>

                            <label>Username</label>
                            <input name='username' onChange={frm.handleChange}  type='text' className={'form-control bg-gray my-3 ' + (frm.errors.username && frm.touched.username ? 'is-invalid' : '')} />
                            <small className='text-danger'>
                                {
                                    frm.errors.username && frm.touched.username
                                    ?
                                    frm.errors.username
                                    :
                                    ''
                                }
                            </small>
                            </div>
                            <div className='my-3'>

                            <label>Email</label>
                            <input name='email' onChange={frm.handleChange} type='text' className={'form-control bg-gray my-3 ' + (frm.errors.email && frm.touched.email ? 'is-invalid' : '')} />
                            <small className='text-danger'>
                                {
                                    frm.errors.email && frm.touched.email
                                    ?
                                    frm.errors.email
                                    :
                                    ''
                                }
                            </small>
                            </div>
                            <div className='my-3'>

                            <label>Password</label>
                            <input name='password' onChange={frm.handleChange} type='text' className={'form-control bg-gray my-3 ' + (frm.errors.password && frm.touched.password ? 'is-invalid' : '')} />
                            <small className='text-danger'>
                                {
                                    frm.errors.password && frm.touched.password
                                    ?
                                    frm.errors.password
                                    :
                                    ''
                                }
                            </small>
                            </div>
                            <div className='my-3'>

                            <label>Re-Password</label>
                            <input name='repassword' onChange={frm.handleChange} type='password' className={'form-control bg-gray my-3 ' + (frm.errors.repassword && frm.touched.repassword ? 'is-invalid' : '')} />
                            <small className='text-danger'>
                                {
                                    frm.errors.repassword && frm.touched.repassword
                                    ?
                                    frm.errors.repassword
                                    :
                                    ''
                                }
                            </small>
                            </div>
                            <div className='my-3'>

                            <label>Contact</label>
                            <input name='contact' onChange={frm.handleChange} type='text' className={'form-control bg-gray my-3 ' + (frm.errors.contact && frm.touched.contact ? 'is-invalid' : '')} />
                            <small className='text-danger'>
                                {
                                    frm.errors.contact && frm.touched.contact
                                    ?
                                    frm.errors.contact
                                    :
                                    ''
                                }
                            </small>
                            </div>
                            <div className='my-3'>

                            <label>Address</label>
                            <textarea name='address' onChange={frm.handleChange} className={'form-control bg-gray my-3 ' + (frm.errors.address && frm.touched.address ? 'is-invalid' : '')} ></textarea>
                            <small className='text-danger'>
                                {
                                    frm.errors.address && frm.touched.address
                                    ?
                                    frm.errors.address
                                    :
                                    ''
                                }
                            </small>
                            </div>
                            <div className='my-3'>

                            <label>City</label>
                            <select name='city' onChange={frm.handleChange} className={'form-control bg-gray my-3 ' + (frm.errors.city && frm.touched.city ? 'is-invalid' : '')} >
                                <option>Select</option>
                                {
                                    city.map(item=><option>{item.name}</option>)
                                }
                            </select>
                            <small className='text-danger'>
                                {
                                    frm.errors.city && frm.touched.city
                                    ?
                                    frm.errors.city
                                    :
                                    ''
                                }
                            </small>
                            </div>
                            <div className='my-3'>

                            <label>Gender</label><br />
                            Male<input value={'male'} type='radio' name='gender' onChange={frm.handleChange}/>
                            Female<input value={'female'} type='radio' name='gender' onChange={frm.handleChange}/>
                            <br />
                            <small className='text-danger'>
                                {
                                    frm.errors.gender && frm.touched.gender
                                    ?
                                    frm.errors.gender
                                    :
                                    ''
                                }
                            </small>
                            </div>
                        </div>
                        <div className="card-footer bg-warning">
                            <button type='submit' className='btn btn-dark px-4' style={{borderRadius : 50}}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </section>
  )
}

export default Signup

