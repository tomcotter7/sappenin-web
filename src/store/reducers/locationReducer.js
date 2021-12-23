const initState = {
  name : '',
  type: 'Device',
  lat: 0,
  lon: 0
}

const locationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION_SEARCH':
      console.log('updated location', action)
      return {
        name: action.name,
        type: 'Search',
        lat: action.lat,
        lon: action.lon
      };
    case 'UPDATE_LOCATION_DEVICE':
      console.log('updated location', action)
      return {
        name : '',
        type: 'Device',
        lat: action.lat,
        lon: action.lon
      }
  default:
    return state;
  }
}

export default locationReducer
