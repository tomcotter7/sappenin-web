
/**
 * Function to sign into firebase auth
 * @param {array} An array of the input email and password.
 * @author Thomas Cotter
*/ 

export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: 'LOGIN_SUCCESS'});
    }).catch((err) => {
      dispatch({type: 'LOGIN_FAIL', err});
    })
  }
}

/**
 * Function to sign out of firebase auth.
 * @author Thomas Cotter
*/ 

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
      dispatch({type: 'SIGN_OUT_SUCCESS'});
    })
  }
}

/**
 * Function to create an account in firebase auth.
 * @param {array} An array containing all of the information needed to create a new user.
 * @author Thomas Cotter
 */

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0],
        userType: newUser.userType
      })
    }).then(() => {
      dispatch({type: 'SIGN_UP_SUCCESS'});
    }).catch((err) => {
      dispatch({type: 'SIGN_UP_ERROR', err});
    })
  }
}
