import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import './Detail.css'
const Detail = () => {

    let [hotel, setHotel] = useState({})

    let [starArr, setStarArr] = useState([
        {
            cls : "fa-star-o"
        },
        {
            cls : "fa-star-o"
        },
        {
            cls : "fa-star-o"
        },
        {
            cls : "fa-star-o"
        },
        {
            cls : "fa-star-o"
        }

    ])

    let param = useParams();

    useEffect(()=>{
        if(param.id){

            axios
            .get(`${import.meta.env.VITE_API_URL}/hotel/${param.id}`)
            .then(response=>{
                setHotel(response.data.result)
            })
        }
    },[])


    let mouseOverHandler = (item, index)=>{
        setStarArr(prev=>{
           return prev.map((ite, ind)=>{
                if(ind <= index){
                    return { cls : "fa fa-star"}
                }else{
                    return ite;
                }
            })
        })
        
    }
    let mouseOutHandler = (item, index)=>{
        setStarArr([
        {
            cls : "fa-star-o"
        },
        {
            cls : "fa-star-o"
        },
        {
            cls : "fa-star-o"
        },
        {
            cls : "fa-star-o"
        },
        {
            cls : "fa-star-o"
        }

    ])        
    }

    return (
        <div className="container my-5" style={{ minHeight: 750 }}>
            <div className="row">
                <div className="col-md-8">
                    <div className="card p-2 border-0">
                        
                        <div className='p-2'>
                            <h3 className='mt-3'>{hotel.name}</h3>
                            <img style={{width : "100%", height : 400}} src='https://sayajihotels.com/images/hotels/Sayaji%20Indore/banquet/Pearl%20(1).webp' />
                        <div className='d-flex'>
                            <button data-toggle="collapse" data-target="#reviewbox" className='order_online btn-sm m-2'><i class="fa fa-star-o" aria-hidden="true"></i> Review</button>
                            <button className='order_online btn-sm m-2'><i class="fa fa-bookmark-o" aria-hidden="true"></i> Favourites</button>
                        </div>
                            <div className='collapse p-3' style={{border : "1px solid #ccc"}} id='reviewbox'>
                                <label>
                                    Rating : 
                                    {
                                        starArr.map((item, index)=>{
                                            return(
                                                <i onMouseOver={()=>mouseOverHandler(item, index)} onMouseOut={()=>mouseOutHandler(item, index)} style={{cursor : "pointer"}} className={"fa mx-1 "+item.cls} aria-hidden="true"></i>

                                            )
                                        })
                                    }
                                    
                                             
                                </label>
                                <br />
                                <label>Write Your Review</label>
                                <textarea className='form-control'></textarea>
                                <br />
                                <button className='btn btn-sm btn-primary'>Submit</button>
                            </div>
                            <h6 className='mt-3'>&#8377; {hotel.cost}/ Person</h6>
                            <p>{hotel.desc}</p>
                            <p><i class="fa fa-map-marker" aria-hidden="true"></i> {hotel.address}</p>
                            <img style={{width : "100%", height : 300}} src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg' />
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-4" >
                    <div className='card border-0 p-2'>
                        <h3 className='ml-3'>Ratings</h3>
                        <div className='p-4'>
                            <div className='d-flex justify-content-between align-items-center'>

                            <div style={{width : "10%"}}>5</div>
                            <div style={{width : "90%"}}>
                                <div className='progress' style={{height : 10}}>
                             <div className='progress-bar' style={{width : "40%"}} />
                            </div>
                            </div>
                            
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>

                            <div style={{width : "10%"}}>4</div>
                            <div style={{width : "90%"}}>
                                <div className='progress' style={{height : 10}}>
                             <div className='progress-bar' style={{width : "20%"}} />
                            </div>
                            </div>
                            
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>

                            <div style={{width : "10%"}}>3</div>
                            <div style={{width : "90%"}}>
                                <div className='progress' style={{height : 10}}>
                             <div className='progress-bar' style={{width : "70%"}} />
                            </div>
                            </div>
                            
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>

                            <div style={{width : "10%"}}>2</div>
                            <div style={{width : "90%"}}>
                                <div className='progress' style={{height : 10}}>
                             <div className='progress-bar' style={{width : "10%"}} />
                            </div>
                            </div>
                            
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>

                            <div style={{width : "10%"}}>1</div>
                            <div style={{width : "90%"}}>
                                <div className='progress' style={{height : 10}}>
                             <div className='progress-bar' style={{width : "15%"}} />
                            </div>
                            </div>
                            
                            </div>
                            
                        </div>
                    </div>
                    <div className="card border-0 p-2" style={{overflowY : "scroll", height : 700}}>

                        <h3 className='ml-3'>All Reviews</h3>
                        <div className='alert'>
                            <div className='d-flex justify-content-between'>

                            <h6 className='m-0 p-0 text-info'>James Joel</h6>
                            <p className='m-0 p-0'>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                            </p>
                            </div>
                            <p style={{fontSize : 12}}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam soluta nam cum sequi totam quae dolor qui sapiente? Molestias tenetur impedit optio nostrum consectetur odio nulla consequuntur quisquam error molestiae!
                            </p>
                        </div>
                        <div className='alert'>
                            <div className='d-flex justify-content-between'>

                            <h6 className='m-0 p-0 text-info'>James Joel</h6>
                            <p className='m-0 p-0'>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                            </p>
                            </div>
                            <p style={{fontSize : 12}}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam soluta nam cum sequi totam quae dolor qui sapiente? Molestias tenetur impedit optio nostrum consectetur odio nulla consequuntur quisquam error molestiae!
                            </p>
                        </div>
                        <div className='alert'>
                            <div className='d-flex justify-content-between'>

                            <h6 className='m-0 p-0 text-info'>James Joel</h6>
                            <p className='m-0 p-0'>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                                <i class="fa fa-star" aria-hidden="true"></i>
                            </p>
                            </div>
                            <p style={{fontSize : 12}}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam soluta nam cum sequi totam quae dolor qui sapiente? Molestias tenetur impedit optio nostrum consectetur odio nulla consequuntur quisquam error molestiae!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail