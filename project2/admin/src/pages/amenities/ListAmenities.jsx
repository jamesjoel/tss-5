import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
const ListAmenities = () => {

  let navigate = useNavigate()

    let [amenitites, setAmenities] = useState({})

   const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  let [allAmenities, setAllAmenities] = useState([])
   useEffect(()=>{
      axios
      .get(`${import.meta.env.VITE_API_URL}/amenities`)
      .then(response=>{
        setAllAmenities(response.data.result)
      })
  },[])

  let goToEdit = (obj)=>{
    navigate("/amenities/edit/"+obj._id)
  }
  let askDelete = (obj)=>{
    setAmenities(obj);
    handleShow();
  }

  let confDelete = ()=>{
    axios
    .delete(`${import.meta.env.VITE_API_URL}/amenities/${amenitites._id}`)
    .then(response=>{
        
        setAllAmenities(prev=>prev.filter(item=>item._id != amenitites._id))

        handleClose()
        
    })
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
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  allAmenities.map((item, index)=><tr>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td><button onClick={()=>goToEdit(item)} className='btn btn-info btn-sm'>Edit</button></td>
                    <td><button onClick={()=>askDelete(item)} className='btn btn-danger btn-sm'>Delete</button></td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Amenities !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You sure want to delete <b>{amenitites.name}</b></Modal.Body>
        <Modal.Footer>
          <button onClick={confDelete} className='btn btn-danger'>Delete</button>
          <button onClick={handleClose} className='btn btn-dark'>Close</button>
          
        </Modal.Footer>
      </Modal>    
  </>
  )
}

export default ListAmenities