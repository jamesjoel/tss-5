import React from 'react'
import './HotelInfoBox.css'
import {useNavigate} from 'react-router-dom'
const HotelInfoBox = ({item}) => {
  let navigate = useNavigate();
  let goToDetail = (id)=>{
    navigate("/detail/"+id)
  }

  return (
    <div className='col-md-3 col-lg-3 my-3'>
            <div onClick={()=>goToDetail(item._id)} className="card-item p-2" style={{backgroundColor : "#0C0B09"}}>
                <img style={{width : "100%", height : 200}} src={`${import.meta.env.VITE_API_PATH}/cover/${item.coverImage}`} />
                {/* <h1>{`http://localhost:3000/cover/${item.coverImage}`}</h1> */}
                <div style={{height : 40}} className='d-flex justify-content-between align-items-center'>
                  <h4 className='my-2'>{item.name}</h4>
                  <p className='pt-4'>
                      <i class="fa fa-star me-1" aria-hidden="true"></i>
                      <i class="fa fa-star me-1" aria-hidden="true"></i>
                      <i class="fa fa-star me-1" aria-hidden="true"></i>
                      <i class="fa fa-star-o me-1" aria-hidden="true"></i>
                      <i class="fa fa-star-o me-1" aria-hidden="true"></i>
                  </p>   
                </div>
                <small>&#8377; {item.cost} per person</small>
                <p className='mt-2'><i class="fa fa-map-marker" aria-hidden="true"></i> {item.address}</p>
            </div>
          </div>
  )
}

export default HotelInfoBox