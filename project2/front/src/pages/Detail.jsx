import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import UnProtectedService from '../services/UnProtectedServices'
import Modal from 'react-bootstrap/Modal';
import {useFormik} from 'formik'
import ProtectedServices from '../services/ProtectedServices'
import SimpleImageSlider from "react-simple-image-slider";

import './Detail.css'
import Rating from '../ui/Rating';
const Detail = () => {

    let [hotel, setHotel] = useState({})
    let [show, setShow] = useState(false);

    let [showReview, setShowReview] = useState(false)

    let [starArr, setStarArr] = useState([false, false, false, false, false])
    let [isStarClick, setIsStarClick] = useState(true)

    let [ratingErrMsg, setRatingErrMsg] = useState("");
    let [imageArr, setImageArr] = useState([])

    


    let param = useParams();

    let navigate = useNavigate();

    let handleClose = ()=>setShow(false)
    let handleOpen = ()=>setShow(true)

    let handleCloseReview = ()=>setShowReview(false)
    let handleOpeneReview = ()=>setShowReview(true)
    

   


    let frm = useFormik({
        initialValues : {
            hotelId : param.id,
            rating : "",
            review : ""
        },
        onSubmit : (formData)=>{
            
            if(formData.review != "" && isStarClick){
                setRatingErrMsg("Please Rate this Hotel")
            }
            let starCount = 0;
            starArr.forEach(item=>{
                if(item==true)
                    starCount++;
            })
            formData.rating = starCount;

            if(formData.rating=="" && formData.review==""){

                handleCloseReview()
                return;
            }
            if(formData.rating!=""){

                
                ProtectedServices
                .post("/rating", formData)
                .then(response=>{
                    // console.log(response.data)
                    handleCloseReview()

                })
            }
        }
    })

    let starOver = (i)=>{ // i = 2 [true, true, true, false, false]
        let arr = [];
        for(let j = 0; j <= 4; j++){
            if(j <= i)
                arr.push(true)
            else
                arr.push(false)
        }
        setStarArr(arr);
    }
    let starOut = (i)=>{
       if(isStarClick) 
            setStarArr([false, false, false, false, false])
        
    }
    let starClick = (i)=>{
        setIsStarClick(false)
    }

    useEffect(()=>{
        if(param.id){ 
            UnProtectedService
            .get('/hoteldetail/'+param.id)
            .then(response=>{
                console.log(response.data)
                setHotel(response.data.result);
                let newarr = response.data.result.images.map(item=>{
                    return(
                        { url : `${import.meta.env.VITE_API_PATH}/more/${item}`}
                    )
                })
                
                setImageArr([
                        {url : `${import.meta.env.VITE_API_PATH}/cover/${response.data.result.coverImage}`},
                     ...newarr])
            })
        }
    },[])


    let review = ()=>{
        if(localStorage.getItem("access-token")){
            handleOpeneReview()
        }else{
            handleOpen();
        }
    }

    let goToLogin = ()=>{
        handleClose();
        navigate("/login")
    }
    return (
      <>
        <section
    className="container"
    style={{
        minHeight: 750,
        backgroundColor: "#0f0f0f",
        color: "#fff",
        borderRadius: 15,
        padding: 20,
        marginTop : 100
    }}
>
    <div className="row">
        <div className="col-md-8">
            <div
                className="card p-2 border-0"
                style={{
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(212,175,55,.2)"
                }}
            >
                <div className="p-2">
                    <h3
                        className="mt-3"
                        style={{
                            color: "#d4af37",
                            fontWeight: "bold"
                        }}
                    >
                        {hotel.name}
                    </h3>

                    {/* <img
                        style={{
                            width: "100%",
                            height: 400,
                            borderRadius: 10,
                            border: "2px solid #d4af37",
                            objectFit: "cover"
                        }}
                        src={`${import.meta.env.VITE_API_PATH}/cover/${hotel.coverImage}`}
                        alt="Hotel"
                    /> */}
                    <div
                        style={{height : 400}}
                    >
                    <SimpleImageSlider 
                    
                    width={"100%"}
                    height={400} 
                    images={imageArr} 
                    showBullets={true}
                    showNavs={true}
                    autoPlay={true}
                    autoPlayDelay={.5}
                    />
                    </div>

                    <div className="d-flex mt-3">
                        <button
                            onClick={review}
                            className="btn-sm m-2"
                            style={{
                                background: "#d4af37",
                                color: "#000",
                                border: "none",
                                borderRadius: 30,
                                padding: "8px 20px",
                                fontWeight: "bold"
                            }}
                        >
                            <i className="fa fa-star-o" aria-hidden="true"></i>{" "}
                            Review
                        </button>

                        <button
                            className="btn-sm m-2"
                            style={{
                                background: "#d4af37",
                                color: "#000",
                                border: "none",
                                borderRadius: 30,
                                padding: "8px 20px",
                                fontWeight: "bold"
                            }}
                        >
                            <i
                                className="fa fa-bookmark-o"
                                aria-hidden="true"
                            ></i>{" "}
                            Favourites
                        </button>
                    </div>
                    <h3>Amenities</h3>
                    {
                        hotel.amenitiesId
                        ?
                        hotel.amenitiesId.map(item=><h3 className='badge bg-warning text-dark mx-2' style={{fontSize : 16}}><i className='fa fa-diamond'></i> {item.name}</h3>) 
                        :
                        ''
                    }
                    <h3>Cuisines</h3>
                    {
                        hotel.cuisineId
                        ?
                        hotel.cuisineId.map(item=><h3 className='badge bg-warning text-dark mx-2' style={{fontSize : 16}}><i className='fa fa-cutlery'></i> {item.name}</h3>)
                        :
                        ''
                    }

                    <div
                        className="collapse p-3"
                        style={{
                            border: "1px solid #d4af37",
                            backgroundColor: "#151515",
                            borderRadius: 10
                        }}
                        id="reviewbox"
                    >
                        <label>
                            {/* Rating : 
                                    {
                                        starArr.map((item, index)=>{
                                            return(
                                                <i onMouseOver={()=>mouseOverHandler(item, index)} onMouseOut={()=>mouseOutHandler(item, index)} style={{cursor : "pointer"}} className={"fa mx-1 "+item.cls} aria-hidden="true"></i>

                                            )
                                        })
                                    } */}
                        </label>

                        <br />

                        <label style={{ color: "#d4af37" }}>
                            Write Your Review
                        </label>

                        <textarea
                            className="form-control"
                            style={{
                                backgroundColor: "#222",
                                color: "#fff",
                                border: "1px solid #d4af37"
                            }}
                        ></textarea>

                        <br />

                        <button
                            className="btn btn-sm"
                            style={{
                                backgroundColor: "#d4af37",
                                color: "#000",
                                fontWeight: "bold"
                            }}
                        >
                            Submit
                        </button>
                    </div>

                    <h6
                        className="mt-3"
                        style={{
                            color: "#f4d03f",
                            fontSize: 22,
                            fontWeight: "bold"
                        }}
                    >
                        &#8377; {hotel.cost}/ Person
                    </h6>
                    <p style={{ color: "#d6d6d6" }}>
                        <i
                            className="fa fa-map-marker"
                            aria-hidden="true"
                            style={{ color: "#d4af37" }}
                        ></i>{" "}
                        {hotel.address}
                    </p>    
                    <p style={{ color: "#d6d6d6" }}>
                        {hotel.desc}
                    </p>

                    

                    {/* <img style={{width : "100%", height : 300}} src='https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg' /> */}

                    <div className="map_main">
                        <div className="map-responsive">
                            <iframe 
                            src={`https://www.google.com/maps?q=${hotel.address}&output=embed`}
                            width="250" 
                            height="500" 
                            frameborder="0" 
                            style={{border:"0", width: "100%"}} 
                            allowfullscreen="">

                        </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Rating />                
        
    </div>
</section>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3 className='text-dark'>Message</h3>

            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className='text-dark'>
                You are not logged in, Please Login First !
            </p>
            </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-danger' onClick={handleClose}>
            Close
          </button>
          <button className='btn btn-info' onClick={goToLogin}>
            Login
          </button>
        </Modal.Footer>
      </Modal>

<Modal show={showReview} onHide={handleCloseReview}>
    <form onSubmit={frm.handleSubmit}>
    <Modal.Header className='bg-black' closeButton>
        <h3 className=''>Write Your Review</h3>

    </Modal.Header>
    <Modal.Body className='bg-black'>
        
        <p className=''>
            <label className=''>Rating :</label>
            &nbsp;&nbsp;
            {
                starArr.map((item, index)=><><i onMouseOver={()=>starOver(index)} onMouseOut={()=>starOut(index)} onClick={()=>starClick(index)} className={'fa '+ (item==true ? 'fa-star' : 'fa-star-o')}></i>&nbsp;</>)
            }    

            
        </p>
        <div className='my-3'>
            <label className=''>Review</label>
            
            <textarea name="review" onChange={frm.handleChange} className='form-control mt-3' placeholder='Write Your Review'></textarea>
        </div>
    </Modal.Body>
    <Modal.Footer className='bg-black'>
            <p className='text-danger'>{ratingErrMsg}</p>
          <button type='submit' className='btn btn-warning'>
                Save
          </button>
          
        </Modal.Footer>
    </form>
</Modal>

</>
    )
}

export default Detail

