import React from 'react'
import Box from '../component/Box'
import H1 from '../ui/H1'
import UnProtectedService from '../services/UnProtectedServices'
const About = () => {

    let info = {
        name : "rohit",
        price : 54574744,
        src : ""
    }


    let send = ()=>{
        UnProtectedService
        .get("/mail")
        .then(response=>{
            console.log(response.data)
        })
    }
  return (
    <section id="menu" className="menu section" style={{minHeight : 750, marginTop : 100}}>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <H1 color="green" txt="The Stepping Stone"></H1>
                    <Box info={info}/>
                </div>
            </div>
        </div>
        <button onClick={send}>OK</button>
    </section>
  )
}

export default About