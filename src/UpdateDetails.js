import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { useSelector , useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {updateAction} from './redux/UpdateAction'
import { connect } from 'react-redux'

const validate = values => {

    const errors = {}

    if (!values.fullName) {
      errors.fullName = 'Required'
    }

    if (!values.emailId) {
      errors.emailId = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailId)) {
      errors.emailId= 'Invalid email address'
    }
    if (!values.city) {
        errors.city = 'Required'
    }

    if (!values.Gender) {
        errors.Gender = 'Required'
    }

    if (!values.phone) {
      errors.phone = 'Required'
    } else if (!/^[6-9]\d{9}$/i.test(values.phone)) {
      errors.phone = 'Invalid Mobile number(It allows number starting with 9 / 8 / 7 / 6)'
    }

    if (!values.pincode) {
        errors.pincode = 'Required'
      } else if (!/^[0-9]\d{5}$/i.test(values.pincode)) {
        errors.pincode = 'Invalid Pincode'
      }

    return errors
    }
  
  const warn = values => {
    const warnings = {}
    if (values.phone === 10) {
      warnings.phone = 'Phone Number is Valid(Phone number Should start with 6/7/8/9))'
    }
    return warnings
  }
  
  const onSubmit= (values) =>{
      console.log(values);
  }
  
  const renderInput = ({input, label, type, className, placeholder, meta: { touched, error, warning} }) => (
    <div>
      <label className="mt-2">{label}</label>
      <div>
        <input autoComplete="off" {...input}  placeholder={placeholder} className={className} type={type}/>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-success">{warning}</span>))}
      </div>
    </div>
  )
  const renderSelectField = ({ input, label, type, className,meta: { touched, error }, children }) => (
    <div>
      <label className="mt-2">{label}</label>
      <div>
        <select {...input} className={className}>
        <option value="Male">Male</option>
        <option value="FeMale">FeMale</option>
        </select>
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  )

function UpdateDetails(props) {

    const noOfList = useSelector(state => JSON.stringify(state.user.data));
    let staticData =JSON.parse(noOfList);
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLink = () => history.push('/');
    const { handleSubmit, pristine, reset, submitting } = props  
    const onSubmitData = formvalues =>{
        console.log(formvalues);
        dispatch(updateAction(formvalues.id,formvalues.Name,formvalues.Gender,formvalues.Email,formvalues.Phone,formvalues.City,formvalues.Pincode))
        handleLink();
      }
    return (
        <div className="container">
        
        <form onSubmit={
            // handleSubmit((formValues)=>{alert(JSON.stringify(formValues))})
            handleSubmit((formValues)=>{
            console.log(JSON.stringify(formValues)+"Values Updated");
            onSubmitData(formValues);
        })
        } >
        <Field label="Name" type="text" name="Name" className="form-control" component={renderInput}/>
        <Field label="Gender" name="Gender" component={renderSelectField } className="form-control" placeholder="Please select your gender" />
        <Field label="Email" type="Email" name="Email" className="form-control" component={renderInput} />
        <Field label="Phone" type="text" name="Phone" className="form-control" component={renderInput} />
        <Field label='City' type="text" name="City" className="form-control" component={renderInput} />
        <Field label="Pincode" type="text" name="Pincode" className="form-control" component={renderInput} />
        <button type="submit" disabled={submitting || pristine} className="btn btn-primary mt-4 btn-lg btn-block">submit</button>
        <button type="button"  onClick={reset} className="btn btn-primary mt-4 btn-lg btn-block">Reset Values</button>
        </form>

        {/* <div>
           <h1>Update User Details</h1> 
           <div>   
            Id:{props.match.params.id}<br />
            Name:{props.match.params.name}<br />
            Gender:{props.match.params.gender}<br />
            Email:{props.match.params.email}
            </div>
            <Link to="/" className="btn btn-secondary btn-lg" >Back To HOME</Link>
        </div> */}

        </div>
    );
}
UpdateDetails = reduxForm({
    form: 'updatedValues', // a unique identifier for this form
    warn,
    validate,
    onSubmit,
    enableReinitialize: true
  })(UpdateDetails)
  
  // You have to connect() to any reducers that you wish to connect to yourself
  UpdateDetails= connect(
    (state,props) => ({
      initialValues:{
        id:props.match.params.id,
        Name:props.match.params.name,
        Gender:props.match.params.gender,
        Email:props.match.params.email,
        Phone:props.match.params.phone,
        City:props.match.params.city,
        Pincode:props.match.params.pincode
      },
      enableReinitialValues: true 
    })
  )(UpdateDetails)

export default UpdateDetails