import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const ListHotels = () => {

    let [allHotel, setAllHotel] = useState([])
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_API_URL}/hotels`)
        .then(response=>{
            setAllHotel(response.data.result)
        })
    },[])


  return (
    <div className="container-fluid py-4" style={{minHeight : 700}}>
        <div className="row">
          <div className="col-md-12">
            <table className='table table-dark table-bordered table-hover table-striped'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Person</th>
                  <th>Contact</th>
                  
                </tr>
              </thead>
              <tbody>
                {
                    allHotel.map((item, index)=><tr>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.person}</td>
                        <td>{item.contact}</td>
                    </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default ListHotels