
/**
 * A function to update the users location based on a search term.
 * @param {string} The name of the address
 * @param {array} An array of the latitude and longitude of the specified location.
 * @author Thomas Cotter
*/

export const updateLocationSearch = (address, loc) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_LOCATION_SEARCH', name: address, lat: loc.lat, lon: loc.lng})
  }
}

/**
 * A function to update the users location based on their device's location.
 * @param {array} An array of the latitude and longitude of the specified location.
 * @author Thomas Cotter
*/

export const updateLocationDevice = (loc) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_LOCATION_DEVICE', lat: loc.latitude, lon: loc.longitude})
  }
}
