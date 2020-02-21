import React from 'react'
import {useSelector} from 'react-redux'
import {currencyFormatter} from '../../actions/currencyFormatter'

const CashBalance = () => {
  const balance = useSelector(state => state.currentUserReducer.currentUser.attributes.balance)
  
  return (
    <span id ='balance'>
      {'CASH BALANCE: USD '}
      <strong>{currencyFormatter(balance)}</strong>
    </span>
  )
}

export default CashBalance