import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
  let [user, setUser] = useState({});

  useEffect(()=>{
    axios
    .get(`${import.meta.env.VITE_API_URL}/user/profile`,
      {
      headers : {
        Authorization : localStorage.getItem("access-token")

      }}
    )
    .then(response=>{
      // console.log(response.data)
      setUser(response.data.result);
    })
  },[])


  return (
    <div className="container my-5" style={{minHeight : 750}}>
        <div className="row">
            <div className="col-md-12">
                <h4>My Profile</h4>
                <p>Full Name : {user.fullname}</p>
            </div>
        </div>
    </div>
  )
}

export default Profile