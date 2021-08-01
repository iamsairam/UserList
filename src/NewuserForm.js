import React, { useState } from 'react';
import {fetchAction} from './redux/FetchAction'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom'

function NewuserForm(props) {
    const dispatch = useDispatch();
    let storageLength = localStorage.length;
    let newState = {
        id:storageLength,
        Name :'',
        Gender:'',
        Email:''
    }
    const[countLSV,setCountLSV]=useState(newState);
    const history = useHistory();
    const handleLink = () => history.push('/');
    function setData(event){
        event.preventDefault();
        setCountLSV({...countLSV,id:countLSV.id+1});
        let objectdata = {"id":`LS${countLSV.id}`,"Name":`${countLSV.name}`,"Gender":`${countLSV.gender}`,"Email":`${countLSV.email}`}
        localStorage.setItem(`LS${countLSV.id}`,JSON.stringify(objectdata));
        dispatch(fetchAction());
        handleLink();      
        }
    return (
        <div>
            <h1>Create Your Data</h1>
            <form>
                Name:<input className="form-control" type="text" id="name" name="name" 
                onChange={e=>setCountLSV({...countLSV,name:e.target.value})} /><br />
                Email:<input className="form-control" type="text" id="name" name="Email" onChange={e=>setCountLSV({...countLSV,email:e.target.value})} /><br />
                Gender:<input className="form-control" type="text" id="name" name="gender" onChange={e=>setCountLSV({...countLSV,gender:e.target.value})} /><br />
                {/* <button className="btn btn-primary mr-3 mt-2" >Click</button> */}
                <input className="btn btn-warning mt-2 ml-2 btn-lg" type="reset"></input>
                <Link to="/" className="btn btn-primary mt-2 ml-2 btn-lg" onClick={(event)=>setData(event)}>Submit</Link>
            </form>
        </div>
    );
}

export default NewuserForm;