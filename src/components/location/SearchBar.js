/*
* Author: Thomas Cotter
* A react component for auto-complete places search bar to update the users location
*/

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import { useState } from 'react'
import { connect } from 'react-redux'
import { updateLocationSearch } from '../../store/actions/locationActions'



const SearchBar = (props) => {

  const [address, setAddress] = useState("");

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Success', latLng);
        props.updateLocation(address, latLng);})
      .catch(error => console.error('Error', error));
  };


  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}>

      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input style={{width: '60vh'}}
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input bg-light',
            })}
          />
        <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#6500b2', cursor: 'pointer' }
                : { backgroundColor: '#6500b2', cursor: 'pointer' };
              return (
                <div
                    {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateLocation: (address, loc) => dispatch(updateLocationSearch(address, loc))
  }
}

export default connect(null,mapDispatchToProps)(SearchBar)
