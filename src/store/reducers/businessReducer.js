const initState = {
  places: [],
}

const businessReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_BUSINESS':
      console.log('created business', action.result);
      return state;
    case 'CREATE_BUSINESS_ERROR':
      console.log("created business error", action.err);
      return state;
    default:
      return state;
  }
}

export default businessReducer;
