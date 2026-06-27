import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import UnProtectedService from '../services/UnProtectedServices'
import './ViewAll.css'
import HotelInfoBox from '../ui/HotelInfoBox';
import { useRef } from 'react';
import useFilter from '../hooks/useFilter';


const ViewAll = () => {
    let [allCus, setAllCus] = useState([]);
    let [allAme, setAllAme] = useState([])
    let [allHotel, setAllHotel] = useState([])
    let [countHotel, setCountHotel] = useState(0);

    let [loading, setLoading] = useState(false)

    let [filterBadgeArr, setFilterBadgeArr] = useState([])


    useEffect(()=>{
        UnProtectedService
        .get(`/cuisine`)
        .then(response=>{
            setAllCus(response.data.result)
        })
    },[])
    useEffect(()=>{
        UnProtectedService
        .get(`/amenities`)
        .then(response=>{
          console.log(response.data.result)
            setAllAme(response.data.result)
        })
    },[])

    useEffect(()=>{
      GetAllFilterdHotel()
    },[])

    // {type : "Veg", cusion : "Italina"}
    // ?type=Veg&cuision=Ita

    let GetAllFilterdHotel = (obj={})=>{
      let query = new URLSearchParams(obj).toString();
      // console.log(query)
      UnProtectedService
      .get(`/hotelfilter?${query}`)
      .then(response=>{
        setCountHotel(response.data.result.length)
        setAllHotel(response.data.result);
      })
    }

    let obj = {};
    let [arr4, setArr4] = useState([])
   let filterType = async(e, lable)=>{
    setLoading(true)
    let str = "";
      let newstr = "";
      if(e.target.checked){ // click
        setArr4(curr=>[...curr, e.target.value])
        str = arr4.join(",");
        newstr = str=="" ? e.target.value : str+","+e.target.value
        setFilterBadgeArr(prev=>[...prev, e.target.title])
        
      }else{ // unclikc
        let newarr = arr4.filter(item=>item!= e.target.value)
        str = newarr.join(",");
        newstr = str;
        setFilterBadgeArr(prev=>prev.filter(item=>item != e.target.title))
        setArr4(newarr)
      }
      // let query = newstr=="" ? "" : `cuisine=${newstr}`;
      let qobj = { Type : newstr }


      let result = await useFilter(qobj)
      setCountHotel(result.length)
      setAllHotel(result)
      setLoading(false)
   } 



   

  // let arr = [];
  let [arr, setArr] = useState([])
    let filterCuisine = async(e, lable)=>{
      setLoading(true)
      let str = "";
      let newstr = "";
      if(e.target.checked){ // click
        setArr(curr=>[...curr, e.target.value])
        str = arr.join(",");
        newstr = str=="" ? e.target.value : str+","+e.target.value
        setFilterBadgeArr(prev=>[...prev, e.target.title])
        
      }else{ // unclikc
        let newarr = arr.filter(item=>item!= e.target.value)
        str = newarr.join(",");
        newstr = str;
        setFilterBadgeArr(prev=>prev.filter(item=>item != e.target.title))
        setArr(newarr)
      }
      // let query = newstr=="" ? "" : `cuisine=${newstr}`;
      let qobj = { cuisine : newstr }


      let result = await useFilter(qobj)
      setCountHotel(result.length)
      setAllHotel(result)
      setLoading(false)
   }

   let [arr2, setArr2] = useState([])
    let filterAmenities = async(e, lable)=>{
      setLoading(true)
      
      let str = "";
      let newstr = "";
      if(e.target.checked){
        setArr2(curr=>[...curr, e.target.value])
        str = arr2.join(",");
        newstr = str=="" ? e.target.value : str+","+e.target.value
        setFilterBadgeArr(prev=>[...prev, e.target.title])
        
      }else{
        let newarr = arr2.filter(item=>item!= e.target.value)
        str = newarr.join(",");
        newstr = str;
        setFilterBadgeArr(prev=>prev.filter(item=>item != e.target.title))
        setArr2(newarr)
      }
      // let query = newstr=="" ? "" : `amenities=${newstr}`;
      let qobj = { amenities : newstr }


      let result = await useFilter(qobj)
      setCountHotel(result.length)
      setAllHotel(result)
      setLoading(false)
      
   }

   let [arr3, setArr3] = useState([])
    let filterCost = async(e, lable)=>{
      setLoading(true)
      let str = "";
      let newstr = "";
      if(e.target.checked){
        setArr3(curr=>[...curr, e.target.value])
        str = arr3.join(",");
        newstr = str=="" ? e.target.value : str+","+e.target.value
        setFilterBadgeArr(prev=>[...prev, e.target.title])
        
      }else{
        let newarr = arr3.filter(item=>item!= e.target.value)
        str = newarr.join(",");
        newstr = str;
        setFilterBadgeArr(prev=>prev.filter(item=>item != e.target.title))
        setArr3(newarr)
      }
      // let query = newstr=="" ? "" : `cost=${newstr}`;
      let qobj = { cost : newstr }


      let result = await useFilter(qobj)
      setCountHotel(result.length)
      setAllHotel(result)
      setLoading(false)
   }

   



  return (
    <>
    {
      loading
      ?
      <div className='overlay'>
      <div className='spinner-border'></div>
    </div>
    :
    ''
    }
    <div className='container py-5' style={{minHeight : 700, marginTop : 100}}>
      

    <div className="row">
        <div className="col-md-2 m-0 p-0">
          <div className='card p-2 mx-2' style={{backgroundColor : "#151515", border : "1px solid #2d2d2d"}}>
            <h4>Filter</h4>
            <button data-bs-toggle="collapse" data-bs-target="#type" className='btn'><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Type</button>
            <div className='collapse' id='type'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>

               <div><input id='veg' title={'Veg'} onChange={e=>filterType(e, 'type')} value='Veg' type='checkbox' /> <label for='veg' >Veg</label></div>
               <div><input id='non-veg' title={'Non-Veg'} onChange={e=>filterType(e, 'type')} value='Non-Veg' type='checkbox' /> <label for='non-veg' >Non-Veg</label></div>
              </div>
            </div>

            <button data-bs-toggle="collapse" data-bs-target="#cuisine" className='btn' ><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Cuisine</button>
            <div className='collapse' id='cuisine'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>
                {
                    allCus.map((item, index)=><div><input id={'cuisine_'+(index+1)} title={item.name} value={item._id} onChange={e=>filterCuisine(e, 'cuisine')} type='checkbox' /> {item.name}</div>)
                }
               
               
              </div>
            </div>


            <button data-bs-toggle="collapse" data-bs-target="#amenities" className='btn' ><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Amenities</button>
            <div className='collapse' id='amenities'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>
                {
                    allAme.map((item, index)=><div><input id={'amenities_'+(index+1)} title={item.name} value={item._id} onChange={e=>filterAmenities(e, 'amenities')} type='checkbox' /> {item.name}</div>)
                }
               
               
              </div>
            </div>
            
            <button data-bs-toggle="collapse" data-bs-target="#cost" className='btn' ><i class="fa fa-play" style={{fontSize : 13}} aria-hidden="true"></i> Cost</button>
            <div className='collapse' id='cost'>
              <div className='ml-4 mb-2 d-flex flex-column' style={{fontSize : 13}}>
                <div><input id={'cost_1'}  value={'100-300'} title={'100-300'} onChange={e=>filterCost(e, 'cost')}  type='checkbox' /> 100-300</div>
                <div><input id={'cost_2'}  value={'200-400'} title={'200-400'} onChange={e=>filterCost(e, 'cost')} type='checkbox' /> 200-400</div>
                <div><input id={'cost_3'}  value={'400-600'} title={'400-600'} onChange={e=>filterCost(e, 'cost')} type='checkbox' /> 400-600</div>
                <div><input id={'cost_4'} value={'600-800'} title={'600-800'} onChange={e=>filterCost(e, 'cost')} type='checkbox' /> 600-800</div>
                <div><input id={'cost_5'} value={'800-1000'} title={'800-1000'} onChange={e=>filterCost(e, 'cost')} type='checkbox' /> 800-1000</div>
                <div><input id={'cost_6'} value={'1000 and Above'} title={'1000 and Above'} onChange={e=>filterCost(e, 'cost')} type='checkbox' /> 1000 more</div>
              </div>
            </div>
          </div>      

        </div>
        <div className="col-md-10">
          <div className='card p-2 mx-2' style={{backgroundColor : "#151515", border : "1px solid #2d2d2d", minHeight : 650}}>
            <div className="d-flex justify-content-between">
              <h4>All Hotels ({countHotel})</h4>
            <div className="col-md-2">
              <select  className='form-control'>
                <option>Sort</option>
                <option>Cost High to Low</option>
                <option>Cost Low to High</option>
                <option>Newest</option>
                <option>Rating</option>
                
                
              </select>
            </div>
            </div>
            <div>
              {
                filterBadgeArr.map(item=><FilterBadge  item={item} />)
              }
              
            </div>
            <div className="row isotope-container" >

            {
              allHotel.map(item=><HotelInfoBox item={item}/>    )
            }
            </div>
            
          </div>
        </div>
    </div>
    </div>
    
    </>
  )
}

export default ViewAll


let FilterBadge = ({item, removeFilterBadge})=>{
  return(
    <div style={{cursor : "pointer"}} className='badge bg-warning mx-1'>{item}</div>
              
  )
}