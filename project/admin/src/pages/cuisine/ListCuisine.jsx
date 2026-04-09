import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ListCuisine = () => {
    let [allCus, setAllCus] = useState([]);

    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_API_URL}/cuisine`)
        .then(response=>{
            console.log(response.data)
            setAllCus(response.data.result);
        })
    },[])


  return (
    <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="mb-4" style={{minHeight : "500px"}}>
                        <h6 className="mb-0">List All Cuisine</h6>
                        <div className="table-responsive">
                            <table className='table text-start align-middle table-bordered table-hover mb-0'>
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Title</td>
                                        <td>Edit</td>
                                        <td>Delete</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    allCus.map((item, index)=>{
                                        return(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{item.title}</td>
                                                <td>
                                                    <button className='btn btn-sm btn-info'>Edit</button>
                                                </td>
                                                <td>
                                                    <button className='btn btn-sm btn-danger'>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
  )
}

export default ListCuisine