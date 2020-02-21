const initialState = {
  currentUser: {},
  errors: []
}

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'LOGIN_USER':
      return {...state, currentUser: action.user}

    case 'LOGOUT_USER':
      return initialState

    case 'UPDATE_USER':
      return {...state, currentUser: action.user}
      
    case 'USER_ERRORS':
      return {...state, errors: action.errors}  

    case 'CLEAR_USER_ERRORS':
      return {...state, errors: []}  

    default:
     return state
  }
}  

export default currentUserReducer
