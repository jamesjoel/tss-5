import React, { useEffect, useState } from 'react'
import ProtectedService from '../../services/ProtactedService'
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom'
const ListAmenities = () => {
    let navigate = useNavigate();
    let [allAme, setAllAme] = useState([])

    let [Ame, setAme] = useState({});


    let [showDelBox, setShowDelBox] = useState(false)

    useEffect(()=>{
        ProtectedService
        .get("/amenities")
        .then(response=>{
            setAllAme(response.data.result)
        })
    },[])

    let deleteHandler = (item)=>{
        setAme(item);
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
        .delete(`/amenities/${Ame._id}`)
        .then(response=>{
            // console.log(response.data)
            setShowDelBox(false)
            // let newarr = allAme.filter(item=>{
            //     return item._id != Ame._id;
            // })
            // setAllAme(newarr)
            setAllAme(prev=>prev.filter(item=>item._id != Ame._id))
        })
    }

    let editHandler = (item)=>{
        navigate(`/amenities/edit/${item._id}`)
    }


  return (
    <>
    <Modal show={showDelBox} onHide={deleteCloseHandler}>
        <Modal.Header closeButton >
          <Modal.Title className='text-dark'>Delete Amenities</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete <b>{Ame.title}</b> !</Modal.Body>
        <Modal.Footer>
            <button onClick={confirmDelete} className='btn btn-danger'>Confirm</button>
            <button onClick={deleteCloseHandler} className='btn btn-info'>Close</button>
        </Modal.Footer>
      </Modal>

    <div className="container-fluid pt-4 px-4">
                <div className="bg-secondary text-center rounded p-4">
                    <div className="mb-4" style={{minHeight : "500px"}}>
                        <h6 className="mb-0">List All Amenities</h6>
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
                                    allAme.map((item, index)=>{
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

export default ListAmenities