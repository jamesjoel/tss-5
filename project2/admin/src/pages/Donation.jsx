import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
const Donation = () => {
    let [allDonation, setAllDonation] = useState([])
    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_API_URL}/donation/alldonation`)
        .then(response=>{
            // console.log(response.data)
            setAllDonation(response.data.result)
        })
    }, [])


  return (
    <div className="container-fluid py-4" style={{minHeight : 700}}>
        <div className="row">
          <div className="col-md-12">
            <table className='table table-dark table-bordered table-hover table-striped'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Email</th>
                  <th>Razorpay Order Id</th>
                </tr>
              </thead>
              <tbody>
                {
                    allDonation.map((item, index)=>{
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{item.userId.fullname}</td>
                                <td>{item.amount}</td>
                                <td>{item.userId.email}</td>
                                <td>{item.razorpay_order_id}</td>
                            </tr>
                        )
                    })
                }
              </tbody>
            </table>
        </div>
    </div>
    </div>
  )
}

export default Donation