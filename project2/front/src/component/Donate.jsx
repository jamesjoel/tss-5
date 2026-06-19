import React from 'react'
import ProtectedService from '../services/ProtectedServices'

const Donate = () => {

    let donate = (amount)=>{
        ProtectedService
        .post("/donation/makepayment", { amount : amount })
        .then(response=>{
            if(response.data.success==true){
                let data = {
                    key : "rzp_test_Rek8z2OtrReaiV",
                    order_id : response.data.orderid,
                    currency : 'INR',
                    amount : amount*100,
                    handler : (rzpyRes)=>{
                        // console.log(rzpyRes)
                        ProtectedService
                        .post("/donation/paymentdone", {...rzpyRes, amount : amount})
                        .then(response2=>{
                            console.log("thanks")
                        })
                    }
                }
                let rzpy = window.Razorpay(data);
                rzpy.open();
            }
        })
    }


  return (
    <div className='container my-5'>
        <div className="row">
            <div className="col-md-12 py-5 d-flex justify-content-between">
                <button type='button' onClick={()=>donate(49)} className='btn btn-lg btn-primary'>Donate (Basic)<br /><small>&#8377; 49.00</small></button>
                <button type='button' onClick={()=>donate(149)} className='btn btn-lg btn-primary'>Donate (Supporter)<br /><small>&#8377; 149.00</small></button>
                <button type='button' onClick={()=>donate(249)} className='btn btn-lg btn-primary'>Donate (Admirer)<br /><small>&#8377; 249.00</small></button>
                
            </div>
        </div>
    </div>
  )
}

export default Donate