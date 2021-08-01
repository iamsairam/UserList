import React, { useEffect} from 'react';
import deleteIcon from './delete.svg'
import addIcon from './addSvg.svg'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {deleteAction} from './redux/DeleteAction'
import UserForm from './UserForm';

function UserList(props) {
  // use selector hook for fetching state Objects 
  const noOfList = useSelector(state => JSON.stringify(state.user.data));
  let staticData =JSON.parse(noOfList);

  // usedispatch for dispatching for fetching and delete the values
  const dispatch = useDispatch();

  // use history hook for routing through programically
  const history = useHistory();
  const handleLinkClick = (indexNo,Id,Name,Gender,Email,Phone,Pincode,City) => history.push(`/UserDetails/${indexNo}/${Id}/${Name}/${Gender}/${Email}/${Phone}/${Pincode}/${City}`);

  useEffect(() => {
 // getting the updated state 
    console.log('Use Effect is redered');
  },[]);
    return (
        <div className="container">
        <div className="d-flex justify-content-between py-2">
        <div><h3>List of Users-{staticData.length}</h3></div>
        <div><Link className="btn btn-primary" to="/AddUser">
          <span className="ml-2"><img src={addIcon} alt="Add icon" className="mr-2"/>Add User</span>
        </Link></div>
      </div>
      <div className="table-responsive"><table className="table table-bordered rounded">
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          <React.Fragment>{staticData.map((person,index)=>
          <tr key={index} id={index}>
          {/* here I'm passing onclick method to td instead of tr because dalate there is complex on when i click delete button */}
          <td onClick={()=>handleLinkClick(index,person.id,person.Name,person.Gender,person.Email,person.Phone,person.Pincode,person.City)}>{person.Name}</td>
          <td onClick={()=>handleLinkClick(index,person.id,person.Name,person.Gender,person.Email,person.Phone,person.Pincode,person.City)}>{person.Gender}</td>
          <td onClick={()=>handleLinkClick(index,person.id,person.Name,person.Gender,person.Email,person.Phone,person.Pincode,person.City)}>{person.Email}</td>
          <td><button className="btn btn-secondary btn-block" onClick={()=>{dispatch(deleteAction(index))}}><img src={deleteIcon} alt='Delete Icon' />Delete</button></td>
          </tr>
          )}</React.Fragment>
        </tbody>
        </table></div>
        </div>
    );
}

export default UserList;
