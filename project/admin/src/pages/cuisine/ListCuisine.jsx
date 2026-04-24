import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom'
import ProtectedService from '../../services/ProtactedService';

const ListCuisine = () => {
    let navigate = useNavigate();
    let [allCus, setAllCus] = useState([]);
    let [cus, setCus] = useState({})
    let [showDelBox, setShowDelBox] = useState(false)

    useEffect(()=>{
        axios
        .get(`${import.meta.env.VITE_API_URL}/cuisine`)
        .then(response=>{
            console.log(response.data)
            setAllCus(response.data.result);
        })
    },[])

     let deleteHandler = (item)=>{
        setCus(item);
        setShowDelBox(true)
    }
    let deleteCloseHandler = ()=>{
        setShowDelBox(false)
    }

    let confirmDelete = ()=>{
        // delete in server
        // close the popup
        // delete from list
        ProtectedService
        .delete(`/cuisine/${cus._id}`)
        .then(response=>{
            setShowDelBox(false)
            setAllCus(prev=>prev.filter(item=>item._id != cus._id))
        })
    }

     let editHandler = (item)=>{
        navigate(`/cuisine/edit/${item._id}`)
    }


  return (
    <>
    <Modal show={showDelBox} onHide={deleteCloseHandler}>
        <Modal.Header closeButton >
          <Modal.Title className='text-dark'>Delete Cuisine</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete <b>{cus.title}</b> !</Modal.Body>
        <Modal.Footer>
            <button onClick={confirmDelete} className='btn btn-danger'>Confirm</button>
            <button onClick={deleteCloseHandler} className='btn btn-info'>Close</button>
        </Modal.Footer>
      </Modal>
    <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="mb-4" style={{minHeight : "500px"}}>
                        <h6 className="mb-0">List All Cuisine</h6>
                        <div className="table-responsive">
                            <table className='table text-start align-middle table-bordered table-hover mb-0'>
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Title</td>
                                        <td>Edit</td>
                                        <td>Delete</td>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    allCus.map((item, index)=>{
                                        return(
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{item.title}</td>
                                                <td>
                                                    <button onClick={()=>editHandler(item)} className='btn btn-sm btn-info'>Edit</button>
                                                </td>
                                                <td>
                                                    <button onClick={()=>deleteHandler(item)} className='btn btn-sm btn-danger'>Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
            </div>
    </>
  )
}

export default ListCuisine