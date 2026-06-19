import React from 'react'
import Slider from '../component/Slider'
import WhyUs from '../component/WhyUs'
import Contact from '../component/Contact'
import UnProtectedService from '../services/UnProtectedServices'
import { useState } from 'react'
import { useEffect } from 'react'
import Box from '../component/Box'
import HotelInfoBox from '../ui/HotelInfoBox'
import Donate from '../component/Donate'
import {NavLink} from 'react-router-dom'
const Home = () => {


  // let a = "Samsung";
  // let b = 40000.00;
  // let c = "https://images.samsung.com/is/image/samsung/p6pim/in/sm-a075flvdins/gallery/in-galaxy-a07-sm-a075-sm-a075flvdins-thumb-549346645"

  let info = {
    name : "Samsung",
    price : 40000,
    src : "https://images.samsung.com/is/image/samsung/p6pim/in/sm-a075flvdins/gallery/in-galaxy-a07-sm-a075-sm-a075flvdins-thumb-549346645"
  }

  let [allHotel, setAllHotel] = useState([])
  useEffect(()=>{
    UnProtectedService
    .get(`/hotels`)
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
          allHotel.map(item=><HotelInfoBox item={item} />)
        }
                   

        </div>

    <NavLink to='/more' className='btn btn-info'>More Hotels</NavLink>
      </div>

    </section>
    
    <Contact />
    <Donate />
    </>
  )
}

export default Home

/*

<input type="text" />

*/