import React from 'react';
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {deleteAction} from './redux/DeleteAction'

function UserList(props) {
  // use selector hook for fetching state Objects 
  const noOfList = useSelector(state => JSON.stringify(state.user.data));
  let staticData =JSON.parse(noOfList);

  // usedispatch for dispatching for fetching and delete the values
  const dispatch = useDispatch();

  // use history hook for routing through programically
  const history = useHistory();
  const handleLinkClick = (indexNo) => history.push(`/User ${indexNo} Details/`);

    return (
        <div className="container my-5">
        <div className="d-flex justify-content-between py-2">
        <div><h3>No.of Active Users - {staticData.length}</h3></div>
        <div><Link className="btn btn-primary" to="/AddUser">
          <span className="ml-2">Add User</span>
        </Link></div>
      </div>
      <div className="table-responsive">
    
        <table className="table table-bordered rounded">
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th colSpan="2" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
        <React.Fragment>
        {staticData.map((person,index) =>
        <tr key={index} id={index}>
                {/* here I'm passing onclick method to td instead of tr because dalate there is complex on when i click delete button */}
                <td>{person.Name}</td>
                <td>{person.Gender}</td>
                <td>{person.Email}</td>
                <td><button className="btn btn-primary btn-block" onClick={()=>{handleLinkClick(index)}}>Update</button></td>
                <td><button className="btn btn-danger btn-block" onClick={()=>{dispatch(deleteAction(index))}}>Delete</button></td>
        </tr>
        )}
        </React.Fragment>
        </tbody>
        </table>
        </div>

        <div className="alert alert-warning alert-dismissible fade show mt-3 mx-auto w-50" id="alert" role="alert">
        <strong>Concepts Used in This React Application: </strong><hr />
        React Hooks, React-Redux, React-Form, React-Router, Bootstrap
        <hr />
        This Application Developed By <strong className="text-success">Sairam Nagulavancha</strong>
        
        </div>

        </div>
    );
}

export default UserList;
