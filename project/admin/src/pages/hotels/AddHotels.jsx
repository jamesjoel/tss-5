import React, { useEffect, useState } from 'react'
import ProtactedService from '../../services/ProtactedService'
const AddHotels = () => {

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
        })
    },[])


    let yearArr = Array.from({length : 56});
    const currentYear = new Date().getFullYear()-1;
    return (
        <div className="container-fluid pt-4 px-4">
            <div className="bg-secondary text-center rounded p-4">
                <div className="mb-4" style={{ minHeight: "500px" }}>
                    <h2 className="mb-0">Add Hotels</h2>
                    <div className="col-md-8 offset-md-2 my-5">
                        <div className='card'>
                            <div className="card-body">
                                <div className='my-2'>

                                <label>Hotel Name</label>
                                <input type='text' className='form-control' />
                                </div>
                                <div className='my-2'>
                                <label>Contact Person</label>
                                <input type='text' className='form-control' />
                                </div>
                                <div className='my-2'>
                                <label>Contact</label>
                                <input type='text' className='form-control' />
                                </div>
                                <div className='my-2'>
                                <label>Full Address</label>
                                <textarea className='form-control' ></textarea>
                                </div>
                                <div className='my-2'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label>Latitude</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                    <div className='col-md-6'>
                                        <label>Longitude</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                </div>
                                </div>
                                <div className='my-2'>
                                <label>Type</label>
                                <br />
                                Veg&nbsp;&nbsp;&nbsp;<input type='radio' />
                                &nbsp;&nbsp;&nbsp;
                                Non-Veg&nbsp;&nbsp;&nbsp;<input type='radio' />
                                </div>
                                <div className='my-2'>
                                <label>Cost/Person</label>
                                <input type='text' className='form-control' />
                                </div>
                                <div className='my-2'>
                                <label>Amenities</label>
                                <br />
                                {
                                    allAme.map(item=>{
                                        return(
                                            <>
                                            {item.title}&nbsp;&nbsp;
                                            <input type='checkbox' />
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
                                            <input type='checkbox' />
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
                                        <input type='text' className='form-control' />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Close Timings</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                </div>
                                </div>
                                <div className='my-2'>
                                    <label>Year of Establishment</label>
                                    <select className='form-control'>
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
                </div>
            </div>
        </div>
            )
}

            export default AddHotels