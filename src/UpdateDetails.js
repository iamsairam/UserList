import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {updateAction} from './redux/UpdateAction'
import { connect } from 'react-redux'

const validate = values => {

    const errors = {}

    if (!values.Name) {
      errors.Name = 'Required'
    }

    if (!values.Email) {
      errors.Email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
      errors.Email= 'Invalid email address'
    }
    if (!values.City) {
        errors.City = 'Required'
    }

    if (!values.Gender) {
        errors.Gender = 'Required'
    }

    if (!values.Phone) {
      errors.Phone = 'Required'
    } else if (!/^[6-9]\d{9}$/i.test(values.Phone)) {
      errors.Phone = 'Invalid Mobile number(It allows number starting with 9 / 8 / 7 / 6)'
    }

    if (!values.Pincode) {
        errors.Pincode = 'Required'
      } else if (!/^[0-9]\d{5}$/i.test(values.Pincode)) {
        errors.Pincode = 'Invalid Pincode'
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
  const renderSelectField = ({ input, label, className,meta: { touched, error }, children }) => (
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
    const dispatch = useDispatch();
    const history = useHistory();
    const handleLink = () => history.push('/');
    const { handleSubmit, pristine, reset, submitting } = props  
    const onSubmitData = formvalues =>{
        // console.log(
        //   `
        //   IndexNo:${formvalues.indexNo},
        //   id:${formvalues.id},
        //   Name:${formvalues.Name},
        //   Gender:${formvalues.Gender},
        //   Email:${formvalues.Email},
        //   Phone:${formvalues.Phone},
        //   City:${formvalues.City},
        //   Pincode:${formvalues.Pincode}
        //   `);
        dispatch(updateAction(formvalues.indexNo,formvalues.id,formvalues.Name,formvalues.Gender,formvalues.Email,formvalues.Phone,formvalues.City,formvalues.Pincode))
        handleLink();
      }
    return (
        <div className="container">
        <h3 className="text-center">Update User Data</h3>
        <form onSubmit={
            handleSubmit((formValues)=>{
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
  // indexNo,id,Name,Gender,Email,Phone,City,Pincode
  // You have to connect() to any reducers that you wish to connect to yourself
  UpdateDetails = connect(
    (state,props) => ({
      initialValues:{
        indexNo:props.match.params.indexNo,
        id:state.user.data[props.match.params.indexNo].id,
        Name:state.user.data[props.match.params.indexNo].Name,
        Gender:state.user.data[props.match.params.indexNo].Gender,
        Email:state.user.data[props.match.params.indexNo].Email,
        Phone:state.user.data[props.match.params.indexNo].Phone,
        City:state.user.data[props.match.params.indexNo].City,
        Pincode:state.user.data[props.match.params.indexNo].Pincode
      },
      enableReinitialValues: true 
    })
  )(UpdateDetails)

export default UpdateDetails