import React from 'react'
import Box1 from '../components/Box1'
import ProductBox from '../components/ProductBox'

const Demo = () => {

    let name = "Gaurav"


  return (
    <div className="container my-5">
        <div className="row">
            <div className="col-md-12">
                <h1>This is Demo Page</h1>


                <ProductBox
                    title="Google Pixel"
                    img="https://media.tatacroma.com/Croma%20Assets/Communication/Mobiles/Images/309166_0_flwiwk.png"
                    price={70000}
                />


            </div>
        </div>
    </div>
  )
}

export default Demo