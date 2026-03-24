import React, { useState } from 'react'

const About = () => {
    let [num, setNum] = useState(450)
    let [name, setName] = useState("rohit sharma")
    let [b, setB] = useState(2)


    let [img, setImg] = useState("https://documents.bcci.tv/resizedimageskirti/164_compress.png")

    let demo = ()=>{
        setNum(1000)
        setName("Virat")
    }

    // let change1 = ()=>{
        
    //     setImg("https://documents.bcci.tv/resizedimageskirti/164_compress.png")
    // }
    // let change2 = ()=>{
    //     setImg("https://documents.iplt20.com/ipl/IPLHeadshot2025/6.png")
    // }
    // let change3 = ()=>{
    //     setImg("https://documents.iplt20.com/ipl/IPLHeadshot2025/54.png")
    // }

    let change = (a)=>{
        setImg(a)
    }
    let changeBorder = (x)=>{
        setB(x);
    }

  return (
    <div className="container my-4">
        <div className="row">
            <div className="col-md-12">
                <h1>{num}</h1>
                <h1>{name}</h1>
                <button onClick={demo} className='btn btn-primary'>OK</button>
            </div>
            <br />
            <div className="col-md-12">
                <br />
                <button onClick={()=>change("https://documents.bcci.tv/resizedimageskirti/164_compress.png")} className='btn btn-info m-2'>Virat</button>
                <button onClick={()=>change("https://documents.iplt20.com/ipl/IPLHeadshot2025/6.png")} className='btn btn-info m-2'>Rohit</button>
                <button onClick={()=>change("https://documents.iplt20.com/ipl/IPLHeadshot2025/54.png")} className='btn btn-info m-2'>Hardik</button>
                <button onClick={()=>change("https://documents.bcci.tv/playerheadshot/bcci/1000*1280/11099.png")} className='btn btn-info m-2'>Abhishek</button>
                <br />
                <button onClick={()=>changeBorder(10)} className='btn btn-success'>Border 10</button>
                <button onClick={()=>changeBorder(20)} className='btn btn-success'>Border 20</button>
                <button  onClick={()=>changeBorder(30)} className='btn btn-success'>Border 30</button>
                <br />
                <br />
                <img style={{border : b+"px solid red"}} height="300" width="300" src={img}/>
            </div>
        </div>
    </div>
  )
}

export default About