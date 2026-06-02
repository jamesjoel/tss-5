import React from 'react'
import { NavLink } from 'react-router-dom'
import './SideNav.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import ProfileSideBar from '../component/ProfileSideBar'
import { useFormik } from 'formik'
const MyProfile = () => {
    let [isEditable, setIsEditable] = useState(false);

    let [personalInfo, setPersonalInfo] = useState({
        fullname: "",
        gender: ""
    })
    let [user, setUser] = useState({})

    let personalFrm = useFormik({
        enableReinitialize: true,
        initialValues: personalInfo,
        onSubmit: (formData) => {
            axios
            .post(`${import.meta.env.VITE_API_URL}/profile`, formData, {
                headers: { Authorization: localStorage.getItem("access-token") }
            })
            .then(response=>{

                // console.log(response.data)
                setIsEditable(false)
                setUser(prev=>{
                    return {...prev, ...formData}
                })
            })
        }
    })


    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/profile`, {
                headers: { Authorization: localStorage.getItem("access-token") }
            })
            .then(response => {
                console.log(response.data)
                setUser(response.data.result)
            })
    }, [])

    let askPersonalEdit = ()=>{
        if(isEditable){
            setIsEditable(false)

        }else{

            
            setPersonalInfo({
                fullname : user.fullname,
                gender : user.gender,
            });
            setIsEditable(true)
        }
    }


    return (
        <section id="menu" className="menu section" style={{ minHeight: "750px", marginTop: "100px" }}>
            <div className="container">
                <div className="row">
                    <ProfileSideBar />
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <div className='p-3'>
                                    <div className='row p-3 my-4' style={{ border: "1px solid #666461" }}>
                                        <div className='d-flex justify-content-between'>
                                            <h4>Personal Information</h4>
                                            <button onClick={askPersonalEdit} className='btn btn-link'>{isEditable ? 'Cancel' : 'Edit'}</button>

                                        </div>
                                        {
                                            isEditable
                                                ?
                                                
                                                    <form onSubmit={personalFrm.handleSubmit}>
                                                    <div>
                                                        <div className="col-md-12">
                                                            <div className='mt-4'>
                                                                <label>Full Name</label>
                                                                <input type='text' name='fullname' value={personalFrm.values.fullname} onChange={personalFrm.handleChange} className='mt-3 bg-light form-control' />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className='mt-4'>
                                                                
                                                                <label>Gender</label>
                                                                <br />
                                                                <div className='d-flex justify-content-between'>
                                                                <div>

                                                                Male &nbsp;<input name='gender' checked={personalFrm.values.gender=="male" ? true : false} value={'male'} onChange={personalFrm.handleChange}  type='radio' />&nbsp;&nbsp;&nbsp;
                                                                Female &nbsp;<input name='gender' checked={personalFrm.values.gender=="female" ? true : false} value={'female'} onChange={personalFrm.handleChange} type='radio' />
                                                                </div>
                                                                <button type='submit' className='btn btn-success'>Save</button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                    </form>
                                                :
                                                <div>
                                                    <div className="col-md-12">
                                                        <div className='mt-4'>
                                                            <label>Full Name</label>
                                                            <input type='text' disabled value={user.fullname} className='mt-3 bg-secondary form-control' />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className='mt-4'>
                                                            <label>Gender</label>
                                                            <br />
                                                            Male &nbsp;<input disabled checked={user.gender == "male" ? true : false} type='radio' />&nbsp;&nbsp;&nbsp;
                                                            Female &nbsp;<input disabled checked={user.gender == "female" ? true : false} type='radio' />
                                                        </div>

                                                    </div>
                                                </div>
                                        }

                                    </div>
                                    <div className='row p-3 my-4' style={{ border: "1px solid #666461" }}>
                                        <h4>Email & Username</h4>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className='mt-4'>
                                                    <label>Username</label>
                                                    <input type='text' value={user.username} className='mt-3 bg-secondary form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='mt-4'>
                                                    <label>Email</label>
                                                    <input type='text' value={user.email} className='mt-3 bg-secondary form-control' />
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className='row p-3 my-4' style={{ border: "1px solid #666461" }}>
                                        <div className='d-flex justify-content-between'>
                                            <h4>Address & Contact</h4>
                                            <button className='btn btn-link'>Edit</button>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className='mt-4'>
                                                    <label>Address</label>
                                                    <textarea value={user.address} className='mt-3 bg-secondary form-control'></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='mt-4'>
                                                    <label>Contact</label>
                                                    <input type='text' value={user.contact} className='mt-3 bg-secondary form-control' />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className='mt-4'>
                                                    <label>City</label>
                                                    <input value={user.city} type='text' className='mt-3 bg-secondary form-control' />
                                                </div>
                                            </div>
                                        </div>



                                    </div>






                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyProfile