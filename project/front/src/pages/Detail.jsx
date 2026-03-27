import React from 'react'

const Detail = () => {
    return (
        <div className="container my-5" style={{ minHeight: 750 }}>
            <div className="row">
                <div className="col-md-8">
                    <div className="card p-2 border-0">
                        <div className='d-flex'>
                            <button className='order_online m-2'><i class="fa fa-star-o" aria-hidden="true"></i> Review</button>
                            <button className='order_online m-2'><i class="fa fa-bookmark-o" aria-hidden="true"></i> Save</button>
                        </div>
                        <div className='p-2'>
                            <img style={{width : "100%", height : 400}} src='https://sayajihotels.com/images/hotels/Sayaji%20Indore/banquet/Pearl%20(1).webp' />
                            <h3 className='mt-3'>Hotel Sayaji</h3>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum tempora, accusantium in officiis ea veniam corrupti velit cumque quas doloribus autem, nulla nostrum esse reprehenderit dicta saepe totam odit veritatis.</p>
                            <p><i class="fa fa-map-marker" aria-hidden="true"></i> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem, voluptas.</p>
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