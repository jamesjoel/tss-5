import React, { useState } from 'react'

const Pro = (obj) => {

    let [x, setX] = useState(obj.item.rating)

    let stararr = Array.from({length : 5});
    // crate a 5 undefined value array


  return (
    <div className="col-md-3">
                <div className='card m-2'>
                    <div className="card-header bg-info" style={{height : 50}}>
                        <h6>{obj.item.title}</h6>
                    </div>
                    <div className="card-body">
                        <div className='badge bg-danger'>{obj.item.discountPercentage}%</div>
                        <br />
                        <img className='img-thumbnail' style={{height : 200}} src={obj.item.images[0]} />
                        <p><del>&#8377; {obj.item.price}</del></p>
                        <h6>&#8377; {obj.item.price - (obj.item.price * obj.item.discountPercentage / 100)}</h6>
                        
                        <p>
                            {
                                stararr.map((temp, index)=> index < Math.round(x) ?  <DarkStar />: <LightStar /> )
                            }
                            ({obj.item.reviews.length})
                        </p>
                    </div>
                    <div className="card-footer bg-info">
                        <button className='btn btn-danger'>buy</button>
                    </div>
                </div>
            </div>
  )
}

export default Pro


let DarkStar = ()=>{
    return(
        <i class="fa fa-circle" aria-hidden="true"></i>
    )
}
let LightStar = ()=>{
    return(
       <i class="fa fa-circle-thin" aria-hidden="true"></i>
    )
}