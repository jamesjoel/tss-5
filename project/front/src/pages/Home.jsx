import React from 'react'
import Popular from '../components/Popular'
import Slider from '../components/Slider'
import {NavLink} from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import useShowDesc from '../hooks/useShowDesc'
import HotelInof from '../ui/HotelInof'
const Home = () => {
  let [allHotel, setAllHotel] = useState([])
  useEffect(()=>{
    axios
    .get(`${import.meta.env.VITE_API_URL}/hotel`)
    .then(response=>{
      setAllHotel(response.data.result);
    })
  },[])


  return (
    <>
    <Slider />
    <section className="food_section layout_padding-bottom">
    <div className="container">
      <div className="heading_container heading_center">
        <h2>
          Our Menu
        </h2>
      </div>

      <ul className="filters_menu">
        <li className="active" data-filter="*">All</li>
        <li data-filter=".burger">Burger</li>
        <li data-filter=".pizza">Pizza</li>
        <li data-filter=".pasta">Pasta</li>
        <li data-filter=".fries">Fries</li>
      </ul>

      <div className="filters-content">
        <div className="row">
          {
            allHotel.map(item=>{
              return(
                <>
                <HotelInof item={item} />
                </>
              )
            })
          }
          
        </div>
      </div>
      <div className="btn-box">
        <NavLink to="/view-all">
          View More
        </NavLink>
      </div>
    </div>
  </section>
  <Popular />

  
    </>
  )
}

export default Home