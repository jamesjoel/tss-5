import React from 'react'

const Signup = () => {
  return (
    <section id="menu" className="menu section" style={{minHeight : "750px", marginTop : "100px"}}>
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card mt-5 border border-warning">
                        <div className="card-header bg-warning">
                            <h3 className='text-dark text-center'>Signup</h3>
                        </div>
                        <div className="card-body ">
                            <div className='my-3'>

                            <label>Full Name</label>
                            <input type='text' className='form-control bg-gray my-3' />
                            </div>
                            <div className='my-3'>

                            <label>Username</label>
                            <input type='text' className='form-control bg-gray my-3' />
                            </div>
                            <div className='my-3'>

                            <label>Email</label>
                            <input type='text' className='form-control bg-gray my-3' />
                            </div>
                            <div className='my-3'>

                            <label>Password</label>
                            <input type='password' className='form-control bg-gray my-3' />
                            </div>
                            <div className='my-3'>

                            <label>Re-Password</label>
                            <input type='password' className='form-control bg-gray my-3' />
                            </div>
                            <div className='my-3'>

                            <label>Contact</label>
                            <input type='text' className='form-control bg-gray my-3' />
                            </div>
                            <div className='my-3'>

                            <label>Address</label>
                            <textarea className='form-control bg-gray my-3' ></textarea>
                            </div>
                            <div className='my-3'>

                            <label>City</label>
                            <select className='form-control bg-gray my-3' >
                                <option>Select</option>
                            </select>
                            </div>
                            <div className='my-3'>

                            <label>Gender</label><br />
                            Male<input type='radio' />
                            Female<input type='radio' />
                            </div>
                        </div>
                        <div className="card-footer bg-warning">
                            <button type='submit' className='btn btn-dark px-4' style={{borderRadius : 50}}>Signup</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Signup