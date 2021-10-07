import React, { useState } from 'react';
import { connect } from 'react-redux'
import { createBusiness } from '../../store/actions/businessActions'
import { Redirect } from 'react-router-dom'


const CreateBusiness = (props) => {
  const initState = {
    name: '',
    description: '',
    latitude: '',
    longitude: ''
  }
  const [business, setBusiness] = useState(initState);


  const handleChange = (e) => {
    setBusiness({
      ...business,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.createBusiness(business);
  }

  console.log("props:", props);
  const { auth } = props;
  if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3"> Create new business </h5>
        <div className="input-field">
          <input type="text" id="name" onChange={handleChange} />
          <label htmlFor="name"> Business Name </label>
        </div>
        <div className="input-field">
          <textarea id="description" className="materialize-textarea" onChange={handleChange}></textarea>
          <label htmlFor="description"> Business Description </label>
        </div>
        <div className="input-field">
          <input type="text" id="latitude" onChange={handleChange} />
          <label htmlFor="latitude"> Business latitude </label>
        </div>
        <div className="input-field">
          <input type="text" id="longitude" onChange={handleChange} />
          <label htmlFor="longitude"> Business longitude </label>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1"> Create </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    createBusiness: (business) => dispatch(createBusiness(business))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBusiness);
