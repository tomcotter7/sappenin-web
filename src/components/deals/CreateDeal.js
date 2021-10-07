import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { createDeal } from '../../store/actions/dealActions'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import Select from 'react-select'

function convertPlaces(places) {
  var newPlaces = []
  for (var place in places) {
    var newOption = {value: place, label: places[place].name};
    newPlaces.push(newOption);
  }

  return newPlaces;
}

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    padding: 20
  }),
  control: (base, state) => ({
    ...base,
    backgroundColor: 'black',
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'white'
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    display: 'none'
  }),
  placeholder: (base, state) => ({
    ...base,
    fontSize: '2vh'
  })

}


class CreateDeal extends Component {

  state = {
    title: '',
    description: '',
    placeIDs: [],
  }

  handleChange = (e) => {
    try {
      this.setState({
        [e.target.id] : e.target.value
      })
    } catch {
      var selectedPlaces = []
      for (var place in e) {
        selectedPlaces.push(e[place].value);
      }
      this.setState({
        placeIDs: selectedPlaces
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var title = this.state.title;
    var description = this.state.description;
    for (var id in this.state.placeIDs) {
      var deal = {
        title: title,
        description: this.state.description,
        placeId: id
      }
      this.props.createDeal(deal)
    }
    this.props.history.push('/');
  }

  render() {
    var { auth, places } = this.props;
    if (places == undefined) {
      places = {}
    } else {
      places = convertPlaces(places);
    }
    if (auth.isLoaded && !auth.uid) return <Redirect to='/sign-in' />

    return (
      <div class="container">
        <form onSubmit={this.handleSubmit} class="black">
          <h5 className="grey-text text-lighten-1 center"> Create new deal </h5>
          <br />
          <div className="input-field col s6">
            <input style={{color: 'white'}} type="text" id="title" onChange={this.handleChange} />
            <label for="title" className="active"> Title </label>
          </div>
          <div className="input-field">
            <textarea id="description" className="materialize-textarea" style={{color: 'white'}} onChange={this.handleChange}></textarea>
            <label for="description" className="active"> Deal Description </label>
          </div>
          <div className="input-field">
            <Select
                id="business"
                options={places}
                isMulti
                styles={selectStyles}
                name="business"
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select a business"
                onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn purple lighten-1"> Create </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("Create Deal State:", state);
  return {
    auth: state.firebase.auth,
    places: state.firestore.data.places
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDeal: (deal) => dispatch(createDeal(deal))
  }
}

export default compose(
  connect(state => ({ id: state.firebase.auth.uid })),
  firestoreConnect(props => {
      const { id } = props;
      if (id) {
        return [
          {
            collection: "places",
            where: [
              ['owner', '==', id]
            ]
          }
        ]
      } else {
        return [
          {
            collection: "places",
            where: [
              ['name', '==', 'default']
            ]
          }
        ]
      }
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateDeal);
