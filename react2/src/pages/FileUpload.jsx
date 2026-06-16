import React, {useRef} from 'react'
import { useFormik } from 'formik'
import axios from 'axios';
const FileUpload = () => {

    let x = useRef();

    let frm = useFormik({
        initialValues : {
            name : "",
            image : ""
        },
        onSubmit : (formData)=>{
            
            // console.log(x.current.files)
            let myfile = x.current.files[0];
            
            let myform = new FormData();
            myform.append('photo', myfile);
            myform.append("name", formData.name)
            
            axios
            .post("http://localhost:3000/upload", myform)
            .then(response=>{
                console.log(response.data)
            })

        }
    })

    

  return (
    <div className="container my-4">
        <div className="row">
            <div className='col-md-12'>
            <form onSubmit={frm.handleSubmit}>
                Name : <input name='name' onChange={frm.handleChange} type='text' />
                <br />
                <br />
                <input ref={x} name='image' onChange={frm.handleChange} type='file' />
                <br />
                <br />
                <button type='submit'>Upload</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default FileUpload