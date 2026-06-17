import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import {Modal} from 'react-bootstrap'

const ListHotels = () => {

    let [coverModelShow, setCoverModelShow] = useState(false);
    let [moreModelShow, setMoreModelShow] = useState(false);
    let [allHotel, setAllHotel] = useState([])
    let [coverErr, setCoverErr] = useState("")
    let [moreErr, setMoreErr] = useState("")
    let [coverHotelId, setCoverHotelId] = useState("");
    let [moreImageId, setMoreImageId] = useState("")

    let coverImageRef = useRef();
    let moreImageRef = useRef();


    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_API_URL}/hotels`)
        .then(response=>{
            setAllHotel(response.data.result)
        })
    },[])

    let coverModelClose = ()=>setCoverModelShow(false)
    let coverModelOpen = ()=>setCoverModelShow(true)
    let moreModelClose = ()=>setMoreModelShow(false)
    let moreModelOpen = ()=>setMoreModelShow(true)


    let doUploadCover = ()=>{
      
      if(coverImageRef.current.files[0]===undefined){
        setCoverErr("Please Select Image")
      }
      else{
        setCoverErr("")
        let file = coverImageRef.current.files[0];
        if(file.size > (1024*1024*1)){
          setCoverErr("Please Choose Less then 1MB image")
        }else{
          setCoverErr("")
          // console.log(coverHotelId)
          let frm = new FormData();
          frm.append("coverImage", file);
          axios
          .put(`${import.meta.env.VITE_API_URL}/hotels/coverimage/${coverHotelId}`, frm)
          .then(response=>{
            coverModelClose();
          })
        }
      }
    }

    let doUploadMore = ()=>{
      if(moreImageRef.current.files[0]===undefined){
        setMoreErr("Please Select Image")
      }else{
        setMoreErr("")
        let file = moreImageRef.current.files[0];
        if(file.size > (1024*1024*1)){
          setMoreErr("Please Choose Less then 1MB image")
        }
        else{
          setMoreErr("")
          let frm = new FormData();
          // FormData() this is a JavaScript Form Constructor, which create a Form
          frm.append("more", file)
          axios
          .put(`${import.meta.env.VITE_API_URL}/hotels/moreimage/${moreImageId}`, frm)
          .then(response=>{
            console.log(response.data)
          })

        }
      }
    }

    let askCoverImage = (id)=>{
      setCoverHotelId(id);
      coverModelOpen()
    }

    let askMoreImage = (id)=>{
      // console.log(id)
      setMoreImageId(id)
      moreModelOpen()
    }

  return (
    <>
    <div className="container-fluid py-4" style={{minHeight : 700}}>
        <div className="row">
          <div className="col-md-12">
            <table className='table table-dark table-bordered table-hover table-striped'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Person</th>
                  <th>Contact</th>
                  <th>Images</th>
                  
                </tr>
              </thead>
              <tbody>
                {
                    allHotel.map((item, index)=><tr>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.person}</td>
                        <td>{item.contact}</td>
                        <td>
                          <button onClick={()=>askCoverImage(item._id)} className='btn btn-sm btn-info m-1'>
                            <i class="fa fa-file-image-o" aria-hidden="true"></i>
                          </button>
                          <button onClick={()=>askMoreImage(item._id)} className='btn btn-sm btn-info m-1'>
                            ...
                          </button>
                        </td>
                    </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
    </div>

    <Modal show={coverModelShow} onHide={coverModelClose}>
           <Modal.Header closeButton>
                     <Modal.Title>Upload</Modal.Title>
            </Modal.Header>     
            <Modal.Body>
              <div className='my-4'>
                <label>Select File For Hotel Cover Image</label>
                <input ref={coverImageRef} accept='.jpg, .jpeg, .png, .gif' type='file' className='form-control' />
                <small className='text-danger'>{coverErr}</small>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type='submit' onClick={doUploadCover} className='btn btn-success'>Upload</button>
              <button type='button' onClick={coverModelClose} className='btn btn-danger'>Close</button>
            </Modal.Footer>
    </Modal>
    <Modal show={moreModelShow} onHide={moreModelClose}>
           <Modal.Header closeButton>
                     <Modal.Title>Upload</Modal.Title>
            </Modal.Header>     
            <Modal.Body>
              <div className='my-4'>
                <label>Select Files For More Images </label>
                <input ref={moreImageRef} accept='.jpg, .jpeg, .png, .gif' type='file' className='form-control' />
                <small className='text-danger'>{moreErr}</small>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button type='submit' onClick={doUploadMore} className='btn btn-success'>Upload</button>
              <button type='button' onClick={moreModelClose} className='btn btn-danger'>Close</button>
            </Modal.Footer>
    </Modal>
    </>
  )
}

export default ListHotels

/*

int a = 10;
int b = "10"

if(a===b)


*/