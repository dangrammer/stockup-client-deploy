import React from 'react'
import {currencyFormatter} from '../../actions/currencyFormatter'

const TransactionRecord = ({symbol, shares, price, date}) => {
  return (
    <li className='record'>
      <span>{date}</span>
      <span>BUY(<strong>{symbol}</strong>)</span>
      <span>{`${shares} ${shares > 1 ? 'shares' : 'share'}`}</span>
      <span>@ USD {currencyFormatter(price)}</span>
    </li>
  )
}

export default TransactionRecord