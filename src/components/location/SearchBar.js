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
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';




const SearchBar = (props) => {

  const [address, setAddress] = useState("");

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
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
          <OutlinedInput style={{width: '60vh', border: "none", borderBottom: "1px solid"}} endAdornment={<InputAdornment position="end"><SearchIcon style={{color: "white"}}/></InputAdornment>}
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input bg-dark text-light',
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
