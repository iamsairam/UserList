import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {fetchAction} from './redux/FetchAction'
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

const validate = values => {

    const errors = {}

    if (!values.Name) {
      errors.Name = 'Required'
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
    }else if (values.Gender === "0") {
      errors.Gender = 'Please Select your gender'
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
  
  const renderInput = ({ input, label, type, className, placeholder, meta: { touched, error, warning } }) => (
    <div>
      <label className="mt-2">{label}</label>
      <div>
        <input autoComplete="off" placeholder={placeholder} className={className} {...input} type={type}/>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-success">{warning}</span>))}
      </div>
    </div>
  )
  const renderSelectField = ({ input, label, placeholder, className,meta: { touched, error }, children }) => (
    <div>
      <label className="mt-2">{label}</label>
      <div>
        <select {...input} className={className} placeholder={placeholder}>
          {children}
        </select>
        {touched && error && <span className="text-danger">{error}</span>}
      </div>
    </div>
  )

function UserForm(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLink = () => history.push('/');
    
    const onSubmitData = formvalues =>{
        let objectdata = {
        "id":`LS${localStorage.length}`,
        "Name":`${formvalues.Name}`,
        "Gender":`${formvalues.Gender}`,
        "Email":`${formvalues.emailId}`,
        "Phone":`${formvalues.phone}`,
        "City":`${formvalues.city}`,
        "Pincode":`${formvalues.pincode}`,
      }
        localStorage.setItem(`LS${localStorage.length}`,JSON.stringify(objectdata));
        dispatch(fetchAction());
        handleLink(); 
    }

    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <div className="container my-3">
        <h1>New User Form</h1>
        <form onSubmit={
            // handleSubmit((formValues)=>{alert(JSON.stringify(formValues))})
            handleSubmit((formValues)=>{
            // console.log(formValues);
            onSubmitData(formValues)})
        } >
        <Field label="Name" placeholder="Enter your full name" type="text" name="Name" className="form-control" component={renderInput} />
        <Field label="Gender" placeholder="Please Select your Gender" name="Gender" component={renderSelectField } className="form-control" >
          <option value="0">Please select your gender</option>
            <option value="Male">Male</option>
            <option value="Female">FeMale</option>
        </Field>
        <Field label="Email" placeholder="Enter your Email id" type="email" name="emailId" className="form-control" component={renderInput} />
        <Field label="Phone" placeholder="Enter your phone number" type="text" maxLength="10" name="phone" className="form-control" component={renderInput} />
        <Field label='City' placeholder="Enter your city" type="text" name="city" className="form-control" component={renderInput} />
        <Field label="Pincode" placeholder="Enter your pincode" type="text" name="pincode" className="form-control" component={renderInput} />
        <button type="submit" disabled={submitting || pristine} className="btn btn-primary mt-4 btn-lg btn-block">submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset} className="btn btn-primary mt-4 btn-lg btn-block">Clear Values</button>
        </form>

        </div>

    
    );
}

export default reduxForm({
    form:'newUserdata',
    onSubmit,
    warn,
    validate
})(UserForm);