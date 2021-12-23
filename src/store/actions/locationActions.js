export const updateLocationSearch = (address, loc) => {
  console.log(address)
  return (dispatch) => {
    dispatch({type: 'UPDATE_LOCATION_SEARCH', name: address, lat: loc.lat, lon: loc.lng})
  }
}

export const updateLocationDevice = (loc) => {
  return (dispatch) => {
    dispatch({type: 'UPDATE_LOCATION_DEVICE', lat: loc.latitude, lon: loc.longitude})
  }
}
