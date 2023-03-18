const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_FAIL':
      return {
        ...state,
        authError: 'Login failed'
      }
    case 'LOGIN_SUCCESS':
      console.log('LOGIN_SUCCESS');
      return {
        ...state,
        authError: null
      }
    case 'SIGN_OUT_SUCCESS':
      console.log("Sign Out Success");
      return state;
    case 'SIGN_UP_SUCCESS':
      console.log("Sign Up Success");
      return {
        ...state,
        authError: null
      }
    case 'SIGN_UP_ERROR':
      console.log(action.err.message);
      return {
        ...state,
        authError: action.err.message
      }
    case 'UPDATE_PROFILE_SUCCESS':
      console.log("Profile Updated");
      return {
        ...state,
        authError: null
      }
    case 'UPDATE_PROFILE_ERROR':
      console.log(action.err.message);
      return {
        ...state,
        authError: action.err.message
      }
    default:
      return state;
  }
}

export default authReducer;
