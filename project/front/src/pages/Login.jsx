import React from 'react'

const Login = () => {
  return (
    <div className="container my-5" style={{minHeight : 750}}>
        <div className="row">
            <div className="col-md-6 offset-md-3 mt-5">
                <div className="card">
                    <div className="card-header bg-yellow">
                        <h3 className='text-light'>Login</h3>
                    </div>
                    <div className="card-body">
                        <div className='my-2'>
                            <label>Username or Email</label>
                            <input type='text' placeholder='Username/Email' className='form-control' />
                        </div>
                        <div className='my-2'>
                            <label>Password</label>
                            <input type='password' placeholder='Password' className='form-control' />
                        </div>
                    </div>
                    <div className="card-footer bg-yellow">
                        <button className='btn btn-dark'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login