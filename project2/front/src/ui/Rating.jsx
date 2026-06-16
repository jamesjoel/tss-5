import React, {useEffect, useState} from 'react'
import UnProtectedService from '../services/UnProtectedServices'
import {useParams} from 'react-router-dom'
import {NavLink} from 'react-router-dom'

const Rating = () => {
let param = useParams();
    let [allRating, setAllRating] = useState([]);
        let [totalRat, setTotalRat] = useState(0)
        let [totalStar, setTotalStar] = useState(0)
    let [progressBarRatingArr, setProgressBarRatingArr] = useState([0, 0, 0, 0, 0])

     useEffect(()=>{
        UnProtectedService
        .get("/rating/"+param.id)
        .then(response=>{
            setAllRating(response.data.result);
            let r1=0, r2=0, r3=0, r4=0, r5 = 0;
            let totalRating = response.data.result.length; // 13
            setTotalRat(totalRating)
            let st = 0;
            response.data.result.forEach(item=>{
                // setTotalStar(prev=>prev+item.rating)
                st += item.rating;
                if(item.rating==1){
                    r1++;
                }
                if(item.rating==2){
                    r2++;
                }
                if(item.rating==3){
                    r3++;
                }
                if(item.rating==4){
                    r4++;
                }
                if(item.rating==5){
                    r5++;
                }
            })
            setTotalStar(st);
            
            r1 = r1*100/totalRating;
            r2 = r2*100/totalRating;
            r3 = r3*100/totalRating;
            r4 = r4*100/totalRating;
            r5 = r5*100/totalRating;
            setProgressBarRatingArr([r1+"%", r2+"%", r3+"%", r4+"%", r5+"%"]);

            console.log([r1+"%", r2+"%", r3+"%", r4+"%", r5+"%"])
        })
    },[])

  return (

    <div className="col-md-4">
            <div
                className="card border-0 p-2"
                style={{
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(212,175,55,.2)"
                }}
            >
                <h3
                    className="ml-3"
                    style={{
                        color: "#d4af37",
                        fontWeight: "bold"
                    }}
                >
                    Ratings 
                </h3>
                <p>{(totalStar/totalRat).toFixed(1)} <i className='fa fa-star'></i> ({totalRat})</p>

                <div className="p-4">
                    {[1, 2, 3, 4, 5].map((rating, index) => {
                        const widths = progressBarRatingArr;

                        return (
                            <div
                                key={rating}
                                className="d-flex justify-content-between align-items-center mb-3"
                            >
                                <div style={{ width: "10%" }}>{rating}</div>

                                <div style={{ width: "90%" }}>
                                    <div
                                        className="progress"
                                        style={{
                                            height: 10,
                                            backgroundColor: "#333"
                                        }}
                                    >
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: widths[index],
                                                background:
                                                    "linear-gradient(90deg,#d4af37,#f4d03f)"
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div
                className="card border-0 p-2 mt-3"
                style={{
                    overflowY: "scroll",
                    height: 700,
                    backgroundColor: "#1a1a1a",
                    color: "#fff",
                    boxShadow: "0 0 15px rgba(212,175,55,.2)"
                }}
            >
                <h3
                    className="ml-3"
                    style={{
                        color: "#d4af37",
                        fontWeight: "bold"
                    }}
                >
                    All Reviews
                </h3>

                {allRating.map((item, index1) => (
                    index1 < 4 
                    ?
                    <div
                        key={item}
                        className="alert"
                        style={{
                            backgroundColor: "#222",
                            border: "1px solid #d4af37",
                            color: "#fff"
                        }}
                    >
                        <div className="d-flex justify-content-between">
                            <h6
                                className="m-0 p-0"
                                style={{
                                    color: "#d4af37"
                                }}
                            >
                                {item.userId.fullname}
                            </h6>

                            <p
                                className="m-0 p-0"
                                style={{
                                    color: "#f4d03f"
                                }}
                            >
                                {
                                    Array.from({length:5}).map((_, index)=>{
                                        return(
                                            index+1 <= item.rating
                                        ?
                                        <i className='fa fa-star'></i>
                                        :
                                        <i className='fa fa-star-o'></i>
                                        )

                                    })
                                }
                            </p>
                        </div>
                            

                        <p
                            style={{
                                fontSize: 12,
                                color: "#d6d6d6"
                            }}
                        >
                            {item.review}
                        </p>
                        <small style={{fontSize : 10, color : "#C1C1C1"}}>{new Date(item.updatedAt).toLocaleString()}</small>
                    </div>
                    :
                    ''
                ))}
            </div>
            <div className='d-flex justify-content-end mt-4'>
                <NavLink to={''}>More</NavLink>    

            </div>
        </div>
  )
}

export default Rating