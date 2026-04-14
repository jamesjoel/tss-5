import React, { useEffect, useState } from 'react'
import ProtactedService from '../../services/ProtactedService'
const ListHotels = () => {

  let [allHotel, setAllHotel] = useState([]);
  useEffect(()=>{
    ProtactedService
    .get("/hotel")
    .then(response=>{
      // console.log(response.data)
      setAllHotel(response.data.result)
    })
  })

  return (
    <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="mb-4" style={{minHeight : "500px"}}>
                        <h6 className="mb-0">List All Hotels</h6>
                        <div className="table-responsive">
                            <table className='my-5 table text-start align-middle table-bordered table-hover mb-0'>
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Name</td>
                                        <td>Contact</td>
                                        <td>Type</td>
                                        <td>Cost</td>
                                        <td>Edit</td>
                                        <td>Delete</td>
                                    </tr>
                                </thead>
                                <tbody>
                                  {
                                    allHotel.map((item, index)=>{
                                      return(
                                        <tr>
                                          <td>{index+1}</td>
                                          <td>{item.name}</td>
                                          <td>{item.contact}</td>
                                          <td>{item.type}</td>
                                          <td>{item.cost}</td>
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

export default ListHotels