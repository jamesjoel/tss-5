import React from 'react'
import Slider from '../component/Slider'
import WhyUs from '../component/WhyUs'
import Contact from '../component/Contact'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
const Home = () => {

  let [allHotel, setAllHotel] = useState([])
  useEffect(()=>{
    axios
    .get(`${import.meta.env.VITE_API_URL}/hotels`)
    .then(response=>{
      setAllHotel(response.data.result)
    })
  },[])


  return (
    <>
    <Slider />
    <WhyUs />
     <section id="menu" className="menu section">

    
    
      <div className="container section-title">
        <h2>Popular</h2>
        <p>Hotels</p>
      </div>

      <div className="container isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

        

        <div className="row isotope-container" >
        {
          allHotel.map(item=><div className='col-md-4 col-lg-4 my-3'>
            <div className="card-item p-2" style={{backgroundColor : "#0C0B09"}}>
                <img style={{width : "100%", height : 200}} src='https://pix10.agoda.net/hotelImages/110415/0/d4bca12a1af6a4b3db7cc876d7f5138f.jpg?ce=2&s=414x232' />
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
          </div>)
        }
                   

        </div>

      </div>

    </section>
    <Contact />
    </>
  )
}

export default Home