import {combineReducers} from 'redux'
import currentUserReducer from './currentUserReducer'
import transactionReducer from './transactionReducer'
import stockReducer from './stockReducer'

const rootReducer = combineReducers({
  currentUserReducer: currentUserReducer,
  transactionReducer: transactionReducer,
  stockReducer: stockReducer
})

export default rootReducer