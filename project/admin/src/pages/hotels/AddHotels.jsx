import React, { useEffect, useState } from 'react'
import ProtactedService from '../../services/ProtactedService'
import {useFormik} from 'formik'
import {useNavigate} from 'react-router-dom'
const AddHotels = () => {

    let navigate = useNavigate();
    let [allAme, setAllAme] = useState([]);
    let [allCue, setAllCue] = useState([])

    useEffect(()=>{
        ProtactedService
        .get("/amenities")
        .then(response=>{
            setAllAme(response.data.result)
        })
    },[])
    useEffect(()=>{
        ProtactedService
        .get("/cuisine")
        .then(response=>{
            setAllCue(response.data.result)
            // navigate("/hotels")
        })
    },[])


    let addFrm = useFormik({
        initialValues : {
            name : "",
                person : "",
                contact : "",
                address : "",
                lat : "",
                long : "",
                type : "",
                cost : "",
                desc : "",
                amenitiesId : "",
                cuisineId : "",
                open : "",
                close : "",
                year : ""
        },
        onSubmit : (formData)=>{
            // console.log(formData)
            ProtactedService.post("/hotel", formData)
            .then(response=>{
                navigate("/hotels")
            })
        }
    })


    let yearArr = Array.from({length : 56});
    const currentYear = new Date().getFullYear()-1;
    return (
        
        <div className="container-fluid pt-4 px-4">
            <div className="bg-secondary text-center rounded p-4">
                <div className="mb-4" style={{ minHeight: "500px" }}>
                    <h2 className="mb-0">Add Hotels</h2>
                    <form onSubmit={addFrm.handleSubmit}>
                    <div className="col-md-8 offset-md-2 my-5">
                        <div className='card'>
                            <div className="card-body">
                                <div className='my-2'>

                                <label>Hotel Name</label>
                                <input type='text' name='name' onChange={addFrm.handleChange} className='form-control' />
                                </div>
                                <div className='my-2'>
                                <label>Contact Person</label>
                                <input name='person' onChange={addFrm.handleChange} type='text' className='form-control' />
                                </div>
                                <div className='my-2'>
                                <label>Contact</label>
                                <input name='contact' onChange={addFrm.handleChange} type='text' className='form-control' />
                                </div>
                                <div className='my-2'>
                                <label>Full Address</label>
                                <textarea name='address' onChange={addFrm.handleChange} className='form-control' ></textarea>
                                </div>
                                <div className='my-2'>
                                <label>Description</label>
                                <textarea name='desc' onChange={addFrm.handleChange} className='form-control' placeholder='Description'></textarea>
                                </div>
                                <div className='my-2'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Latitude</label>
                                        <input name='lat' onChange={addFrm.handleChange} type='text' className='form-control' />
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Longitude</label>
                                        <input name='long' onChange={addFrm.handleChange} type='text' className='form-control' />
                                    </div>
                                </div>
                                </div>
                                <div className='my-2'>
                                <label>Type</label>
                                <br />
                                Veg&nbsp;&nbsp;&nbsp;<input type='radio' value="veg" name='type' onChange={addFrm.handleChange} />
                                &nbsp;&nbsp;&nbsp;
                                Non-Veg&nbsp;&nbsp;&nbsp;<input name='type' value="non-veg" onChange={addFrm.handleChange} type='radio' />
                                </div>
                                <div className='my-2'>
                                <label>Cost/Person</label>
                                <input type='text' name='cost' onChange={addFrm.handleChange} className='form-control' />
                                </div>
                                <div className='my-2'>
                                <label>Amenities</label>
                                <br />
                                {
                                    allAme.map(item=>{
                                        return(
                                            <>
                                            {item.title}&nbsp;&nbsp;
                                            <input type='checkbox' value={item._id} name='amenitiesId' onChange={addFrm.handleChange} />
                                            &nbsp;&nbsp;

                                            </>
                                        )
                                    })
                                }
                                </div>
                                <div className='my-2'>
                                <label>Cuisine</label>
                                <br />
                                {
                                    allCue.map(item=>{
                                        return(
                                            <>
                                            {item.title}&nbsp;&nbsp;
                                            <input type='checkbox' name='cuisineId' value={item._id} onChange={addFrm.handleChange} />
                                            &nbsp;&nbsp;

                                            </>
                                        )
                                    })
                                }
                                </div>
                                <div className='my-2'>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Open Timings</label>
                                        <input type='text' name='open' onChange={addFrm.handleChange} className='form-control' />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Close Timings</label>
                                        <input type='text' name='close' onChange={addFrm.handleChange} className='form-control' />
                                    </div>
                                </div>
                                </div>
                                <div className='my-2'>
                                    <label>Year of Establishment</label>
                                    <select name='year' onChange={addFrm.handleChange} className='form-control'>
                                        <option>Select</option>
                                        {
                                            yearArr.map((_, index)=>{
                                                return(
                                                    <option>{currentYear-index}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='card-footer'>
                                <button type='submit' className='btn btn-success'>Add</button>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
            )
}

            export default AddHotels