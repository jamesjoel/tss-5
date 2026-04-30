import React from 'react'
import { NavLink } from 'react-router-dom'

const HotelInof = ({item}) => {
  return (
    <div className="col-sm-6 col-lg-4 all pizza">
            <div className="box">
              <div>
                <div className="img-box">
                  <img src="/assets/images/f1.png" alt=""/>
                </div>
                <div className="detail-box">
                  <h5>
                    {item.name}
                  </h5>
                  <p>
                    {item.desc}
                  </p>
                  <div className="options">
                    <h6>
                      &#8377; {item.cost}
                    </h6>
                    <NavLink to={"/detail/"+item._id} className='btn btn-link'>More</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default HotelInof