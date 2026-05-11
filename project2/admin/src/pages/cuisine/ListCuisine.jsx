import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
const ListCuisine = () => {




  let navigate = useNavigate();

  let [cuisine, setCuisine] = useState({})

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let [allCuisine, setAllCuisine] = useState([]);
  useEffect(()=>{
      axios
      .get(`${import.meta.env.VITE_API_URL}/cuisine`)
      .then(response=>{
        setAllCuisine(response.data.result)
      })
  },[])


  let showNotification = ()=>{
    toast("Cuisine Successfuly Deleted !")
  }


  let askDelete = (obj)=>{
    setCuisine(obj)
    handleShow()
  }

  let confDelete = ()=>{
    axios
    .delete(`${import.meta.env.VITE_API_URL}/cuisine/${cuisine._id}`)
    .then(response=>{
        // let x = allCuisine.filter(item=> item._id != cuisine._id)
        // setAllCuisine(x);

        setAllCuisine(prev=>prev.filter(item=>item._id != cuisine._id))

        handleClose()
        showNotification()
    })
  }

  let goToEdit = (obj)=>{
    navigate("/cuisine/edit/"+obj._id)
  }

  return (
    <>
    
    <ToastContainer autoClose={2000} position="bottom-center" theme="dark" />
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
                  allCuisine.map((item, index)=><tr>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td><button onClick={()=>goToEdit(item)} className='btn btn-info btn-sm'>Edit</button></td>
                    <td><button onClick={()=>askDelete(item)} className='btn btn-sm btn-danger'>Delete</button></td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
    </div>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Cuisine !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You sure want to delete <b>{cuisine.name}</b></Modal.Body>
        <Modal.Footer>
          <button onClick={confDelete} className='btn btn-danger'>Delete</button>
          <button onClick={handleClose} className='btn btn-dark'>Close</button>
          
        </Modal.Footer>
      </Modal>            



    </>
  )
}

export default ListCuisine