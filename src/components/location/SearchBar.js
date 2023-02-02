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


const sapcolor = "#c780fa"
const sapdarkcolor = "#6f1ab6"

/**
 * A functional component to allow people to search for areas, which will update the users location.
 * This component uses the react-places-autocomplete library to allow the user to search for places.
 * @author Thomas Cotter
 * @component
*/ 
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
          <OutlinedInput style={{width: '60vh'}} endAdornment={<InputAdornment position="end"><SearchIcon style={{color: sapdarkcolor}}/></InputAdornment>}
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input text-dark',
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
                ? { backgroundColor: sapdarkcolor, cursor: 'pointer', width : '60vh', margin: 'auto'}
                : { backgroundColor: sapcolor, cursor: 'pointer', width : '60vh', margin: 'auto'};
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
