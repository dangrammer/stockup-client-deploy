const initialState = {
  transaction: {},
  validating: false,
  errors: []
}


const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case 'VALIDATING':
      return {...state, validating: action.switch}
      
    case 'PENDING_TRANSACTION':
      return {...state, transaction: action.transaction}  

    case 'COMPLETED_TRANSACTION':
      return {...state, transaction: {}}
    
    case 'TRANSACTION_ERRORS':
      return {...state, errors: action.errors}  

    case 'CLEAR_TRANSACTION_ERRORS':
      return {...state, errors: []}  

    default:
     return state
  }
}  

export default transactionReducer
